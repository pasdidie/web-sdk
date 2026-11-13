import * as PIXI from 'pixi.js';

import { anim, ease, clamp, rand } from './anim';
import { ParticleSystem } from './particles';
import { COLORS } from './theme';
import { fx, tex, hasArt } from './textures';

/**
 * Maw, the anglerfish: one illustration rendered as a deformable mesh, driven like a puppet.
 *
 * Mesh layer (texture space): lower-jaw hinge, lure stalk on a damped spring, travelling swim wave
 * with a tail sweep, pectoral / dorsal / pelvic fin flaps, gill breathing.
 * Body layer (springs on an inner container): tilt, squash & stretch, offsets (crouch, lean-in,
 * rear-back, wiggle, celebration hops).
 * Face layer: eyelid (blinks, sleepy / focused levels), pupil slit that looks at a target (pointer,
 * orbs, reels, win meter), eye glint and glow, lure bulb glow.
 * Behaviour: idle scheduler (look around, yawn, lure flicker, turn, bubble burp, blinks), boredom,
 * hover notice and tap reactions, plus game reactions called by the Scene. All reactions run on the
 * mascot's own clock: none of them blocks the game flow (only `chomp` is awaited, by the Scene).
 * Faces left (towards the grid). Rig coordinates are normalised texture coordinates of `mascot`.
 */
type UV = { u: number; v: number };
type W2 = (u: number, v: number) => number;
/**
 * Per-art rig. UV = normalised texture coordinates; px values are texture pixels.
 * `contentH` = share of the texture height the fish covers (setHeight sizes the fish, not the canvas).
 */
export type Rig = {
	pivot: UV;
	contentH: number;
	hinge: UV; // lower-jaw pivot
	jawBlend: number;
	jawFront: number; // jaw weight fades in from hinge.u + jawFront ...
	jawBack: number; // ... to full at hinge.u - jawBack
	mouth: UV; // where orbs are swallowed
	bulb: UV; // lure bulb centre
	eye: UV; // iris centre
	iris: { rx: number; ry: number };
	/** the art's own pupil slit, painted over with iris colour so the moving pupil replaces it */
	artPupil: { dx: number; dy: number; rx: number; ry: number; color: number; edge: number } | null;
	pupil: { rx: number; ry: number; tx: number; ty: number };
	glint: { dx: number; dy: number; s: number };
	lid: { fill: number; rim: number; lash: number };
	gill: UV;
	/** in-mesh pectoral flap (single-image art); null when the fin is a separate sprite */
	pecRoot: UV | null;
	/** separate fin layer: texture key, its bbox in the canvas and its root (px) */
	fin: { key: string; x: number; y: number; w: number; h: number; rootX: number; rootY: number } | null;
	tailStart: number;
	tailU: number;
	hit: { x: number; y: number; rx: number; ry: number }; // px, relative to the pivot
	stalkW: W2;
	dorsalW: W2;
	ventralW: W2;
	pelvicW: W2;
};

const smooth = (a: number, b: number, x: number) => {
	const t = clamp((x - a) / (b - a));
	return t * t * (3 - 2 * t);
};

/** v1: the painted single-image Maw (1400x731, fin baked in). */
const RIG_V1: Rig = {
	pivot: { u: 0.5, v: 0.55 },
	contentH: 1,
	hinge: { u: 0.37, v: 0.62 },
	jawBlend: 0.05,
	jawFront: 0.04,
	jawBack: 0.06,
	mouth: { u: 0.25, v: 0.58 },
	bulb: { u: 0.065, v: 0.35 },
	eye: { u: 0.2945, v: 0.41 },
	iris: { rx: 15, ry: 13 },
	artPupil: null,
	pupil: { rx: 4.2, ry: 8, tx: 7.5, ty: 4 },
	glint: { dx: -5, dy: -5, s: 5 },
	lid: { fill: 0x2c4558, rim: 0x7fa6bb, lash: 0x050a16 },
	gill: { u: 0.41, v: 0.52 },
	pecRoot: { u: 0.5, v: 0.585 },
	fin: null,
	tailStart: 0.72,
	tailU: 0.8,
	hit: { x: -84, y: 22, rx: 476, ry: 263 },
	stalkW: (u, v) => Math.max(smooth(0.29, 0.15, v), smooth(0.2, 0.12, u) * smooth(0.5, 0.42, v)) * smooth(0.35, 0.105, u),
	dorsalW: (u, v) => smooth(0.34, 0.12, v) * smooth(0.42, 0.48, u) * smooth(0.8, 0.72, u),
	ventralW: (u, v) => smooth(0.62, 0.8, v) * smooth(0.6, 0.66, u) * smooth(0.8, 0.74, u),
	pelvicW: (u, v) => smooth(0.78, 0.9, v) * smooth(0.44, 0.48, u) * smooth(0.62, 0.56, u),
};

/**
 * v2: 3D-render Maw matching the v2 symbols. 1400x782 canvas, untrimmed; body (fin removed, skin
 * painted under it) + fin cut on the same canvas. Measured on assets/processed/mascot_v2*.png:
 * fish bbox x 196-1270 / y 77-690, bulb (235,350), iris (534,322) 86x70 with its own slit at
 * (514,323) ~12x55, mouth corner ~(575,468), fin bbox x 660-872 / y 328-574, root ~(672,430).
 */
