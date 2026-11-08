import { assets } from '$app/paths';
import manifest from '../game/assetManifest.json';

/** URL of an exported art file by key (static/assets/glowmaw/<file>), '' when missing. */
export const assetUrl = (key: string) => {
	const file = (manifest as Record<string, string>)[key];
	return file ? `${assets}/assets/glowmaw/${file}` : '';
};
