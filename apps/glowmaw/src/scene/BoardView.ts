import * as PIXI from 'pixi.js';

import { anim, ease, sleep, rand } from './anim';
import { ParticleSystem } from './particles';
import { SymbolView, type RawSymbol } from './SymbolView';
import { C, REELS, ROWS, BOARD_W, BOARD_H, COLORS, textStyle } from './theme';
import { fx } from './textures';

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
		for (const reel of this.cells) for (const s of reel) s.update(dt);
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
		this.preSpinPromise = Promise.all(
			this.cells.map(async (reel, r) => {
				if (!turbo) await sleep(r * 45);
				await Promise.all(
					reel.map(async (s, row) => {
						const fromY = s.root.y;
						const delay = turbo ? 0 : (PAD_ROWS - row) * 16;
						await anim.tween({ duration: turbo ? 140 : 230, delay, ease: ease.inQuad, group: 'spin' }, (t) => {
							s.root.y = fromY + t * (BOARD_H + C * 2);
							s.stretch = t * 0.25;
						});
						s.root.visible = false;
						s.stretch = 0;
					}),
				);
			}),
		).then(() => {});
		return this.preSpinPromise;
	}

	stop() {
		if (!this.spinning) return;
		this.quick = true;
		anim.finish('spin');
	}

	async spin(reveal: RevealEvent) {
		this.spinning = true;
		await this.preSpin();
		this.preSpinPromise = null;
		// new symbols, parked above the board
		for (let r = 0; r < REELS; r++) {
			for (let row = 0; row < PAD_ROWS; row++) {
				const s = this.cells[r][row];
				s.set(reveal.board[r][row]);
				s.root.visible = false;
				s.root.y = cellY(row) - BOARD_H - C * 1.5;
			}
		}
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
				await sleep(85, 'spin');
			}
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
		await anim.tween({ duration: 1150, ease: ease.linear, group: 'spin' }, (t) => {
			g.alpha = 0.35 + 0.35 * Math.sin(t * Math.PI * 6) ** 2;
			g.height = BOARD_H * (1.1 + 0.15 * Math.sin(t * Math.PI * 3));
		});
		stopSparks();
	}

	private async dropReel(r: number, anticipated: boolean) {
		const reel = this.cells[r];
		const turbo = this.turbo;
		const promises = reel.map(async (s, row) => {
			const targetY = cellY(row);
			const startY = targetY - BOARD_H - C * 1.5;
			const delay = turbo ? 0 : (PAD_ROWS - 1 - row) * 32;
			const duration = turbo ? 150 : anticipated ? 300 : 340;
			s.root.y = startY;
			s.root.visible = true;
			await anim.tween({ duration, delay, ease: ease.inQuad, group: 'spin' }, (t) => {
				s.root.y = startY + (targetY - startY) * t;
				s.stretch = 0.22 * t;
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
		await sleep(this.turbo ? 260 : 620);
	}

	private addLabel(w: WinEntry) {
		const c = new PIXI.Container();
		const t = new PIXI.Text({ text: this.hooks.formatWin(w.win), style: textStyle(30, { glow: COLORS.cyan }) });
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
				this.burst(cellX(p.reel), cellY(p.row), s.tint);
				await s.explode();
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
