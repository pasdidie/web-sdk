import type { EmitterEventSound } from '../components/Sound.svelte';

export type EmitterEventGame = EmitterEventSound | { type: 'uiModal'; name: string | null };
