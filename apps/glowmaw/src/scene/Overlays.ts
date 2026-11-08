import * as PIXI from 'pixi.js';
import { GText } from './theme';

import { anim, ease, rand, sleep } from './anim';
import { ParticleSystem } from './particles';
import { Plaque } from './Plaque';
import { COLORS, textStyle } from './theme';
import { fx, tex, hasArt } from './textures';

const gold = () => {
	const g = new PIXI.FillGradient(0, 0, 0, 1, 'local');
	g.addColorStop(0, 0xfffbe6);
	g.addColorStop(0.45, 0xffd36a);
	g.addColorStop(0.55, 0xffa62b);
	g.addColorStop(1, 0xfff0b0);
	return g;
};
const aqua = () => {
	const g = new PIXI.FillGradient(0, 0, 0, 1, 'local');
	g.addColorStop(0, 0xffffff);
	g.addColorStop(0.5, 0x9ffcf3);
	g.addColorStop(1, 0x3ff5e6);
	return g;
};

export const makeText = (text: string, size: number, opts: Parameters<typeof textStyle>[1] & { gold?: boolean; aqua?: boolean } = {}) => {
	const style = textStyle(size, opts);
	if (opts.gold) (style as any).fill = gold();
	if (opts.aqua) (style as any).fill = aqua();
	const t = new GText({ text, style });
	t.anchor.set(0.5);
	return t;
};

/** Text that counts from one amount to another. */
export class CountText {
	readonly text: PIXI.Text;
	value = 0;
	constructor(size: number, private fmt: (v: number) => string, opts: Parameters<typeof makeText>[2] = {}) {
		this.text = makeText(fmt(0), size, opts);
	}
	set(v: number) {
		this.value = v;
		this.text.text = this.fmt(v);
	}
	async countTo(v: number, ms: number, e = ease.outCubic) {
		const from = this.value;
		await anim.tween({ duration: ms, ease: e, group: 'count' }, (t) => this.set(from + (v - from) * t));
		this.set(v);
	}
	fitWidth(max: number, base: number) {
		this.text.scale.set(1);
		const w = this.text.width;
		this.text.scale.set(w > max ? (max / w) * base : base);
	}
}

/** Running win of the current spin, above the board. Gets the orb / Lure multiplier slam. */
export class WinBanner {
	readonly root = new PIXI.Container();
	private plaque = new Plaque(COLORS.cyan);
	private label = makeText('WIN', 20, { weight: '700', glow: COLORS.cyan });
	private amount: CountText;
	private mult = makeText('', 54, { gold: true, glow: COLORS.amber });
	visible = false;
	constructor(fmt: (v: number) => string, private sfx: (n: string) => void) {
		this.amount = new CountText(44, fmt, { aqua: true });
		this.root.addChild(this.plaque, this.label, this.amount.text, this.mult);
		this.plaque.resize(340, 84);
		this.label.y = -27;
		this.amount.text.y = 8;
		this.mult.alpha = 0;
		this.root.alpha = 0;
	}
	refreshArt() {
		this.plaque.refreshArt();
	}
	setLabel(s: string) {
		this.label.text = s;
	}
	async show() {
		if (this.visible) return;
		this.visible = true;
		await anim.tween({ duration: 220, ease: ease.outBack }, (t) => {
			this.root.alpha = t;
			this.root.scale.set(0.8 + 0.2 * t);
		});
	}
	async hide() {
		if (!this.visible) return;
		this.visible = false;
		await anim.tween({ duration: 200 }, (t) => (this.root.alpha = 1 - t));
		this.amount.set(0);
	}
	async setAmount(v: number, animate = true) {
		await this.show();
		if (!animate) {
			this.amount.set(v);
			this.amount.fitWidth(300, 1);
			return;
		}
		const p = this.amount.countTo(v, 380);
		anim.tween({ duration: 300, ease: ease.outBack }, (t) => this.amount.text.scale.set(1 + 0.18 * Math.sin(t * Math.PI)));
		await p;
		this.amount.fitWidth(300, 1);
	}
	/** "×N" stamps onto the banner then the amount jumps to the multiplied win. */
	async slam(mult: number, total: number, from: { x: number; y: number } | null) {
		await this.show();
		this.mult.text = `×${mult}`;
		const start = from ? this.root.toLocal(from) : new PIXI.Point(0, -140);
		this.mult.position.copyFrom(start);
		this.mult.alpha = 1;
		await anim.tween({ duration: 340, ease: ease.inQuad }, (t) => {
			this.mult.x = start.x + (190 - start.x) * t;
			this.mult.y = start.y + (0 - start.y) * t;
			this.mult.scale.set(1.6 - 0.6 * t);
		});
		this.sfx('sfx_mult_slam');
		anim.tween({ duration: 380, ease: ease.outQuad }, (t) => this.root.scale.set(1 + 0.12 * Math.sin(t * Math.PI)));
		await this.amount.countTo(total, 520, ease.outQuart);
		this.amount.fitWidth(300, 1);
		await anim.tween({ duration: 260 }, (t) => (this.mult.alpha = 1 - t));
	}
	get value() {
		return this.amount.value;
	}
}

