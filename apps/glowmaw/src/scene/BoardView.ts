import * as PIXI from 'pixi.js';
import { GText } from './theme';

import { anim, ease, sleep, rand } from './anim';
import { ParticleSystem } from './particles';
import { SymbolView, EXPLODE_STYLE, type RawSymbol } from './SymbolView';
import { C, REELS, ROWS, BOARD_W, BOARD_H, COLORS, textStyle } from './theme';
import { fx, tex } from './textures';

export type Position = { reel: number; row: number };
export type RevealEvent = { board: RawSymbol[][]; anticipation: number[]; gameType: string };
export type WinEntry = { symbol: string; win: number; positions: Position[]; meta: { overlay: Position } };

export type BoardHooks = {
	sfx: (name: string, opts?: { volume?: number }) => void;
	shake: (amount: number, ms?: number) => void;
	onReelStop?: (reel: number) => void;
	onSpecialLand?: (sym: SymbolView, reel: number, row: number) => void;
	formatWin: (amount: number) => string;
	turbo: () => boolean;
	reducedMotion: () => boolean;
};

const PAD_ROWS = ROWS + 2;
export const cellX = (reel: number) => reel * C + C / 2;
/** padded row index (0 = hidden top pad, 1..5 visible, 6 hidden bottom pad) */
export const cellY = (row: number) => (row - 1) * C + C / 2;

const DEFAULT_BOARD: RawSymbol[][] = [
	['L1', 'H2', 'L3', 'M', 'L4', 'H1', 'L2'],
	['H3', 'L5', 'L2', 'H1', 'S', 'L1', 'L3'],
	['L4', 'H4', 'H1', 'L5', 'L3', 'H2', 'L1'],
	['L2', 'L1', 'S', 'H3', 'L4', 'L5', 'H4'],
	['H1', 'L3', 'H4', 'L1', 'H2', 'M', 'L5'],
	['L5', 'H2', 'L4', 'L2', 'H3', 'L4', 'H1'],
].map((reel) => reel.map((name) => (name === 'M' ? { name, multiplier: 5 } : { name })));

export class BoardView {
	readonly root = new PIXI.Container();
	readonly tiles = new PIXI.Container();
	readonly symbolsLayer = new PIXI.Container();
	readonly topLayer = new PIXI.Container(); // unmasked: specials + labels
	readonly fxLayer = new PIXI.Container();
	readonly particles = new ParticleSystem(260);
	private columnGlows: PIXI.Sprite[] = [];
	private tilesG = new PIXI.Graphics();
	cells: SymbolView[][] = [];
	private labels: PIXI.Container[] = [];
	private preSpinPromise: Promise<void> | null = null;
	private reelOut: Promise<void>[] = [];
	private reelReady: Promise<void>[] = [];
	private quick = false;
	spinning = false;

	constructor(private hooks: BoardHooks) {
		this.drawTiles();
		this.tiles.addChild(this.tilesG);
		for (let r = 0; r < REELS; r++) {
			const g = new PIXI.Sprite(fx.beam());
			g.anchor.set(0.5);
			g.blendMode = 'add';
			g.width = C * 1.3;
			g.height = BOARD_H * 1.25;
			g.x = cellX(r);
			g.y = BOARD_H / 2;
			g.alpha = 0;
			g.tint = COLORS.cyan;
			this.columnGlows.push(g);
			this.tiles.addChild(g);
		}
		const mask = new PIXI.Graphics().rect(-8, -6, BOARD_W + 16, BOARD_H + 12).fill(0xffffff);
		this.symbolsLayer.mask = mask;
		this.root.addChild(this.tiles, mask, this.symbolsLayer, this.topLayer, this.fxLayer);
		this.fxLayer.addChild(this.particles.container);
		this.settle(DEFAULT_BOARD);
	}

	private drawTiles() {
		const g = this.tilesG;
		g.clear();
		for (let r = 0; r < REELS; r++) {
			for (let row = 0; row < ROWS; row++) {
				const x = r * C + 3;
				const y = row * C + 3;
				g.roundRect(x, y, C - 6, C - 6, 16).fill({ color: 0x061a2c, alpha: 0.55 });
				g.roundRect(x, y, C - 6, C - 6, 16).stroke({ color: COLORS.cyan, alpha: 0.08, width: 1.5 });
			}
		}
	}

