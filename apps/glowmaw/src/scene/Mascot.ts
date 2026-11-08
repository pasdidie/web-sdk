import * as PIXI from 'pixi.js';

import { anim, ease, clamp } from './anim';
import { ParticleSystem } from './particles';
import { COLORS } from './theme';
import { fx, tex, hasArt } from './textures';

/**
 * Maw, the anglerfish. One illustration rendered as a deformable mesh:
 * travelling sine wave toward the tail (swimming), breathing, lower-jaw hinge
 * (vertices below/left of the hinge rotate), lure stalk on a damped spring,
 * plus a code glow on the lure bulb and the eye. Faces left (towards the grid).
 * Rig coordinates are normalised texture coordinates of `mascot` art.
 */
export const RIG = {
	hinge: { u: 0.37, v: 0.62 }, // jaw pivot
	jawBlend: 0.05,
	mouth: { u: 0.25, v: 0.58 }, // where orbs are swallowed
	bulb: { u: 0.065, v: 0.35 }, // lure bulb centre
	stalkFrom: { u: 0.33, v: 0.27 }, // where the stalk leaves the head
	eye: { u: 0.295, v: 0.41 },
	tailStart: 0.72,
};

const smooth = (a: number, b: number, x: number) => {
	const t = clamp((x - a) / (b - a));
	return t * t * (3 - 2 * t);
};

export class Mascot {
	readonly root = new PIXI.Container();
	private mesh: PIXI.MeshPlane;
	private base!: Float32Array;
	private VX = 28;
	private VY = 18;
	private bulbGlow = new PIXI.Sprite(fx.glow());
	private bulbCore = new PIXI.Sprite(fx.spark());
	private eyeGlow = new PIXI.Sprite(fx.spark());
	private sparks = new ParticleSystem(80);
	private t = Math.random() * 10;
	jaw = 0; // art is drawn half open: <0 closes, >0 opens wider
	private jawTarget = 0;
	private lunge = 0;
	private lureX = 0;
	private lureV = 0;
	private flareLevel = 0;
	excitement = 0; // 0 calm .. 1 frenzy
	private height = 400;
	reduced = false;
	private texW = 1;
	private texH = 1;

	constructor() {
		const texture = hasArt('mascot') ? tex('mascot') : placeholderFish();
		this.mesh = new PIXI.MeshPlane({ texture, verticesX: this.VX, verticesY: this.VY });
		this.captureBase();
		for (const s of [this.bulbGlow, this.bulbCore, this.eyeGlow]) {
			s.anchor.set(0.5);
			s.blendMode = 'add';
		}
		this.bulbGlow.tint = COLORS.magenta;
		this.bulbCore.tint = 0xfff0c0;
		this.eyeGlow.tint = COLORS.cyan;
		this.root.addChild(this.mesh, this.sparks.container, this.bulbGlow, this.bulbCore, this.eyeGlow);
	}

	private captureBase() {
		const buf = this.mesh.geometry.getAttribute('aPosition').buffer;
		this.base = new Float32Array(buf.data as Float32Array);
		this.texW = this.mesh.texture.width;
		this.texH = this.mesh.texture.height;
		this.mesh.pivot.set(this.texW * 0.5, this.texH * 0.55);
	}

	refreshArt() {
		if (!hasArt('mascot')) return;
		this.mesh.texture = tex('mascot');
		// rebuild geometry for the new texture size
		this.root.removeChild(this.mesh);
		this.mesh.destroy();
		this.mesh = new PIXI.MeshPlane({ texture: tex('mascot'), verticesX: this.VX, verticesY: this.VY });
		this.root.addChildAt(this.mesh, 0);
		this.captureBase();
		this.setHeight(this.height);
	}

	setHeight(h: number) {
		this.height = h;
		this.root.scale.set(h / this.texH);
	}

	/** Mouth position in the mascot's parent space. */
	mouthPoint() {
		const p = this.local(RIG.mouth.u, RIG.mouth.v);
		return this.root.toGlobal(p);
	}

	lurePoint() {
		const p = this.local(RIG.bulb.u + this.lureX * 0.0006, RIG.bulb.v);
		return this.root.toGlobal(p);
	}

	private local(u: number, v: number) {
		return new PIXI.Point(u * this.texW - this.mesh.pivot.x + this.lunge, v * this.texH - this.mesh.pivot.y);
	}

	// --- reactions -------------------------------------------------------
	open(amount = 0.75) {
		this.jawTarget = amount;
	}
	close() {
		this.jawTarget = 0;
	}
	async chomp() {
		this.jawTarget = 0.9;
		await anim.wait(120);
		this.jawTarget = -0.55;
		this.lureV -= 260;
		await anim.tween({ duration: 160, ease: ease.outQuad }, (t) => (this.lunge = -26 * Math.sin(t * Math.PI)));
		await anim.wait(140);
		this.jawTarget = 0;
		this.spark(14);
	}
	flare(strength = 1) {
		this.flareLevel = Math.max(this.flareLevel, strength);
		this.lureV += 120 * strength;
	}
	async roar(ms = 900) {
		this.jawTarget = 1;
		this.flare(1.5);
		this.spark(30);
		await anim.tween({ duration: ms, ease: ease.linear }, (t) => (this.lunge = Math.sin(t * Math.PI * 14) * 4 * (1 - t)));
		this.jawTarget = 0;
	}
	spark(n: number) {
		const p = this.local(RIG.bulb.u, RIG.bulb.v);
		this.sparks.spawn({
			texture: fx.spark(),
			x: p.x,
			y: p.y,
			count: n,
			speed: [80, 260],
			drag: 0.1,
			life: [500, 1000],
			size: [10, 26],
			tint: [COLORS.magenta, 0xffd27a, 0xffffff],
		});
	}

