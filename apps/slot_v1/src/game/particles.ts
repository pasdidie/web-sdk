/**
 * Minimal additive particle system on raw PixiJS sprites.
 *
 * Why not @barvynkoa/particle-emitter (already used by WinCoins): its config
 * expects the example's spritesheet format and can't be pointed at our own
 * single-texture FX art without a converter, and its ticker hook in
 * pixi-svelte's ParticleEmitter is never removed on destroy. This is ~100
 * lines, owns its ticker callback, recycles sprites, and caps the live count
 * (ANIMATION_SPEC: <= 150 simultaneous particles).
 */
import * as PIXI from 'pixi.js';

export type Range = number | [number, number];

export type SpawnOptions = {
	texture: PIXI.Texture;
	x: number;
	y: number;
	count: number;
	/** Spawn area half-size around x/y. */
	spreadX?: number;
	spreadY?: number;
	/** Emission direction in radians (0 = right, -PI/2 = up) and cone width. */
	angle?: number;
	cone?: number;
	speed?: Range; // px per second
	life?: Range; // ms
	size?: Range; // px (start size)
	endSizeRatio?: number;
	gravity?: number; // px/s^2, positive = down
	drag?: number; // 0..1 velocity kept per second
	spin?: Range; // rad/s
	tint?: number | number[];
	alpha?: number;
	/** Align sprite rotation with velocity (spark streaks). */
	alignToVelocity?: boolean;
	/** Stretch along velocity: final height multiplier. */
	stretch?: number;
	blend?: PIXI.BLEND_MODES;
	fadeIn?: number; // fraction of life used to fade in
};

type Particle = {
	sprite: PIXI.Sprite;
	vx: number;
	vy: number;
	age: number;
	life: number;
	size: number;
	endSize: number;
	gravity: number;
	drag: number;
	spin: number;
	alpha: number;
	align: boolean;
	stretch: number;
	fadeIn: number;
};

const pick = (r: Range | undefined, fallback: number) => {
	if (r === undefined) return fallback;
	if (typeof r === 'number') return r;
	return r[0] + Math.random() * (r[1] - r[0]);
};

export class ParticleSystem {
	readonly container = new PIXI.Container();
	private live: Particle[] = [];
	private pool: PIXI.Sprite[] = [];

	constructor(private maxParticles = 150) {}

	get count() {
		return this.live.length;
	}

	spawn(o: SpawnOptions) {
		const room = this.maxParticles - this.live.length;
		const n = Math.min(o.count, room);
		for (let i = 0; i < n; i++) {
			const sprite = this.pool.pop() ?? new PIXI.Sprite();
			sprite.texture = o.texture;
			sprite.anchor.set(0.5);
			sprite.blendMode = o.blend ?? 'add';
			const tints = Array.isArray(o.tint) ? o.tint : [o.tint ?? 0xffffff];
			sprite.tint = tints[Math.floor(Math.random() * tints.length)];
			sprite.x = o.x + (Math.random() * 2 - 1) * (o.spreadX ?? 0);
			sprite.y = o.y + (Math.random() * 2 - 1) * (o.spreadY ?? 0);
			sprite.visible = true;
			const angle = (o.angle ?? -Math.PI / 2) + (Math.random() - 0.5) * (o.cone ?? Math.PI * 2);
			const speed = pick(o.speed, 200);
			const size = pick(o.size, 24);
			const p: Particle = {
				sprite,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				age: 0,
				life: pick(o.life, 800),
				size,
				endSize: size * (o.endSizeRatio ?? 0.2),
				gravity: o.gravity ?? 0,
				drag: o.drag ?? 1,
				spin: pick(o.spin, 0),
				alpha: o.alpha ?? 1,
				align: !!o.alignToVelocity,
				stretch: o.stretch ?? 1,
				fadeIn: o.fadeIn ?? 0.08,
			};
			sprite.rotation = p.align ? Math.atan2(p.vy, p.vx) + Math.PI / 2 : Math.random() * Math.PI * 2;
			this.applyVisual(p, 0);
			this.container.addChild(sprite);
			this.live.push(p);
		}
	}

	private applyVisual(p: Particle, t: number) {
		const s = p.size + (p.endSize - p.size) * t;
		const fade = t < p.fadeIn ? t / p.fadeIn : 1 - (t - p.fadeIn) / (1 - p.fadeIn);
		p.sprite.alpha = Math.max(0, fade) * p.alpha;
		const texW = p.sprite.texture.width || 1;
		const texH = p.sprite.texture.height || 1;
		p.sprite.scale.set(s / texW, (s * (p.align ? p.stretch : 1)) / texH);
	}

	update(deltaMs: number) {
		const dt = deltaMs / 1000;
		for (let i = this.live.length - 1; i >= 0; i--) {
			const p = this.live[i];
			p.age += deltaMs;
			const t = p.age / p.life;
			if (t >= 1) {
				p.sprite.visible = false;
				this.container.removeChild(p.sprite);
				this.pool.push(p.sprite);
				this.live.splice(i, 1);
				continue;
			}
			const dragK = Math.pow(p.drag, dt);
			p.vx *= dragK;
			p.vy = p.vy * dragK + p.gravity * dt;
			p.sprite.x += p.vx * dt;
			p.sprite.y += p.vy * dt;
			if (p.align) p.sprite.rotation = Math.atan2(p.vy, p.vx) + Math.PI / 2;
			else p.sprite.rotation += p.spin * dt;
			this.applyVisual(p, t);
		}
	}

	clear() {
		for (const p of this.live) {
			this.container.removeChild(p.sprite);
			this.pool.push(p.sprite);
		}
		this.live = [];
	}

	destroy() {
		this.clear();
		for (const sprite of this.pool) sprite.destroy();
		this.pool = [];
		this.container.destroy({ children: true });
	}
}

/** Resolve one of our FX textures with graceful fallback to fx_particle. */
export const getFxTexture = (
	loadedAssets: Record<string, unknown> | undefined,
	key: string,
): PIXI.Texture => {
	const tex = (loadedAssets?.[key] ?? loadedAssets?.['fx_particle']) as PIXI.Texture | undefined;
	return tex ?? PIXI.Texture.WHITE;
};