	/** Place a full padded board (7 rows per reel) without animation. */
	settle(board: RawSymbol[][]) {
		for (const reel of this.cells) for (const s of reel) s.destroy();
		this.cells = board.map((reel, r) =>
			reel.map((raw, row) => {
				const s = new SymbolView(raw);
				s.root.x = cellX(r);
				s.root.y = cellY(row);
				this.symbolsLayer.addChild(s.root);
				return s;
			}),
		);
		this.clearWins();
	}

	update(dt: number) {
		// the off-board pad rows sit just outside the mask; their glow and squash used to peek a few px
		// past the frame rim. Only render symbols whose cell overlaps the visible board.
		const top = -C * 0.5 + 1;
		const bottom = BOARD_H + C * 0.5 - 1;
		for (const reel of this.cells)
			for (const s of reel) {
				s.update(dt);
				s.root.renderable = s.root.y > top && s.root.y < bottom;
			}
		this.particles.update(dt);
	}

	get turbo() {
		return this.hooks.turbo() || this.quick;
	}

	/** Called when the player hits SPIN, before the round arrives. */
	preSpin() {
		if (this.preSpinPromise) return this.preSpinPromise;
		this.spinning = true;
		this.clearWins();
		this.hooks.sfx('sfx_spin_start');
		const turbo = this.hooks.turbo();
		// a reel may take its new symbols once its old ones are ~half way out (fresh SymbolViews fall
		// in while the old ones are still leaving: no empty-board beat, which showed in free spins)
		this.reelReady = this.cells.map((_, r) => sleep((turbo ? 0 : r * 40) + (turbo ? 60 : 110), 'spin'));
		this.reelOut = this.cells.map(async (reel, r) => {
				if (!turbo) await sleep(r * 40);
				await Promise.all(
					reel.map(async (s, row) => {
						const fromY = s.root.y;
						// bottom symbols leave first, the column empties top-down in ~0.26 s
						const delay = turbo ? 0 : (PAD_ROWS - row) * 9;
						await anim.tween({ duration: turbo ? 130 : 190, delay, ease: ease.inQuad, group: 'spin' }, (t) => {
							s.root.y = fromY + t * (BOARD_H + C * 2);
							s.stretch = t * 0.25;
						});
						s.root.visible = false;
						s.stretch = 0;
					}),
				);
			});
		this.preSpinPromise = Promise.all(this.reelOut).then(() => {});
		return this.preSpinPromise;
	}

	stop() {
		if (!this.spinning) return;
		this.quick = true;
		anim.finish('spin');
	}

	async spin(reveal: RevealEvent) {
		this.spinning = true;
		this.preSpin();
		const out = this.reelOut;
		const ready = this.reelReady;
		this.preSpinPromise = null;
		const outgoing = this.cells.map((reel) => reel.slice());
		// old symbols are destroyed once they have left the board
		out.forEach((p, r) => p.then(() => outgoing[r].forEach((s) => s.destroy())));
		const parked = ready.map((p, r) =>
			p.then(() => {
				this.cells[r] = reveal.board[r].slice(0, PAD_ROWS).map((raw, row) => {
					const s = new SymbolView(raw);
					s.root.x = cellX(r);
					s.root.y = cellY(row) - BOARD_H - C * 1.5;
					s.root.visible = false;
					this.symbolsLayer.addChild(s.root);
					return s;
				});
			}),
		);
		const landed: Promise<void>[] = [];
		let anticipating = false;
		for (let r = 0; r < REELS; r++) {
			const anticipated = (reveal.anticipation?.[r] ?? 0) > 0 && !this.quick;
			if (anticipated) {
				await Promise.all(landed);
				if (!anticipating) this.hooks.sfx('sfx_anticipation_start');
				anticipating = true;
				await this.anticipate(r);
			} else if (r > 0 && !this.turbo) {
				await sleep(55, 'spin');
			}
			await parked[r];
			landed.push(this.dropReel(r, anticipated));
		}
		await Promise.all(landed);
		for (const g of this.columnGlows) g.alpha = 0;
		this.spinning = false;
		this.quick = false;
	}

