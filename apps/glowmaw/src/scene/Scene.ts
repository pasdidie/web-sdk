import * as PIXI from 'pixi.js';

import { anim, ease, sleep, rand } from './anim';
import { Background } from './Background';
import { BoardView, cellX, cellY, type Position, type WinEntry, type RevealEvent } from './BoardView';
import { Mascot } from './Mascot';
import { WinBanner, LureMeter, FsCounter, MaxWinPlaque, BigWin, FsPanel, Transition, makeText } from './Overlays';
import { Plaque } from './Plaque';
import { ParticleSystem } from './particles';
import { BOARD_W, BOARD_H, C, COLORS } from './theme';
import { fx, tex, hasArt, setLoadedAssets } from './textures';
import type { RawSymbol } from './SymbolView';

export type LayoutType = 'desktop' | 'landscape' | 'portrait' | 'tablet';

export type SceneHooks = {
	sfx: (name: string, opts?: { volume?: number }) => void;
	music: (name: 'bgm_main' | 'bgm_freespin' | 'bgm_bigwin') => void;
	formatAmount: (bookAmount: number) => string; // book amount (x100 of bet) -> currency text
	formatCurrency: (v: number) => string;
	bookToCurrency: (bookAmount: number) => number;
	turbo: () => boolean;
	reducedMotion: () => boolean;
	autoplay: () => boolean;
	maxWin: number;
	wincapX: number;
};

const STAGE: Record<LayoutType, { w: number; h: number }> = {
	desktop: { w: 1600, h: 900 },
	landscape: { w: 1600, h: 900 },
	portrait: { w: 900, h: 1600 },
	tablet: { w: 1200, h: 1200 },
};

export const layoutTypeFor = (w: number, h: number): LayoutType => {
	const r = w / Math.max(1, h);
	if (r >= 1.3) return Math.min(w, h) <= 480 ? 'landscape' : 'desktop';
	if (r <= 0.8) return 'portrait';
	return 'tablet';
};

export type Placement = {
	board: { x: number; y: number; s: number };
	mascot: { x: number; y: number; h: number };
	logo: { x: number; y: number; s: number };
	banner: { x: number; y: number; s: number };
	lure: { x: number; y: number; s: number };
	fsCounter: { x: number; y: number; s: number };
	maxWin: { x: number; y: number; s: number } | null;
};

const PLACEMENT: Record<LayoutType, Placement> = {
	desktop: {
		board: { x: 665, y: 392, s: 1.1 },
		mascot: { x: 1272, y: 400, h: 340 },
		logo: { x: 150, y: 86, s: 0.74 },
		banner: { x: 665, y: 722, s: 1 },
		lure: { x: 1250, y: 165, s: 1 },
		fsCounter: { x: 172, y: 300, s: 1 },
		maxWin: { x: 172, y: 300, s: 1 },
	},
	landscape: {
		board: { x: 680, y: 372, s: 1.06 },
		mascot: { x: 1272, y: 360, h: 330 },
		logo: { x: 150, y: 82, s: 0.74 },
		banner: { x: 680, y: 700, s: 1.05 },
		lure: { x: 1250, y: 150, s: 1 },
		fsCounter: { x: 172, y: 290, s: 1.1 },
		maxWin: { x: 172, y: 300, s: 1.05 },
	},
	portrait: {
		board: { x: 450, y: 765, s: 1.3 },
		mascot: { x: 505, y: 278, h: 320 },
		logo: { x: 450, y: 72, s: 0.85 },
		banner: { x: 450, y: 1132, s: 1.05 },
		lure: { x: 118, y: 268, s: 0.8 },
		fsCounter: { x: 770, y: 150, s: 0.85 },
		maxWin: { x: 128, y: 262, s: 0.72 },
	},
	tablet: {
		board: { x: 600, y: 548, s: 1.15 },
		mascot: { x: 935, y: 112, h: 185 },
		logo: { x: 205, y: 70, s: 0.68 },
		banner: { x: 600, y: 912, s: 0.95 },
		lure: { x: 560, y: 92, s: 0.62 },
		fsCounter: { x: 205, y: 172, s: 0.8 },
		maxWin: { x: 560, y: 92, s: 0.6 },
	},

};

