import * as PIXI from 'pixi.js';
import { GText } from './theme';

import { anim, ease } from './anim';
import { C, SYMBOL_STYLE, orbTier, textStyle, COLORS } from './theme';
import { fx, tex, motionBlurTex } from './textures';

export type RawSymbol = { name: string; multiplier?: number; scatter?: boolean };
export type ExplodeStyle = 'pop' | 'shatter' | 'jet' | 'pulse' | 'dart' | 'spin';
/** explosion style per symbol */
export const EXPLODE_STYLE: Record<string, ExplodeStyle> = { H1: 'shatter', H2: 'jet', H3: 'pulse', H4: 'dart', L1: 'pop', L2: 'spin', L3: 'shatter', L4: 'shatter', L5: 'shatter' };

/**
 * One symbol on the board: soft additive back-glow, the art, an additive
 * "flash" copy of the art for win highlights, and for orbs the value text.
 * Always slightly alive (scatter breathes, orbs bob and shimmer).
 */
export class SymbolView {
	readonly root = new PIXI.Container();
	private body = new PIXI.Container();
	private glow = new PIXI.Sprite(fx.glow());
	private art = new PIXI.Sprite();
	/** vertical motion-blur copy of the art, crossfaded in while the reel moves fast */
	private blurArt = new PIXI.Sprite();
	private flash = new PIXI.Sprite();
	private value?: PIXI.Text;
	private shine = new PIXI.Sprite(fx.shine());
	private shineMask = new PIXI.Sprite();
	/** ms since the win highlight started, -1 when not winning (drives the per-symbol win motion) */
	private winT = -1;
	raw: RawSymbol = { name: 'L5' };
	private phase = Math.random() * Math.PI * 2;
	private dimmed = 0; // 0..1 animated
	private dimTarget = 0;
	highlight = 0; // 0..1 win glow
	taken = false; // orb already swallowed (free spins)
	baseScale = 1;
	squashX = 1;
	squashY = 1;
	pop = 1; // multiplicative scale used by animations
	stretch = 0; // motion stretch while falling
	bounceY = 0; // small hop after landing
	exX = 0; // explode motion offsets / spin
	exY = 0;
	exRot = 0;
	/** 0 crisp .. 1 fully motion-blurred (set by the reel while it spins) */
	motionBlur = 0;

	constructor(raw: RawSymbol) {
		this.glow.anchor.set(0.5);
		this.glow.blendMode = 'add';
		this.art.anchor.set(0.5);
		this.blurArt.anchor.set(0.5);
		this.blurArt.visible = false;
		this.flash.anchor.set(0.5);
		this.flash.blendMode = 'add';
		this.flash.alpha = 0;
		this.shine.anchor.set(0.5);
		this.shine.blendMode = 'add';
		this.shine.rotation = 0.42;
		this.shine.width = C * 0.32;
		this.shine.height = C * 1.7;
		this.shine.visible = false;
		this.shineMask.anchor.set(0.5);
		this.shine.mask = this.shineMask;
		this.body.addChild(this.glow, this.art, this.blurArt, this.flash, this.shineMask, this.shine);
		this.root.addChild(this.body);
		this.set(raw);
	}

	get isOrb() {
		return this.raw.name === 'M';
	}

