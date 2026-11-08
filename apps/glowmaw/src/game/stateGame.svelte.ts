import type { GameType } from './types';

export const stateGame = $state({
	gameType: 'basegame' as GameType,
	/** lure value restored when resuming a bonus mid-way */
	lure: 0,
});

export const stateGameDerived = {};