export class Scene {
	readonly root = new PIXI.Container();
	readonly stage = new PIXI.Container(); // design-space content
	readonly bg = new Background();
	readonly frameLayer = new PIXI.Container();
	readonly boardWrap = new PIXI.Container();
	readonly board: BoardView;
	readonly mascot = new Mascot();
	readonly logo = new PIXI.Sprite();
	private logoFallback = makeText('GLOWMAW', 64, { aqua: true, glow: COLORS.cyan });
	readonly banner: WinBanner;
	readonly lure = new LureMeter();
	readonly fsCounter = new FsCounter();
	readonly maxWin: MaxWinPlaque;
	readonly flyLayer = new PIXI.Container();
	private flyFx = new ParticleSystem(200);
	readonly uiLayer = new PIXI.Container(); // UI bar lives here (added by the app)
	readonly bigWin: BigWin;
	readonly fsPanel: FsPanel;
	readonly transition = new Transition();
	private frame = new PIXI.Container();
	private frameArt = new PIXI.Sprite();
	private frameFallback = new Plaque(COLORS.cyan, '__none__');
	private orbSumText = makeText('', 90, { gold: true, glow: COLORS.amber });
	private flashG = new PIXI.Graphics();
	layoutType: LayoutType = 'desktop';
	place: Placement = PLACEMENT.desktop;
	k = 1;
	screenW = 1;
	screenH = 1;
	private shakeAmt = 0;
	private shakeT = 0;
	private idleT = 0;
	inFreeSpins = false;
	private fsTotal = 0;
	private fsCurrent = 0;
	private lastSpinWin = 0;
	private deadStreak = 0;
	private superMode = false;

	constructor(private hooks: SceneHooks) {
		this.board = new BoardView({
			sfx: hooks.sfx,
			shake: (a, ms) => this.shake(a, ms),
			formatWin: (v) => hooks.formatAmount(v),
			turbo: hooks.turbo,
			reducedMotion: hooks.reducedMotion,
			onSpecialLand: (s, r) => this.onSpecialLand(s.raw, r),
		});
		this.banner = new WinBanner(hooks.formatCurrency, hooks.sfx);
		this.maxWin = new MaxWinPlaque(hooks.maxWin);
		this.bigWin = new BigWin(hooks.formatCurrency, {
			sfx: hooks.sfx,
			shake: (a, ms) => this.shake(a, ms),
			onTier: (i) => {
				this.mascot.roar(600);
				this.bg.erupt(1 + i * 0.5);
			},
			flash: (c) => this.flash(c, 0.35),
		});
		this.fsPanel = new FsPanel(hooks.formatCurrency);
		this.logo.anchor.set(0.5);
		this.frameArt.anchor.set(0.5);
		this.frame.addChild(this.frameFallback, this.frameArt);
		this.boardWrap.addChild(this.board.root);
		this.frameLayer.addChild(this.frame);
		this.stage.addChild(this.frameLayer, this.mascot.root, this.boardWrap, this.logoFallback, this.logo, this.maxWin.root, this.lure.root, this.fsCounter.root, this.banner.root, this.uiLayer);
		this.orbSumText.alpha = 0;
		this.flyLayer.addChild(this.flyFx.container, this.orbSumText);
		this.root.addChild(this.bg.root, this.stage, this.flyLayer, this.bigWin.root, this.fsPanel.root, this.transition.root, this.flashG);
		this.flashG.alpha = 0;
		this.flashG.blendMode = 'add';
	}