/** Free-spins Lure meter: big glowing gauge beside Maw. */
export class LureMeter {
	readonly root = new PIXI.Container();
	private ring = new PIXI.Sprite(fx.ring());
	private glow = new PIXI.Sprite(fx.glow());
	private art = new PIXI.Sprite();
	private value = makeText('×0', 64, { gold: true, glow: COLORS.magenta });
	private label = makeText('LURE', 22, { weight: '800', glow: COLORS.magenta });
	private t = 0;
	lure = 0;
	constructor() {
		for (const s of [this.ring, this.glow]) {
			s.anchor.set(0.5);
			s.blendMode = 'add';
		}
		this.art.anchor.set(0.5);
		this.ring.tint = COLORS.magenta;
		this.glow.tint = COLORS.magenta;
		this.label.y = -88;
		this.root.addChild(this.glow, this.art, this.ring, this.value, this.label);
		this.root.visible = false;
		this.refreshArt();
	}
	refreshArt() {
		this.art.texture = hasArt('ui_lure') ? tex('ui_lure') : PIXI.Texture.EMPTY;
		if (this.art.texture !== PIXI.Texture.EMPTY) this.art.scale.set(210 / this.art.texture.width);
	}
	set(v: number) {
		this.lure = v;
		this.value.text = `×${v}`;
		const w = this.value.width / this.value.scale.x;
		this.value.scale.set(Math.min(1, 150 / w));
	}
	async bump(v: number) {
		this.set(v);
		await anim.tween({ duration: 420, ease: ease.outBack }, (t) => this.root.scale.set(this.baseScale * (1 + 0.25 * Math.sin(t * Math.PI))));
	}
	baseScale = 1;
	update(dt: number) {
		this.t += dt / 1000;
		const k = Math.min(1, this.lure / 80);
		this.ring.scale.set((180 + Math.sin(this.t * 2) * 6) / 256);
		this.ring.rotation += dt * 0.0004;
		this.ring.alpha = 0.6 + 0.3 * Math.sin(this.t * 3);
		this.glow.scale.set((260 + k * 120) / 256);
		this.glow.alpha = 0.35 + k * 0.4 + 0.1 * Math.sin(this.t * 2.4);
	}
}

/** "FREE SPINS 3 / 12" */
export class FsCounter {
	readonly root = new PIXI.Container();
	private plaque = new Plaque(COLORS.magenta);
	private text = makeText('', 30, { glow: COLORS.magenta });
	private small = makeText('FREE SPINS', 16, { weight: '700', glow: COLORS.magenta });
	constructor() {
		this.plaque.resize(230, 74);
		this.small.y = -20;
		this.text.y = 10;
		this.root.addChild(this.plaque, this.small, this.text);
		this.root.visible = false;
	}
	refreshArt() {
		this.plaque.refreshArt();
	}
	set(cur: number, total: number) {
		this.text.text = `${cur} / ${total}`;
	}
	async bump() {
		await anim.tween({ duration: 380, ease: ease.outBack }, (t) => this.root.scale.set(this.baseScale * (1 + 0.3 * Math.sin(t * Math.PI))));
	}
	baseScale = 1;
}

