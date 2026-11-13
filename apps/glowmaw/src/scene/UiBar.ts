import * as PIXI from 'pixi.js';
import { GText } from './theme';

import { anim, ease } from './anim';
import { COLORS, textStyle } from './theme';
import { fx, hasArt, tex } from './textures';
import type { LayoutType } from './Scene';

export type UiIcon = 'menu' | 'sound' | 'mute' | 'info' | 'turbo' | 'auto' | 'plus' | 'minus' | 'spin' | 'stop' | 'close' | 'settings';

/** Crisp vector icons (UI glyphs), stroked in the bio-cyan with a soft glow. */
export const drawIcon = (g: PIXI.Graphics, icon: UiIcon, s: number, color = 0xe9fbff, wk = 1) => {
	g.clear();
	const w = Math.max(2, s * 0.12) * wk;
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
	const t = new GText({ text, style: { ...textStyle(size, { weight, italic: false, glow: COLORS.cyan, strokeWidth: 0 }), fill: color, letterSpacing: size * 0.18 } as any });
	t.anchor.set(0.5);
	return t;
};
const valueText = (size: number) => {
	const t = new GText({ text: '', style: textStyle(size, { glow: COLORS.cyan, strokeWidth: size * 0.08 }) });
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
		this.alpha += ((this.disabled ? 0.55 : 1) - this.alpha) * 0.3;
	}
}

