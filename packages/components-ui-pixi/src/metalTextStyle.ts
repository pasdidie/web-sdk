import { FillGradient } from 'pixi.js';
import type { TextStyleOptions } from 'pixi.js';

/**
 * Themed text style for the Azure Anvil UI (labels, button captions, the
 * header clock): a forged-metal gold-to-bronze gradient with a dark engraved
 * stroke and a soft drop shadow, instead of flat white Cinzel. Code-rendered
 * (not a baked image) so it stays translatable -- see docs/DECISIONS.md for
 * why a Gemini-generated font isn't the right tool for this (AI image
 * generators don't produce character-accurate bitmap font atlases).
 */
type MetalTextTheme = {
	fontFamily: string;
	colorStops: [number, number, number]; // top, middle, bottom of the gradient
	strokeColor: number;
	// Forces one weight for every UI text (a single-weight display face such
	// as Limelight looks smeared when the browser fakes bold). Unset = each
	// caller's own weight.
	fontWeight?: TextStyleOptions['fontWeight'];
	// UiButton: label wrap width as a fraction of the button (keep it inside
	// the button art's plain centre), and size boost for one-glyph labels (+/-).
	buttonTextWidth: number;
	buttonGlyphScale: number;
};

// Default = Azure Anvil's forged gold. A game can swap the palette (e.g. a
// black-and-white game wants silver) with setMetalTextTheme() at startup.
const metalTextTheme: MetalTextTheme = {
	fontFamily: 'Cinzel',
	colorStops: [0xfbe9a8, 0xd9a63f, 0x8a5a1e],
	strokeColor: 0x2b1708,
	buttonTextWidth: 0.74,
	buttonGlyphScale: 1,
};

export const getMetalTextTheme = (): Readonly<MetalTextTheme> => metalTextTheme;

export const setMetalTextTheme = (theme: Partial<MetalTextTheme>) => Object.assign(metalTextTheme, theme);

export const metalTextStyle = (
	fontSize: number,
	options?: { fontWeight?: TextStyleOptions['fontWeight'] },
): TextStyleOptions => ({
	fontFamily: metalTextTheme.fontFamily,
	fontSize,
	fontWeight: metalTextTheme.fontWeight ?? options?.fontWeight ?? '700',
	fill: new FillGradient({
		type: 'linear',
		start: { x: 0, y: 0 },
		end: { x: 0, y: 1 },
		colorStops: [
			{ offset: 0, color: metalTextTheme.colorStops[0] },
			{ offset: 0.45, color: metalTextTheme.colorStops[1] },
			{ offset: 1, color: metalTextTheme.colorStops[2] },
		],
	}),
	stroke: { color: metalTextTheme.strokeColor, width: Math.max(2, Math.round(fontSize * 0.08)) },
	dropShadow: { color: 0x000000, alpha: 0.6, blur: 2, distance: 2, angle: Math.PI / 2 },
});
