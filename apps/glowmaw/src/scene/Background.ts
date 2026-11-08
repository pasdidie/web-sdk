import * as PIXI from 'pixi.js';

import { anim, ease, rand } from './anim';
import { ParticleSystem } from './particles';
import { COLORS } from './theme';
import { fx, tex, hasArt } from './textures';

/**
 * Living trench: painted layers (far / near) with slow parallax drift, light
 * shafts that breathe, marine snow, bubble columns rising from vents, distant
 * glowing fish crossing, and a free-spins colour grade (magenta frenzy).
 */
export class Background {
	readonly root = new PIXI.Container();
	private base = new PIXI.Graphics();
	private far = new PIXI.Sprite();
	private near = new PIXI.Sprite();
	private shafts: PIXI.Sprite[] = [];
	private tintLayer = new PIXI.Sprite(fx.softGlow());
	private snow = new ParticleSystem(180);
	private bubbles = new ParticleSystem(80);
	private glowFish: { s: PIXI.Container; vx: number; phase: number }[] = [];
	private vignette = new PIXI.Sprite(fx.vignette());
	private w = 1;
	private h = 1;
	private t = 0;
	private frenzy = 0;
	private frenzyTarget = 0;
	private vents: number[] = [0.12, 0.33, 0.7, 0.9];
	reduced = false;

	constructor() {
		this.far.anchor.set(0.5);
		this.near.anchor.set(0.5, 1);
		this.tintLayer.anchor.set(0.5);
		this.tintLayer.blendMode = 'add';
		this.tintLayer.tint = COLORS.magenta;
		this.tintLayer.alpha = 0;
		this.root.addChild(this.base, this.far);
		for (let i = 0; i < 4; i++) {
			const s = new PIXI.Sprite(fx.beam());
			s.anchor.set(0.5, 0);
			s.blendMode = 'add';
			s.tint = i % 2 ? 0x4fd8ff : COLORS.cyan;
			s.alpha = 0.08;
			this.shafts.push(s);
			this.root.addChild(s);
		}
		this.root.addChild(this.snow.container, this.near, this.bubbles.container, this.tintLayer, this.vignette);
		this.vignette.anchor.set(0.5);
	}

	refreshArt() {
		this.far.texture = hasArt('bg_far') ? tex('bg_far') : PIXI.Texture.EMPTY;
		this.near.texture = hasArt('bg_near') ? tex('bg_near') : PIXI.Texture.EMPTY;
		this.resize(this.w, this.h, true);
	}

	resize(w: number, h: number, force = false) {
		if (!force && w === this.w && h === this.h) return;
		this.w = w;
		this.h = h;
		this.base.clear();
		const g = new PIXI.FillGradient(0, 0, 0, 1);
		g.addColorStop(0, 0x07203a);
		g.addColorStop(0.55, 0x041022);
		g.addColorStop(1, 0x01040c);
		this.base.rect(0, 0, w, h).fill(g);
		const cover = (s: PIXI.Sprite, extra = 1.06) => {
			if (s.texture === PIXI.Texture.EMPTY) return;
			const k = Math.max(w / s.texture.width, h / s.texture.height) * extra;
			s.scale.set(k);
		};
		cover(this.far, 1.08);
		this.far.position.set(w / 2, h / 2);
		if (this.near.texture !== PIXI.Texture.EMPTY) {
			const k = Math.max(w / this.near.texture.width, (h * 0.55) / this.near.texture.height) * 1.04;
			this.near.scale.set(k);
		}
		this.near.position.set(w / 2, h + 4);
		this.shafts.forEach((s, i) => {
			s.x = w * (0.18 + i * 0.22);
			s.y = -h * 0.05;
			s.height = h * 1.15;
			s.width = w * 0.09 * (1 + (i % 2) * 0.6);
			s.rotation = -0.18 + i * 0.09;
		});
		this.tintLayer.position.set(w / 2, h * 0.7);
		this.tintLayer.width = w * 1.6;
		this.tintLayer.height = h * 1.3;
		this.vignette.position.set(w / 2, h / 2);
		this.vignette.width = w * 1.15;
		this.vignette.height = h * 1.15;
		this.snow.clear();
		for (let i = 0; i < 70; i++) this.spawnSnow(true);
	}

	setFrenzy(on: boolean) {
		this.frenzyTarget = on ? 1 : 0;
	}

	/** One-off: vents erupt (free spins trigger, big win). */
	erupt(strength = 1) {
		for (const v of this.vents) {
			this.bubbles.spawn({
				texture: fx.bubble(),
				x: this.w * v,
				y: this.h * 0.98,
				spreadX: 30,
				count: Math.round(10 * strength),
				angle: -Math.PI / 2,
				cone: 0.5,
				speed: [140, 320],
				life: [1800, 3200],
				size: [8, 26],
				endSizeRatio: 1.1,
				alpha: 0.6,
				blend: 'normal',
			});
		}
	}

