import _ from 'lodash';

import { recordBookEvent, checkIsMultipleRevealEvents, type BookEventHandlerMap } from 'utils-book';
import { stateBet } from 'state-shared';

import { eventEmitter } from './eventEmitter';
import { getScene } from './sceneRef';
import { stateGame } from './stateGame.svelte';
import type { BookEvent, BookEventOfType, BookEventContext } from './typesBookEvent';

const isSuper = () => stateBet.activeBetModeKey.toLowerCase() === 'super';

export const bookEventHandlerMap: BookEventHandlerMap<BookEvent, BookEventContext> = {
	reveal: async (ev: BookEventOfType<'reveal'>, { bookEvents }: BookEventContext) => {
		const scene = await getScene();
		if (checkIsMultipleRevealEvents({ bookEvents })) {
			eventEmitter.broadcast({ type: 'stopButtonEnable' });
			recordBookEvent({ bookEvent: ev });
		}
		stateGame.gameType = ev.gameType;
		await scene.reveal(ev);
	},
	winInfo: async (ev: BookEventOfType<'winInfo'>) => {
		const scene = await getScene();
		await scene.winInfo(ev);
	},
	updateTumbleWin: async (ev: BookEventOfType<'updateTumbleWin'>) => {
		if (ev.amount <= 0) return;
		const scene = await getScene();
		await scene.updateTumbleWin(ev.amount);
	},
	tumbleBoard: async (ev: BookEventOfType<'tumbleBoard'>) => {
		const scene = await getScene();
		await scene.tumbleBoard(ev);
	},
	boardMultiplierInfo: async (ev: BookEventOfType<'boardMultiplierInfo'>) => {
		const scene = await getScene();
		await scene.boardMultiplier(ev);
	},
	lureCollect: async (ev: BookEventOfType<'lureCollect'>) => {
		const scene = await getScene();
		stateGame.lure = ev.lure;
		await scene.lureCollect(ev);
	},
	lureApply: async (ev: BookEventOfType<'lureApply'>) => {
		const scene = await getScene();
		await scene.lureApply(ev);
	},
	setTotalWin: async (ev: BookEventOfType<'setTotalWin'>) => {
		stateBet.winBookEventAmount = ev.amount;
	},
	freeSpinTrigger: async (ev: BookEventOfType<'freeSpinTrigger'>) => {
		const scene = await getScene();
		eventEmitter.broadcast({ type: 'uiHide' });
		stateGame.lure = 0;
		await scene.freeSpinTrigger(ev, isSuper());
		stateGame.gameType = 'freegame';
		eventEmitter.broadcast({ type: 'uiShow' });
	},
	freeSpinRetrigger: async (ev: BookEventOfType<'freeSpinRetrigger'>) => {
		const scene = await getScene();
		await scene.freeSpinRetrigger(ev);
	},
	updateFreeSpin: async (ev: BookEventOfType<'updateFreeSpin'>) => {
		const scene = await getScene();
		scene.updateFreeSpin(ev);
	},
	freeSpinEnd: async (ev: BookEventOfType<'freeSpinEnd'>) => {
		const scene = await getScene();
		eventEmitter.broadcast({ type: 'uiHide' });
		await scene.freeSpinEnd(ev);
		stateGame.gameType = 'basegame';
		eventEmitter.broadcast({ type: 'uiShow' });
	},
	setWin: async (ev: BookEventOfType<'setWin'>) => {
		const scene = await getScene();
		await scene.setWin(ev);
	},
	wincap: async () => {
		const scene = await getScene();
		await scene.wincap();
	},
	finalWin: async (ev: BookEventOfType<'finalWin'>) => {
		const scene = await getScene();
		scene.finalWin(ev.amount);
	},
	// resume an unfinished bonus: rebuild the HUD from the events already played
	createBonusSnapshot: async (ev: BookEventOfType<'createBonusSnapshot'>) => {
		const scene = await getScene();
		const find = <T extends BookEvent['type']>(type: T) => _.findLast(ev.bookEvents, (e) => e.type === type) as BookEventOfType<T> | undefined;
		const fs = find('updateFreeSpin');
		const trig = find('freeSpinTrigger');
		const lure = find('lureCollect');
		const total = find('setTotalWin');
		if (total) stateBet.winBookEventAmount = total.amount;
		stateGame.gameType = 'freegame';
		scene.restoreFreeSpins(fs ? fs.amount : 0, fs ? fs.total : trig?.totalFs ?? 0, lure?.lure ?? 0);
	},
};