/** Side promise plaque: WIN UP TO 10,000× */
export class MaxWinPlaque {
	readonly root = new PIXI.Container();
	private plaque = new Plaque(COLORS.amber);
	private a = makeText('WIN UP TO', 20, { weight: '700', glow: COLORS.amber });
	private b = makeText('', 48, { gold: true, glow: COLORS.amber });
	private c = makeText('YOUR BET', 18, { weight: '700', glow: COLORS.amber });
	private t = 0;
	constructor(maxWin: number) {
		this.b.text = `${maxWin.toLocaleString('en-US')}×`;
		this.plaque.resize(250, 150);
		this.a.y = -42;
		this.b.y = 2;
		this.c.y = 44;
		this.root.addChild(this.plaque, this.a, this.b, this.c);
	}
	refreshArt() {
		this.plaque.refreshArt();
	}
	update(dt: number) {
		this.t += dt / 1000;
		this.b.scale.set(1 + Math.sin(this.t * 2.2) * 0.03);
	}
}

export type WinTier = { key: string; title: string; min: number; color: number };
export const WIN_TIERS: WinTier[] = [
	{ key: 'big', title: 'BIG WIN', min: 15, color: COLORS.cyan },
	{ key: 'super', title: 'SUPER WIN', min: 40, color: COLORS.violet },
	{ key: 'mega', title: 'MEGA WIN', min: 100, color: COLORS.magenta },
	{ key: 'epic', title: 'EPIC WIN', min: 500, color: COLORS.amber },
];

/**
 * Full-screen big win: veil, rotating rays, plaque, escalating tier title as the
 * counter climbs, pearl/orb fountain, shake and flash on every tier change.
 * Tap to speed up (jumps to the final amount).
 */
export class BigWin {
	readonly root = new PIXI.Container();
	private veil = new PIXI.Graphics();
	private rays = new PIXI.Sprite(fx.rays());
	private rays2 = new PIXI.Sprite(fx.rays());
	private halo = new PIXI.Sprite(fx.glow());
	private plaque = new Plaque(COLORS.amber, 'ui_bigwin', { left: 330, right: 330, top: 150, bottom: 150 });
	private title = makeText('BIG WIN', 96, { gold: true, glow: COLORS.amber });
	private amount: CountText;
	private fountain = new ParticleSystem(240);
	private w = 1;
	private h = 1;
	private active = false;
	private skip = false;
	private tierColor = COLORS.cyan;
	constructor(
		private fmt: (v: number) => string,
		private hooks: { sfx: (n: string) => void; shake: (a: number, ms?: number) => void; onTier: (i: number) => void; flash: (c: number) => void },
	) {
		this.amount = new CountText(110, fmt, { aqua: true, glow: COLORS.cyan });
		for (const s of [this.rays, this.rays2, this.halo]) {
			s.anchor.set(0.5);
			s.blendMode = 'add';
		}
		this.plaque.resize(760, 220);
		this.title.y = -150;
		this.amount.text.y = 10;
		this.root.addChild(this.veil, this.halo, this.rays, this.rays2, this.fountain.container, this.plaque, this.title, this.amount.text);
		this.root.visible = false;
		this.root.eventMode = 'static';
		this.root.on('pointertap', () => (this.skip = true));
	}
	refreshArt() {
		this.plaque.refreshArt();
	}
	layout(w: number, h: number, cx: number, cy: number, scale: number) {
		this.w = w;
		this.h = h;
		this.veil.clear().rect(0, 0, w, h).fill({ color: 0x00030a, alpha: 0.72 });
		for (const c of [this.halo, this.rays, this.rays2, this.plaque, this.title, this.amount.text]) {
			c.x = cx;
		}
		this.halo.y = this.rays.y = this.rays2.y = cy;
		this.plaque.y = cy + 10 * scale;
		this.title.y = cy - 150 * scale;
		this.amount.text.y = cy + 10 * scale;
		this.plaque.scale.set(scale);
		this.title.scale.set(scale);
		this.fountain.container.position.set(0, 0);
		this.scale = scale;
		this.cy = cy;
		this.cx = cx;
	}
	private scale = 1;
	private cx = 0;
	private cy = 0;

