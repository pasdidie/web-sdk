import { createSound } from 'utils-sound';

export type MusicName = 'bgm_main' | 'bgm_freespin' | 'bgm_bigwin';
export type SoundEffectName = string;
export type SoundName = string;

const sound = createSound<SoundName>();
const known = new Set<string>();

export const registerSoundNames = (names: string[]) => names.forEach((n) => known.add(n));
export const hasSound = (name: string) => known.has(name);

export { sound };