const RIG_V2: Rig = {
	pivot: { u: 733 / 1400, v: 383 / 782 },
	contentH: 613 / 782,
	hinge: { u: 575 / 1400, v: 468 / 782 },
	jawBlend: 0.04,
	jawFront: 0.03,
	jawBack: 0.06,
	mouth: { u: 480 / 1400, v: 470 / 782 },
	bulb: { u: 235 / 1400, v: 350 / 782 },
	eye: { u: 534 / 1400, v: 322 / 782 },
	iris: { rx: 43, ry: 35 },
	artPupil: { dx: -20, dy: 1, rx: 10, ry: 31, color: 0x2ae6f6, edge: 0x22d4f0 },
	pupil: { rx: 6.5, ry: 23, tx: 20, ty: 5 },
	glint: { dx: -16, dy: -14, s: 11 },
	lid: { fill: 0x2b3d5c, rim: 0x6f8fc0, lash: 0x070b18 },
	gill: { u: 640 / 1400, v: 430 / 782 },
	pecRoot: null,
	fin: { key: 'mascot_v2_fincut', x: 652, y: 320, w: 228, h: 262, rootX: 672, rootY: 430 },
	tailStart: 0.72,
	tailU: 0.77,
	hit: { x: -33, y: 37, rx: 375, ry: 262 },
	// stalk: arc above the head (v < 0.22) + the hanging part left of the snout; 0 at the stalk base
	stalkW: (u, v) => Math.max(smooth(0.25, 0.15, v), smooth(0.235, 0.2, u) * smooth(0.56, 0.5, v)) * smooth(0.37, 0.3, u),
	// main dorsal (u .44-.61, v < .29) + rear dorsal (u .64-.72, v .29-.40)
	dorsalW: (u, v) =>
		Math.max(smooth(0.3, 0.16, v) * smooth(0.43, 0.47, u) * smooth(0.63, 0.6, u), smooth(0.41, 0.33, v) * smooth(0.63, 0.66, u) * smooth(0.74, 0.72, u)),
	ventralW: (u, v) => smooth(0.6, 0.68, v) * smooth(0.65, 0.67, u) * smooth(0.74, 0.72, u),
	pelvicW: () => 0,
};

/** Critically-ish damped spring toward `target`; impulses go into `v`. */
class Spring {
	x: number;
	v = 0;
	target: number;
	constructor(
		public rest: number,
		private k = 180,
		private d = 14,
	) {
		this.x = rest;
		this.target = rest;
	}
	step(dt: number) {
		const s = Math.min(dt, 34) / 1000;
		this.v += ((this.target - this.x) * this.k - this.v * this.d) * s;
		this.x += this.v * s;
	}
}

type Gaze = { x: number; y: number; until: number; prio: number };

export class Mascot {
	readonly root = new PIXI.Container();
	/** rig container (springs), the Scene only moves/scales `root` */
	private body = new PIXI.Container();
	private mesh: PIXI.MeshPlane;
	private rig: Rig = RIG_V1;
	/** separate pectoral fin (v2 art), parented to the body, follows the swim wave */
	private fin = new PIXI.Sprite();
	private irisPatch = new PIXI.Graphics();
	private finPhase = 0;
	private lastDt = 16;
	private base!: Float32Array;
	private VX = 44;
	private VY = 24;
	private bulbGlow = new PIXI.Sprite(fx.glow());
	private bulbCore = new PIXI.Sprite(fx.spark());
	private eyeGlow = new PIXI.Sprite(fx.glow());
	private pupil = new PIXI.Graphics();
	private glint = new PIXI.Sprite(fx.spark());
	private lid = new PIXI.Graphics();
	private sparks = new ParticleSystem(90);
	private t = Math.random() * 10;
	private now = 0;
	jaw = 0; // art is drawn half open: <0 closes, >0 opens wider
	private jawTarget = 0;
	private jawHoldUntil = 0;
	private lunge = 0;
	private lureX = 0;
	private lureV = 0;
	private flareLevel = 0;
	excitement = 0; // 0 calm .. 1 frenzy
	private height = 400;
	reduced = false;
	/** max head-up tilt (rad): the lure rises with it; tight layouts (tablet) keep it near the top edge */
	headroom = 0.22;
	private texW = 1;
	private texH = 1;
	// body springs
	private tilt = new Spring(0, 150, 11);
	private sx = new Spring(1, 260, 13);
	private sy = new Spring(1, 260, 13);
	private ox = new Spring(0, 120, 12);
	private oy = new Spring(0, 120, 12);
	// face
	private eyeWide = 0; // 0..1 (glow, pupil dilation)
	private eyeWideTarget = 0;
	private lidLevel = 0; // resting lid: 0 open, 0.35 sleepy
	private lidTarget = 0;
	private blink = 0;
	private blinkT = -1;
	private nextBlink = 2000;
	private lidDrawn = -1;
	private pupilX = 0;
	private pupilY = 0;
	private gaze: Gaze | null = null;
	private idleGaze = new PIXI.Point();
	private nextIdleGaze = 0;
	private pointer = new PIXI.Point();
	private pointerSeen = -1e9;
	private hovered = false;
	private tmp = new PIXI.Point();
	private tmp2 = new PIXI.Point();
	// fins / swim
	private swim = 1;
	private finBoost = 0;
	// behaviour
	private busyUntil = 0;
	private nextIdle = 3000;
	private tapCooldown = 0;
	private boredom = 0; // 0..1, raised by dry spells
	private actions: { at: number; fn: () => void }[] = [];
	/** set by the Scene: sound for a tap reaction */
	onTap: (kind: 'snap' | 'wiggle' | 'bubbles') => void = () => {};