	set(raw: RawSymbol) {
		this.raw = raw;
		this.taken = false;
		this.highlight = 0;
		this.winT = -1;
		this.pop = 1;
		this.root.alpha = 1;
		const style = SYMBOL_STYLE[raw.name] ?? SYMBOL_STYLE.L5;
		let key = `sym_${raw.name}`;
		let tint = style.tint;
		if (raw.name === 'M') {
			const tier = orbTier(raw.multiplier ?? 2);
			key = tier.key;
			tint = tier.tint;
		}
		const t = tex(key, raw.name === 'M' ? 'M' : raw.name);
		this.art.texture = t;
		this.flash.texture = t;
		this.shineMask.texture = t;
		const size = C * style.scale;
		const s = size / Math.max(t.width, t.height);
		this.baseScale = s;
		this.art.scale.set(s);
		const mb = motionBlurTex(t);
		this.blurArt.texture = mb.tex;
		this.blurArt.scale.set(s * mb.k);
		this.flash.scale.set(s);
		this.shineMask.scale.set(s);
		this.glow.tint = tint;
		this.glow.scale.set((C * 1.25) / 256);
		this.glow.alpha = raw.name === 'S' || raw.name === 'M' ? 0.55 : 0.18;
		if (raw.name === 'M') {
			// rebuild the Text with its final style: mutating style after creation left the
			// glyphs offset by the padding (Pixi 8.8)
			this.value?.destroy();
			const big = (raw.multiplier ?? 2) >= 100;
			this.value = new GText({ text: `×${raw.multiplier}`, style: { ...textStyle(big ? 30 : 36, { glow: tint }), dropShadow: { color: tint, blur: 10, distance: 0, alpha: 0.95, angle: 0 } } as any });
			this.value.anchor.set(0.5);
			this.value.y = 2;
			this.body.addChild(this.value);
		} else if (this.value) this.value.visible = false;
	}

	setDim(on: boolean) {
		this.dimTarget = on ? 1 : 0;
	}

	/** per-frame idle life + derived visuals */
	update(dt: number) {
		this.phase += dt * 0.0025;
		this.dimmed += (this.dimTarget - this.dimmed) * Math.min(1, dt * 0.012);
		let idleS = 1;
		let rot = 0;
		if (this.raw.name === 'S') {
			idleS = 1 + Math.sin(this.phase * 1.6) * 0.035;
			this.glow.alpha = 0.5 + Math.sin(this.phase * 2.2) * 0.18 + this.highlight * 0.5;
		} else if (this.raw.name === 'M') {
			idleS = 1 + Math.sin(this.phase * 2.0) * 0.04;
			rot = Math.sin(this.phase * 1.3) * 0.05;
			this.glow.alpha = this.taken ? 0.08 : 0.5 + Math.sin(this.phase * 3) * 0.15 + this.highlight * 0.5;
		} else {
			this.glow.alpha = 0.14 + this.highlight * 0.75;
		}
		let wx = 0, wy = 0, wsx = 1, wsy = 1;
		if (this.winT >= 0) {
			this.winT += dt * anim.speed;
			const m = winMotion(this.raw.name, this.winT);
			const a = Math.min(1, this.winT / 220) * (anim.reducedMotion ? 0.35 : 1);
			wx = m.x * a;
			wy = m.y * a;
			rot += m.rot * a;
			wsx = 1 + (m.sx - 1) * a;
			wsy = 1 + (m.sy - 1) * a;
			// light band sweeping across the art, every 1.1 s
			const k = (this.winT % 1100) / 480;
			this.shine.visible = k < 1;
			if (k < 1) {
				this.shine.x = (-0.75 + 1.5 * k) * C;
				this.shine.alpha = 0.85 * Math.sin(k * Math.PI);
			}
		} else this.shine.visible = false;
		const sc = idleS * this.pop;
		const st = 1 + this.stretch;
		this.body.scale.set((sc * this.squashX * wsx) / Math.sqrt(st), sc * this.squashY * st * wsy);
		this.body.rotation = rot + this.exRot;
		this.body.position.set(wx + this.exX, wy + this.bounceY + this.exY);
		this.glow.scale.set(((C * 1.25) / 256) * (1 + this.highlight * 0.35));
		this.flash.alpha = this.highlight * (0.35 + Math.sin(this.phase * 9) * 0.15);
		const k = 1 - this.dimmed * 0.62;
		const tint = (Math.round(255 * k) << 16) | (Math.round(255 * k) << 8) | Math.round(255 * (k * 0.9 + 0.1));
		this.art.tint = tint;
		const mb = this.motionBlur;
		if (this.taken) this.art.alpha = 0.28;
		else this.art.alpha = 1 - mb;
		this.blurArt.visible = mb > 0.01;
		if (this.blurArt.visible) {
			this.blurArt.alpha = mb;
			this.blurArt.tint = tint;
		}
		if (this.value) this.value.alpha = (this.taken ? 0 : 1 - this.dimmed * 0.5) * (1 - mb);
	}

