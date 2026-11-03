import type { TextStyleOptions } from 'pixi.js';
import { metalTextStyle } from 'components-ui-pixi';

/**
 * SLAPSTICK's in-game titles and amounts: Limelight (the Art Deco
 * silent-film face, self-hosted in app.html) in the silver metal gradient
 * set by setMetalTextTheme() in Game.svelte. Replaces the SDK's 'silver'
 * bitmap font (a western block face with no "." glyph, off-theme).
 * Limelight only ships a 400 weight; asking for bold would fake it.
 */
export const silverText = (fontSize: number, extra?: TextStyleOptions): TextStyleOptions => ({
	...metalTextStyle(fontSize, { fontWeight: '400' }),
	align: 'center',
	letterSpacing: Math.round(fontSize * 0.04),
	...extra,
});