	constructor() {
		this.mesh = new PIXI.MeshPlane({ texture: this.pickArt(), verticesX: this.VX, verticesY: this.VY });
		this.captureBase();
		for (const s of [this.bulbGlow, this.bulbCore, this.eyeGlow, this.glint]) {
			s.anchor.set(0.5);
			s.blendMode = 'add';
		}
		this.bulbGlow.tint = COLORS.magenta;
		this.bulbCore.tint = 0xfff0c0;
		this.eyeGlow.tint = COLORS.cyan;
		this.glint.tint = 0xffffff;
		this.body.addChild(this.mesh, this.fin, this.irisPatch, this.eyeGlow, this.pupil, this.glint, this.lid, this.bulbGlow, this.bulbCore);
		this.applyRig();
		this.root.addChild(this.body, this.sparks.container);
		// interaction: hover notice, tap reactions, gaze follows the pointer. The hit area is the body
		// only (no lure / tail), and nothing here stops propagation, so the spin input is untouched.
		this.root.eventMode = 'static';
		this.root.cursor = 'pointer';
		this.root.on('pointerover', () => this.notice(true));
		this.root.on('pointerout', () => this.notice(false));
		this.root.on('pointertap', () => this.tap());
		this.root.on('globalpointermove', (e: PIXI.FederatedPointerEvent) => {
			this.pointer.copyFrom(e.global);
			this.pointerSeen = this.now;
		});
		this.updateHitArea();
	}

	private captureBase() {
		const buf = this.mesh.geometry.getAttribute('aPosition').buffer;
		this.base = new Float32Array(buf.data as Float32Array);
		this.texW = this.mesh.texture.width;
		this.texH = this.mesh.texture.height;
		this.mesh.pivot.set(this.texW * this.rig.pivot.u, this.texH * this.rig.pivot.v);
	}

	/** v2 (body + separate fin) when loaded, else the v1 single image, else a placeholder. */
	private pickArt() {
		if (hasArt('mascot_v2_body') && hasArt('mascot_v2_fincut')) {
			this.rig = RIG_V2;
			return tex('mascot_v2_body');
		}
		this.rig = RIG_V1;
		return hasArt('mascot') ? tex('mascot') : placeholderFish();
	}

	/** rig-dependent pieces: fin layer, iris patch over the art's pupil, pupil shape, hit area */
	private applyRig() {
		const r = this.rig;
		const f = r.fin;
		if (f && hasArt(f.key)) {
			const src = tex(f.key);
			this.fin.texture = new PIXI.Texture({ source: src.source, frame: new PIXI.Rectangle(src.frame.x + f.x, src.frame.y + f.y, f.w, f.h) });
			this.fin.anchor.set((f.rootX - f.x) / f.w, (f.rootY - f.y) / f.h);
			this.fin.visible = true;
		} else this.fin.visible = false;
		const g = this.irisPatch;
		g.clear();
		if (r.artPupil) {
			const a = r.artPupil;
			g.ellipse(0, 0, a.rx * 1.35, a.ry * 1.12).fill({ color: a.edge, alpha: 0.45 });
			g.ellipse(0, 0, a.rx, a.ry).fill({ color: a.color });
		}
		const p = this.pupil;
		p.clear();
		p.ellipse(0, 0, r.pupil.rx, r.pupil.ry).fill({ color: 0x01202c, alpha: 0.92 });
		p.ellipse(0, 0, r.pupil.rx * 0.5, r.pupil.ry * 0.7).fill({ color: 0x000000, alpha: 0.9 });
		this.lidDrawn = -1;
		this.updateHitArea();
	}

	private updateHitArea() {
		// ellipse over head + body (no lure / tail), in root space = texture px around the pivot
		const h = this.rig.hit;
		this.root.hitArea = new PIXI.Ellipse(h.x, h.y, h.rx, h.ry);
	}

	refreshArt() {
		const texture = this.pickArt();
		if (texture === this.mesh.texture) return;
		this.body.removeChild(this.mesh);
		this.mesh.destroy();
		this.mesh = new PIXI.MeshPlane({ texture, verticesX: this.VX, verticesY: this.VY });
		this.body.addChildAt(this.mesh, 0);
		this.captureBase();
		this.applyRig();
		this.setHeight(this.height);
	}

	/** h = on-screen height of the fish itself (the canvas margins are excluded) */
	setHeight(h: number) {
		this.height = h;
		this.root.scale.set(h / (this.texH * this.rig.contentH));
	}

	/** Mouth position in global space. */
	mouthPoint() {
		return this.body.toGlobal(this.local(this.rig.mouth.u, this.rig.mouth.v));
	}

	lurePoint() {
		return this.body.toGlobal(this.local(this.rig.bulb.u + this.lureX / this.texW, this.rig.bulb.v));
	}

	private local(u: number, v: number, out = new PIXI.Point()) {
		out.set(u * this.texW - this.mesh.pivot.x + this.lunge, v * this.texH - this.mesh.pivot.y);
		return out;
	}

	private later(ms: number, fn: () => void) {
		this.actions.push({ at: this.now + ms, fn });
	}