	setAssets(assets: Record<string, unknown> | undefined) {
		setLoadedAssets(assets);
		this.bg.refreshArt();
		this.mascot.refreshArt();
		this.banner.refreshArt();
		this.fsCounter.refreshArt();
		this.maxWin.refreshArt();
		this.bigWin.refreshArt();
		this.fsPanel.refreshArt();
		this.lure.refreshArt();
		this.logo.texture = hasArt('logo') ? tex('logo') : PIXI.Texture.EMPTY;
		this.logoFallback.visible = !hasArt('logo');
		this.frameArt.texture = hasArt('frame') ? tex('frame') : PIXI.Texture.EMPTY;
		this.frameFallback.visible = !hasArt('frame');
		this.board.settle(this.board.cells.map((r) => r.map((s) => s.raw)));
		this.resize(this.screenW, this.screenH, true);
	}

	resize(w: number, h: number, force = false) {
		if (!force && w === this.screenW && h === this.screenH) return;
		this.screenW = w;
		this.screenH = h;
		this.layoutType = layoutTypeFor(w, h);
		const st = STAGE[this.layoutType];
		this.k = Math.min(w / st.w, h / st.h);
		this.stage.scale.set(this.k);
		this.stage.position.set((w - st.w * this.k) / 2, (h - st.h * this.k) / 2);
		this.bg.resize(w, h);
		const p = (this.place = PLACEMENT[this.layoutType]);
		this.board.root.pivot.set(BOARD_W / 2, BOARD_H / 2);
		this.boardWrap.position.set(p.board.x, p.board.y);
		this.boardWrap.scale.set(p.board.s);
		this.frame.position.set(p.board.x, p.board.y);
		if (this.frameArt.texture !== PIXI.Texture.EMPTY) {
			// align the art's transparent opening (measured from frame.png) on the board, plus a small gap
			const f = FRAME_FIT;
			const bw = BOARD_W * p.board.s + f.pad * 2;
			const bh = BOARD_H * p.board.s + f.pad * 2;
			const sx = bw / f.holeW;
			const sy = bh / f.holeH;
			this.frameArt.anchor.set(0, 0);
			this.frameArt.scale.set(sx, sy);
			this.frameArt.position.set(-bw / 2 - f.holeX * sx, -bh / 2 - f.holeY * sy);
		}
		this.frameFallback.resize(BOARD_W * p.board.s + 34, BOARD_H * p.board.s + 34);
		this.mascot.root.position.set(p.mascot.x, p.mascot.y);
		this.mascot.setHeight(p.mascot.h);
		const logoTex = this.logo.texture;
		if (logoTex !== PIXI.Texture.EMPTY) this.logo.scale.set((300 * p.logo.s) / logoTex.width);
		this.logo.position.set(p.logo.x, p.logo.y);
		this.logoFallback.position.set(p.logo.x, p.logo.y);
		this.logoFallback.scale.set(p.logo.s);
		const set = (c: PIXI.Container, q: { x: number; y: number; s: number }) => {
			c.position.set(q.x, q.y);
			c.scale.set(q.s);
		};
		set(this.banner.root, p.banner);
		set(this.lure.root, p.lure);
		this.lure.baseScale = p.lure.s;
		set(this.fsCounter.root, p.fsCounter);
		this.fsCounter.baseScale = p.fsCounter.s;
		if (p.maxWin) set(this.maxWin.root, p.maxWin);
		this.maxWin.root.visible = !!p.maxWin && !this.inFreeSpins;
		const cx = st.w / 2;
		const cy = st.h * (this.layoutType === 'portrait' ? 0.45 : 0.46);
		const sk = this.k;
		this.bigWin.layout(w, h, this.stage.x + cx * sk, this.stage.y + cy * sk, sk * (this.layoutType === 'portrait' ? 1.05 : 1));
		this.fsPanel.layout(w, h, this.stage.x + cx * sk, this.stage.y + cy * sk, sk * (this.layoutType === 'portrait' ? 1.1 : 1));
		this.transition.layout(w, h);
		this.flashG.clear().rect(0, 0, w, h).fill(0xffffff);
	}

