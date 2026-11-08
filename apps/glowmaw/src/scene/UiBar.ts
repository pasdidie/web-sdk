import * as PIXI from 'pixi.js';

import { anim, ease } from './anim';
import { COLORS, textStyle } from './theme';
import { fx, hasArt, tex } from './textures';
import type { LayoutType } from './Scene';

export type UiIcon = 'menu' | 'sound' | 'mute' | 'info' | 'turbo' | 'auto' | 'plus' | 'minus' | 'spin' | 'stop' | 'close' | 'settings';

/** Crisp vector icons (UI glyphs), stroked in the bio-cyan with a soft glow. */
export const drawIcon = (g: PIXI.Graphics, icon: UiIcon, s: number, color = 0xe9fbff) => {
	g.clear();
	const w = Math.max(2, s * 0.11);
	const st = { color, width: w, cap: 'round' as const, join: 'round' as const };
	switch (icon) {
		case 'menu':
			for (const y of [-0.28, 0, 0.28]) g.moveTo(-s * 0.32, y * s).lineTo(s * 0.32, y * s);
			g.stroke(st);
			break;
		case 'plus':
			g.moveTo(-s * 0.3, 0).lineTo(s * 0.3, 0).moveTo(0, -s * 0.3).lineTo(0, s * 0.3).stroke({ ...st, width: w * 1.3 });
			break;
		case 'minus':
			g.moveTo(-s * 0.3, 0).lineTo(s * 0.3, 0).stroke({ ...st, width: w * 1.3 });
			break;
		case 'info':
			g.circle(0, -s * 0.28, w * 0.75).fill(color);
			g.moveTo(0, -s * 0.08).lineTo(0, s * 0.32).stroke({ ...st, width: w * 1.2 });
			break;
		case 'sound':
		case 'mute': {
			g.poly([-s * 0.34, -s * 0.12, -s * 0.16, -s * 0.12, s * 0.06, -s * 0.32, s * 0.06, s * 0.32, -s * 0.16, s * 0.12, -s * 0.34, s * 0.12]).fill(color);
			if (icon === 'sound') {
				g.arc(s * 0.08, 0, s * 0.2, -0.8, 0.8).stroke(st);
				g.arc(s * 0.08, 0, s * 0.36, -0.8, 0.8).stroke(st);
			} else {
				g.moveTo(s * 0.16, -s * 0.14).lineTo(s * 0.4, s * 0.14).moveTo(s * 0.4, -s * 0.14).lineTo(s * 0.16, s * 0.14).stroke(st);
			}
			break;
		}
		case 'turbo':
			g.poly([s * 0.06, -s * 0.4, -s * 0.24, s * 0.05, -s * 0.02, s * 0.05, -s * 0.08, s * 0.4, s * 0.24, -s * 0.06, s * 0.02, -s * 0.06]).fill(color);
			break;
		case 'auto':
			g.arc(0, 0, s * 0.3, -Math.PI * 0.15, Math.PI * 1.45).stroke(st);
			g.poly([s * 0.3, -s * 0.36, s * 0.38, -s * 0.06, s * 0.1, -s * 0.12]).fill(color);
			break;
		case 'spin':
			g.arc(0, 0, s * 0.3, Math.PI * 0.1, Math.PI * 0.9).stroke({ ...st, width: w * 1.4 });
			g.arc(0, 0, s * 0.3, Math.PI * 1.1, Math.PI * 1.9).stroke({ ...st, width: w * 1.4 });
			g.poly([s * 0.3, -s * 0.02, s * 0.44, -s * 0.2, s * 0.16, -s * 0.2]).fill(color);
			g.poly([-s * 0.3, s * 0.02, -s * 0.44, s * 0.2, -s * 0.16, s * 0.2]).fill(color);
			break;
		case 'stop':
			g.roundRect(-s * 0.22, -s * 0.22, s * 0.44, s * 0.44, s * 0.06).fill(color);
			break;
		case 'close':
			g.moveTo(-s * 0.26, -s * 0.26).lineTo(s * 0.26, s * 0.26).moveTo(s * 0.26, -s * 0.26).lineTo(-s * 0.26, s * 0.26).stroke({ ...st, width: w * 1.2 });
			break;
		case 'settings':
			g.circle(0, 0, s * 0.14).stroke(st);
			for (let i = 0; i < 8; i++) {
				const a = (i / 8) * Math.PI * 2;
				g.moveTo(Math.cos(a) * s * 0.24, Math.sin(a) * s * 0.24).lineTo(Math.cos(a) * s * 0.36, Math.sin(a) * s * 0.36);
			}
			g.stroke({ ...st, width: w * 1.3 });
			break;
	}
};