	private async anticipate(r: number) {
		const g = this.columnGlows[r];
		this.hooks.sfx('sfx_anticipation');
		// tease: column glows, sparks rise, symbols of previous reels breathe
		const stopSparks = anim.onFrame(() => {
			if (Math.random() < 0.6)
				this.particles.spawn({
					texture: fx.spark(),
					x: cellX(r),
					y: BOARD_H,
					spreadX: C * 0.45,
					count: 1,
					angle: -Math.PI / 2,
					cone: 0.3,
					speed: [260, 520],
					life: [500, 900],
					size: [8, 18],
					tint: [COLORS.cyan, COLORS.white],
				});
		});
		// the column keeps spinning as a blurred stream of symbols that speeds up, then brakes just
		// before the real symbols land (an empty column with only a glow read as a dead pause)
		const stream = new PIXI.Container();
		this.symbolsLayer.addChild(stream);
		const names = ['H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4', 'L5', 'S'];
		const strip: PIXI.Sprite[] = [];
		const gap = C * 1.05;
		for (let i = 0; i < ROWS + 2; i++) {
			const sp = new PIXI.Sprite(tex(`sym_${names[(Math.random() * names.length) | 0]}`));
			sp.anchor.set(0.5);
			const k = (C * 0.86) / Math.max(sp.texture.width, sp.texture.height, 1);
			sp.scale.set(k);
			(sp as any).k = k;
			sp.x = cellX(r);
			sp.y = -C * 0.5 + i * gap - gap;
			stream.addChild(sp);
			strip.push(sp);
		}
		const total = strip.length * gap;
		let speed = 0.9; // board units per ms
		let lastT = 0;
		const dur = 1050;
		await anim.tween({ duration: dur, ease: ease.linear, group: 'spin' }, (t) => {
			const dms = (t - lastT) * dur;
			lastT = t;
			g.alpha = 0.35 + 0.35 * Math.sin(t * Math.PI * 6) ** 2;
			g.height = BOARD_H * (1.1 + 0.15 * Math.sin(t * Math.PI * 3));
			// accelerate for 75 % of the tease, then brake hard
			speed = t < 0.75 ? 0.9 + t * 1.6 : 2.1 * (1 - (t - 0.75) / 0.25) + 0.35;
			const blur = Math.min(1.6, speed * 0.55);
			for (const sp of strip) {
				sp.y += speed * dms;
				if (sp.y > BOARD_H + gap * 0.5) {
					sp.y -= total;
					sp.texture = tex(`sym_${names[(Math.random() * names.length) | 0]}`);
				}
				const k = (sp as any).k as number;
				sp.scale.set(k / Math.sqrt(blur), k * blur);
				sp.alpha = 0.35 + 0.25 * (1 - blur / 1.6);
			}
		});
		stopSparks();
		await anim.tween({ duration: 90, ease: ease.linear }, (t) => (stream.alpha = 1 - t));
		stream.destroy({ children: true });
	}

	private async dropReel(r: number, anticipated: boolean) {
		const reel = this.cells[r];
		const turbo = this.turbo;
		const promises = reel.map(async (s, row) => {
			const targetY = cellY(row);
			// the column falls in as one stack that starts right above the frame: the bottom symbol is
			// visible from the first frame (the old start, 6.5 cells up with a slow ease-in, left the board
			// empty for ~0.35 s and read as a loading pause)
			const startY = targetY - BOARD_H - C * 0.6;
			const delay = turbo ? 0 : (PAD_ROWS - 1 - row) * 14;
			const duration = turbo ? 150 : anticipated ? 260 : 300;
			s.root.y = startY;
			s.root.visible = true;
			await anim.tween({ duration, delay, ease: ease.inCubic, group: 'spin' }, (t) => {
				s.root.y = startY + (targetY - startY) * t;
				s.stretch = 0.18 * t;
			});
			s.stretch = 0;
			s.root.y = targetY;
			if (row >= 1 && row <= ROWS) {
				s.land(turbo ? 0.6 : 1);
				this.landDust(r, row, s);
				if (s.raw.name === 'S' || s.raw.name === 'M') this.hooks.onSpecialLand?.(s, r, row);
			}
		});
		await Promise.all(promises);
		this.columnGlows[r].alpha = 0;
		this.hooks.sfx('sfx_reel_stop', { volume: 0.7 });
		this.hooks.shake(r === REELS - 1 ? 3 : 1.2, 120);
		this.hooks.onReelStop?.(r);
	}

