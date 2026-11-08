/**
 * Texture access for the scene: loaded art first (keys from game/assets.ts),
 * procedural FX textures (soft glows, sparks, rings, bubbles, plankton) drawn
 * once on canvases, and labelled placeholders while a piece of art is missing.
 */
import * as PIXI from 'pixi.js';

let loaded: Record<string, unknown> = {};
const cache = new Map<string, PIXI.Texture>();

export const setLoadedAssets = (assets: Record<string, unknown> | undefined) => {
	loaded = assets ?? {};
};

export const hasArt = (key: string) => loaded[key] instanceof PIXI.Texture;

const canvasTex = (key: string, w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) => {
	const cached = cache.get(key);
	if (cached) return cached;
	const cv = document.createElement('canvas');
	cv.width = w;
	cv.height = h;
	draw(cv.getContext('2d')!);
	const tex = PIXI.Texture.from(cv);
	cache.set(key, tex);
	return tex;
};

const radial = (c: CanvasRenderingContext2D, s: number, stops: [number, string][]) => {
	const g = c.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
	for (const [o, col] of stops) g.addColorStop(o, col);
	c.fillStyle = g;
	c.fillRect(0, 0, s, s);
};

export const fx = {
	glow: () =>
		canvasTex('fx_glow', 256, 256, (c) =>
			radial(c, 256, [
				[0, 'rgba(255,255,255,1)'],
				[0.18, 'rgba(255,255,255,0.75)'],
				[0.45, 'rgba(255,255,255,0.22)'],
				[1, 'rgba(255,255,255,0)'],
			]),
		),
	softGlow: () =>
		canvasTex('fx_soft', 256, 256, (c) =>
			radial(c, 256, [
				[0, 'rgba(255,255,255,0.55)'],
				[0.5, 'rgba(255,255,255,0.18)'],
				[1, 'rgba(255,255,255,0)'],
			]),
		),
	spark: () =>
		canvasTex('fx_spark', 64, 64, (c) =>
			radial(c, 64, [
				[0, 'rgba(255,255,255,1)'],
				[0.25, 'rgba(255,255,255,0.9)'],
				[0.6, 'rgba(255,255,255,0.15)'],
				[1, 'rgba(255,255,255,0)'],
			]),
		),
	streak: () =>
		canvasTex('fx_streak', 32, 128, (c) => {
			const g = c.createLinearGradient(0, 0, 0, 128);
			g.addColorStop(0, 'rgba(255,255,255,0)');
			g.addColorStop(0.5, 'rgba(255,255,255,1)');
			g.addColorStop(1, 'rgba(255,255,255,0)');
			c.fillStyle = g;
			c.beginPath();
			c.ellipse(16, 64, 7, 64, 0, 0, Math.PI * 2);
			c.fill();
		}),
	ring: () =>
		canvasTex('fx_ring', 256, 256, (c) => {
			const g = c.createRadialGradient(128, 128, 80, 128, 128, 128);
			g.addColorStop(0, 'rgba(255,255,255,0)');
			g.addColorStop(0.7, 'rgba(255,255,255,0.9)');
			g.addColorStop(0.82, 'rgba(255,255,255,0.35)');
			g.addColorStop(1, 'rgba(255,255,255,0)');
			c.fillStyle = g;
			c.fillRect(0, 0, 256, 256);
		}),
	bubble: () =>
		canvasTex('fx_bubble', 64, 64, (c) => {
			const g = c.createRadialGradient(32, 32, 18, 32, 32, 31);
			g.addColorStop(0, 'rgba(255,255,255,0.05)');
			g.addColorStop(0.8, 'rgba(255,255,255,0.35)');
			g.addColorStop(1, 'rgba(255,255,255,0)');
			c.fillStyle = g;
			c.beginPath();
			c.arc(32, 32, 31, 0, Math.PI * 2);
			c.fill();
			c.fillStyle = 'rgba(255,255,255,0.85)';
			c.beginPath();
			c.ellipse(22, 20, 6, 4, -0.6, 0, Math.PI * 2);
			c.fill();
		}),
	beam: () =>
		canvasTex('fx_beam', 128, 512, (c) => {
			const g = c.createLinearGradient(0, 0, 128, 0);
			g.addColorStop(0, 'rgba(255,255,255,0)');
			g.addColorStop(0.5, 'rgba(255,255,255,0.9)');
			g.addColorStop(1, 'rgba(255,255,255,0)');
			c.fillStyle = g;
			c.fillRect(0, 0, 128, 512);
			const v = c.createLinearGradient(0, 0, 0, 512);
			v.addColorStop(0, 'rgba(0,0,0,1)');
			v.addColorStop(0.25, 'rgba(0,0,0,0)');
			v.addColorStop(0.75, 'rgba(0,0,0,0)');
			v.addColorStop(1, 'rgba(0,0,0,1)');
			c.globalCompositeOperation = 'destination-out';
			c.fillStyle = v;
			c.fillRect(0, 0, 128, 512);
		}),
	rays: () =>
		canvasTex('fx_rays', 512, 512, (c) => {
			c.translate(256, 256);
			const n = 18;
			for (let i = 0; i < n; i++) {
				c.rotate((Math.PI * 2) / n);
				const g = c.createLinearGradient(0, 0, 0, -256);
				g.addColorStop(0, 'rgba(255,255,255,0.9)');
				g.addColorStop(1, 'rgba(255,255,255,0)');
				c.fillStyle = g;
				c.beginPath();
				c.moveTo(0, 0);
				c.lineTo(-18 - (i % 3) * 8, -256);
				c.lineTo(18 + (i % 3) * 8, -256);
				c.closePath();
				c.fill();
			}
		}),
	vignette: () =>
		canvasTex('fx_vignette', 512, 512, (c) =>
			radial(c, 512, [
				[0, 'rgba(0,0,0,0)'],
				[0.55, 'rgba(0,0,0,0.05)'],
				[0.85, 'rgba(0,0,0,0.6)'],
				[1, 'rgba(0,0,0,0.95)'],
			]),
		),
};

const PLACEHOLDER_COLORS: Record<string, string> = {
	H1: '#ffb84a', H2: '#e8344e', H3: '#9b5cff', H4: '#2fe0a8',
	L1: '#ff4d8d', L2: '#4dff7a', L3: '#4da6ff', L4: '#ff9a3c', L5: '#c77dff',
	S: '#e9fbff', M: '#3ff5e6',
};

/** Loaded art for `key`, or a labelled glowing disc placeholder. */
export const tex = (key: string, label?: string): PIXI.Texture => {
	const t = loaded[key];
	if (t instanceof PIXI.Texture) return t;
	const name = label ?? key.replace(/^sym_/, '');
	const col = PLACEHOLDER_COLORS[name] ?? '#3ff5e6';
	return canvasTex('ph_' + key, 256, 256, (c) => {
		const g = c.createRadialGradient(110, 100, 10, 128, 128, 120);
		g.addColorStop(0, '#ffffff');
		g.addColorStop(0.35, col);
		g.addColorStop(1, '#05101e');
		c.fillStyle = g;
		c.beginPath();
		c.arc(128, 128, 112, 0, Math.PI * 2);
		c.fill();
		c.lineWidth = 10;
		c.strokeStyle = '#02060f';
		c.stroke();
		c.fillStyle = '#02060f';
		c.font = '900 italic 84px "Exo 2", sans-serif';
		c.textAlign = 'center';
		c.textBaseline = 'middle';
		c.fillText(name, 128, 134);
	});
};
