import * as PIXI from 'pixi.js';

export const C = 100; // cell size in board units
export const REELS = 6;
export const ROWS = 5;
export const BOARD_W = C * REELS;
export const BOARD_H = C * ROWS;

export const COLORS = {
	abyss: 0x050a1a,
	trench: 0x0b2a3a,
	cyan: 0x3ff5e6,
	violet: 0x9b5cff,
	magenta: 0xff3fb4,
	amber: 0xffb84a,
	white: 0xe9fbff,
	ink: 0x02060f,
};

/** Glow tint + display scale per symbol (scale relative to the cell). */
export const SYMBOL_STYLE: Record<string, { tint: number; scale: number }> = {
	H1: { tint: 0xffb84a, scale: 1.0 },
	H2: { tint: 0xff3b5c, scale: 1.0 },
	H3: { tint: 0xb07bff, scale: 1.0 },
	H4: { tint: 0x2fe0b0, scale: 1.0 },
	L1: { tint: 0xff4d8d, scale: 0.92 },
	L2: { tint: 0x5dff8a, scale: 0.92 },
	L3: { tint: 0x4db2ff, scale: 0.92 },
	L4: { tint: 0xffa040, scale: 0.92 },
	L5: { tint: 0xc77dff, scale: 0.92 },
	S: { tint: 0xbff9ff, scale: 1.18 },
	M: { tint: 0x3ff5e6, scale: 0.9 },
};

/** Orb tier by multiplier value: art key + glow colour. */
export const orbTier = (v: number) => {
	if (v >= 100) return { key: 'orb_4', tint: 0xffc35a, tier: 4 };
	if (v >= 20) return { key: 'orb_3', tint: 0xff3fb4, tier: 3 };
	if (v >= 6) return { key: 'orb_2', tint: 0x9b5cff, tier: 2 };
	return { key: 'orb_1', tint: 0x3ff5e6, tier: 1 };
};

export const FONT = '"Exo 2", "Arial Black", sans-serif';

export const textStyle = (size: number, opts: Partial<{ fill: any; stroke: number; strokeWidth: number; weight: string; italic: boolean; glow: number }> = {}) => ({
	fontFamily: FONT,
	fontSize: size,
	fontWeight: (opts.weight ?? '900') as any,
	fontStyle: (opts.italic === false ? 'normal' : 'italic') as any,
	fill: opts.fill ?? 0xffffff,
	stroke: { color: opts.stroke ?? COLORS.ink, width: opts.strokeWidth ?? Math.max(2, size * 0.12), join: 'round' as const },
	dropShadow: { color: opts.glow ?? COLORS.cyan, blur: size * 0.25, distance: 0, alpha: 0.85, angle: 0 },
	padding: Math.ceil(size * 0.4),
	align: 'center' as const,
});

/** Vertical gradient fill helper for big numbers. */
export const gradientFill = (stops: [number, number][]) => ({ stops, kind: 'linear' });

/**
 * Text with glow padding. Pixi 8.8 draws the padded canvas shifted by -padding
 * (glyphs land up-left of the anchor); the pivot puts them back. Without padding the
 * glow is clipped into a visible rectangle, so the padding has to stay.
 */
export class GText extends PIXI.Text {
	constructor(opts: PIXI.TextOptions) {
		super(opts);
		const pad = (this.style as PIXI.TextStyle).padding ?? 0;
		this.pivot.set(-pad, -pad);
	}
}