	private landDust(r: number, row: number, s: SymbolView) {
		if (this.hooks.reducedMotion()) return;
		this.particles.spawn({
			texture: fx.spark(),
			x: cellX(r),
			y: cellY(row) + C * 0.42,
			spreadX: C * 0.3,
			count: 3,
			angle: -Math.PI / 2,
			cone: Math.PI * 0.9,
			speed: [30, 90],
			life: [300, 600],
			size: [4, 9],
			tint: s.tint,
			alpha: 0.6,
		});
	}

	visible(fn: (s: SymbolView, reel: number, row: number) => void) {
		for (let r = 0; r < REELS; r++) for (let row = 1; row <= ROWS; row++) fn(this.cells[r][row], r, row);
	}

	/** Light the winning swarms, dim the rest, show each swarm's value. */
	async showWins(wins: WinEntry[]) {
		const win = new Set<string>();
		for (const w of wins) for (const p of w.positions) win.add(`${p.reel}:${p.row}`);
		this.visible((s, r, row) => s.setDim(!win.has(`${r}:${row}`)));
		const pops: Promise<void>[] = [];
		for (const w of wins) {
			for (const p of w.positions) {
				const s = this.cells[p.reel][p.row];
				pops.push(s.win());
				this.particles.spawn({
					texture: fx.spark(),
					x: cellX(p.reel),
					y: cellY(p.row),
					count: 4,
					speed: [60, 160],
					life: [400, 700],
					size: [6, 14],
					tint: [s.tint, COLORS.white],
				});
			}
			this.addLabel(w);
		}
		this.hooks.sfx('sfx_win_swarm');
		await Promise.all(pops);
		// short hold: the labels then fly into the win banner (Scene.updateTumbleWin), so the
		// highlight never sits frozen for a second and a half
		await sleep(this.turbo ? 160 : 360);
	}

	/** Swarm value labels fly into the win banner (target in topLayer coordinates). */
	async flyLabels(to: PIXI.Point, ms = 360) {
		const labels = this.labels;
		this.labels = [];
		await Promise.all(
			labels.map((c, i) => {
				const fx0 = c.x;
				const fy0 = c.y;
				// arc: rise a little first, then dive into the banner
				return anim
					.tween({ duration: ms, delay: i * 50, ease: ease.inCubic }, (t) => {
						c.x = fx0 + (to.x - fx0) * t;
						c.y = fy0 + (to.y - fy0) * t - Math.sin(t * Math.PI) * C * 0.6;
						c.scale.set(1 - 0.45 * t);
						c.alpha = t > 0.85 ? (1 - t) / 0.15 : 1;
					})
					.then(() => c.destroy({ children: true }));
			}),
		);
	}

	private addLabel(w: WinEntry) {
		const c = new PIXI.Container();
		const t = new GText({ text: this.hooks.formatWin(w.win), style: textStyle(30, { glow: COLORS.cyan }) });
		t.anchor.set(0.5);
		const bg = new PIXI.Sprite(fx.softGlow());
		bg.anchor.set(0.5);
		bg.tint = COLORS.abyss;
		bg.width = t.width + 60;
		bg.height = 80;
		bg.blendMode = 'normal';
		bg.alpha = 0.9;
		c.addChild(bg, t);
		c.x = cellX(w.meta.overlay.reel);
		c.y = cellY(w.meta.overlay.row);
		c.scale.set(0);
		this.topLayer.addChild(c);
		this.labels.push(c);
		anim.tween({ duration: 380, ease: ease.outBackBig }, (k) => c.scale.set(k));
	}

	clearWins() {
		for (const l of this.labels) l.destroy({ children: true });
		this.labels = [];
		for (const reel of this.cells) for (const s of reel) {
			s.setDim(false);
			s.clearHighlight();
		}
	}

