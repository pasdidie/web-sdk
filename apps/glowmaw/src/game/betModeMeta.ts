import { stateUrlDerived, type BetModeMeta } from 'state-shared';

import config from './config';

const social = () => stateUrlDerived.social();
const EMPTY_ASSETS = { icon: '', volatility: '', button: '', dialogImage: '', dialogVolatility: '' };
const text = (title: string, dialog: string, button = '') => ({ title, dialog, button, betAmountLabel: '', tickerIdle: '', tickerSpin: '', description: dialog });

/**
 * Keys MUST equal each mode's own `mode` (lowercase, = game_config.py BetMode name):
 * shared lookups use the key directly (crash found on Azure Anvil otherwise).
 */
export const betModeMeta = (): BetModeMeta => ({
	base: { mode: 'base', costMultiplier: config.betModes.base.cost, type: 'default', parent: '', children: '', assets: EMPTY_ASSETS, text: text('Base game', ''), maxWin: config.betModes.base.max_win },
	ante: {
		mode: 'ante',
		costMultiplier: config.betModes.ante.cost,
		type: 'activate',
		parent: '',
		children: '',
		assets: EMPTY_ASSETS,
		text: text('Lure Bait', social() ? 'About double the chance of Feeding Frenzy, for 1.25x the play.' : 'About double the chance to trigger Feeding Frenzy, for 1.25x the bet.'),
		maxWin: config.betModes.ante.max_win,
	},
	bonus: {
		mode: 'bonus',
		costMultiplier: config.betModes.bonus.cost,
		type: 'buy',
		parent: '',
		children: '',
		assets: EMPTY_ASSETS,
		text: text('Feeding Frenzy', '12 to 20 free spins. Every Glow Orb feeds the Lure, which multiplies every winning spin.'),
		maxWin: config.betModes.bonus.max_win,
	},
	super: {
		mode: 'super',
		costMultiplier: config.betModes.super.cost,
		type: 'buy',
		parent: '',
		children: '',
		assets: EMPTY_ASSETS,
		text: text('Super Frenzy', '12 to 20 free spins with the Lure already lit at x25.'),
		maxWin: config.betModes.super.max_win,
	},
});