	private busy(ms: number) {
		this.busyUntil = Math.max(this.busyUntil, this.now + ms);
		this.nextIdle = Math.max(this.nextIdle, this.now + ms + rand(1500, 3000));
	}

	// --- gaze ----------------------------------------------------------------
	/** Look at a global point for `ms` (higher priority wins while active). */
	lookAt(global: PIXI.PointData, ms = 900, prio = 1) {
		if (this.gaze && this.gaze.until > this.now && this.gaze.prio > prio) return;
		this.gaze = { x: global.x, y: global.y, until: this.now + ms, prio };
	}

	// --- reactions (all non-blocking unless awaited) ---------------------------
	open(amount = 0.75) {
		this.jawTarget = amount;
	}
	close() {
		this.jawTarget = 0;
	}
	private jawPulse(amount: number, ms: number) {
		this.jawTarget = amount;
		this.jawHoldUntil = this.now + ms;
	}
	async chomp() {
		this.jawTarget = 0.95;
		this.eyeWideTarget = 1;
		this.tilt.v -= 0.9;
		await anim.wait(120);
		this.jawTarget = -0.55;
		this.lureV -= 260;
		this.sy.v -= 1.2;
		this.sx.v += 1.2;
		await anim.tween({ duration: 160, ease: ease.outQuad }, (t) => (this.lunge = -30 * Math.sin(t * Math.PI)));
		await anim.wait(120);
		this.jawTarget = 0;
		this.eyeWideTarget = 0;
		this.spark(14);
	}
	/** quick snap toward the board (tumble wins): fire and forget */
	snap(at?: PIXI.PointData) {
		if (at) this.lookAt(at, 700, 2);
		this.jawPulse(1, 110);
		this.later(130, () => {
			this.jawPulse(-0.5, 120);
			this.ox.v -= 260;
			this.tilt.v -= 0.7;
			this.sx.v += 0.9;
			this.bubbles(3, 0.6);
		});
		this.busy(600);
	}
	flare(strength = 1) {
		this.flareLevel = Math.max(this.flareLevel, strength);
		this.lureV += 120 * strength;
	}
	async roar(ms = 900) {
		this.jawTarget = 1.15;
		this.eyeWideTarget = 1;
		this.flare(1.5);
		this.spark(30);
		this.tilt.v += 0.8;
		this.busy(ms);
		await anim.tween({ duration: ms, ease: ease.linear }, (t) => (this.lunge = Math.sin(t * Math.PI * 14) * 5 * (1 - t)));
		this.jawTarget = 0;
		this.eyeWideTarget = 0;
	}
	/** SPIN pressed: anticipatory crouch, eyes on the board */
	crouch() {
		this.wake();
		this.sy.v -= 1.6;
		this.sx.v += 1.3;
		this.oy.v += 140;
		this.tilt.v -= 0.5;
		this.jawTarget = -0.2;
		this.later(260, () => (this.jawTarget = 0));
		this.busy(700);
	}
	/** a reel stopped; `strong` when the next one is anticipated (lean in, eye wide) */
	reelStop(at: PIXI.PointData, strong: boolean) {
		this.lookAt(at, strong ? 1400 : 500, strong ? 3 : 1);
		if (strong) {
			this.tilt.target = -0.07;
			this.ox.target = -14;
			this.eyeWideTarget = 1;
			this.lidTarget = 0;
			this.swim = 1.8;
			this.jawPulse(0.45, 400);
		} else {
			this.tilt.v -= 0.25;
			this.oy.v += 40;
		}
		this.busy(strong ? 1500 : 400);
	}
	/** end of the reel stops: drop the lean */
	relax() {
		this.tilt.target = 0;
		this.ox.target = 0;
		this.eyeWideTarget = 0;
		this.swim = 1;
	}
	/** an orb / pearl landed: look at it, the lure flares */
	spotted(at: PIXI.PointData, strength = 1) {
		this.lookAt(at, 900, 3);
		this.flare(0.6 + 0.4 * strength);
		this.eyeWideTarget = 1;
		this.later(500, () => (this.eyeWideTarget = 0));
		this.oy.v -= 60;
		this.busy(700);
	}
	/** a win: happy wiggle, scaled by `level` (0.3 small .. 1 strong) */
	happy(level = 0.5, at?: PIXI.PointData) {
		this.wake();
		if (at) this.lookAt(at, 900, 2);
		const a = 0.7 + level * 1.1;
		this.tilt.v += 1.4 * a;
		this.later(140, () => (this.tilt.v -= 2.2 * a));
		this.later(300, () => (this.tilt.v += 1.4 * a));
		this.oy.v -= 160 * a;
		this.sy.v += 1.0 * a;
		this.sx.v -= 0.7 * a;
		this.jawPulse(0.4 + 0.3 * level, 350);
		this.flare(0.6 + level * 0.6);
		this.finBoost = Math.max(this.finBoost, 1);
		if (level >= 0.6) this.bubbles(Math.round(4 + level * 6), 1);
		this.busy(900);
	}
	/** free-spin trigger part 1: rear back, mouth shut, lure blazes */
	rearBack() {
		this.wake();
		this.tilt.target = 0.16;
		this.ox.target = 34;
		this.sx.target = 0.94;
		this.sy.target = 1.06;
		this.jawTarget = -0.5;
		this.eyeWideTarget = 1;
		this.flare(2);
		this.spark(26);
		this.swim = 2.2;
		this.busy(2000);
	}
	/** free-spin trigger part 2: lunge, mouth wide (pairs with roar) */
	lungeWide() {
		this.tilt.target = -0.06;
		this.ox.target = -10;
		this.sx.target = 1;
		this.sy.target = 1;
		this.ox.v -= 420;
		this.tilt.v -= 1.6;
		this.jawTarget = 1.25;
		this.flare(2.2);
		this.bubbles(12, 1.4);
		this.later(1100, () => this.relax());
	}
	/** big-win tier i (0 = big .. 4 = max): escalating celebration */
	celebrate(tier: number) {
		const a = 0.7 + tier * 0.25;
		this.wake();
		this.jawPulse(0.8 + tier * 0.1, 500);
		this.eyeWideTarget = 1;
		this.later(700, () => (this.eyeWideTarget = 0));
		this.oy.v -= 260 * a;
		this.sy.v += 1.6 * a;
		this.sx.v -= 1.1 * a;
		for (let i = 0; i < 2 + tier; i++) this.later(i * 150, () => (this.tilt.v += (i % 2 ? -1 : 1) * 1.6 * a));
		this.flare(1.5 + tier * 0.3);
		this.spark(18 + tier * 8);
		this.bubbles(6 + tier * 3, 1.4);
		this.finBoost = 1.5;
		this.busy(1200);
	}
	/** dry spell: Maw gets bored (sleepy lid, sinks, yawns more) */
	setBored(level: number) {
		this.boredom = clamp(level);
	}
	wake() {
		if (this.boredom > 0) {
			this.boredom = 0;
			this.eyeWideTarget = 1;
			this.oy.v -= 120;
			this.later(400, () => (this.eyeWideTarget = 0));
		}
	}