	/** Winners burst into light, survivors fall, refills drop in from the dark. */
	async tumble(exploding: Position[], newSymbols: RawSymbol[][]) {
		const dead = new Set(exploding.map((p) => `${p.reel}:${p.row}`));
		this.hooks.sfx('sfx_explode');
		this.hooks.shake(2.5, 160);
		await Promise.all(
			exploding.map(async (p) => {
				const s = this.cells[p.reel][p.row];
				const style = EXPLODE_STYLE[s.raw.name] ?? 'pop';
				this.explodeFx(s, cellX(p.reel), cellY(p.row));
				await s.explode(style);
			}),
		);
		for (const l of this.labels) l.destroy({ children: true });
		this.labels = [];
		const turbo = this.turbo;
		const moves: Promise<void>[] = [];
		for (let r = 0; r < REELS; r++) {
			const reel = this.cells[r];
			const survivors = reel.filter((_, row) => !dead.has(`${r}:${row}`));
			const removed = reel.filter((_, row) => dead.has(`${r}:${row}`));
			const adds = (newSymbols[r] ?? []).map((raw) => {
				const s = removed.pop() ?? new SymbolView(raw);
				s.set(raw);
				if (!s.root.parent) this.symbolsLayer.addChild(s.root);
				return s;
			});
			for (const s of removed) s.destroy();
			adds.forEach((s, i) => {
				s.root.y = cellY(i - adds.length) - C * 0.5;
				s.root.visible = true;
			});
			const combined = [...adds, ...survivors];
			this.cells[r] = combined;
			combined.forEach((s, row) => {
				s.setDim(false);
				s.clearHighlight();
				const from = s.root.y;
				const to = cellY(row);
				if (Math.abs(to - from) < 1) return;
				const dist = (to - from) / C;
				const delay = turbo ? 0 : 60 + (PAD_ROWS - row) * 26 + r * 18;
				moves.push(
					anim
						.tween({ duration: (turbo ? 120 : 190) + dist * 30, delay, ease: ease.inQuad }, (t) => {
							s.root.y = from + (to - from) * t;
							s.stretch = 0.2 * t;
						})
						.then(() => {
							s.stretch = 0;
							if (row >= 1 && row <= ROWS) {
								s.land(0.8);
								if (s.raw.name === 'S' || s.raw.name === 'M') this.hooks.onSpecialLand?.(s, r, row);
							}
						}),
				);
			});
		}
		await Promise.all(moves);
		this.hooks.sfx('sfx_tumble_land', { volume: 0.6 });
	}

	/** Quarter textures of a symbol's art, cached per texture (shatter shards). */
	private shardCache = new Map<PIXI.Texture, PIXI.Texture[]>();
	private shards(t: PIXI.Texture) {
		let q = this.shardCache.get(t);
		if (q) return q;
		const f = t.frame;
		const w = f.width / 2;
		const h = f.height / 2;
		q = [0, 1, 2, 3].map((i) => new PIXI.Texture({ source: t.source, frame: new PIXI.Rectangle(f.x + (i % 2) * w, f.y + Math.floor(i / 2) * h, w, h) }));
		this.shardCache.set(t, q);
		return q;
	}

	/** The art breaks into four pieces that fly apart, spin and fall. */
	private shatter(s: SymbolView, x: number, y: number) {
		const reduced = this.hooks.reducedMotion();
		const parts = this.shards(s.artTexture);
		const k = s.baseScale;
		const fw = s.artTexture.frame.width * k;
		const fh = s.artTexture.frame.height * k;
		parts.forEach((tx, i) => {
			const sp = new PIXI.Sprite(tx);
			sp.anchor.set(0.5);
			sp.scale.set(k);
			const dx = (i % 2 ? 1 : -1) * fw * 0.25;
			const dy = (i < 2 ? -1 : 1) * fh * 0.25;
			sp.position.set(x + dx, y + dy);
			this.fxLayer.addChild(sp);
			const vx = (dx / (fw * 0.25)) * rand(110, 220) * (reduced ? 0.4 : 1);
			const vy = (dy / (fh * 0.25)) * rand(60, 140) - rand(140, 240);
			const spin = rand(-7, 7);
			anim.tween({ duration: 520, ease: ease.linear }, (t) => {
				const sec = t * 0.52;
				sp.x = x + dx + vx * sec;
				sp.y = y + dy + vy * sec + 900 * sec * sec;
				sp.rotation = spin * sec;
				sp.alpha = 1 - t * t;
				sp.scale.set(k * (1 - 0.35 * t));
			}).then(() => sp.destroy());
		});
	}