	update(dt: number) {
		anim.update(dt);
		const real = Math.min(dt, 50);
		this.bg.reduced = this.mascot.reduced = this.hooks.reducedMotion();
		this.bg.update(real);
		this.board.update(real);
		this.mascot.update(real);
		this.lure.update(real);
		this.maxWin.update(real);
		this.flyFx.update(real);
		// screen shake
		if (this.shakeT > 0 && !this.hooks.reducedMotion()) {
			this.shakeT -= real;
			const a = this.shakeAmt * Math.max(0, this.shakeT / 300);
			this.stage.pivot.set(rand(-a, a), rand(-a, a));
		} else this.stage.pivot.set(0, 0);
		// idle sparkle so the grid is never dead still
		this.idleT += real;
		if (this.idleT > 380 && !this.board.spinning) {
			this.idleT = 0;
			this.board.randomSparkle();
		}
	}

	shake(amount: number, ms = 250) {
		this.shakeAmt = Math.max(this.shakeAmt * (this.shakeT > 0 ? 1 : 0), amount);
		this.shakeT = Math.max(this.shakeT, ms);
	}

	flash(color = 0xffffff, alpha = 0.6, ms = 450) {
		if (this.hooks.reducedMotion()) alpha *= 0.3;
		this.flashG.tint = color;
		anim.tween({ duration: ms, ease: ease.outCubic }, (t) => (this.flashG.alpha = alpha * (1 - t)));
	}

	/** board-local -> scene root coordinates */
	boardToRoot(p: { x: number; y: number }) {
		return this.root.toLocal(this.board.root.toGlobal(new PIXI.Point(p.x, p.y)));
	}

	private onSpecialLand(raw: RawSymbol, reel: number) {
		if (raw.name === 'S') {
			this.hooks.sfx('sfx_scatter_land');
			this.board.columnFlash(reel, 0xbff9ff);
			this.mascot.flare(0.6);
		} else if (raw.name === 'M') {
			this.hooks.sfx('sfx_orb_land');
			this.board.columnFlash(reel, COLORS.violet);
		}
	}

	// ------------------------------------------------------------------ events

	preSpin() {
		this.banner.hide();
		this.mascot.close();
		return this.board.preSpin();
	}

	stop() {
		this.board.stop();
	}

	async reveal(ev: RevealEvent) {
		this.lastSpinWin = 0;
		this.banner.hide();
		if (ev.gameType === 'freegame' && !this.inFreeSpins) this.enterFreeSpinsVisual();
		this.mascot.excitement = ev.anticipation?.some(Boolean) ? 0.8 : this.inFreeSpins ? 0.5 : 0.1;
		await this.board.spin(ev);
		this.mascot.excitement = this.inFreeSpins ? 0.5 : 0.1;
	}

	async winInfo(ev: { totalWin: number; wins: WinEntry[] }) {
		this.mascot.flare(0.7);
		const sizes = ev.wins.map((w) => w.positions.length);
		const isBig = Math.max(...sizes) >= 12;
		if (isBig) this.shake(3, 200);
		await this.board.showWins(ev.wins);
	}

	async updateTumbleWin(amount: number) {
		this.lastSpinWin = amount;
		this.banner.setLabel(this.inFreeSpins ? 'SPIN WIN' : 'WIN');
		await this.banner.setAmount(this.hooks.bookToCurrency(amount), true);
	}

	async tumbleBoard(ev: { explodingSymbols: Position[]; newSymbols: RawSymbol[][] }) {
		await this.board.tumble(ev.explodingSymbols, ev.newSymbols);
	}

