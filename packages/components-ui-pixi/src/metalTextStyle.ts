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
export const metalTextStyle = (
	fontSize: number,
	options?: { fontWeight?: TextStyleOptions['fontWeight'] },
): TextStyleOptions => ({
	fontFamily: 'Cinzel',
	fontSize,
	fontWeight: options?.fontWeight ?? '700',
	fill: new FillGradient({
		type: 'linear',
		start: { x: 0, y: 0 },
		end: { x: 0, y: 1 },
		colorStops: [
			{ offset: 0, color: 0xfbe9a8 },
			{ offset: 0.45, color: 0xd9a63f },
			{ offset: 1, color: 0x8a5a1e },
		],
	}),
	stroke: { color: 0x2b1708, width: Math.max(2, Math.round(fontSize * 0.08)) },
	dropShadow: { color: 0x000000, alpha: 0.6, blur: 2, distance: 2, angle: Math.PI / 2 },
});