const label = (text: string, size: number, color = 0x8fe9ff, weight = '700') => {
	const t = new PIXI.Text({ text, style: { ...textStyle(size, { weight, italic: false, glow: COLORS.cyan, strokeWidth: 0 }), fill: color, letterSpacing: size * 0.18 } as any });
	t.anchor.set(0.5);
	return t;
};
const valueText = (size: number) => {
	const t = new PIXI.Text({ text: '', style: textStyle(size, { glow: COLORS.cyan, strokeWidth: size * 0.08 }) });
	t.anchor.set(0.5);
	return t;
};

/** A press-able UI element with hover / press / disabled feedback. */
class Pressable extends PIXI.Container {
	hovered = false;
	pressed = false;
	disabled = false;
	onPress: () => void = () => {};
	scaleBase = 1;
	constructor() {
		super();
		this.eventMode = 'static';
		this.cursor = 'pointer';
		this.on('pointerover', () => (this.hovered = true));
		this.on('pointerout', () => {
			this.hovered = false;
			this.pressed = false;
		});
		this.on('pointerdown', () => !this.disabled && (this.pressed = true));
		this.on('pointerup', () => {
			if (this.pressed && !this.disabled) this.onPress();
			this.pressed = false;
		});
		this.on('pointerupoutside', () => (this.pressed = false));
	}
	tickPress() {
		const target = this.disabled ? 1 : this.pressed ? 0.9 : this.hovered ? 1.07 : 1;
		const cur = this.scale.x / this.scaleBase;
		const n = cur + (target - cur) * 0.35;
		this.scale.set(n * this.scaleBase);
		this.alpha += ((this.disabled ? 0.4 : 1) - this.alpha) * 0.3;
	}
}

/** Small round glass button with a vector glyph. */
export class RoundButton extends Pressable {
	private disc = new PIXI.Graphics();
	private art = new PIXI.Sprite();
	private glow = new PIXI.Sprite(fx.glow());
	readonly glyph = new PIXI.Graphics();
	active = false;
	private r: number;
	constructor(public icon: UiIcon, r = 34, private accent = COLORS.cyan) {
		super();
		this.r = r;
		this.glow.anchor.set(0.5);
		this.glow.blendMode = 'add';
		this.glow.tint = accent;
		this.art.anchor.set(0.5);
		this.addChild(this.glow, this.disc, this.art, this.glyph);
		this.hitArea = new PIXI.Circle(0, 0, r * 1.15);
		this.redraw();
	}
	redraw() {
		const r = this.r;
		this.art.texture = hasArt('ui_btn') ? tex('ui_btn') : PIXI.Texture.EMPTY;
		this.disc.clear();
		if (this.art.texture !== PIXI.Texture.EMPTY) {
			this.art.scale.set((r * 2.3) / this.art.texture.width);
		} else {
			const grad = new PIXI.FillGradient(0, 0, 0, 1);
			grad.addColorStop(0, 0x174a63);
			grad.addColorStop(1, 0x041526);
			this.disc.circle(0, 0, r).fill(grad);
			this.disc.circle(0, 0, r).stroke({ color: this.accent, width: 2.5, alpha: 0.9 });
			this.disc.circle(0, 0, r - 5).stroke({ color: 0xffffff, width: 1, alpha: 0.15 });
		}
		drawIcon(this.glyph, this.icon, r * 1.05, this.active ? COLORS.amber : 0xe9fbff);
		this.glow.scale.set((r * 3.2) / 256);
	}
	setIcon(icon: UiIcon) {
		if (icon === this.icon) return;
		this.icon = icon;
		this.redraw();
	}
	setActive(a: boolean) {
		if (a === this.active) return;
		this.active = a;
		this.glow.tint = a ? COLORS.amber : this.accent;
		this.redraw();
	}
	update() {
		this.tickPress();
		this.glow.alpha = this.active ? 0.6 : this.hovered ? 0.45 : 0.18;
	}
}