	/** Per-creature explosion particles (body motion lives in SymbolView.explode). */
	explodeFx(s: SymbolView, x: number, y: number) {
		const reduced = this.hooks.reducedMotion();
		const n = (v: number) => (reduced ? Math.ceil(v / 3) : v);
		const tint = s.tint;
		this.ring(x, y, tint, 0.9);
		switch (s.raw.name) {
			case 'H1': // nautilus: gold chips + spiralling sparks
				this.shatter(s, x, y);
				this.particles.spawn({ texture: fx.spark(), x, y, count: n(16), speed: [160, 360], drag: 0.06, spin: [-6, 6], life: [500, 900], size: [8, 18], endSizeRatio: 0.1, tint: [0xffd27a, 0xffb84a, 0xffffff] });
				break;
			case 'H2': // squid: ink cloud
				this.particles.spawn({ texture: fx.softGlow(), x, y: y + C * 0.1, spreadX: 14, spreadY: 14, count: n(7), speed: [20, 70], drag: 0.2, life: [700, 1100], size: [50, 90], endSizeRatio: 2.2, alpha: 0.85, blend: 'normal', tint: [0x14031f, 0x2a0a2e] });
				this.particles.spawn({ texture: fx.spark(), x, y, count: n(10), speed: [120, 300], drag: 0.08, life: [400, 700], size: [6, 14], tint: [0xff3b5c, 0xffffff] });
				break;
			case 'H3': // jelly: burst of bubbles rising
				this.particles.spawn({ texture: fx.bubble(), x, y, spreadX: 22, spreadY: 18, count: n(14), angle: -Math.PI / 2, cone: 1.6, speed: [60, 200], gravity: -120, life: [700, 1200], size: [8, 22], endSizeRatio: 0.9, alpha: 0.85, blend: 'normal', tint: [0xd9b8ff, 0xffffff] });
				this.particles.spawn({ texture: fx.glow(), x, y, count: 1, speed: 0, life: 380, size: C * 1.6, endSizeRatio: 1.6, alpha: 0.7, tint: 0xb07bff });
				break;
			case 'H4': // sea dragon: leafy fronds left behind
				this.particles.spawn({ texture: fx.streak(), x: x + C * 0.1, y, spreadX: 18, spreadY: 24, count: n(12), angle: 0.3, cone: 1.4, speed: [40, 140], gravity: 60, drag: 0.3, spin: [-4, 4], life: [700, 1100], size: [14, 26], endSizeRatio: 0.6, alpha: 0.9, tint: [0x2fe0b0, 0x7dffb0, 0x1ea37a] });
				break;
			case 'L1': // urchin: spikes shoot out radially
				this.particles.spawn({ texture: fx.streak(), x, y, count: n(18), speed: [320, 560], drag: 0.02, life: [260, 420], size: [10, 16], alignToVelocity: true, stretch: 2.6, endSizeRatio: 0.4, tint: [0xff4d8d, 0xffb3d0] });
				break;
			case 'L2': // star: green star sparks thrown by the spin
				this.particles.spawn({ texture: fx.spark(), x, y, count: n(14), speed: [180, 340], drag: 0.05, spin: [-8, 8], life: [450, 750], size: [8, 16], tint: [0x5dff8a, 0xe9fbff] });
				break;
			case 'L3': // scallop: shell pieces + a pearl of light
				this.shatter(s, x, y);
				this.particles.spawn({ texture: fx.bubble(), x, y, count: n(6), angle: -Math.PI / 2, cone: 1.2, speed: [50, 130], gravity: -80, life: [600, 1000], size: [10, 18], alpha: 0.8, blend: 'normal', tint: [0xbfe4ff, 0xffffff] });
				break;
			case 'L4': // vent crystal: orange shards falling with gravity
			case 'L5': // sea glass: purple glints
				this.shatter(s, x, y);
				this.particles.spawn({ texture: fx.streak(), x, y, count: n(12), speed: [180, 360], gravity: 700, life: [400, 700], size: [6, 11], alignToVelocity: true, stretch: 1.8, endSizeRatio: 0.5, tint: s.raw.name === 'L4' ? [0xffa040, 0xffe0a0] : [0xc77dff, 0xf0d8ff] });
				break;
			default:
				this.burst(x, y, tint);
		}
	}