	/** Base game: orbs light up one by one, their values fly together into a sum that slams onto the win. */
	async boardMultiplier(ev: { multInfo: { positions: (Position & { multiplier: number })[] }; winInfo: { tumbleWin: number; boardMult: number; totalWin: number } }) {
		const pos = ev.multInfo.positions;
		const k = this.hooks.turbo() ? 0.5 : 1;
		const target = this.root.toLocal(this.banner.root.toGlobal(new PIXI.Point(0, -70)));
		this.orbSumText.position.copyFrom(target);
		let sum = 0;
		this.hooks.sfx('sfx_orb_charge');
		for (const p of pos) {
			const s = this.board.symbolAt(p);
			if (!s) continue;
			s.pulse(1);
			await this.flyOrb(p, target, 420 * k, false);
			sum += p.multiplier;
			this.orbSumText.text = `×${sum}`;
			this.orbSumText.alpha = 1;
			this.hooks.sfx('sfx_orb_add');
			anim.tween({ duration: 240, ease: ease.outBack }, (t) => this.orbSumText.scale.set(this.k * (1.3 - 0.3 * t)));
		}
		await sleep(200 * k);
		this.orbSumText.alpha = 0;
		this.shake(5, 260);
		this.flash(COLORS.amber, 0.25);
		await this.banner.slam(ev.winInfo.boardMult, this.hooks.bookToCurrency(ev.winInfo.totalWin), null);
	}

	/** Free spins: every orb on the board flies into Maw's mouth; the Lure grows. */
	async lureCollect(ev: { positions: (Position & { multiplier: number })[]; added: number; lure: number }) {
		if (!ev.positions.length) {
			// super frenzy start: meter already lit
			this.lure.set(ev.lure);
			await this.lure.bump(ev.lure);
			return;
		}
		const k = this.hooks.turbo() ? 0.55 : 1;
		this.mascot.open(0.85);
		this.mascot.excitement = 1;
		this.hooks.sfx('sfx_maw_open');
		let lure = ev.lure - ev.added;
		const mouth = this.root.toLocal(this.mascot.mouthPoint());
		const flights = ev.positions.map(async (p, i) => {
			await sleep(i * 160 * k);
			const s = this.board.symbolAt(p);
			if (s) s.taken = true;
			await this.flyOrb(p, mouth, 620 * k, true, s);
			lure += p.multiplier;
			this.lure.bump(lure);
			this.hooks.sfx('sfx_maw_gulp');
			this.mascot.flare(1);
			this.shake(2.5, 140);
		});
		await Promise.all(flights);
		await this.mascot.chomp();
		this.hooks.sfx('sfx_maw_chomp');
		this.lure.set(ev.lure);
		this.mascot.excitement = 0.5;
	}

	/** Free spins: the Lure multiplies the spin win. */
	async lureApply(ev: { lure: number; baseWin: number; totalWin: number }) {
		const from = this.root.toLocal(this.lure.root.toGlobal(new PIXI.Point(0, 0)));
		const to = this.root.toLocal(this.banner.root.toGlobal(new PIXI.Point(150, 0)));
		this.mascot.flare(1.4);
		this.hooks.sfx('sfx_lure_beam');
		await this.beam(from, to, COLORS.magenta, this.hooks.turbo() ? 220 : 420);
		this.shake(5, 260);
		this.flash(COLORS.magenta, 0.22);
		await this.banner.slam(ev.lure, this.hooks.bookToCurrency(ev.totalWin), this.root.toGlobal(from));
	}