/** The big spin button: pearl/orb disc with an orbiting light ring that spins up during a round. */
export class SpinButton extends Pressable {
	private halo = new PIXI.Sprite(fx.glow());
	private disc = new PIXI.Graphics();
	private art = new PIXI.Sprite();
	private ring = new PIXI.Sprite(fx.ring());
	private orbit = new PIXI.Container();
	private glyph = new PIXI.Graphics();
	private counter = valueText(34);
	private angle = 0;
	private speed = 0.4;
	playing = false;
	mode: 'spin' | 'stop' = 'spin';
	autoCount = 0;
	private r: number;
	private t = 0;
	constructor(r = 72) {
		super();
		this.r = r;
		for (const s of [this.halo, this.ring]) {
			s.anchor.set(0.5);
			s.blendMode = 'add';
		}
		this.halo.tint = COLORS.cyan;
		this.ring.tint = COLORS.cyan;
		this.art.anchor.set(0.5);
		for (let i = 0; i < 3; i++) {
			const d = new PIXI.Sprite(fx.spark());
			d.anchor.set(0.5);
			d.blendMode = 'add';
			d.tint = i === 1 ? COLORS.magenta : 0xffffff;
			d.rotation = (i / 3) * Math.PI * 2;
			this.orbit.addChild(d);
		}
		this.addChild(this.halo, this.disc, this.art, this.ring, this.orbit, this.glyph, this.counter);
		this.hitArea = new PIXI.Circle(0, 0, r * 1.1);
		this.redraw();
	}
	redraw() {
		const r = this.r;
		this.art.texture = hasArt('ui_spin') ? tex('ui_spin') : PIXI.Texture.EMPTY;
		this.disc.clear();
		if (this.art.texture !== PIXI.Texture.EMPTY) {
			this.art.scale.set((r * 2.25) / this.art.texture.width);
		} else {
			const grad = new PIXI.FillGradient(0, 0, 0, 1);
			grad.addColorStop(0, 0x29d9d0);
			grad.addColorStop(0.5, 0x0b6f86);
			grad.addColorStop(1, 0x052b45);
			this.disc.circle(0, 0, r).fill(grad);
			this.disc.circle(0, 0, r).stroke({ color: 0xbff9ff, width: 4 });
			this.disc.circle(0, 0, r * 0.82).stroke({ color: 0x02121f, width: 3, alpha: 0.6 });
		}
		this.ring.scale.set((r * 2.5) / 256);
		this.halo.scale.set((r * 4.2) / 256);
		this.drawGlyph();
	}
	private drawGlyph() {
		drawIcon(this.glyph, this.mode === 'stop' ? 'stop' : 'spin', this.r * 1.1, 0xffffff);
		this.glyph.visible = this.autoCount === 0;
		this.counter.visible = this.autoCount !== 0;
		this.counter.text = Number.isFinite(this.autoCount) ? `${this.autoCount}` : '∞';
	}
	set(mode: 'spin' | 'stop', playing: boolean, autoCount: number) {
		const changed = mode !== this.mode || autoCount !== this.autoCount;
		this.mode = mode;
		this.playing = playing;
		this.autoCount = autoCount;
		if (changed) this.drawGlyph();
	}
	update(dt: number) {
		this.tickPress();
		this.t += dt / 1000;
		const target = this.playing ? 9 : 0.5;
		this.speed += (target - this.speed) * Math.min(1, dt * (this.playing ? 0.004 : 0.002));
		this.angle += (this.speed * dt) / 1000;
		this.ring.rotation = this.angle;
		this.orbit.rotation = this.angle * 1.4;
		this.orbit.children.forEach((c) => {
			c.x = Math.cos(c.rotation) * this.r * 1.02;
			c.y = Math.sin(c.rotation) * this.r * 1.02;
			c.scale.set((this.r * 0.42) / 64);
		});
		this.art.rotation = this.playing ? this.angle * 0.15 : 0;
		const breathe = 0.5 + 0.5 * Math.sin(this.t * 2.4);
		this.halo.alpha = this.disabled ? 0.05 : this.playing ? 0.55 : 0.25 + breathe * 0.25;
		this.ring.alpha = this.disabled ? 0.1 : 0.55 + breathe * 0.2;
	}
	/** little "kick" on press */
	kick() {
		anim.tween({ duration: 300, ease: ease.outBack }, (t) => (this.glyph.rotation = t * Math.PI * 2)).then(() => (this.glyph.rotation = 0));
	}
}

/** Amount readout (BALANCE / BET / WIN). */
export class Readout extends PIXI.Container {
	readonly title: PIXI.Text;
	readonly value: PIXI.Text;
	constructor(title: string, private maxW = 220, size = 28) {
		super();
		this.title = label(title, size * 0.5);
		this.value = valueText(size);
		this.title.y = -size * 0.62;
		this.value.y = size * 0.25;
		this.addChild(this.title, this.value);
	}
	set(text: string) {
		if (this.value.text === text) return;
		this.value.text = text;
		this.value.scale.set(1);
		if (this.value.width > this.maxW) this.value.scale.set(this.maxW / this.value.width);
	}
}