	/** Landing impact: a Glow Orb thumps (double ring + sparks), an Abyss Pearl opens with rays of light. */
	specialImpact(reel: number, row: number, kind: 'orb' | 'pearl') {
		const x = cellX(reel);
		const y = cellY(row);
		const s = this.cells[reel]?.[row];
		const tint = s?.tint ?? COLORS.cyan;
		if (kind === 'orb') {
			this.ring(x, y, tint, 1.3);
			setTimeout(() => this.ring(x, y, 0xffffff, 0.9), 70);
			this.particles.spawn({ texture: fx.spark(), x, y, count: this.hooks.reducedMotion() ? 4 : 12, speed: [140, 320], drag: 0.08, life: [350, 650], size: [8, 16], tint: [tint, 0xffffff] });
			s?.pulse(1);
		} else {
			const rays = new PIXI.Sprite(fx.rays());
			rays.anchor.set(0.5);
			rays.blendMode = 'add';
			rays.tint = 0xbff9ff;
			rays.position.set(x, y);
			this.fxLayer.addChild(rays);
			anim.tween({ duration: 700, ease: ease.outCubic }, (t) => {
				rays.scale.set(((C * 2.4) / 512) * (0.3 + 0.7 * t));
				rays.rotation = t * 0.8;
				rays.alpha = Math.sin(t * Math.PI) * 0.9;
			}).then(() => rays.destroy());
			this.ring(x, y, 0xbff9ff, 1.4);
			s?.pulse(1);
		}
	}

	private ring(x: number, y: number, tint: number, size = 1) {
		const ring = new PIXI.Sprite(fx.ring());
		ring.anchor.set(0.5);
		ring.blendMode = 'add';
		ring.tint = tint;
		ring.position.set(x, y);
		this.fxLayer.addChild(ring);
		anim.tween({ duration: 400, ease: ease.outCubic }, (t) => {
			ring.scale.set((0.2 + t * 0.75) * (C / 140) * size);
			ring.alpha = 1 - t;
		}).then(() => ring.destroy());
	}

	burst(x: number, y: number, tint: number) {
		const reduced = this.hooks.reducedMotion();
		this.particles.spawn({
			texture: fx.spark(),
			x,
			y,
			count: reduced ? 4 : 12,
			speed: [120, 340],
			drag: 0.08,
			life: [380, 760],
			size: [8, 20],
			endSizeRatio: 0.1,
			tint: [tint, COLORS.white, tint],
		});
		this.particles.spawn({
			texture: fx.bubble(),
			x,
			y,
			spreadX: 20,
			spreadY: 20,
			count: reduced ? 1 : 4,
			angle: -Math.PI / 2,
			cone: 1.2,
			speed: [40, 110],
			life: [700, 1200],
			size: [10, 22],
			endSizeRatio: 0.8,
			alpha: 0.7,
			blend: 'normal',
		});
		const ring = new PIXI.Sprite(fx.ring());
		ring.anchor.set(0.5);
		ring.blendMode = 'add';
		ring.tint = tint;
		ring.x = x;
		ring.y = y;
		this.fxLayer.addChild(ring);
		anim.tween({ duration: 420, ease: ease.outCubic }, (t) => {
			ring.scale.set((0.2 + t * 0.75) * (C / 140));
			ring.alpha = 1 - t;
		}).then(() => ring.destroy());
	}

	/** Board-local centre of a padded cell. */
	cellCenter(p: Position) {
		return { x: cellX(p.reel), y: cellY(p.row) };
	}

	symbolAt(p: Position) {
		return this.cells[p.reel]?.[p.row];
	}

	columnFlash(r: number, tint = COLORS.cyan) {
		const g = this.columnGlows[r];
		g.tint = tint;
		anim.tween({ duration: 700, ease: ease.outCubic }, (t) => (g.alpha = 0.9 * (1 - t))).then(() => (g.tint = COLORS.cyan));
	}

	randomSparkle() {
		const r = Math.floor(rand(0, REELS));
		const row = 1 + Math.floor(rand(0, ROWS));
		const s = this.cells[r][row];
		this.particles.spawn({ texture: fx.spark(), x: cellX(r) + rand(-30, 30), y: cellY(row) + rand(-30, 30), count: 1, speed: [5, 20], life: [500, 900], size: [6, 12], tint: s.tint, alpha: 0.8 });
	}
}