	/** amountX: win in bet multiples; display amount in currency via fmt(value). */
	async play(amountCurrency: number, amountX: number, maxWin: boolean, durationScale = 1) {
		this.root.visible = true;
		this.active = true;
		this.skip = false;
		this.amount.set(0);
		this.root.alpha = 0;
		await anim.tween({ duration: 260 }, (t) => (this.root.alpha = t));
		const tiers = maxWin ? [...WIN_TIERS, { key: 'max', title: 'MAX WIN', min: amountX, color: COLORS.amber }] : WIN_TIERS.filter((t) => amountX >= t.min);
		const finalTier = tiers.length - 1;
		const segs = Math.max(1, tiers.length);
		let tierIdx = -1;
		const total = Math.min(9000, (2400 + segs * 1800) * durationScale);
		const setTier = (i: number) => {
			if (i <= tierIdx) return;
			tierIdx = i;
			const tier = tiers[i];
			this.title.text = tier.title;
			this.tierColor = tier.color;
			this.rays.tint = tier.color;
			this.rays2.tint = 0xffffff;
			this.halo.tint = tier.color;
			this.hooks.onTier(i);
			this.hooks.sfx(i === 0 ? 'sfx_bigwin_start' : 'sfx_bigwin_tier');
			this.hooks.shake(5 + i * 2, 300);
			this.hooks.flash(tier.color);
			anim.tween({ duration: 520, ease: ease.outBackBig }, (t) => this.title.scale.set(this.scale * (0.4 + 0.6 * t)));
			this.burst(28 + i * 10);
		};
		setTier(0);
		this.hooks.sfx('sfx_bigwin_loop');
		// count with tier thresholds evenly spaced in time
		const stop = anim.onFrame((dt) => this.tick(dt));
		let elapsed = 0;
		const thresholds = tiers.map((t) => (maxWin && t.key === 'max' ? amountX : t.min));
		await new Promise<void>((resolve) => {
			const off = anim.onFrame((dt) => {
				elapsed += dt * (this.skip ? 8 : 1);
				const p = Math.min(1, elapsed / total);
				const seg = p * segs;
				const i = Math.min(segs - 1, Math.floor(seg));
				const lo = i === 0 ? 0 : thresholds[i];
				const hi = i + 1 < segs ? thresholds[i + 1] : amountX;
				const local = ease.outQuad(seg - i);
				const x = lo + (hi - lo) * Math.min(1, local);
				this.amount.set((amountCurrency * Math.min(x, amountX)) / amountX);
				this.amount.fitWidth(680 * this.scale, this.scale);
				for (let k = finalTier; k >= 0; k--) if (x >= thresholds[k] - 1e-9) {
					setTier(k);
					break;
				}
				if (p >= 1) {
					off();
					resolve();
				}
			});
		});
		this.amount.set(amountCurrency);
		this.amount.fitWidth(680 * this.scale, this.scale);
		this.hooks.sfx('sfx_bigwin_end');
		this.burst(60);
		this.hooks.shake(8, 400);
		anim.tween({ duration: 500, ease: ease.outBack }, (t) => this.amount.text.scale.set(this.amount.text.scale.x * (1 + 0.004 * Math.sin(t * Math.PI))));
		await sleep(this.skip ? 600 : 1600);
		await anim.tween({ duration: 320 }, (t) => (this.root.alpha = 1 - t));
		stop();
		this.fountain.clear();
		this.root.visible = false;
		this.active = false;
	}
	private burst(n: number) {
		this.fountain.spawn({ texture: fx.spark(), x: this.cx, y: this.cy, count: n, speed: [300, 900], drag: 0.15, gravity: 500, life: [900, 1700], size: [14, 34], tint: [this.tierColor, 0xffffff, COLORS.amber] });
		this.fountain.spawn({ texture: tex('orb_1'), x: this.cx, y: this.cy, count: Math.round(n / 4), speed: [250, 700], gravity: 700, life: [1200, 2000], size: [26, 48], endSizeRatio: 0.9, spin: [-4, 4], blend: 'normal' });
	}
	private tick(dt: number) {
		this.rays.rotation += dt * 0.0004;
		this.rays2.rotation -= dt * 0.00025;
		const k = this.scale;
		this.rays.scale.set((1100 * k) / 512);
		this.rays2.scale.set((800 * k) / 512);
		this.rays.alpha = 0.22;
		this.rays2.alpha = 0.12;
		this.halo.scale.set((900 * k) / 256);
		this.halo.alpha = 0.35;
		if (Math.random() < dt * 0.02)
			this.fountain.spawn({ texture: fx.spark(), x: this.cx + rand(-300, 300) * k, y: this.cy + 80 * k, count: 2, angle: -Math.PI / 2, cone: 1.2, speed: [300, 700], gravity: 600, life: [900, 1500], size: [10, 24], tint: [this.tierColor, 0xffffff] });
		this.fountain.update(dt);
	}
	get isActive() {
		return this.active;
	}
}