/** Feature button (BUY FEATURE / LURE BAIT toggle). */
export class FeatureButton extends Pressable {
	private plate = new PIXI.Graphics();
	private art = new PIXI.Sprite();
	private glow = new PIXI.Sprite(fx.glow());
	readonly top: PIXI.Text;
	readonly bottom: PIXI.Text;
	private pip = new PIXI.Graphics();
	active = false;
	private t = Math.random() * 6;
	constructor(private artKey: string, topText: string, bottomText: string, private w = 210, private h = 92, private accent = COLORS.magenta, private toggle = false) {
		super();
		this.glow.anchor.set(0.5);
		this.glow.blendMode = 'add';
		this.glow.tint = accent;
		this.art.anchor.set(0.5);
		this.top = new PIXI.Text({ text: topText, style: textStyle(26, { glow: accent }) });
		this.top.anchor.set(0.5);
		this.bottom = new PIXI.Text({ text: bottomText, style: textStyle(18, { weight: '700', italic: false, glow: accent, strokeWidth: 3 }) });
		this.bottom.anchor.set(0.5);
		this.addChild(this.glow, this.plate, this.art, this.top, this.bottom, this.pip);
		this.hitArea = new PIXI.Rectangle(-w / 2, -h / 2, w, h);
		this.redraw();
	}
	redraw() {
		const { w, h } = this;
		this.art.texture = hasArt(this.artKey) ? tex(this.artKey) : PIXI.Texture.EMPTY;
		this.plate.clear();
		if (this.art.texture !== PIXI.Texture.EMPTY) {
			this.art.scale.set(Math.max(w / this.art.texture.width, h / this.art.texture.height) * 1.05);
		} else {
			const grad = new PIXI.FillGradient(0, 0, 0, 1);
			grad.addColorStop(0, this.active ? 0x5a1a52 : 0x2a0f3d);
			grad.addColorStop(1, 0x0a0418);
			this.plate.roundRect(-w / 2, -h / 2, w, h, 22).fill(grad);
			this.plate.roundRect(-w / 2, -h / 2, w, h, 22).stroke({ color: this.accent, width: 3 });
		}
		this.top.y = -h * 0.14;
		this.bottom.y = h * 0.24;
		this.glow.scale.set((w * 1.6) / 256, (h * 2) / 256);
		this.pip.clear();
		if (this.toggle) {
			this.pip.roundRect(w / 2 - 46, -h / 2 + 10, 34, 18, 9).fill({ color: this.active ? COLORS.amber : 0x22344a });
			this.pip.circle(this.active ? w / 2 - 21 : w / 2 - 37, -h / 2 + 19, 7).fill(0xffffff);
		}
		const fit = (t: PIXI.Text, mw: number) => {
			t.scale.set(1);
			if (t.width > mw) t.scale.set(mw / t.width);
		};
		fit(this.top, w * 0.8);
		fit(this.bottom, w * 0.84);
	}
	setActive(a: boolean) {
		if (a === this.active) return;
		this.active = a;
		this.redraw();
	}
	update(dt: number) {
		this.tickPress();
		this.t += dt / 1000;
		this.glow.alpha = (this.active ? 0.55 : 0.22) + Math.sin(this.t * 2.5) * 0.1;
	}
}

export type UiState = {
	layout: LayoutType;
	balance: string;
	bet: string;
	betLabel: string;
	win: string;
	idle: boolean;
	canBet: boolean;
	spinMode: 'spin' | 'stop';
	autoCount: number;
	turbo: boolean;
	sound: boolean;
	anteOn: boolean;
	anteCost: string;
	buyLabel: string;
	anteLabel: string;
	showFeatures: boolean;
	featureDisabled: boolean;
	hideAutoplay: boolean;
	hideTurbo: boolean;
	hideBuy: boolean;
	minBet: boolean;
	maxBet: boolean;
	message: string;
};

export type UiActions = {
	spin: () => void;
	betUp: () => void;
	betDown: () => void;
	betMenu: () => void;
	turbo: () => void;
	auto: () => void;
	sound: () => void;
	menu: () => void;
	info: () => void;
	buy: () => void;
	ante: () => void;
};

