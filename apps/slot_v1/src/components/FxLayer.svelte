<script lang="ts">
	/**
	 * Board-space decoration layer: spark bursts on reel stops and winning
	 * symbols, the azure "molten line" drawn through each winning payline,
	 * shockwave rings on scatter landings, and the shared screen shake.
	 * Mounted inside a BoardContainer so every coordinate matches ReelSymbol
	 * (getSymbolX(reel), reelSymbol.symbolY()). Driven only by `fx` events --
	 * never awaited by the book-event flow.
	 */
	import * as PIXI from 'pixi.js';
	import { onDestroy, onMount } from 'svelte';
	import { getContextApp, getContextParent } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	import { fx, type FxEvent, type FxPoint } from '../game/fx';
	import { stateFx } from '../game/stateFx.svelte';
	import { ParticleSystem, getFxTexture } from '../game/particles';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import { getSymbolX } from '../game/utils';
	import { prefersReducedMotion } from '../game/animationConfig';

	const app = getContextApp();
	const parent = getContextParent();

	const AZURE = 0x3fb6ff;
	const AZURE_LIGHT = 0xa8e4ff;
	const EMBER = 0xff9a3c;
	const GOLD = 0xffd36b;

	const root = new PIXI.Container();
	root.zIndex = 50;
	const lineGfx = new PIXI.Graphics();
	lineGfx.blendMode = 'add';
	const ringLayer = new PIXI.Container();
	const particles = new ParticleSystem(150);
	root.addChild(lineGfx, ringLayer, particles.container);
	parent.addToParent(root);

	const tex = (key: string) => getFxTexture(app.stateApp.loadedAssets, key);
	const reelBottom = SYMBOL_SIZE * BOARD_DIMENSIONS.y;

	// ---- win lines --------------------------------------------------------
	type ActiveLine = { points: FxPoint[]; age: number; durationMs: number };
	let lines: ActiveLine[] = [];

	const drawLines = () => {
		lineGfx.clear();
		for (const line of lines) {
			const drawT = Math.min(line.age / 260, 1); // draw-on
			const fadeStart = line.durationMs - 220;
			const alpha = line.age > fadeStart ? Math.max(0, 1 - (line.age - fadeStart) / 220) : 1;
			const pts = line.points;
			if (pts.length < 2 || alpha <= 0) continue;
			const segs = pts.length - 1;
			const reach = drawT * segs;
			const path: FxPoint[] = [pts[0]];
			for (let i = 0; i < segs; i++) {
				if (reach <= i) break;
				const k = Math.min(reach - i, 1);
				const a = pts[i];
				const b = pts[i + 1];
				path.push({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
			}
			const pulse = 0.85 + 0.15 * Math.sin(line.age / 70);
			const stroke = (width: number, color: number, a: number) => {
				lineGfx.moveTo(path[0].x, path[0].y);
				for (let i = 1; i < path.length; i++) lineGfx.lineTo(path[i].x, path[i].y);
				lineGfx.stroke({ width, color, alpha: a * alpha, cap: 'round', join: 'round' });
			};
			stroke(SYMBOL_SIZE * 0.22, AZURE, 0.18 * pulse);
			stroke(SYMBOL_SIZE * 0.1, AZURE, 0.55 * pulse);
			stroke(SYMBOL_SIZE * 0.035, 0xffffff, 0.95);
			// travelling spark head while drawing
			if (drawT < 1) {
				const head = path[path.length - 1];
				particles.spawn({
					texture: tex('fx_spark'),
					x: head.x,
					y: head.y,
					count: 2,
					speed: [60, 220],
					life: [250, 500],
					size: [10, 22],
					tint: [AZURE_LIGHT, 0xffffff],
					drag: 0.1,
				});
			}
		}
	};

	// ---- shockwave rings --------------------------------------------------
	type Ring = { sprite: PIXI.Sprite; age: number; life: number; from: number; to: number };
	let rings: Ring[] = [];
	const spawnRing = (x: number, y: number, from: number, to: number, life: number, tint = AZURE) => {
		const sprite = new PIXI.Sprite(tex('fx_ring'));
		sprite.anchor.set(0.5);
		sprite.blendMode = 'add';
		sprite.tint = tint;
		sprite.position.set(x, y);
		ringLayer.addChild(sprite);
		rings.push({ sprite, age: 0, life, from, to });
	};
	const updateRings = (dt: number) => {
		rings = rings.filter((r) => {
			r.age += dt;
			const t = r.age / r.life;
			if (t >= 1) {
				r.sprite.destroy();
				return false;
			}
			const eased = 1 - Math.pow(1 - t, 3);
			const size = r.from + (r.to - r.from) * eased;
			const w = r.sprite.texture.width || 1;
			r.sprite.scale.set(size / w);
			r.sprite.alpha = 1 - t;
			return true;
		});
	};

	// ---- column beams (wild / scatter land) --------------------------------
	type Beam = { sprite: PIXI.Sprite; age: number; life: number; baseW: number; baseH: number };
	let beams: Beam[] = [];
	const beamLayer = new PIXI.Container();
	root.addChildAt(beamLayer, 0);
	const spawnBeam = (reelIndex: number, special: 'W' | 'S') => {
		const sprite = new PIXI.Sprite(tex('fx_beam'));
		sprite.anchor.set(0.5);
		sprite.blendMode = 'add';
		sprite.tint = special === 'S' ? AZURE_LIGHT : AZURE;
		sprite.position.set(getSymbolX(reelIndex), reelBottom / 2);
		beamLayer.addChild(sprite);
		beams.push({
			sprite,
			age: 0,
			life: special === 'S' ? 900 : 700,
			baseW: SYMBOL_SIZE * 1.25,
			baseH: reelBottom * 1.45,
		});
	};
	const updateBeams = (dt: number) => {
		beams = beams.filter((b) => {
			b.age += dt;
			const t = b.age / b.life;
			if (t >= 1) {
				b.sprite.destroy();
				return false;
			}
			// fast flare-up (first 15%), then a slow fade with a slight narrowing
			const rise = Math.min(1, t / 0.15);
			const fade = t < 0.15 ? 1 : 1 - (t - 0.15) / 0.85;
			const w = b.baseW * (0.35 + 0.65 * rise) * (1 - 0.3 * (1 - fade));
			const texW = b.sprite.texture.width || 1;
			const texH = b.sprite.texture.height || 1;
			b.sprite.scale.set(w / texW, b.baseH / texH);
			b.sprite.alpha = Math.max(0, fade) * 0.95;
			return true;
		});
	};

	// ---- screen shake -----------------------------------------------------
	let shakeAge = 0;
	let shakeLife = 0;
	let shakeIntensity = 0;
	const startShake = (intensity: number, durationMs: number) => {
		if (prefersReducedMotion()) return;
		if (intensity < shakeIntensity * (1 - shakeAge / Math.max(shakeLife, 1))) return;
		shakeIntensity = intensity;
		shakeLife = durationMs;
		shakeAge = 0;
	};
	const updateShake = (dt: number) => {
		if (shakeAge >= shakeLife) {
			if (stateFx.shakeX !== 0 || stateFx.shakeY !== 0) {
				stateFx.shakeX = 0;
				stateFx.shakeY = 0;
			}
			return;
		}
		shakeAge += dt;
		const k = Math.max(0, 1 - shakeAge / shakeLife);
		const amp = shakeIntensity * k * k;
		stateFx.shakeX = (Math.random() * 2 - 1) * amp;
		stateFx.shakeY = (Math.random() * 2 - 1) * amp;
	};

	// ---- event handlers ---------------------------------------------------

	const handle = (e: FxEvent) => {
		if (prefersReducedMotion() && e.kind !== 'winLine') return;
		switch (e.kind) {
			case 'reelLand': {
				const x = getSymbolX(e.reelIndex);
				const turbo = stateBet.isTurbo;
				particles.spawn({
					texture: tex('fx_spark'),
					x,
					y: reelBottom - 6,
					spreadX: SYMBOL_SIZE * 0.42,
					count: turbo ? 4 : 9,
					angle: -Math.PI / 2,
					cone: Math.PI * 0.9,
					speed: [180, 420],
					gravity: 900,
					life: [350, 650],
					size: [10, 20],
					endSizeRatio: 0.3,
					tint: [EMBER, GOLD, AZURE_LIGHT],
					alignToVelocity: true,
					stretch: 2.6,
				});
				if (!turbo) startShake(e.heavy ? 7 : 3, e.heavy ? 260 : 140);
				break;
			}
			case 'symbolWin': {
				for (const p of e.points) {
					particles.spawn({
						texture: tex('fx_spark'),
						x: p.x,
						y: p.y,
						spreadX: SYMBOL_SIZE * 0.2,
						spreadY: SYMBOL_SIZE * 0.2,
						count: e.special ? 16 : 9,
						speed: [120, 360],
						drag: 0.08,
						life: [450, 850],
						size: [12, 26],
						tint: e.special ? [AZURE, AZURE_LIGHT, 0xffffff] : [GOLD, AZURE_LIGHT, 0xffffff],
						alignToVelocity: true,
						stretch: 2.2,
					});
					spawnRing(p.x, p.y, SYMBOL_SIZE * 0.5, SYMBOL_SIZE * (e.special ? 1.9 : 1.4), 520, e.special ? AZURE : GOLD);
				}
				break;
			}
			case 'winLine': {
				if (e.points.length >= 2) lines.push({ points: e.points, age: 0, durationMs: e.durationMs });
				break;
			}
			case 'scatterLand': {
				spawnRing(e.point.x, e.point.y, SYMBOL_SIZE * 0.4, SYMBOL_SIZE * 2.2, 650, AZURE);
				particles.spawn({
					texture: tex('fx_flame'),
					x: e.point.x,
					y: e.point.y + SYMBOL_SIZE * 0.2,
					spreadX: SYMBOL_SIZE * 0.25,
					count: 8,
					angle: -Math.PI / 2,
					cone: 0.6,
					speed: [60, 160],
					life: [500, 900],
					size: [30, 55],
					endSizeRatio: 0.1,
					tint: [AZURE, AZURE_LIGHT],
					spin: [-1, 1],
				});
				startShake(4, 180);
				break;
			}
			case 'columnBeam': {
				spawnBeam(e.reelIndex, e.special);
				particles.spawn({
					texture: tex('fx_spark'),
					x: getSymbolX(e.reelIndex),
					y: reelBottom,
					spreadX: SYMBOL_SIZE * 0.3,
					count: stateBet.isTurbo ? 6 : 14,
					angle: -Math.PI / 2,
					cone: 0.5,
					speed: [420, 900],
					drag: 0.25,
					life: [400, 800],
					size: [10, 22],
					tint: [AZURE, AZURE_LIGHT, 0xffffff],
					alignToVelocity: true,
					stretch: 3,
				});
				break;
			}
			case 'shake':
				startShake(e.intensity, e.durationMs);
				break;
			default:
				break;
		}
	};

	const tick = (ticker: PIXI.Ticker) => {
		const dt = Math.min(ticker.deltaMS, 50);
		particles.update(dt);
		updateRings(dt);
		updateBeams(dt);
		lines = lines.filter((l) => (l.age += dt) < l.durationMs);
		drawLines();
		updateShake(dt);
	};

	let unsubscribe: (() => void) | undefined;
	let attachedTicker: PIXI.Ticker | undefined;

	onMount(() => {
		unsubscribe = fx.subscribe(handle);
	});

	$effect(() => {
		const ticker = app.stateApp.pixiApplication?.ticker;
		if (ticker && ticker !== attachedTicker) {
			attachedTicker?.remove(tick);
			ticker.add(tick);
			attachedTicker = ticker;
		}
	});

	onDestroy(() => {
		unsubscribe?.();
		attachedTicker?.remove(tick);
		stateFx.shakeX = 0;
		stateFx.shakeY = 0;
		for (const r of rings) r.sprite.destroy();
		rings = [];
		for (const b of beams) b.sprite.destroy();
		beams = [];
		particles.destroy();
	});
</script>