/** Free-spins intro / outro / retrigger panel. */
export class FsPanel {
	readonly root = new PIXI.Container();
	private veil = new PIXI.Graphics();
	private halo = new PIXI.Sprite(fx.glow());
	private rays = new PIXI.Sprite(fx.rays());
	private plaque = new Plaque(COLORS.magenta, 'ui_plaque');
	private title = makeText('', 62, { gold: true, glow: COLORS.magenta });
	private big = makeText('', 150, { gold: true, glow: COLORS.amber });
	private sub = makeText('', 30, { weight: '800', glow: COLORS.magenta });
	private hint = makeText('', 22, { weight: '700', italic: false, glow: COLORS.cyan });
	private amount: CountText;
	private skip = false;
	private cx = 0;
	private cy = 0;
	private k = 1;
	constructor(fmt: (v: number) => string) {
		this.amount = new CountText(110, fmt, { aqua: true });
		for (const s of [this.halo, this.rays]) {
			s.anchor.set(0.5);
			s.blendMode = 'add';
		}
		this.halo.tint = COLORS.magenta;
		this.rays.tint = 0xff7ad0;
		this.rays.alpha = 0.16;
		this.plaque.resize(820, 520);
		this.root.addChild(this.veil, this.halo, this.rays, this.plaque, this.title, this.big, this.amount.text, this.sub, this.hint);
		this.root.visible = false;
		this.root.eventMode = 'static';
		this.root.on('pointertap', () => (this.skip = true));
	}
	refreshArt() {
		this.plaque.refreshArt();
	}
	layout(w: number, h: number, cx: number, cy: number, k: number) {
		this.veil.clear().rect(0, 0, w, h).fill({ color: 0x02000a, alpha: 0.78 });
		this.cx = cx;
		this.cy = cy;
		this.k = k;
		const place = (c: PIXI.Container, dy: number) => {
			c.x = cx;
			c.y = cy + dy * k;
			c.scale.set(k);
		};
		place(this.plaque, 0);
		place(this.title, -175);
		place(this.big, -20);
		place(this.amount.text, -20);
		place(this.sub, 105);
		place(this.hint, 175);
		this.halo.position.set(cx, cy);
		this.rays.position.set(cx, cy);
		this.halo.scale.set((1000 * k) / 256);
		this.rays.scale.set((1200 * k) / 512);
	}
	private async open() {
		this.skip = false;
		this.root.visible = true;
		this.root.alpha = 0;
		const p = anim.tween({ duration: 300 }, (t) => (this.root.alpha = t));
		this.plaque.scale.set(0.3 * this.k);
		await anim.tween({ duration: 520, ease: ease.outBackBig }, (t) => this.plaque.scale.set(this.k * (0.3 + 0.7 * t)));
		await p;
	}
	private async close() {
		await anim.tween({ duration: 300 }, (t) => (this.root.alpha = 1 - t));
		this.root.visible = false;
	}
	private async hold(ms: number) {
		const spin = anim.onFrame((dt) => (this.rays.rotation += dt * 0.0003));
		let t = 0;
		await new Promise<void>((res) => {
			const off = anim.onFrame((dt) => {
				t += dt;
				if (this.skip || t >= ms) {
					off();
					res();
				}
			});
		});
		spin();
	}
	async intro(spins: number, superMode: boolean, autoplay: boolean) {
		this.title.text = superMode ? 'SUPER FRENZY' : 'FEEDING FRENZY';
		this.big.visible = true;
		this.amount.text.visible = false;
		this.big.text = `${spins}`;
		this.sub.text = 'FREE SPINS';
		this.hint.text = superMode ? 'The Lure starts at ×25 and never resets' : 'Every Glow Orb feeds the Lure. It never resets.';
		await this.open();
		anim.tween({ duration: 700, ease: ease.outElastic }, (t) => this.big.scale.set(this.k * (0.2 + 0.8 * t)));
		await this.hold(autoplay ? 2200 : 3200);
		await this.close();
	}
	async retrigger(extra: number) {
		this.title.text = 'MORE SPINS';
		this.big.visible = true;
		this.amount.text.visible = false;
		this.big.text = `+${extra}`;
		this.sub.text = 'FREE SPINS';
		this.hint.text = '';
		await this.open();
		await this.hold(1300);
		await this.close();
	}
	async outro(amount: number, spins: number) {
		this.title.text = 'FRENZY OVER';
		this.big.visible = false;
		this.amount.text.visible = true;
		this.amount.set(0);
		this.sub.text = `TOTAL WIN · ${spins} FREE SPINS`;
		this.hint.text = '';
		await this.open();
		await this.amount.countTo(amount, this.skip ? 200 : 1800, ease.outQuart);
		this.amount.fitWidth(620 * this.k, this.k);
		await this.hold(2200);
		await this.close();
	}
}