	private async flyOrb(p: Position, to: PIXI.PointData, ms: number, swallow: boolean, symbol = this.board.symbolAt(p)) {
		if (!symbol) return;
		const ghost = symbol.makeGhost();
		const from = this.boardToRoot(this.board.cellCenter(p));
		ghost.position.copyFrom(from);
		ghost.scale.set(this.k * this.place.board.s);
		this.flyLayer.addChild(ghost);
		const base = ghost.scale.x;
		const ctrl = { x: (from.x + to.x) / 2 + rand(-80, 80) * this.k, y: Math.min(from.y, to.y) - 160 * this.k };
		const tint = symbol.tint;
		await anim.tween({ duration: ms, ease: ease.inOutCubic }, (t) => {
			const a = (1 - t) * (1 - t);
			const b = 2 * (1 - t) * t;
			const c = t * t;
			ghost.x = a * from.x + b * ctrl.x + c * to.x;
			ghost.y = a * from.y + b * ctrl.y + c * to.y;
			ghost.scale.set(base * (swallow ? 1 + 0.4 * Math.sin(t * Math.PI) - 0.6 * t * t : 1 + 0.3 * Math.sin(t * Math.PI)));
			if (Math.random() < 0.6)
				this.flyFx.spawn({ texture: fx.spark(), x: ghost.x, y: ghost.y, count: 1, speed: [10, 50], life: [300, 600], size: [10 * this.k, 22 * this.k], tint: [tint, 0xffffff] });
		});
		this.flyFx.spawn({ texture: fx.spark(), x: to.x, y: to.y, count: 14, speed: [100, 300], drag: 0.1, life: [300, 700], size: [10 * this.k, 26 * this.k], tint: [tint, 0xffffff] });
		ghost.destroy({ children: true });
	}

	private async beam(from: PIXI.PointData, to: PIXI.PointData, tint: number, ms: number) {
		const s = new PIXI.Sprite(fx.streak());
		s.anchor.set(0.5, 1);
		s.blendMode = 'add';
		s.tint = tint;
		s.position.copyFrom(from);
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		const len = Math.hypot(dx, dy);
		s.rotation = Math.atan2(dy, dx) + Math.PI / 2;
		this.flyLayer.addChild(s);
		await anim.tween({ duration: ms, ease: ease.outCubic }, (t) => {
			s.height = len * t;
			s.width = 40 * this.k;
		});
		this.flyFx.spawn({ texture: fx.spark(), x: to.x, y: to.y, count: 20, speed: [120, 380], drag: 0.1, life: [400, 800], size: [12 * this.k, 28 * this.k], tint: [tint, 0xffffff] });
		await anim.tween({ duration: 260 }, (t) => (s.alpha = 1 - t));
		s.destroy();
	}

	private enterFreeSpinsVisual() {
		this.inFreeSpins = true;
		this.bg.setFrenzy(true);
		this.lure.root.visible = true;
		this.fsCounter.root.visible = true;
		this.maxWin.root.visible = false;
		this.mascot.excitement = 0.5;
	}

	private exitFreeSpinsVisual() {
		this.inFreeSpins = false;
		this.bg.setFrenzy(false);
		this.lure.root.visible = false;
		this.fsCounter.root.visible = false;
		this.maxWin.root.visible = !!this.place.maxWin;
		this.lure.set(0);
		this.mascot.excitement = 0.1;
	}

	async freeSpinTrigger(ev: { totalFs: number; positions: Position[] }, superMode: boolean) {
		this.superMode = superMode;
		this.hooks.sfx('sfx_scatter_win');
		this.mascot.roar(1200);
		this.board.visible((s) => s.setDim(s.raw.name !== 'S'));
		await Promise.all(ev.positions.map((p) => this.board.symbolAt(p)?.pulse(3)));
		this.flash(0xbff9ff, 0.7, 600);
		this.bg.erupt(2);
		this.shake(8, 500);
		this.banner.hide();
		this.hooks.sfx('sfx_fs_dive');
		await this.transition.play(() => {
			this.board.clearWins();
			this.enterFreeSpinsVisual();
			this.fsTotal = ev.totalFs;
			this.fsCurrent = 0;
			this.fsCounter.set(0, ev.totalFs);
			this.lure.set(0);
			this.hooks.music('bgm_freespin');
		}, COLORS.magenta);
		this.hooks.sfx('sfx_fs_intro');
		await this.fsPanel.intro(ev.totalFs, superMode, this.hooks.autoplay());
	}