/** Small round glass button with a vector glyph. */
export class RoundButton extends Pressable {
	private disc = new PIXI.Graphics();
	private art = new PIXI.Sprite();
	private glow = new PIXI.Sprite(fx.glow());
	readonly glyph = new PIXI.Graphics();
	/** soft wide stroke of the same glyph behind it: keeps the icon legible on the glass at any size */
	private glyphGlow = new PIXI.Graphics();
	active = false;
	private r: number;
	constructor(public icon: UiIcon, r = 34, private accent = COLORS.cyan) {
		super();
		this.r = r;
		this.glow.anchor.set(0.5);
		this.glow.blendMode = 'add';
		this.glow.tint = accent;
		this.art.anchor.set(0.5);
		this.glyphGlow.blendMode = 'add';
		this.addChild(this.glow, this.disc, this.art, this.glyphGlow, this.glyph);
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
		drawIcon(this.glyph, this.icon, r * 1.05, this.active ? COLORS.amber : 0xffffff);
		drawIcon(this.glyphGlow, this.icon, r * 1.05, this.active ? COLORS.amber : this.accent, 2.8);
		this.glyphGlow.alpha = 0.3;
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
		this.glow.alpha = this.disabled ? 0.05 : this.active ? 0.7 : this.hovered ? 0.5 : 0.2;
		// disabled: glyph dims to a cool grey-blue (reads "not now", not "broken")
		this.glyph.tint = this.disabled ? 0x7f9db0 : 0xffffff;
		this.glyphGlow.alpha = this.disabled ? 0 : this.active ? 0.55 : this.hovered ? 0.45 : 0.3;
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
	private spinAngle = 0;
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
		this.spinAngle += (this.speed * dt) / 1000;
		this.ring.rotation = this.spinAngle;
		this.orbit.rotation = this.spinAngle * 1.4;
		this.orbit.children.forEach((c) => {
			c.x = Math.cos(c.rotation) * this.r * 1.02;
			c.y = Math.sin(c.rotation) * this.r * 1.02;
			c.scale.set((this.r * 0.42) / 64);
		});
		this.art.rotation = this.playing ? this.spinAngle * 0.15 : 0;
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
	/** small "opens a menu" chevron after the title (BET) */
	private chevron?: PIXI.Graphics;
	private fit = 1;
	private popT = 1;
	constructor(title: string, public maxW = 220, private size = 28, chevron = false) {
		super();
		this.title = label(title, size * 0.5);
		this.value = valueText(size);
		this.title.y = -size * 0.62;
		this.value.y = size * 0.25;
		this.addChild(this.title, this.value);
		if (chevron) {
			this.chevron = new PIXI.Graphics();
			this.addChild(this.chevron);
			this.placeChevron();
		}
	}
	private placeChevron() {
		if (!this.chevron) return;
		const k = this.size * 0.5;
		this.chevron.clear().moveTo(-k * 0.32, -k * 0.16).lineTo(0, k * 0.16).lineTo(k * 0.32, -k * 0.16).stroke({ color: 0x8fe9ff, width: Math.max(2, k * 0.16), cap: 'round', join: 'round' });
		this.chevron.position.set(this.title.width / 2 + k * 0.62, this.title.y + k * 0.02);
	}
	setTitle(text: string) {
		if (this.title.text === text) return;
		this.title.text = text;
		this.placeChevron();
	}
	set(text: string) {
		if (this.value.text === text) return;
		this.value.text = text;
		this.value.scale.set(1);
		this.fit = this.value.width > this.maxW ? this.maxW / this.value.width : 1;
		this.value.scale.set(this.fit * (this.popT < 1 ? 1 + 0.2 * Math.sin(Math.PI * this.popT) : 1));
	}
	/** quick swell when a win lands on the meter */
	pop() {
		this.popT = 0;
	}
	tick(dt: number) {
		if (this.popT >= 1) return;
		this.popT = Math.min(1, this.popT + dt / 420);
		this.value.scale.set(this.fit * (1 + 0.2 * Math.sin(Math.PI * this.popT)));
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
	/** ON / OFF word inside the toggle track */
	private pipText = new GText({ text: 'OFF', style: textStyle(13, { weight: '900', italic: false, strokeWidth: 0 }) });
	active = false;
	private t = Math.random() * 6;
	constructor(private artKey: string, topText: string, bottomText: string, private w = 210, private h = 92, private accent = COLORS.magenta, private toggle = false) {
		super();
		this.glow.anchor.set(0.5);
		this.glow.blendMode = 'add';
		this.glow.tint = accent;
		this.art.anchor.set(0.5);
		this.top = new GText({ text: topText, style: textStyle(26, { glow: accent }) });
		this.top.anchor.set(0.5);
		this.bottom = new GText({ text: bottomText, style: textStyle(18, { weight: '700', italic: false, glow: accent, strokeWidth: 3 }) });
		this.bottom.anchor.set(0.5);
		this.pipText.anchor.set(0.5);
		this.pipText.style.dropShadow = false;
		this.pipText.visible = toggle;
		this.addChild(this.glow, this.plate, this.art, this.top, this.bottom, this.pip, this.pipText);
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
		const fit = (t: PIXI.Text, mw: number) => {
			t.scale.set(1);
			if (t.width > mw) t.scale.set(mw / t.width);
		};
		fit(this.top, w * 0.8);
		if (this.toggle) {
			// bottom row = cost hint (left) + a real ON/OFF switch (right): the state reads at a glance
			const tw = 52;
			const th = 24;
			const tx = w * 0.29;
			const ty = h * 0.24;
			const on = this.active;
			this.pip.roundRect(tx - tw / 2, ty - th / 2, tw, th, th / 2).fill({ color: on ? COLORS.amber : 0x0b1626 }).stroke({ color: on ? 0xffe2a0 : 0x5d7a92, width: 2 });
			this.pip.circle(on ? tx + tw / 2 - th / 2 : tx - tw / 2 + th / 2, ty, th / 2 - 3.5).fill(0xffffff);
			this.pipText.text = on ? 'ON' : 'OFF';
			this.pipText.style.fill = on ? 0x3a1800 : 0xa9c4d6;
			this.pipText.position.set(on ? tx - 7 : tx + 7, ty);
			this.bottom.anchor.set(0.5);
			fit(this.bottom, w * 0.5);
			this.bottom.x = -w * 0.14;
			this.bottom.alpha = on ? 1 : 0.85;
		} else {
			fit(this.bottom, w * 0.84);
		}
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
	replay: boolean;
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
/** design-space scale of the desktop/landscape/portrait console art: rims ~26 px, end caps ~71 px */
const CONSOLE_K = 0.3;

export class UiBar {
	readonly root = new PIXI.Container();
	private consoleG = new PIXI.Graphics();
	/** group furniture drawn over the console channel: separators + the recessed BET pod */
	private decor = new PIXI.Graphics();
	private consoleArt?: PIXI.NineSliceSprite;
	/** dedicated two-channel tablet console (upper/lower channel split by a cyan divider at mid height) */
	private consoleTabletArt?: PIXI.NineSliceSprite;
	private spin = new SpinButton(72);
	private plus = new RoundButton('plus', 26);
	private minus = new RoundButton('minus', 26);
	private turbo = new RoundButton('turbo', 30);
	private auto = new RoundButton('auto', 30);
	private menu = new RoundButton('menu', 28);
	private sound = new RoundButton('sound', 28);
	private info = new RoundButton('info', 28);
	private balance = new Readout('BALANCE');
	private bet = new Readout('BET', 150, 30, true);
	private win = new Readout('WIN', 230, 32);
	private lastWin = '';
	private buy = new FeatureButton('ui_feature', 'BUY', 'FEATURE');
	private ante = new FeatureButton('ui_feature', 'LURE BAIT', '', 210, 92, COLORS.cyan, true);
	private msg = valueText(22);
	/** dark pill behind the message: it sits on the console rim like a tab */
	private msgTab = new PIXI.Graphics();
	private layoutType: LayoutType | null = null;
	private pod: { x: number; y: number; w: number; h: number } | null = null;
	private seps: number[] = [];
	private sepY: [number, number] = [0, 0];

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
		betHit.hitArea = new PIXI.Rectangle(-85, -36, 170, 72);
		betHit.onPress = actions.betMenu;
		this.bet.addChild(betHit);
		this.msg.alpha = 0;
		this.msgTab.alpha = 0;
		this.root.addChild(this.consoleG, this.decor, this.balance, this.bet, this.win, this.minus, this.plus, this.menu, this.sound, this.info, this.turbo, this.auto, this.buy, this.ante, this.spin, this.msgTab, this.msg);
	}

	refreshArt() {
		if (hasArt('ui_console') && !this.consoleArt) {
			this.consoleArt = new PIXI.NineSliceSprite({ texture: tex('ui_console'), leftWidth: 236, rightWidth: 236, topHeight: 88, bottomHeight: 86 });
			this.root.addChildAt(this.consoleArt, 0);
		}
		if (hasArt('ui_console_tablet') && !this.consoleTabletArt) {
			this.consoleTabletArt = new PIXI.NineSliceSprite({ texture: tex('ui_console_tablet'), leftWidth: 210, rightWidth: 210, topHeight: 100, bottomHeight: 100 });
			this.consoleTabletArt.visible = false;
			this.root.addChildAt(this.consoleTabletArt, 0);
		}
		for (const b of [this.plus, this.minus, this.turbo, this.auto, this.menu, this.sound, this.info]) b.redraw();
		this.spin.redraw();
		this.buy.redraw();
		this.ante.redraw();
		this.layoutType = null;
	}

	private drawConsole(x: number, y: number, w: number, h: number, tablet = false) {
		const g = this.consoleG;
		g.clear();
		const useTablet = tablet && !!this.consoleTabletArt;
		if (this.consoleTabletArt) this.consoleTabletArt.visible = useTablet;
		if (this.consoleArt) this.consoleArt.visible = !useTablet;
		if (useTablet) {
			// scale so the art height maps 1:1 (no vertical stretch: the divider stays a crisp line);
			// only the plain middle stretches horizontally
			const a = this.consoleTabletArt!;
			const k = h / a.texture.height;
			a.scale.set(k);
			a.width = w / k;
			a.height = h / k;
			a.position.set(x, y);
			return;
		}
		if (this.consoleArt) {
			// slices measured on the art (1600x444): rims 88/86 px, ornate end caps 236 px. Fixed scale so
			// the rims stay slim and only the plain channel stretches (a height-derived scale crushed the
			// channel to a few px and pushed the readouts onto the inlay lines).
			const k = CONSOLE_K;
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
			// console channel (inner dark area) spans y+26 .. y+h-26; the control row sits on its centre.
			// The console stops before the spin: the spin is a free-standing hero at the right, not a
			// medallion sitting on the ornate end cap.
			const cy = L ? 764 : 772;
			const ch = L ? 136 : 126;
			const y = cy + ch / 2;
			const u = L ? 1.2 : 1; // touch targets on phones
			const ru = L ? 1.1 : 1; // readouts
			const right = 1396;
			this.drawConsole(14, cy, right - 14, ch);
			// pack the groups between the end caps (caps ~71 px at CONSOLE_K) with even gaps
			const x0 = 14 + 74;
			const x1 = right - 70;
			const btn = 64 * u; // pitch of the small round buttons
			const groups: { w: number; place: (x: number) => void }[] = [
				{ w: btn * 3, place: (x) => { P(this.menu, x + btn * 0.5, y, u); P(this.sound, x + btn * 1.5, y, u); P(this.info, x + btn * 2.5, y, u); } },
				{ w: 200 * ru, place: (x) => P(this.balance, x + 100 * ru, y, ru) },
				{ w: 236 * ru, place: (x) => P(this.win, x + 118 * ru, y, ru) },
				{ w: 300 * ru, place: (x) => {
					// BET pod: - [value v] +, one recessed control
					const cx = x + 150 * ru;
					P(this.minus, cx - 112 * ru, y, u);
					P(this.bet, cx, y, ru);
					P(this.plus, cx + 112 * ru, y, u);
					this.pod = { x: cx, y, w: 300 * ru, h: ch - 54 };
				} },
				{ w: btn * 2.2, place: (x) => { P(this.turbo, x + btn * 0.55, y, u); P(this.auto, x + btn * 1.65, y, u); } },
			];
			const free = x1 - x0 - groups.reduce((a, g) => a + g.w, 0);
			const gap = free / (groups.length - 1);
			let x = x0;
			this.seps = [];
			groups.forEach((g, i) => {
				g.place(x);
				x += g.w;
				if (i < groups.length - 1) this.seps.push(x + gap / 2);
				x += gap;
			});
			this.sepY = [y - ch * 0.26, y + ch * 0.26];
			// spin hero at the right, rising a little above the console top
			P(this.spin, 1496, L ? 806 : 812, L ? 1.1 : 1);
			P(this.buy, 172, L ? 470 : 480, L ? 1.05 : 1);
			P(this.ante, 172, L ? 590 : 600, L ? 1.05 : 1);
			P(this.msg, 700, L ? 777 : 785, 1); // on the console rim, over its own dark tab
		} else if (type === 'portrait') {
			// console strip only for the readout row; spin row and feature row float above it
			this.drawConsole(10, 1470, 880, 128);
			this.seps = [];
			this.pod = null;
			P(this.buy, 228, 1238, 1.05);
			P(this.ante, 672, 1238, 1.05);
			P(this.turbo, 96, 1362, 1.2);
			P(this.minus, 262, 1362, 1.3);
			P(this.spin, 450, 1356, 1.18);
			P(this.plus, 638, 1362, 1.3);
			P(this.auto, 804, 1362, 1.2);
			P(this.menu, 116, 1534, 1.05);
			P(this.balance, 272, 1534, 1.05);
			P(this.bet, 450, 1534, 1.1);
			P(this.win, 628, 1534, 1.05);
			P(this.sound, 784, 1534, 1.05);
			P(this.info, 836, 1360, 0.0001);
			P(this.msg, 450, 1290, 1.2);
		} else {
			// tablet (near square): two-channel console 12..1188 x 980..1200 (art 1600x474 scaled 0.464).
			// Upper channel centre y 1047, divider y 1094, lower channel centre y 1143, inner x 89..1111 (measured).
			// Spin straddles the divider at the right end like a hub.
			this.drawConsole(12, 980, 1176, 220, true);
			const up = 1047;
			const lo = 1143;
			// upper channel: features | BET pod (- value +) | turbo/auto ; lower: info cluster | BALANCE | WIN
			P(this.buy, 186, up, 0.78);
			P(this.ante, 362, up, 0.78);
			P(this.minus, 506, up, 0.95);
			P(this.bet, 618, up, 0.86);
			P(this.plus, 730, up, 0.95);
			this.pod = { x: 618, y: up, w: 272, h: 72 };
			P(this.turbo, 822, up, 0.88);
			P(this.auto, 892, up, 0.88);
			P(this.menu, 128, lo, 0.9);
			P(this.sound, 190, lo, 0.9);
			P(this.info, 252, lo, 0.9);
			P(this.balance, 450, lo, 0.92);
			P(this.win, 740, lo, 0.92);
			this.seps = [312, 600];
			this.sepY = [lo - 24, lo + 24];
			P(this.spin, 1032, 1094, 0.98);
			P(this.msg, 600, 950, 1.05);
		}
		this.drawDecor();
	}

	/** separators between control groups + the recessed BET pod (drawn after each layout) */
	private drawDecor() {
		const g = this.decor;
		g.clear();
		for (const x of this.seps) {
			const [a, b] = this.sepY;
			g.moveTo(x, a).lineTo(x, b).stroke({ color: COLORS.cyan, width: 2, alpha: 0.22, cap: 'round' });
			g.circle(x, (a + b) / 2, 2.5).fill({ color: COLORS.cyan, alpha: 0.5 });
		}
		const p = this.pod;
		if (p) {
			const r = p.h / 2;
			g.roundRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, r).fill({ color: 0x010810, alpha: 0.7 });
			g.roundRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, r).stroke({ color: COLORS.cyan, width: 2, alpha: 0.45 });
			// top inner highlight: the pod reads as an inset glass channel
			g.roundRect(p.x - p.w / 2 + 6, p.y - p.h / 2 + 3, p.w - 12, p.h - 6, r - 3).stroke({ color: 0xffffff, width: 1, alpha: 0.08 });
		}
	}

	private lastMsg = '';
	update(s: UiState, dt: number) {
		this.layout(s.layout);
		this.balance.set(s.balance);
		this.bet.set(s.bet);
		this.bet.setTitle(s.betLabel);
		this.win.set(s.win);
		// the win meter swells each time a (non-zero) win lands on it
		if (s.win !== this.lastWin) {
			if (/[1-9]/.test(s.win)) this.win.pop();
			this.lastWin = s.win;
		}
		this.win.tick(dt);
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
		this.buy.visible = !s.hideBuy && s.showFeatures && !s.replay;
		this.ante.visible = s.showFeatures && !s.replay;
		if (s.replay) {
			// replay: no way into real play (Engine [171]); spin button = watch again
			this.plus.visible = this.minus.visible = this.auto.visible = false;
			this.balance.visible = false;
			this.spin.disabled = !s.idle;
		} else {
			this.plus.visible = this.minus.visible = true;
			this.balance.visible = true;
		}
		this.buy.disabled = this.ante.disabled = !s.idle || s.featureDisabled;
		this.ante.setActive(s.anteOn);
		if (this.buy.top.text !== s.buyLabel) {
			this.buy.top.text = s.buyLabel;
			this.buy.redraw();
		}
		// cost hint next to the ON/OFF switch (the switch itself shows the state)
		const anteBottom = `+25% ${s.betLabel}`;
		if (this.ante.bottom.text !== anteBottom || this.ante.top.text !== s.anteLabel) {
			this.ante.bottom.text = anteBottom;
			this.ante.top.text = s.anteLabel;
			this.ante.redraw();
		}
		if (s.message !== this.lastMsg) {
			this.lastMsg = s.message;
			this.msg.text = s.message;
			const w = this.msg.width / Math.max(this.msg.scale.x, 1e-6) + 36;
			const h = 34;
			this.msgTab.clear().roundRect(-w / 2, -h / 2, w, h, h / 2).fill({ color: 0x02060f, alpha: 0.92 }).stroke({ color: 0x3ff5e6, width: 1.5, alpha: 0.6 });
		}
		this.msg.alpha += ((s.message ? 1 : 0) - this.msg.alpha) * 0.2;
		this.msgTab.alpha = this.msg.alpha;
		this.msgTab.position.copyFrom(this.msg.position);
		this.msgTab.scale.copyFrom(this.msg.scale);
		for (const b of [this.plus, this.minus, this.turbo, this.auto, this.menu, this.sound, this.info]) b.update();
		this.spin.update(dt);
		this.buy.update(dt);
		this.ante.update(dt);
	}
}