	private spawnSnow(anywhere = false) {
		this.snow.spawn({
			texture: fx.spark(),
			x: rand(0, this.w),
			y: anywhere ? rand(0, this.h) : -10,
			count: 1,
			angle: Math.PI / 2,
			cone: 0.6,
			speed: [8, 26],
			life: [9000, 16000],
			size: [2, 5],
			endSizeRatio: 0.7,
			tint: [0xbfe9ff, 0x9ffcf0, 0xffffff],
			alpha: 0.55,
			fadeIn: 0.15,
		});
	}

	private spawnFish() {
		const c = new PIXI.Container();
		const n = 1 + Math.floor(rand(0, 4));
		for (let i = 0; i < n; i++) {
			const d = new PIXI.Sprite(fx.spark());
			d.anchor.set(0.5);
			d.blendMode = 'add';
			d.tint = Math.random() < 0.5 ? COLORS.cyan : 0x7ab8ff;
			d.scale.set(rand(0.12, 0.22));
			d.x = i * rand(10, 18);
			d.y = rand(-8, 8);
			c.addChild(d);
		}
		const dir = Math.random() < 0.5 ? 1 : -1;
		c.x = dir > 0 ? -60 : this.w + 60;
		c.y = rand(this.h * 0.12, this.h * 0.6);
		c.alpha = 0.7;
		this.root.addChildAt(c, this.root.getChildIndex(this.near));
		this.glowFish.push({ s: c, vx: dir * rand(25, 55), phase: rand(0, 6) });
	}

	update(dt: number) {
		this.t += dt;
		const s = this.t / 1000;
		this.frenzy += (this.frenzyTarget - this.frenzy) * Math.min(1, dt * 0.002);
		if (!this.reduced) {
			this.far.x = this.w / 2 + Math.sin(s * 0.07) * this.w * 0.012;
			this.far.y = this.h / 2 + Math.sin(s * 0.05) * this.h * 0.008;
			this.near.x = this.w / 2 + Math.sin(s * 0.09 + 1) * this.w * 0.02;
		}
		this.shafts.forEach((sh, i) => {
			sh.alpha = (0.05 + 0.05 * Math.sin(s * (0.3 + i * 0.07) + i * 2)) * (1 + this.frenzy * 0.6);
			sh.tint = this.frenzy > 0.5 ? (i % 2 ? COLORS.magenta : COLORS.violet) : i % 2 ? 0x4fd8ff : COLORS.cyan;
		});
		this.tintLayer.alpha = this.frenzy * (0.22 + 0.06 * Math.sin(s * 1.3));
		if (Math.random() < dt * 0.006) this.spawnSnow();
		if (Math.random() < dt * (0.0025 + this.frenzy * 0.006)) {
			const v = this.vents[Math.floor(Math.random() * this.vents.length)];
			this.bubbles.spawn({
				texture: fx.bubble(),
				x: this.w * v + rand(-20, 20),
				y: this.h * 0.98,
				count: 1,
				angle: -Math.PI / 2,
				cone: 0.25,
				speed: [50, 120],
				life: [4000, 7000],
				size: [6, 16],
				endSizeRatio: 1.2,
				alpha: 0.45,
				blend: 'normal',
			});
		}
		if (!this.reduced && this.glowFish.length < 3 && Math.random() < dt * 0.00012) this.spawnFish();
		for (let i = this.glowFish.length - 1; i >= 0; i--) {
			const f = this.glowFish[i];
			f.phase += dt * 0.003;
			f.s.x += (f.vx * dt) / 1000;
			f.s.y += Math.sin(f.phase) * 0.15;
			f.s.children.forEach((c, k) => (c.alpha = 0.5 + 0.5 * Math.sin(f.phase * 2 + k)));
			if (f.s.x < -100 || f.s.x > this.w + 100) {
				f.s.destroy({ children: true });
				this.glowFish.splice(i, 1);
			}
		}
		this.snow.update(dt);
		this.bubbles.update(dt);
	}

	/** quick full-screen colour flash (feature trigger, max win) */
	flash(color = 0xffffff, ms = 500) {
		const f = new PIXI.Graphics().rect(0, 0, this.w, this.h).fill(color);
		f.blendMode = 'add';
		this.root.addChild(f);
		anim.tween({ duration: ms, ease: ease.outCubic }, (t) => (f.alpha = 0.8 * (1 - t))).then(() => f.destroy());
	}
}