/**
 * Bespoke console: a carved abyssal-glass bar with bio-cyan inlay, the pearl
 * spin button, readouts and round glass buttons, and the two feature buttons.
 */
export class UiBar {
	readonly root = new PIXI.Container();
	private consoleG = new PIXI.Graphics();
	private consoleArt?: PIXI.NineSliceSprite;
	private spin = new SpinButton(72);
	private plus = new RoundButton('plus', 26);
	private minus = new RoundButton('minus', 26);
	private turbo = new RoundButton('turbo', 30);
	private auto = new RoundButton('auto', 30);
	private menu = new RoundButton('menu', 28);
	private sound = new RoundButton('sound', 28);
	private info = new RoundButton('info', 28);
	private balance = new Readout('BALANCE');
	private bet = new Readout('BET', 200, 30);
	private win = new Readout('WIN');
	private buy = new FeatureButton('ui_feature', 'BUY', 'FEATURE');
	private ante = new FeatureButton('ui_feature', 'LURE BAIT', '', 210, 92, COLORS.cyan, true);
	private msg = valueText(22);
	private layoutType: LayoutType | null = null;

	constructor(private actions: UiActions) {
		this.spin.onPress = () => {
			this.spin.kick();
			actions.spin();
		};
		this.plus.onPress = actions.betUp;
		this.minus.onPress = actions.betDown;
		this.turbo.onPress = actions.turbo;
		this.auto.onPress = actions.auto;
		this.menu.onPress = actions.menu;
		this.sound.onPress = actions.sound;
		this.info.onPress = actions.info;
		this.buy.onPress = actions.buy;
		this.ante.onPress = actions.ante;
		const betHit = new Pressable();
		betHit.hitArea = new PIXI.Rectangle(-80, -34, 160, 68);
		betHit.onPress = actions.betMenu;
		this.bet.addChild(betHit);
		this.msg.alpha = 0;
		this.root.addChild(this.consoleG, this.balance, this.bet, this.win, this.minus, this.plus, this.menu, this.sound, this.info, this.turbo, this.auto, this.buy, this.ante, this.spin, this.msg);
	}

	refreshArt() {
		if (hasArt('ui_console') && !this.consoleArt) {
			this.consoleArt = new PIXI.NineSliceSprite({ texture: tex('ui_console'), leftWidth: 190, rightWidth: 190, topHeight: 110, bottomHeight: 110 });
			this.root.addChildAt(this.consoleArt, 0);
		}
		for (const b of [this.plus, this.minus, this.turbo, this.auto, this.menu, this.sound, this.info]) b.redraw();
		this.spin.redraw();
		this.buy.redraw();
		this.ante.redraw();
		this.layoutType = null;
	}

	private drawConsole(x: number, y: number, w: number, h: number) {
		const g = this.consoleG;
		g.clear();
		if (this.consoleArt) {
			const k = Math.min(1, h / 222);
			this.consoleArt.scale.set(k);
			this.consoleArt.width = w / k;
			this.consoleArt.height = h / k;
			this.consoleArt.position.set(x, y);
			return;
		}
		const grad = new PIXI.FillGradient(0, 0, 0, 1);
		grad.addColorStop(0, 0x0c2c42);
		grad.addColorStop(0.35, 0x051726);
		grad.addColorStop(1, 0x01060e);
		g.roundRect(x, y, w, h, 28).fill({ color: 0x000000, alpha: 0.5 });
		g.roundRect(x, y + 4, w, h - 4, 28).fill(grad);
		g.roundRect(x, y + 4, w, h - 4, 28).stroke({ color: COLORS.cyan, width: 2, alpha: 0.65 });
		g.moveTo(x + 40, y + 9).lineTo(x + w - 40, y + 9).stroke({ color: 0xffffff, width: 1.5, alpha: 0.35 });
	}

