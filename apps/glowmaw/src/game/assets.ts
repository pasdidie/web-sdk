import { assets as base } from '$app/paths';
import manifest from './assetManifest.json';

/**
 * Art exported by tools/assets/export_web.py into static/assets/glowmaw/
 * (manifest key -> file). Anything missing falls back to a coded placeholder.
 */
const art = Object.fromEntries(
	Object.entries(manifest as Record<string, string>).map(([key, file]) => [key, { type: 'sprite' as const, src: `${base}/assets/glowmaw/${file}` }]),
);

export default {
	...art,
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
} as any;
