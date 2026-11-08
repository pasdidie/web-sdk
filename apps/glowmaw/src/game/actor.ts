import _ from 'lodash';

import { stateBet } from 'state-shared';
import { checkIsMultipleRevealEvents } from 'utils-book';
import { createPrimaryMachines, createIntermediateMachines, createGameActor } from 'utils-xstate';

import type { Bet } from './typesBookEvent';
import { playBet, convertTorResumableBet } from './utils';
import { sceneRef, getScene } from './sceneRef';

const primaryMachines = createPrimaryMachines<Bet>({
	onResumeGameActive: (betToResume) => convertTorResumableBet(betToResume),
	onResumeGameInactive: async (betToResume) => {
		const lastReveal = _.findLast(betToResume.state, (e) => e?.type === 'reveal');
		const scene = await getScene();
		if (lastReveal && lastReveal.type === 'reveal') scene.board.settle(lastReveal.board);
	},
	onNewGameStart: async () => {
		stateBet.winBookEventAmount = 0;
		// symbols drop away right on the press, before the round arrives
		sceneRef.scene?.preSpin();
	},
	onNewGameError: async () => {
		const scene = await getScene();
		scene.board.settle(scene.board.cells.map((r) => r.map((s) => s.raw)));
		scene.board.spinning = false;
	},
	onPlayGame: async (bet) => await playBet(bet),
	checkIsBonusGame: (bet) => checkIsMultipleRevealEvents({ bookEvents: bet.state }),
});

const intermediateMachines = createIntermediateMachines(primaryMachines);

export const gameActor = createGameActor(intermediateMachines);