/** Dive transition: the water floods with bubbles and darkens, then clears. */
export class Transition {
	readonly root = new PIXI.Container();
	private dark = new PIXI.Graphics();
	private bubbles = new ParticleSystem(200);
	private w = 1;
	private h = 1;
	constructor() {
		this.root.addChild(this.bubbles.container, this.dark);
		this.root.visible = false;
	}
	layout(w: number, h: number) {
		this.w = w;
		this.h = h;
		this.dark.clear().rect(0, 0, w, h).fill(0x01030a);
	}
	async play(midpoint: () => void | Promise<void>, tint = COLORS.cyan) {
		this.root.visible = true;
		this.dark.alpha = 0;
		const stop = anim.onFrame((dt) => {
			this.bubbles.update(dt);
			for (let i = 0; i < 3; i++)
				this.bubbles.spawn({ texture: fx.bubble(), x: rand(0, this.w), y: this.h + 20, count: 1, angle: -Math.PI / 2, cone: 0.3, speed: [600, 1300], life: [900, 1400], size: [20, 70], endSizeRatio: 1.3, alpha: 0.8, blend: 'normal', tint: [0xffffff, tint] });
		});
		await anim.tween({ duration: 550, ease: ease.inQuad }, (t) => (this.dark.alpha = t));
		await midpoint();
		await sleep(150);
		await anim.tween({ duration: 650, ease: ease.outQuad }, (t) => (this.dark.alpha = 1 - t));
		await sleep(500);
		stop();
		this.bubbles.clear();
		this.root.visible = false;
	}
}