	// --- interaction ------------------------------------------------------------
	private notice(on: boolean) {
		this.hovered = on;
		if (on) {
			this.wake();
			this.flare(0.5);
			this.eyeWideTarget = 1;
			this.oy.v -= 80;
			this.tilt.v += 0.3;
		} else this.eyeWideTarget = 0;
	}

	private tap() {
		if (this.now < this.tapCooldown) return;
		this.tapCooldown = this.now + 900;
		this.wake();
		const r = Math.random();
		const kind = r < 0.45 ? 'snap' : r < 0.75 ? 'wiggle' : 'bubbles';
		if (kind === 'snap') {
			this.jawPulse(1.1, 120);
			this.later(140, () => {
				this.jawPulse(-0.6, 160);
				this.ox.v -= 320;
				this.tilt.v -= 1.2;
				this.sx.v += 1.4;
				this.spark(10);
			});
		} else if (kind === 'wiggle') {
			for (let i = 0; i < 4; i++) this.later(i * 110, () => (this.tilt.v += (i % 2 ? -1 : 1) * 2.4));
			this.sy.v += 1.2;
			this.flare(1);
			this.finBoost = 1.5;
		} else {
			this.jawPulse(0.5, 500);
			this.bubbles(10, 1.2);
			this.oy.v -= 140;
		}
		this.onTap(kind);
		this.busy(900);
	}