	layout(type: LayoutType) {
		if (type === this.layoutType) return;
		this.layoutType = type;
		const P = (c: PIXI.Container, x: number, y: number, s = 1) => {
			c.position.set(x, y);
			c.scale.set(s);
			if (c instanceof Pressable) c.scaleBase = s;
		};
		if (type === 'desktop' || type === 'landscape') {
			const L = type === 'landscape';
			const y = L ? 838 : 852;
			const u = L ? 1.22 : 1;
			this.drawConsole(14, L ? 778 : 802, 1572, L ? 118 : 94);
			P(this.menu, 60, y, u);
			P(this.sound, 130 * (L ? 1.08 : 1), y, u);
			P(this.info, 200 * (L ? 1.1 : 1), y, u);
			P(this.balance, L ? 420 : 390, y, u);
			P(this.minus, L ? 640 : 655, y, u);
			P(this.bet, 800, y, u);
			P(this.plus, L ? 960 : 945, y, u);
			P(this.win, L ? 1150 : 1135, y, u);
			P(this.turbo, L ? 1330 : 1345, y, u);
			P(this.spin, 1460, L ? 790 : 812, L ? 1.12 : 1);
			P(this.auto, L ? 1562 : 1556, y, u);
			P(this.buy, 172, L ? 470 : 480, L ? 1.05 : 1);
			P(this.ante, 172, L ? 590 : 600, L ? 1.05 : 1);
			P(this.msg, 665, L ? 760 : 785, 1);
		} else if (type === 'portrait') {
			this.drawConsole(12, 1236, 876, 352);
			P(this.buy, 228, 1300, 1.1);
			P(this.ante, 672, 1300, 1.1);
			P(this.minus, 270, 1425, 1.35);
			P(this.spin, 450, 1425, 1.2);
			P(this.plus, 630, 1425, 1.35);
			P(this.turbo, 100, 1425, 1.2);
			P(this.auto, 800, 1425, 1.2);
			P(this.menu, 60, 1540, 1.1);
			P(this.balance, 240, 1540, 1.1);
			P(this.bet, 450, 1540, 1.15);
			P(this.win, 660, 1540, 1.1);
			P(this.sound, 842, 1540, 1.1);
			P(this.info, 842, 1360, 0.0001);
			P(this.msg, 450, 1222, 1.2);
		} else {
			// tablet (near square)
			this.drawConsole(12, 1010, 1176, 180);
			P(this.buy, 190, 1060, 0.95);
			P(this.ante, 410, 1060, 0.95);
			P(this.minus, 760, 1100, 1.1);
			P(this.spin, 905, 1100, 1.05);
			P(this.plus, 1050, 1100, 1.1);
			P(this.turbo, 1140, 1040, 1);
			P(this.auto, 1140, 1160, 1);
			P(this.menu, 60, 1155, 1);
			P(this.sound, 130, 1155, 1);
			P(this.info, 200, 1155, 1);
			P(this.balance, 360, 1155, 1);
			P(this.bet, 560, 1155, 1);
			P(this.win, 560, 1060, 0.0001);
			P(this.msg, 600, 990, 1.1);
		}
	}

	private lastMsg = '';
	update(s: UiState, dt: number) {
		this.layout(s.layout);
		this.balance.set(s.balance);
		this.bet.set(s.bet);
		this.bet.title.text = s.betLabel;
		this.win.set(s.win);
		this.spin.set(s.spinMode, !s.idle, s.autoCount);
		this.spin.disabled = s.idle && !s.canBet;
		this.plus.disabled = !s.idle || s.maxBet || !s.showFeatures;
		this.minus.disabled = !s.idle || s.minBet || !s.showFeatures;
		this.turbo.setActive(s.turbo);
		this.turbo.visible = !s.hideTurbo;
		this.auto.setActive(s.autoCount !== 0);
		this.auto.visible = !s.hideAutoplay;
		this.auto.disabled = (!s.idle && s.autoCount === 0) || !s.showFeatures;
		this.sound.setIcon(s.sound ? 'sound' : 'mute');
		this.menu.disabled = !s.idle;
		this.info.disabled = !s.idle;
		this.buy.visible = !s.hideBuy && s.showFeatures;
		this.ante.visible = s.showFeatures;
		this.buy.disabled = this.ante.disabled = !s.idle || s.featureDisabled;
		this.ante.setActive(s.anteOn);
		if (this.buy.top.text !== s.buyLabel) {
			this.buy.top.text = s.buyLabel;
			this.buy.redraw();
		}
		const anteBottom = s.anteCost;
		if (this.ante.bottom.text !== anteBottom || this.ante.top.text !== s.anteLabel) {
			this.ante.bottom.text = anteBottom;
			this.ante.top.text = s.anteLabel;
			this.ante.redraw();
		}
		if (s.message !== this.lastMsg) {
			this.lastMsg = s.message;
			this.msg.text = s.message;
		}
		this.msg.alpha += ((s.message ? 1 : 0) - this.msg.alpha) * 0.2;
		for (const b of [this.plus, this.minus, this.turbo, this.auto, this.menu, this.sound, this.info]) b.update();
		this.spin.update(dt);
		this.buy.update(dt);
		this.ante.update(dt);
	}
}
