/**
 * Shared "camera" offset for the projection screen: a short decaying shake,
 * like the projector booth taking a knock. Added to boardLayout() so the
 * board, its frame and everything placed from the board move together.
 * One rAF loop, deterministic sines (both board layers must stay aligned).
 */
import { prefersReducedMotion } from './animationConfig';

export const camera = $state({ x: 0, y: 0 });

let frame = 0;
let strength = 0;
let start = 0;
let duration = 0;

export const shakeCamera = (power: number, durationMs = 420) => {
	if (prefersReducedMotion() || typeof window === 'undefined') return;
	const now = performance.now();
	// a weaker knock never cuts a stronger one short
	const remaining = duration ? strength * Math.max(0, 1 - (now - start) / duration) ** 2 : 0;
	if (power < remaining) return;
	strength = power;
	start = now;
	duration = durationMs;
	cancelAnimationFrame(frame);
	const tick = (ts: number) => {
		const t = (ts - start) / duration;
		if (t >= 1) {
			camera.x = 0;
			camera.y = 0;
			duration = 0;
			return;
		}
		const decay = (1 - t) ** 2;
		camera.x = Math.sin(ts * 0.071) * strength * decay;
		camera.y = Math.cos(ts * 0.093) * strength * decay * 0.8;
		frame = requestAnimationFrame(tick);
	};
	frame = requestAnimationFrame(tick);
};