	// --- fx ---------------------------------------------------------------------
	spark(n: number) {
		const p = this.toRoot(this.rig.bulb.u, this.rig.bulb.v, this.lureX);
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
	bubbles(n: number, power = 1) {
		if (this.reduced) n = Math.ceil(n / 3);
		const p = this.toRoot(this.rig.mouth.u - 0.04, this.rig.mouth.v - 0.02, 0);
		this.sparks.spawn({
			texture: fx.bubble(),
			x: p.x,
			y: p.y,
			spreadX: 20,
			spreadY: 14,
			count: n,
			angle: -Math.PI / 2 - 0.5,
			cone: 0.9,
			speed: [60 * power, 200 * power],
			gravity: -160,
			drag: 0.3,
			life: [900, 1700],
			size: [14, 40],
			endSizeRatio: 1.2,
			tint: [0xbff9ff, 0xffffff],
			alpha: 0.75,
		});
	}
	/** texture uv (+ body offsets) -> root space, without allocation */
	private toRoot(u: number, v: number, dx: number) {
		this.local(u, v, this.tmp);
		this.tmp.x += dx;
		this.body.toGlobal(this.tmp, this.tmp2);
		return this.root.toLocal(this.tmp2, undefined, this.tmp2);
	}

	// --- idle behaviour -----------------------------------------------------------
	private idleAction() {
		const bored = this.boredom > 0.5;
		const r = Math.random();
		if (bored ? r < 0.45 : r < 0.18) {
			// yawn: slow wide jaw, eyes half shut, head tips back
			this.jawPulse(1.2, 900);
			this.lidTarget = 0.55;
			this.tilt.target = 0.08;
			this.later(1100, () => {
				this.lidTarget = bored ? 0.35 : 0;
				this.tilt.target = 0;
			});
			this.later(1000, () => this.bubbles(3, 0.5));
			this.busy(1500);
		} else if (r < 0.42) {
			// look around: 2-3 glances
			const n = 2 + ((Math.random() * 2) | 0);
			for (let i = 0; i < n; i++)
				this.later(i * 520, () => {
					const g = this.root.toGlobal(this.tmp.set(rand(-this.texW * 1.4, -this.texW * 0.2), rand(-this.texH * 0.5, this.texH * 0.9)));
					this.lookAt(g, 560, 1);
					this.tilt.v += rand(-0.3, 0.3);
				});
			this.busy(n * 520);
		} else if (r < 0.6) {
			// lure flicker
			for (let i = 0; i < 3; i++) this.later(i * 140, () => this.flare(0.9));
			this.later(0, () => (this.lureV += 220));
			this.busy(600);
		} else if (r < 0.78) {
			// half turn: the body foreshortens as if turning toward the player, then back
			this.sx.target = 0.86;
			this.tilt.target = -0.05;
			this.finBoost = 1.2;
			this.later(700, () => {
				this.sx.target = 1;
				this.tilt.target = 0;
			});
			this.busy(1100);
		} else {
			// bubble burp
			this.jawPulse(0.55, 240);
			this.later(120, () => this.bubbles(5, 0.8));
			this.oy.v += 60;
			this.busy(700);
		}
	}

	update(dt: number) {
		this.now += dt;
		this.lastDt = dt;
		const now = this.now;
		const amp = this.reduced ? 0.3 : 1;
		const speed = (1 + this.excitement * 1.2) * (1 - this.boredom * 0.35);
		this.t += (dt / 1000) * speed;
		const t = this.t;

		// scheduled actions
		for (let i = this.actions.length - 1; i >= 0; i--) {
			if (this.actions[i].at <= now) {
				const a = this.actions[i];
				this.actions.splice(i, 1);
				a.fn();
			}
		}
		if (now >= this.nextIdle && now >= this.busyUntil && !this.reduced) {
			this.idleAction();
			this.nextIdle = now + rand(2600, 5200) * (this.boredom > 0.5 ? 0.8 : 1);
		}
		// blinks
		if (now >= this.nextBlink && this.blinkT < 0) {
			this.blinkT = 0;
			this.nextBlink = now + (Math.random() < 0.2 ? 220 : rand(2200, 5600));
		}
		if (this.blinkT >= 0) {
			this.blinkT += dt;
			const bt = this.blinkT / 150;
			this.blink = bt < 0.5 ? bt * 2 : Math.max(0, 2 - bt * 2);
			if (bt >= 1) {
				this.blinkT = -1;
				this.blink = 0;
			}
		}
		if (this.jawHoldUntil && now >= this.jawHoldUntil) {
			this.jawHoldUntil = 0;
			this.jawTarget = 0;
		}
		const sleepyLid = this.boredom * 0.35;
		const lidRest = Math.max(this.lidTarget, sleepyLid) * (1 - this.eyeWide);
		this.lidLevel += (lidRest - this.lidLevel) * Math.min(1, dt * 0.008);
		this.eyeWide += (this.eyeWideTarget - this.eyeWide) * Math.min(1, dt * 0.01);
		this.finBoost = Math.max(0, this.finBoost - dt * 0.0012);

		// body springs
		this.oy.target = this.boredom * 14;
		for (const s of [this.tilt, this.sx, this.sy, this.ox, this.oy]) s.step(dt);
		this.tilt.x = clamp(this.tilt.x, -0.22, this.headroom);
		const bob = Math.sin(t * 0.9) * this.texH * 0.014 * amp;
		this.body.position.set(this.ox.x, this.oy.x + bob);
		this.body.rotation = this.tilt.x + Math.sin(t * 0.55) * 0.015 * amp;
		this.body.scale.set(this.sx.x, this.sy.x);

		this.jaw += (this.jawTarget - this.jaw) * Math.min(1, dt * 0.02);
		// lure spring (damped)
		const target = Math.sin(t * 1.3) * 18 - this.tilt.v * 6;
		this.lureV += (target - this.lureX) * dt * 0.02;
		this.lureV *= Math.pow(0.05, dt / 1000);
		this.lureX += (this.lureV * dt) / 1000;
		this.flareLevel = Math.max(0, this.flareLevel - dt * 0.0012);

		this.deform(t, amp);
		this.face(t, amp, dt);

		if (Math.random() < dt * 0.002 * (1 + this.excitement * 3)) {
			const p = this.toRoot(this.rig.bulb.u, this.rig.bulb.v, this.lureX);
			this.sparks.spawn({ texture: fx.spark(), x: p.x, y: p.y, count: 1, speed: [10, 40], angle: -Math.PI / 2, life: [800, 1400], size: [6, 14], tint: [COLORS.magenta, 0xffd27a] });
		}
		if (!this.reduced && Math.random() < dt * 0.00025 * (1 + this.excitement)) this.bubbles(1, 0.4);
		this.sparks.update(dt);
	}

	/** vertical swim / undulation offset at (u, v) — shared by the mesh and the fin layer */
	private waveY(u: number, t: number, swimA: number, amp: number) {
		const H = this.texH;
		const wt = smooth(this.rig.tailStart - 0.3, 1.0, u);
		return Math.sin(t * 2.6 - u * 5.5) * H * 0.04 * wt * wt * swimA + Math.sin(t * 1.1 + u * 2) * H * 0.006 * amp;
	}

	private deform(t: number, amp: number) {
		const r = this.rig;
		const buf = this.mesh.geometry.getAttribute('aPosition').buffer;
		const data = buf.data as Float32Array;
		const W = this.texW;
		const H = this.texH;
		const jawA = -(this.jaw + Math.sin(t * 1.7) * 0.06 * amp) * 0.42;
		const hx = r.hinge.u * W;
		const hy = r.hinge.v * H;
		const cos = Math.cos(jawA);
		const sin = Math.sin(jawA);
		const breathe = 1 + Math.sin(t * 1.8) * 0.012 * amp;
		const cy = r.pivot.v * H;
		const swimA = amp * this.swim * (1 + this.excitement * 0.4);
		const tailSweep = Math.sin(t * 3.1) * 0.15 * Math.min(swimA, 1.6);
		const fin = 1 + this.finBoost;
		// in-mesh pectoral flap (v1 art only)
		const pecA = (Math.sin(t * 3.6) * 0.16 + Math.sin(t * 7.1) * 0.03) * amp * fin;
		const pcos = Math.cos(pecA);
		const psin = Math.sin(pecA);
		const pr = r.pecRoot;
		const px = pr ? pr.u * W : 0;
		const py = pr ? pr.v * H : 0;
		const gx = r.gill.u * W;
		const gy = r.gill.v * H;
		const gill = Math.sin(t * 2.3) * 0.045 * amp;
		const tailU = r.tailU;
		const lureBob = Math.sin(t * 2.1) * 6 * amp;
		for (let i = 0; i < data.length; i += 2) {
			let x = this.base[i];
			let y = this.base[i + 1];
			const u = x / W;
			const v = y / H;
			// jaw hinge
			const wj = smooth(r.hinge.v - r.jawBlend, r.hinge.v + r.jawBlend, v) * smooth(r.hinge.u + r.jawFront, r.hinge.u - r.jawBack, u);
			if (wj > 0) {
				const dx = x - hx;
				const dy = y - hy;
				x = x + (hx + dx * cos - dy * sin - x) * wj;
				y = y + (hy + dx * sin + dy * cos - y) * wj;
			}
			// lure stalk sway
			const wl = r.stalkW(u, v);
			if (wl > 0) {
				x += this.lureX * wl;
				y += lureBob * wl;
			}
			// gill plate breathing: radial pulse around the gill
			const gdx = x - gx;
			const gdy = y - gy;
			const gd = (gdx * gdx) / (W * W * 0.0049) + (gdy * gdy) / (H * H * 0.03);
			if (gd < 1) {
				const w = (1 - gd) * (1 - gd);
				x += gdx * gill * w;
				y += gdy * gill * w;
			}
			if (pr) {
				const wp = smooth(pr.u - 0.005, pr.u + 0.05, u) * smooth(0.66, 0.6, u) * smooth(0.5, 0.56, v) * smooth(0.8, 0.72, v);
				if (wp > 0) {
					const dx = x - px;
					const dy = y - py;
					x += (px + dx * pcos - dy * psin - x) * wp;
					y += (py + dx * psin + dy * pcos - y) * wp;
				}
			}
			// dorsal + rear fins ripple
			const wd = r.dorsalW(u, v);
			if (wd > 0) {
				y += Math.sin(t * 3.4 - u * 22) * H * 0.018 * wd * amp * fin;
				x += Math.sin(t * 2.2) * W * 0.008 * wd * amp;
			}
			const wv = r.ventralW(u, v);
			if (wv > 0) y += Math.sin(t * 3.9 - u * 18) * H * 0.016 * wv * amp * fin;
			const wpel = r.pelvicW(u, v);
			if (wpel > 0) {
				x += Math.sin(t * 3.2 + 1) * W * 0.008 * wpel * amp * fin;
				y += Math.sin(t * 3.2) * H * 0.012 * wpel * amp * fin;
			}
			// swimming wave toward the tail + tail fin sweep
			y += this.waveY(u, t, swimA, amp);
			if (u > tailU) {
				const d = (u - tailU) * W;
				y += d * tailSweep * ((u - tailU) / (1 - tailU));
				x -= d * Math.abs(tailSweep) * 0.18;
			}
			y = cy + (y - cy) * breathe;
			data[i] = x + this.lunge;
			data[i + 1] = y;
		}
		buf.update();

		// separate pectoral fin: rides the body wave at its root, flaps about the root
		const f = r.fin;
		if (f && this.fin.visible) {
			const ru = f.rootX / W;
			const ry = cy + (f.rootY + this.waveY(ru, t, swimA, amp) - cy) * breathe;
			this.fin.position.set(f.rootX - this.mesh.pivot.x + this.lunge, ry - this.mesh.pivot.y);
			const rate = 3.2 * (1 + this.excitement * 0.6 + this.finBoost * 0.6);
			this.finPhase += rate * this.lastDt * 0.001 * (this.reduced ? 0.5 : 1);
			const ph = this.finPhase;
			this.fin.rotation = (Math.sin(ph) * 0.2 + Math.sin(ph * 2.1 + 0.6) * 0.04) * amp * fin - 0.03;
			// the fin folds toward the body on the up-stroke (foreshortening)
			this.fin.scale.set(1 - 0.14 * (0.5 + 0.5 * Math.sin(ph + 1.2)) * amp * Math.min(fin, 1.6), 1);
		}
	}

	private face(t: number, amp: number, dt: number) {
		const H = this.texH;
		const fl = this.flareLevel;
		// lure bulb
		const bulb = this.local(this.rig.bulb.u, this.rig.bulb.v, this.tmp);
		const bx = bulb.x + this.lureX;
		const by = bulb.y + Math.sin(t * 2.1) * 6 * amp;
		const pulse = 0.5 + 0.5 * Math.sin(t * 3.2);
		const hover = this.hovered ? 0.35 : 0;
		this.bulbGlow.position.set(bx, by);
		this.bulbGlow.scale.set((H * (0.5 + pulse * 0.08 + fl * 0.45 + hover * 0.3)) / 256);
		this.bulbGlow.alpha = Math.min(1, 0.55 + pulse * 0.2 + fl * 0.3 + hover);
		this.bulbCore.position.set(bx, by);
		this.bulbCore.scale.set((H * (0.12 + fl * 0.06)) / 64);
		this.bulbCore.alpha = 0.85;

		// eye: rest point follows the head (jaw/lunge are tiny there)
		const eye = this.local(this.rig.eye.u, this.rig.eye.v, this.tmp);
		const ex = eye.x;
		const ey = eye.y;
		// gaze target: event gaze > pointer (recent) > idle wander
		let gx: number;
		let gy: number;
		if (this.gaze && this.gaze.until > this.now) {
			gx = this.gaze.x;
			gy = this.gaze.y;
		} else if (this.now - this.pointerSeen < 2500) {
			gx = this.pointer.x;
			gy = this.pointer.y;
		} else {
			if (this.now >= this.nextIdleGaze) {
				this.nextIdleGaze = this.now + rand(1200, 2600);
				this.root.toGlobal(this.tmp2.set(rand(-this.texW * 1.2, -this.texW * 0.3), rand(-this.texH * 0.2, this.texH * 0.6)), this.idleGaze);
			}
			gx = this.idleGaze.x;
			gy = this.idleGaze.y;
		}
		const lp = this.body.toLocal(this.tmp2.set(gx, gy), undefined, this.tmp2);
		let dx = lp.x - ex;
		let dy = lp.y - ey;
		const d = Math.hypot(dx, dy) || 1;
		const reach = Math.min(1, d / (H * 0.25));
		dx = (dx / d) * reach;
		dy = (dy / d) * reach;
		const k = Math.min(1, dt * 0.012);
		const r = this.rig;
		this.pupilX += (dx * r.pupil.tx - this.pupilX) * k;
		this.pupilY += (dy * r.pupil.ty - this.pupilY) * k;
		const dil = 1 + this.eyeWide * 0.35 - this.excitement * 0.15;
		this.pupil.position.set(ex + this.pupilX, ey + this.pupilY + 1);
		this.pupil.scale.set(dil * (1 - (Math.abs(this.pupilX) / r.pupil.tx) * 0.2), dil);
		if (r.artPupil) this.irisPatch.position.set(ex + r.artPupil.dx, ey + r.artPupil.dy);
		this.glint.position.set(ex + r.glint.dx, ey + r.glint.dy);
		this.glint.scale.set((r.glint.s * (1 + this.eyeWide * 0.4)) / 32);
		this.glint.alpha = 0.9;
		this.eyeGlow.position.set(ex, ey);
		this.eyeGlow.scale.set((r.iris.rx * (3.2 + this.eyeWide * 2)) / 256);
		this.eyeGlow.alpha = 0.35 + this.eyeWide * 0.45 + 0.15 * Math.sin(t * 5.1) * Math.sin(t * 0.7);

		// eyelid: rest level (sleepy / yawning) + blink
		const lid = clamp(Math.max(this.lidLevel, this.blink));
		this.pupil.visible = lid < 0.85;
		this.glint.visible = lid < 0.5;
		if (Math.abs(lid - this.lidDrawn) > 0.01) {
			this.lidDrawn = lid;
			this.drawLid(lid);
		}
		this.lid.position.set(ex, ey);
	}

	private drawLid(b: number) {
		const g = this.lid;
		g.clear();
		if (b < 0.02) return;
		const rx = this.rig.iris.rx + 5;
		const ry = this.rig.iris.ry + 4;
		const curve = ry * 0.18;
		const edge = -ry + 2 * ry * b;
		const n = 14;
		const pts: number[] = [];
		for (let i = 0; i <= n; i++) {
			const x = -rx + (2 * rx * i) / n;
			const s = Math.sqrt(Math.max(0, 1 - (x / rx) ** 2));
			pts.push(x, -ry * s);
		}
		const edgePts: number[] = [];
		for (let i = n; i >= 0; i--) {
			const x = -rx + (2 * rx * i) / n;
			const s = Math.sqrt(Math.max(0, 1 - (x / rx) ** 2));
			edgePts.push(x, Math.min(edge + curve * s, ry * s));
		}
		// skin-toned lid (matches the brow plates), a lit rim just above its edge, dark lash line
		const c = this.rig.lid;
		const lw = Math.max(2, ry * 0.12);
		g.poly([...pts, ...edgePts]).fill({ color: c.fill });
		g.moveTo(edgePts[0], edgePts[1] - lw);
		for (let i = 2; i < edgePts.length; i += 2) g.lineTo(edgePts[i], edgePts[i + 1] - lw);
		g.stroke({ color: c.rim, width: lw * 0.8, alpha: 0.45 });
		g.moveTo(edgePts[0], edgePts[1]);
		for (let i = 2; i < edgePts.length; i += 2) g.lineTo(edgePts[i], edgePts[i + 1]);
		g.stroke({ color: c.lash, width: lw * 1.2, alpha: 0.95 });
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