	async freeSpinRetrigger(ev: { totalFs: number; positions: Position[] }) {
		const extra = ev.totalFs - this.fsTotal;
		this.fsTotal = ev.totalFs;
		this.hooks.sfx('sfx_scatter_win');
		await Promise.all(ev.positions.map((p) => this.board.symbolAt(p)?.pulse(2)));
		// pearls fire into the counter
		const to = this.root.toLocal(this.fsCounter.root.toGlobal(new PIXI.Point(0, 0)));
		await Promise.all(ev.positions.map((p) => this.beam(this.boardToRoot(this.board.cellCenter(p)), to, 0xbff9ff, 380)));
		this.fsCounter.set(this.fsCurrent, this.fsTotal);
		this.fsCounter.bump();
		this.hooks.sfx('sfx_fs_retrigger');
		await this.fsPanel.retrigger(extra);
	}

	updateFreeSpin(ev: { amount: number; total: number }) {
		this.fsCurrent = ev.amount + 1;
		this.fsTotal = ev.total;
		this.fsCounter.set(this.fsCurrent, ev.total);
		this.fsCounter.bump();
	}

	async freeSpinEnd(ev: { amount: number }) {
		this.banner.hide();
		this.hooks.sfx('sfx_fs_outro');
		const x = ev.amount / 100;
		if (x >= 15) {
			await this.bigWinFor(ev.amount, x >= this.hooks.wincapX);
		}
		await this.fsPanel.outro(this.hooks.bookToCurrency(ev.amount), this.fsTotal);
		await this.transition.play(() => {
			this.exitFreeSpinsVisual();
			this.hooks.music('bgm_main');
		}, COLORS.cyan);
	}

	async setWin(ev: { amount: number }) {
		const x = ev.amount / 100;
		if (x <= 1) {
			// UK: no celebration for a win not above the stake
			await sleep(this.hooks.turbo() ? 80 : 220);
			return;
		}
		if (x >= 15 && !this.inFreeSpins) {
			await this.bigWinFor(ev.amount, x >= this.hooks.wincapX);
			return;
		}
		if (x >= 15 && this.inFreeSpins) {
			// in free spins keep the round moving: quick flourish, full show at the end
			this.mascot.roar(500);
			this.flash(COLORS.magenta, 0.3);
			this.shake(5, 300);
			this.hooks.sfx('sfx_win_medium');
			await sleep(this.hooks.turbo() ? 300 : 800);
			return;
		}
		this.mascot.flare(1);
		this.hooks.sfx(x >= 5 ? 'sfx_win_medium' : 'sfx_win_small');
		await sleep(this.hooks.turbo() ? 150 : x >= 5 ? 700 : 400);
	}

	private async bigWinFor(bookAmount: number, isMax: boolean) {
		this.hooks.music('bgm_bigwin');
		await this.bigWin.play(this.hooks.bookToCurrency(bookAmount), bookAmount / 100, isMax, this.hooks.turbo() ? 0.6 : 1);
		this.hooks.music(this.inFreeSpins ? 'bgm_freespin' : 'bgm_main');
	}

	async wincap() {
		this.flash(COLORS.amber, 0.9, 900);
		this.shake(12, 700);
		this.bg.erupt(3);
		this.mascot.roar(1500);
		this.hooks.sfx('sfx_maxwin');
		await sleep(900);
	}

	finalWin(amount: number) {
		if (amount === 0) {
			this.deadStreak++;
			if (this.deadStreak >= 6 && Math.random() < 0.35) {
				this.mascot.excitement = 0;
			}
		} else this.deadStreak = 0;
	}

	/** Restore free-spin HUD when resuming an unfinished round. */
	restoreFreeSpins(cur: number, total: number, lure: number) {
		this.enterFreeSpinsVisual();
		this.fsCurrent = cur;
		this.fsTotal = total;
		this.fsCounter.set(cur, total);
		this.lure.set(lure);
		this.hooks.music('bgm_freespin');
	}
}

/** Opening of frame.png in its own pixels (tools: measured after keying). */
export const FRAME_FIT = { holeX: 125, holeY: 177, holeW: 1350, holeH: 1006, pad: 10 };
export { cellX, cellY, C };
