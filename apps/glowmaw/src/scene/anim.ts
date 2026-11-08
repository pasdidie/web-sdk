/**
 * Tiny ticker-driven tween engine. Every tween returns a promise, can be
 * time-scaled globally (turbo) and skipped (stop button / slam stop).
 */
export type Ease = (t: number) => number;

export const ease = {
	linear: (t: number) => t,
	inQuad: (t: number) => t * t,
	outQuad: (t: number) => 1 - (1 - t) * (1 - t),
	inOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
	inCubic: (t: number) => t * t * t,
	outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
	inOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
	outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
	outExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
	inExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
	outBack: (t: number) => {
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
	},
	outBackBig: (t: number) => {
		const c1 = 3;
		const c3 = c1 + 1;
		return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
	},
	inBack: (t: number) => {
		const c1 = 1.70158;
		return (c1 + 1) * t * t * t - c1 * t * t;
	},
	outElastic: (t: number) => {
		if (t === 0 || t === 1) return t;
		return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
	},
	outBounce: (t: number) => {
		const n1 = 7.5625;
		const d1 = 2.75;
		if (t < 1 / d1) return n1 * t * t;
		if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
		if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
		return n1 * (t -= 2.625 / d1) * t + 0.984375;
	},
};

type Job = {
	elapsed: number;
	delay: number;
	duration: number;
	update: (t: number) => void;
	resolve: () => void;
	ease: Ease;
	group?: string;
	done: boolean;
};

export type TweenOpts = { duration: number; delay?: number; ease?: Ease; group?: string };

class Animator {
	private jobs: Job[] = [];
	private frameCbs = new Set<(dt: number) => void>();
	/** global speed: 1 normal, >1 turbo */
	speed = 1;
	reducedMotion = false;
	now = 0;

	/** Generic tween: calls update(eased t) every frame from 0 to 1. */
	tween(opts: TweenOpts, update: (t: number) => void): Promise<void> {
		return new Promise((resolve) => {
			this.jobs.push({
				elapsed: 0,
				delay: opts.delay ?? 0,
				duration: Math.max(1, opts.duration),
				update,
				resolve,
				ease: opts.ease ?? ease.outCubic,
				group: opts.group,
				done: false,
			});
		});
	}

	/** Tween numeric props of an object. */
	to<T extends object>(target: T, props: Partial<Record<keyof T, number>>, opts: TweenOpts): Promise<void> {
		const from: Record<string, number> = {};
		for (const k in props) from[k] = (target as any)[k];
		return this.tween(opts, (t) => {
			for (const k in props) (target as any)[k] = from[k] + ((props as any)[k] - from[k]) * t;
		});
	}

	wait(ms: number, group?: string): Promise<void> {
		return this.tween({ duration: ms, ease: ease.linear, group }, () => {});
	}

	/** Finish every running tween of a group immediately (jump to end). */
	finish(group: string) {
		for (const j of this.jobs) {
			if (j.group === group && !j.done) {
				j.update(1);
				j.done = true;
				j.resolve();
			}
		}
		this.jobs = this.jobs.filter((j) => !j.done);
	}

	onFrame(cb: (dt: number) => void) {
		this.frameCbs.add(cb);
		return () => this.frameCbs.delete(cb);
	}

	update(dtMs: number) {
		const dt = Math.min(dtMs, 50);
		this.now += dt;
		const scaled = dt * this.speed;
		const jobs = this.jobs;
		this.jobs = [];
		for (const j of jobs) {
			if (j.done) continue;
			if (j.delay > 0) {
				j.delay -= scaled;
				if (j.delay > 0) {
					this.jobs.push(j);
					continue;
				}
			}
			j.elapsed += scaled;
			const t = Math.min(1, j.elapsed / j.duration);
			j.update(j.ease(t));
			if (t >= 1) {
				j.done = true;
				j.resolve();
			} else this.jobs.push(j);
		}
		for (const cb of this.frameCbs) cb(dt);
	}
}

export const anim = new Animator();

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const rand = (a: number, b: number) => a + Math.random() * (b - a);
export const sleep = (ms: number, group?: string) => anim.wait(ms, group);
