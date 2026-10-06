import { stateUrlDerived, type BetModeMeta } from 'state-shared';

import config from './config';

const social = stateUrlDerived.social();

/**
 * Overrides state-shared's DEFAULT_BET_MODE_META, which is template/demo
 * data for a completely different game (5 modes -- ANTE/SUPERANTE/SUPERSPIN/
 * BONUS/SUPER, titled "DOUBLE BOOST"/"SAMURAI SPIN"/"Enter the mothership!"
 * etc., referencing another studio's asset CDN). It drives the Buy Bonus
 * confirmation modal (ModalBuyBonus.svelte -> BonusCards.svelte), so left
 * untouched the modal would offer 5 fake purchases that don't exist in our
 * math. We only have the 2 modes in game/config.ts: base (not purchasable,
 * filtered out by BonusCards itself via type!=='default') and bonus (the
 * one real buy option). Text respects social-casino wording the same way
 * GameRulesContent.svelte/PayTableContent.svelte do -- see
 * components-ui-pixi/i18nDerived.ts for the same pattern on the button that
 * opens this modal.
 */
const EMPTY_ASSETS = { icon: '', volatility: '', button: '', dialogImage: '', dialogVolatility: '' };

export const betModeMeta: BetModeMeta = {
	BASE: {
		mode: 'BASE',
		costMultiplier: config.betModes.base.cost,
		type: 'default',
		parent: '',
		children: '',
		assets: EMPTY_ASSETS,
		text: {
			title: 'Base',
			dialog: '',
			button: '',
			betAmountLabel: '',
			tickerIdle: '',
			tickerSpin: '',
		},
		maxWin: config.betModes.base.max_win,
	},
	BONUS: {
		mode: 'BONUS',
		costMultiplier: config.betModes.bonus.cost,
		type: 'buy',
		parent: '',
		children: '',
		assets: EMPTY_ASSETS,
		text: {
			title: social ? 'Bonus' : 'Bonus Buy',
			dialog: social
				? 'Skip straight to the free spins. Bonus mode has the same return as the base game.'
				: 'Skip straight to the free spins by buying it directly. Bonus mode has the same return to player as the base game.',
			description: social
				? 'Skip straight to the free spins.'
				: 'Skip straight to the free spins by buying it directly.',
			button: social ? 'GET BONUS' : 'BUY',
			tickerIdle: '',
			tickerSpin: 'GOOD LUCK',
		},
		maxWin: config.betModes.bonus.max_win,
	},
};