	/** Squash on landing. */
	async land(strength = 1) {
		this.squashX = 1 + 0.16 * strength;
		this.squashY = 1 - 0.2 * strength;
		// squash recovers elastically while the symbol makes one small damped hop
		await anim.tween({ duration: 300, ease: ease.linear }, (t) => {
			const e = ease.outElastic(Math.min(1, t * 1.15));
			this.squashX = 1 + 0.16 * strength * (1 - e);
			this.squashY = 1 - 0.2 * strength * (1 - e);
			this.bounceY = -9 * strength * Math.sin(t * Math.PI) * (1 - t);
		});
		this.squashX = this.squashY = 1;
		this.bounceY = 0;
	}

	/** Win highlight: pop + glow, holds until clearHighlight. */
	async win() {
		this.setDim(false);
		if (this.winT < 0) this.winT = 0;
		await anim.tween({ duration: 380, ease: ease.outBack }, (t) => {
			this.highlight = t;
			this.pop = 1 + 0.16 * Math.sin(t * Math.PI) + 0.06 * t;
		});
	}

	get artTexture() {
		return this.art.texture;
	}

	/**
	 * Body motion of the explosion, per creature (the matching particles are spawned by
	 * BoardView.explodeFx): shells and crystals shatter (body hidden, shards fly), the squid
	 * jets away, the jelly contracts then bursts, the sea dragon darts off, the star spins out.
	 */
	async explode(style: ExplodeStyle = 'pop') {
		this.highlight = 1;
		switch (style) {
			case 'shatter':
				this.root.alpha = 0;
				await anim.wait(220);
				return;
			case 'jet':
				await anim.tween({ duration: 120, ease: ease.outQuad }, (t) => {
					this.squashX = 1 + 0.25 * t;
					this.squashY = 1 - 0.25 * t;
				});
				await anim.tween({ duration: 200, ease: ease.inCubic }, (t) => {
					this.squashX = 1.25 - 0.45 * t;
					this.squashY = 0.75 + 0.6 * t;
					this.exY = -C * 0.9 * t;
					this.root.alpha = 1 - t;
				});
				this.squashX = this.squashY = 1;
				return;
			case 'pulse':
				await anim.tween({ duration: 130, ease: ease.outQuad }, (t) => (this.pop = 1 - 0.18 * t));
				await anim.tween({ duration: 170, ease: ease.outCubic }, (t) => {
					this.pop = 0.82 + 0.75 * t;
					this.root.alpha = 1 - t;
				});
				return;
			case 'dart':
				await anim.tween({ duration: 280, ease: ease.inCubic }, (t) => {
					this.exX = -C * 0.8 * t;
					this.exY = -C * 0.35 * t;
					this.exRot = -0.4 * t;
					this.root.alpha = 1 - t * t;
				});
				return;
			case 'spin':
				await anim.tween({ duration: 280, ease: ease.inQuad }, (t) => {
					this.exRot = Math.PI * 2 * t;
					this.pop = 1.1 - 0.7 * t;
					this.root.alpha = 1 - t * t;
				});
				return;
			default:
				await anim.tween({ duration: 220, ease: ease.inCubic }, (t) => {
					this.pop = 1.06 + 0.3 * t;
					this.root.alpha = 1 - t;
				});
		}
	}

	/** Scatter / orb celebration pulse */
	async pulse(times = 2) {
		for (let i = 0; i < times; i++) {
			await anim.tween({ duration: 300, ease: ease.inOutQuad }, (t) => {
				this.pop = 1 + 0.22 * Math.sin(t * Math.PI);
				this.highlight = Math.sin(t * Math.PI);
			});
		}
	}

	clearHighlight() {
		this.highlight = 0;
		this.winT = -1;
		this.pop = 1;
	}

	get tint() {
		if (this.raw.name === 'M') return orbTier(this.raw.multiplier ?? 2).tint;
		return (SYMBOL_STYLE[this.raw.name] ?? SYMBOL_STYLE.L5).tint;
	}

