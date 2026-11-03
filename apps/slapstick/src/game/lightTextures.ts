import { Texture } from 'pixi.js';

/**
 * Light effects for the special symbols, built once from canvas gradients:
 * a soft cream halo (lamp glow behind the Wild hat / Scatter projector) and
 * the projector beam cone. Effects only, the symbol art itself is Gemini.
 */
const CREAM = '242, 238, 228';
const cache: Partial<Record<'halo' | 'beam', Texture>> = {};

const canvas = (width: number, height: number) => {
	const element = document.createElement('canvas');
	element.width = width;
	element.height = height;
	return { element, ctx: element.getContext('2d')! };
};

export const getHaloTexture = () => {
	if (cache.halo) return cache.halo;
	const size = 256;
	const { element, ctx } = canvas(size, size);
	const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	gradient.addColorStop(0, `rgba(${CREAM}, 0.8)`);
	gradient.addColorStop(0.4, `rgba(${CREAM}, 0.32)`);
	gradient.addColorStop(0.75, `rgba(${CREAM}, 0.08)`);
	gradient.addColorStop(1, `rgba(${CREAM}, 0)`);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size, size);
	return (cache.halo = Texture.from(element));
};

// Beam cone pointing right, apex at the left-middle edge (anchor { x: 0, y: 0.5 }).
export const getBeamTexture = () => {
	if (cache.beam) return cache.beam;
	const width = 256;
	const height = 160;
	const { element, ctx } = canvas(width, height);
	const gradient = ctx.createLinearGradient(0, 0, width, 0);
	gradient.addColorStop(0, `rgba(${CREAM}, 0.75)`);
	gradient.addColorStop(0.5, `rgba(${CREAM}, 0.25)`);
	gradient.addColorStop(1, `rgba(${CREAM}, 0)`);
	ctx.fillStyle = gradient;
	ctx.beginPath();
	ctx.moveTo(0, height / 2 - 4);
	ctx.lineTo(width, 0);
	ctx.lineTo(width, height);
	ctx.lineTo(0, height / 2 + 4);
	ctx.closePath();
	ctx.filter = 'blur(6px)';
	ctx.fill();
	return (cache.beam = Texture.from(element));
};
