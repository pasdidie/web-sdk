import * as PIXI from 'pixi.js';
import { GText } from './theme';

import { anim, ease, sleep, rand } from './anim';
import { ParticleSystem } from './particles';
import { SymbolView, EXPLODE_STYLE, type RawSymbol } from './SymbolView';
import { C, REELS, ROWS, BOARD_W, BOARD_H, COLORS, SYMBOL_STYLE, textStyle } from './theme';
import { fx, tex, motionBlurTex } from './textures';

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
/** reel top speed, board units per ms (~29 cells / s) */
const VMAX = 2.9;
/** wind-up (nudge up) and launch acceleration, ms */
const WINDUP = 90;
const ACC = 170;
/** strip sprites per reel; the strip wraps from below the board back to its top */
const SLOTS = 10;
const STRIP_BOTTOM = BOARD_H + C * 1.5;
/** symbols that flash by on the spinning strip (lows more often, a rare scatter) */
const STRIP_NAMES = ['H1', 'H2', 'H3', 'H4', 'L1', 'L1', 'L2', 'L2', 'L3', 'L3', 'L4', 'L4', 'L5', 'L5', 'S'];

type Slot = { crisp: PIXI.Sprite; blur: PIXI.Sprite; y: number; live: boolean };
type StopPlan = {
	kind: 'pow' | 'hermite';
	t: number;
	cruise: number;
	T: number;
	n: number;
	v0: number;
	S: number;
	start: number;
	curveStart: number;
	D: number;
	over: number;
	settle: number;
	hit: boolean;
	antic: boolean;
	mode: 'normal' | 'quick' | 'antic';
	resolve: () => void;
};
/** One reel's motion: everything on it sits at (its own y0) + pos. */
type Reel = {
	phase: 'idle' | 'windup' | 'launch' | 'run' | 'stop';
	t: number;
	delay: number;
	pos: number;
	vel: number;
	slots: Slot[];
	outgoing: { s: SymbolView; y0: number }[];
	incoming: SymbolView[];
	incomingY0: number[];
	plan: StopPlan | null;
};
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
	private reels: Reel[] = [];
	private spinStartAt = 0;
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
		const strip = new PIXI.Container();
		this.symbolsLayer.addChild(strip);
		for (let r = 0; r < REELS; r++) {
			const slots: Slot[] = [];
			for (let i = 0; i < SLOTS; i++) {
				const crisp = new PIXI.Sprite();
				const blur = new PIXI.Sprite();
				for (const sp of [crisp, blur]) {
					sp.anchor.set(0.5);
					sp.x = cellX(r);
					sp.visible = false;
					strip.addChild(sp);
				}
				slots.push({ crisp, blur, y: 0, live: false });
			}
			this.reels.push({ phase: 'idle', t: 0, delay: 0, pos: 0, vel: 0, slots, outgoing: [], incoming: [], incomingY0: [], plan: null });
		}
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
		this.resetReels();
		for (const reel of this.cells) for (const s of reel) if (!s.root.destroyed) s.destroy();
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
		this.stepReels(dt);
		// the off-board pad rows sit just outside the mask; their glow and squash used to peek a few px
		// past the frame rim. Only render symbols whose cell overlaps the visible board.
		const top = -C * 0.5 + 1;
		const bottom = BOARD_H + C * 0.5 - 1;
		for (const reel of this.cells)
			for (const s of reel) {
				// during a spin the old column is still listed here until its stop begins, and its
				// symbols are destroyed as they leave the board
				if (s.root.destroyed) continue;
				s.update(dt);
				s.root.renderable = s.root.y > top && s.root.y < bottom;
			}
		this.particles.update(dt);
	}

	get turbo() {
		return this.hooks.turbo() || this.quick;
	}

	/** Called when the player hits SPIN, before the round arrives: wind-up, then every reel launches. */
	preSpin() {
		if (this.preSpinPromise) return this.preSpinPromise;
		this.spinning = true;
		this.clearWins();
		this.hooks.sfx('sfx_spin_start');
		const turbo = this.hooks.turbo();
		this.spinStartAt = anim.now;
		this.reels.forEach((m, r) => {
			if (m.phase !== 'idle') return;
			m.phase = 'windup';
			m.t = 0;
			m.delay = r * (turbo ? 15 : 40);
			m.pos = 0;
			m.vel = 0;
			m.outgoing = this.cells[r].map((s) => ({ s, y0: s.root.y }));
			m.incoming = [];
			m.plan = null;
			// the strip continues the column upward, on the same cell grid
			m.slots.forEach((sl, i) => {
				sl.y = cellY(0) - C * (i + 1);
				sl.live = true;
				this.dressSlot(sl);
			});
		});
		this.preSpinPromise = sleep(WINDUP + ACC + REELS * 40);
		return this.preSpinPromise;
	}

	/** Slam stop: every reel still spinning brakes now, together. */
	stop() {
		if (!this.spinning) return;
		this.quick = true;
		anim.finish('spin');
		for (const m of this.reels) if (m.plan && !m.plan.hit) this.replanQuick(m);
	}

	async spin(reveal: RevealEvent) {
		this.spinning = true;
		this.preSpin();
		this.preSpinPromise = null;
		const minMs = this.turbo ? 150 : 450;
		const elapsed = anim.now - this.spinStartAt;
		if (!this.quick && elapsed < minMs) await sleep(minMs - elapsed, 'spin');
		const landed: Promise<void>[] = [];
		let anticipating = false;
		for (let r = 0; r < REELS; r++) {
			const anticipated = (reveal.anticipation?.[r] ?? 0) > 0;
			if (anticipated && !this.quick) {
				// the previous reels settle first, then this one keeps spinning and crawls in
				await Promise.all(landed);
			}
			if (anticipated && !this.quick) {
				if (!anticipating) this.hooks.sfx('sfx_anticipation_start');
				anticipating = true;
				this.hooks.sfx('sfx_anticipation');
				const p = this.stopReel(r, reveal.board[r], 'antic');
				landed.push(p);
				await p;
			} else {
				if (r > 0 && !this.quick) await sleep(this.turbo ? 60 : 125, 'spin');
				landed.push(this.stopReel(r, reveal.board[r], this.quick ? 'quick' : 'normal'));
			}
		}
		await Promise.all(landed);
		for (const g of this.columnGlows) g.alpha = 0;
		this.spinning = false;
		this.quick = false;
	}

	/** Random symbol art for a strip slot (crisp + blurred copy, same footprint). */
	private dressSlot(sl: Slot) {
		const name = STRIP_NAMES[(Math.random() * STRIP_NAMES.length) | 0];
		const t = tex(`sym_${name}`);
		const k = (C * (SYMBOL_STYLE[name]?.scale ?? 0.92)) / Math.max(t.width, t.height, 1);
		sl.crisp.texture = t;
		sl.crisp.scale.set(k);
		const mb = motionBlurTex(t);
		sl.blur.texture = mb.tex;
		sl.blur.scale.set(k * mb.k);
	}

	/**
	 * Start braking reel r onto its final column. The final symbols are stacked right above the
	 * strip, on its cell grid, and ride the reel at its current speed (no speed jump), then a
	 * deceleration curve brings them past the rest position by `over` and a damped spring settles.
	 */
	private stopReel(r: number, column: RawSymbol[], mode: 'normal' | 'quick' | 'antic'): Promise<void> {
		const m = this.reels[r];
		if (m.phase === 'idle' || m.phase === 'stop') return Promise.resolve();
		let v0 = Math.max(m.vel, VMAX * 0.6);
		if (mode === 'quick') v0 = Math.max(m.vel, VMAX * 2.2);
		const last = r === REELS - 1;
		const over = C * (mode === 'quick' ? 0.09 : mode === 'antic' ? 0.1 : last ? 0.16 : 0.13);
		const n = mode === 'antic' ? 4 : 2;
		// chain geometry: where the stack may start (grid-aligned, fully hidden, above the old symbols)
		let chainTop = Infinity;
		let minOld = Infinity;
		for (const sl of m.slots) if (sl.live) chainTop = Math.min(chainTop, sl.y);
		for (const o of m.outgoing) minOld = Math.min(minOld, o.y0 + m.pos);
		chainTop = Math.min(chainTop, minOld);
		const ref = m.slots[0].y;
		const delta = (((cellY(PAD_ROWS - 1) - ref) % C) + C) % C;
		const dMin = Math.max(cellY(PAD_ROWS - 1) + C * 0.5 + 8, minOld === Infinity ? 0 : cellY(PAD_ROWS - 1) - minOld + C);
		const dMax = cellY(PAD_ROWS - 1) + C - chainTop;
		const kMin = Math.ceil((dMin - delta) / C - 1e-6);
		const kMax = Math.floor((dMax - delta) / C + 1e-6);
		let k = kMin;
		if (mode === 'antic') {
			const want = (v0 * (this.turbo ? 650 : 900)) / n - over;
			k = Math.max(kMin, Math.min(kMax, Math.round((want - delta) / C)));
		}
		let cruise = 0;
		let T = 0;
		let curveS = 0;
		if (mode === 'antic') {
			curveS = delta + k * C + over;
			T = (n * curveS) / v0;
		} else {
			// fixed time from the stop call to the hit, so reels land on an even beat: the grid
			// alignment (up to one cell of extra distance) is absorbed by the braking length.
			// cruise at v0 for (total - T), then constant deceleration over T: S = v0 * (total - T / 2)
			const total = mode === 'quick' ? 150 : this.turbo ? 330 : 380;
			const want = mode === 'quick' ? 100 : this.turbo ? 200 : 260;
			let best = -1;
			let bestT = 0;
			for (let kk = k; kk < k + 8; kk++) {
				const tt = 2 * (total - (delta + kk * C + over) / v0);
				if (tt <= 40 || tt > total) continue;
				if (best < 0 || Math.abs(tt - want) < Math.abs(bestT - want)) {
					best = kk;
					bestT = tt;
				}
			}
			if (best >= 0 && best <= Math.max(kMin, kMax)) {
				k = best;
				T = bestT;
				cruise = total - T;
				curveS = (v0 * T) / n;
			} else {
				// too close or too far for the fixed beat: cruise then brake over the wanted time
				const S0 = delta + k * C + over;
				const sDec = (v0 * want) / n;
				if (S0 > sDec) {
					cruise = (S0 - sDec) / v0;
					curveS = sDec;
					T = want;
				} else {
					curveS = S0;
					T = (n * S0) / v0;
				}
			}
		}
		const D = delta + k * C;
		// hide strip slots the stack replaces; the ones below keep flowing out of the board
		const stackBottom = cellY(PAD_ROWS - 1) - D;
		for (const sl of m.slots) if (sl.y < stackBottom + C * 0.5) sl.live = false;
		m.incoming = column.slice(0, PAD_ROWS).map((raw, row) => {
			const s = new SymbolView(raw);
			s.root.x = cellX(r);
			s.root.y = cellY(row) - D;
			this.symbolsLayer.addChild(s.root);
			return s;
		});
		m.incomingY0 = m.incoming.map((_, row) => cellY(row) - D - m.pos);
		this.cells[r] = m.incoming;
		m.phase = 'stop';
		return new Promise<void>((resolve) => {
			m.plan = { kind: 'pow', t: 0, cruise, T, n, v0, S: curveS, start: m.pos, curveStart: m.pos + v0 * cruise, D, over, settle: mode === 'quick' ? 120 : 190, hit: false, antic: mode === 'antic', mode, resolve };
		});
	}

	/** Slam during a braking reel: re-plan to the same rest position with a short Hermite curve. */
	private replanQuick(m: Reel) {
		const p = m.plan!;
		const target = p.start + p.D + p.over;
		const S = Math.max(1, target - m.pos);
		const v = Math.max(0, m.vel);
		const T = Math.max(60, Math.min(130, v > 0 ? (2.5 * S) / v : 130));
		Object.assign(p, { kind: 'hermite', t: 0, cruise: 0, T, v0: v, S, curveStart: m.pos, antic: false, mode: 'quick', settle: 120 });
	}

	/** Move a reel to scroll position p (everything on it rides along). */
	private setPos(m: Reel, p: number, wrap: boolean) {
		const d = p - m.pos;
		m.pos = p;
		for (const sl of m.slots) {
			if (!sl.live) continue;
			sl.y += d;
			if (wrap && sl.y > STRIP_BOTTOM) {
				sl.y -= SLOTS * C;
				this.dressSlot(sl);
			}
		}
	}

	private stepReels(dtRaw: number) {
		const dt = Math.min(dtRaw, 50) * anim.speed;
		if (dt <= 0) return;
		for (let r = 0; r < REELS; r++) {
			const m = this.reels[r];
			if (m.phase === 'idle') continue;
			const before = m.pos;
			m.t += dt;
			if (m.phase === 'windup') {
				const u = (m.t - m.delay) / (this.turbo ? WINDUP * 0.6 : WINDUP);
				if (u >= 1) {
					m.phase = 'launch';
					m.t = 0;
					this.setPos(m, -C * 0.15, true);
				} else if (u > 0) this.setPos(m, -C * 0.15 * ease.outQuad(u), true);
			} else if (m.phase === 'launch') {
				const acc = this.turbo ? ACC * 0.65 : ACC;
				const v = VMAX * Math.min(1, m.t / acc) ** 2;
				this.setPos(m, m.pos + v * dt, true);
				if (m.t >= acc) m.phase = 'run';
			} else if (m.phase === 'run') {
				this.setPos(m, m.pos + VMAX * dt, true);
			} else if (m.phase === 'stop') {
				this.stepStop(r, m, dt);
				if (m.phase !== 'stop') continue;
			}
			m.vel = (m.pos - before) / dt;
			this.dressReel(r, m, dt);
		}
	}

	private stepStop(r: number, m: Reel, dt: number) {
		const p = m.plan!;
		p.t += dt;
		if (!p.hit) {
			let pos: number;
			if (p.t < p.cruise) pos = p.start + p.v0 * p.t;
			else {
				const u = Math.min(1, (p.t - p.cruise) / p.T);
				if (p.kind === 'pow') pos = p.curveStart + p.S * (1 - (1 - u) ** p.n);
				else {
					const h10 = u * u * u - 2 * u * u + u;
					const h01 = -2 * u * u * u + 3 * u * u;
					pos = p.curveStart + h10 * p.T * p.v0 + h01 * p.S;
				}
				if (u >= 1) {
					p.hit = true;
					p.t = 0;
					this.setPos(m, p.start + p.D + p.over, false);
					this.landReel(r, m);
					return;
				}
			}
			this.setPos(m, pos, false);
		} else {
			// damped spring back from the overshoot: up, a hair under, rest
			const u = Math.min(1, p.t / p.settle);
			const off = p.over * Math.cos(u * Math.PI * 1.5) * (1 - u) ** 1.5;
			this.setPos(m, p.start + p.D + off, false);
			if (u >= 1) this.finishReel(r, m);
		}
	}

	/** Per-frame look of a moving reel: blur from speed, strip culling, column streak, tease fx. */
	private dressReel(r: number, m: Reel, dt: number) {
		const speed = Math.abs(m.vel);
		const b = Math.min(1, Math.max(0, (speed - VMAX * 0.3) / (VMAX * 0.45)));
		const top = -C * 0.5;
		const bottom = BOARD_H + C * 0.5;
		for (const sl of m.slots) {
			const on = sl.live && sl.y > top && sl.y < bottom;
			sl.crisp.visible = on && b < 0.99;
			sl.blur.visible = on && b > 0.01;
			if (!on) continue;
			sl.crisp.y = sl.blur.y = sl.y;
			sl.crisp.alpha = 1 - b;
			sl.blur.alpha = b;
		}
		for (let i = m.outgoing.length - 1; i >= 0; i--) {
			const o = m.outgoing[i];
			const y = o.y0 + m.pos;
			if (y > bottom + C * 0.6) {
				o.s.destroy();
				m.outgoing.splice(i, 1);
				continue;
			}
			o.s.root.y = y;
			o.s.motionBlur = b;
			o.s.stretch = 0.08 * b;
			// still listed in cells (and updated there) until this reel's stop starts
			if (this.cells[r] === m.incoming) o.s.update(dt);
		}
		for (let row = 0; row < m.incoming.length; row++) {
			const s = m.incoming[row];
			s.root.y = m.incomingY0[row] + m.pos;
			s.motionBlur = b;
			s.stretch = 0.08 * b;
		}
		const g = this.columnGlows[r];
		const p = m.plan;
		if (p && p.antic && !p.hit) {
			const k = p.t / Math.max(1, p.cruise + p.T);
			g.alpha = 0.35 + 0.35 * Math.sin(k * Math.PI * 7) ** 2;
			g.height = BOARD_H * (1.1 + 0.15 * Math.sin(k * Math.PI * 3));
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
		} else g.alpha = 0.1 * b;
	}

	/** The reel hits its rest line (at the bottom of the overshoot): thump, squash, dust, specials. */
	private landReel(r: number, m: Reel) {
		const p = m.plan!;
		const quick = p.mode === 'quick';
		const last = r === REELS - 1;
		const reduced = this.hooks.reducedMotion();
		for (const sl of m.slots) {
			sl.live = false;
			sl.crisp.visible = sl.blur.visible = false;
		}
		for (const o of m.outgoing) o.s.destroy();
		m.outgoing = [];
		m.vel = 0;
		const strength = quick ? 0.6 : last ? 1.15 : 1;
		m.incoming.forEach((s, row) => {
			s.motionBlur = 0;
			s.stretch = 0;
			s.root.y = m.incomingY0[row] + m.pos;
			if (row >= 1 && row <= ROWS) {
				s.land(strength);
				this.landDust(r, row, s);
				if (s.raw.name === 'S' || s.raw.name === 'M') this.hooks.onSpecialLand?.(s, r, row);
			}
		});
		this.columnGlows[r].alpha = 0;
		this.hooks.sfx('sfx_reel_stop', { volume: quick ? 0.45 : last ? 0.9 : 0.7 });
		const shake = (last ? 3 : 1.2) * (quick ? 0.6 : 1) * (reduced ? 0.4 : 1);
		this.hooks.shake(shake, last ? 150 : 110);
		this.hooks.onReelStop?.(r);
	}

	private finishReel(r: number, m: Reel) {
		m.incoming.forEach((s, row) => (s.root.y = cellY(row)));
		const p = m.plan!;
		m.phase = 'idle';
		m.plan = null;
		m.incoming = [];
		m.incomingY0 = [];
		m.pos = 0;
		p.resolve();
	}

	/** Drop every running reel motion (settle / replay jumps). */
	private resetReels() {
		for (const m of this.reels) {
			for (const o of m.outgoing) o.s.destroy();
			m.outgoing = [];
			for (const sl of m.slots) {
				sl.live = false;
				sl.crisp.visible = sl.blur.visible = false;
			}
			const p = m.plan;
			m.phase = 'idle';
			m.plan = null;
			m.incoming = [];
			m.incomingY0 = [];
			m.pos = 0;
			m.vel = 0;
			p?.resolve();
		}
		this.columnGlows.forEach((g) => (g.alpha = 0));
		this.preSpinPromise = null;
		this.quick = false;
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