	/** Snapshot sprite for flying effects (orb flying to Maw). */
	makeGhost(): PIXI.Container {
		const c = new PIXI.Container();
		const g = new PIXI.Sprite(fx.glow());
		g.anchor.set(0.5);
		g.blendMode = 'add';
		g.tint = this.tint;
		g.scale.set((C * 1.4) / 256);
		const a = new PIXI.Sprite(this.art.texture);
		a.anchor.set(0.5);
		a.scale.set(this.baseScale);
		c.addChild(g, a);
		if (this.value) {
			const v = new GText({ text: this.value.text, style: this.value.style.clone() });
			v.anchor.set(0.5);
			v.y = 2;
			c.addChild(v);
		}
		return c;
	}

	destroy() {
		this.root.destroy({ children: true });
	}
}

const TAU = Math.PI * 2;
/** pulse 0..1..0 occupying the first `width` fraction of each period */
const beat = (t: number, period: number, width = 0.35) => {
	const k = (t % period) / period;
	return k < width ? Math.sin((k / width) * Math.PI) : 0;
};

/**
 * Bespoke win motion per symbol, in cell units (C = 100): each creature moves the way
 * it would in the water. Returned values are offsets/multipliers applied on top of
 * the pop/squash/idle transforms.
 */
export const winMotion = (name: string, t: number) => {
	const p = (t / 1000) * TAU;
	const m = { x: 0, y: 0, rot: 0, sx: 1, sy: 1 };
	switch (name) {
		case 'H1': {
			// nautilus: slow roll of the shell + chamber glow throb
			m.rot = Math.sin(p * 0.8) * 0.24;
			m.sx = m.sy = 1 + Math.sin(p * 1.6) * 0.05;
			m.y = Math.sin(p * 0.8 + 1.2) * -4;
			break;
		}
		case 'H2': {
			// vampire squid: cloak flares (wide + flat) then jets upward
			const b = beat(t, 900, 0.4);
			m.sx = 1 + 0.16 * b;
			m.sy = 1 - 0.12 * b;
			const k = (t % 900) / 900;
			m.y = -10 * Math.sin(Math.min(1, k / 0.75) * Math.PI) ;
			break;
		}
		case 'H3': {
			// jellyfish: bell contraction pushes it up, then it drifts back down
			const b = beat(t, 1000, 0.3);
			m.sy = 1 - 0.14 * b;
			m.sx = 1 + 0.1 * b;
			const k = (t % 1000) / 1000;
			m.y = -12 * Math.sin(Math.pow(k, 0.6) * Math.PI);
			break;
		}
		case 'H4': {
			// leafy sea dragon: swimming sway
			m.rot = Math.sin(p * 1.1) * 0.15;
			m.x = Math.sin(p * 0.55) * 6;
			m.y = Math.sin(p * 1.1 + 1) * 4;
			m.sx = 1 + Math.sin(p * 2.2) * 0.03;
			break;
		}
		case 'L1': {
			// urchin: spiky shiver
			m.rot = Math.sin(p * 1.4) * 0.3 + Math.sin(p * 9) * 0.04;
			m.sx = m.sy = 1 + Math.abs(Math.sin(p * 2.8)) * 0.07;
			break;
		}
		case 'L2': {
			// brittle star: arms twirl
			m.rot = Math.sin(p * 0.7) * 0.55;
			m.sx = m.sy = 1 + Math.sin(p * 1.4) * 0.04;
			break;
		}
		case 'L3': {
			// scallop: double clap
			const b = beat(t, 900, 0.18) + beat(t + 200, 900, 0.18) * 0.7;
			m.sy = 1 - 0.18 * b;
			m.sx = 1 + 0.05 * b;
			m.y = -6 * b;
			break;
		}
		case 'L4': {
			// vent crystal: heat shimmer
			m.sx = 1 + Math.sin(p * 3.2) * 0.035;
			m.sy = 1 + Math.sin(p * 3.2 + 1.6) * 0.05;
			m.rot = Math.sin(p * 6) * 0.03;
			break;
		}
		case 'L5': {
			// sea glass: turns to catch the light (fake 3D)
			m.sx = 0.82 + 0.18 * Math.abs(Math.cos(p * 0.7));
			m.rot = Math.sin(p * 0.7) * 0.18;
			break;
		}
	}
	return m;
};

export { COLORS };