	update(dt: number) {
		const speed = 1 + this.excitement * 1.2;
		this.t += (dt / 1000) * speed;
		const t = this.t;
		this.jaw += (this.jawTarget - this.jaw) * Math.min(1, dt * 0.02);
		// lure spring (damped)
		const target = Math.sin(t * 1.3) * 18;
		this.lureV += (target - this.lureX) * dt * 0.02;
		this.lureV *= Math.pow(0.05, dt / 1000);
		this.lureX += (this.lureV * dt) / 1000;
		this.flareLevel = Math.max(0, this.flareLevel - dt * 0.0012);

		const buf = this.mesh.geometry.getAttribute('aPosition').buffer;
		const data = buf.data as Float32Array;
		const W = this.texW;
		const H = this.texH;
		const amp = this.reduced ? 0.3 : 1;
		const jawA = -(this.jaw + Math.sin(t * 1.7) * 0.06 * amp) * 0.42;
		const hx = RIG.hinge.u * W;
		const hy = RIG.hinge.v * H;
		const cos = Math.cos(jawA);
		const sin = Math.sin(jawA);
		const breathe = 1 + Math.sin(t * 1.8) * 0.012 * amp;
		for (let i = 0; i < data.length; i += 2) {
			let x = this.base[i];
			let y = this.base[i + 1];
			const u = x / W;
			const v = y / H;
			// jaw hinge
			const wj = smooth(RIG.hinge.v - RIG.jawBlend, RIG.hinge.v + RIG.jawBlend, v) * smooth(RIG.hinge.u + 0.04, RIG.hinge.u - 0.06, u);
			if (wj > 0) {
				const dx = x - hx;
				const dy = y - hy;
				x = x + (hx + dx * cos - dy * sin - x) * wj;
				y = y + (hy + dx * sin + dy * cos - y) * wj;
			}
			// lure stalk sway (upper-left region)
			const wl = Math.max(smooth(RIG.stalkFrom.v + 0.02, RIG.stalkFrom.v - 0.12, v), smooth(0.2, 0.12, u) * smooth(0.5, 0.42, v)) * smooth(RIG.stalkFrom.u + 0.02, RIG.bulb.u + 0.04, u);
			if (wl > 0) {
				x += this.lureX * wl;
				y += Math.sin(t * 2.1) * 6 * wl * amp;
			}
			// swimming wave toward the tail
			const wt = smooth(RIG.tailStart - 0.25, 1.0, u);
			y += Math.sin(t * 2.6 - u * 5.5) * H * 0.035 * wt * wt * amp;
			// whole body gentle undulation + breathing
			y += Math.sin(t * 1.1 + u * 2) * H * 0.006 * amp;
			y = H * 0.55 + (y - H * 0.55) * breathe;
			data[i] = x + this.lunge;
			data[i + 1] = y + Math.sin(t * 0.9) * H * 0.012 * amp;
		}
		buf.update();

		const bulb = this.local(RIG.bulb.u, RIG.bulb.v);
		const bx = bulb.x + this.lureX;
		const by = bulb.y + Math.sin(t * 2.1) * 6 * amp + Math.sin(t * 0.9) * H * 0.012 * amp;
		const pulse = 0.5 + 0.5 * Math.sin(t * 3.2);
		const fl = this.flareLevel;
		this.bulbGlow.position.set(bx, by);
		this.bulbGlow.scale.set((H * (0.5 + pulse * 0.08 + fl * 0.45)) / 256);
		this.bulbGlow.alpha = 0.55 + pulse * 0.2 + fl * 0.3;
		this.bulbCore.position.set(bx, by);
		this.bulbCore.scale.set((H * (0.12 + fl * 0.06)) / 64);
		this.bulbCore.alpha = 0.85;
		const eye = this.local(RIG.eye.u, RIG.eye.v);
		this.eyeGlow.position.set(eye.x, eye.y + Math.sin(t * 0.9) * H * 0.012 * amp);
		this.eyeGlow.scale.set((H * 0.07) / 64);
		this.eyeGlow.alpha = 0.6 + 0.3 * Math.sin(t * 5.1) * Math.sin(t * 0.7);
		if (Math.random() < dt * 0.002 * (1 + this.excitement * 3)) {
			this.sparks.spawn({ texture: fx.spark(), x: bx, y: by, count: 1, speed: [10, 40], angle: -Math.PI / 2, life: [800, 1400], size: [6, 14], tint: [COLORS.magenta, 0xffd27a] });
		}
		this.sparks.update(dt);
	}
}

function placeholderFish() {
	const cv = document.createElement('canvas');
	cv.width = 1024;
	cv.height = 768;
	const c = cv.getContext('2d')!;
	c.fillStyle = '#0b1a2a';
	c.strokeStyle = '#3ff5e6';
	c.lineWidth = 6;
	c.beginPath();
	c.ellipse(470, 430, 330, 230, 0, 0, Math.PI * 2);
	c.fill();
	c.stroke();
	c.beginPath();
	c.moveTo(760, 430);
	c.lineTo(1010, 250);
	c.lineTo(1010, 610);
	c.closePath();
	c.fill();
	c.stroke();
	c.beginPath();
	c.moveTo(430, 250);
	c.quadraticCurveTo(300, 20, 165, 100);
	c.stroke();
	c.fillStyle = '#e9fbff';
	for (let i = 0; i < 9; i++) {
		c.beginPath();
		c.moveTo(150 + i * 28, 470);
		c.lineTo(164 + i * 28, 420);
		c.lineTo(178 + i * 28, 470);
		c.fill();
	}
	return PIXI.Texture.from(cv);
}
