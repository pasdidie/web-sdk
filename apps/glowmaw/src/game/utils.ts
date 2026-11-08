import { stateBet } from 'state-shared';
import { createPlayBookUtils } from 'utils-book';

import { eventEmitter } from './eventEmitter';
import type { Bet, BookEventOfType } from './typesBookEvent';
import { bookEventHandlerMap } from './bookEventHandlerMap';

export const { playBookEvent, playBookEvents } = createPlayBookUtils({ bookEventHandlerMap });

export const playBet = async (bet: Bet) => {
	stateBet.winBookEventAmount = 0;
	await playBookEvents(bet.state);
	eventEmitter.broadcast({ type: 'stopButtonEnable' });
};

const SNAPSHOT_TYPES = ['freeSpinTrigger', 'updateFreeSpin', 'setTotalWin', 'lureCollect'];

/** Resume an unfinished round from the RGS-recorded event index. */
export const convertTorResumableBet = (betToResume: Bet) => {
	const resumingIndex = Number(betToResume.event);
	const before = betToResume.state.filter((_, i) => i < resumingIndex);
	const after = betToResume.state.filter((_, i) => i >= resumingIndex);
	const snapshot: BookEventOfType<'createBonusSnapshot'> = {
		index: 0,
		type: 'createBonusSnapshot',
		bookEvents: before.filter((e) => SNAPSHOT_TYPES.includes(e.type)),
	};
	return { ...betToResume, state: [snapshot, ...after] };
};
