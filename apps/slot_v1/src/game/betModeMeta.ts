import { stateUrlDerived, type BetModeMeta } from 'state-shared';

import config from './config';
import assets from './assets';

const social = stateUrlDerived.social();

/**
 * Overrides state-shared's DEFAULT_BET_MODE_META, which is template/demo
 * data for a completely different game (5 modes -- ANTE/SUPERANTE/SUPERSPIN/
 * BONUS/SUPER, titled "DOUBLE BOOST"/"SAMURAI SPIN"/"Enter the mothership!"
 * etc., referencing another studio's asset CDN). It drives the Buy Bonus
 * confirmation modal (ModalBuyBonus.svelte -> BonusCards.svelte), so left
 * untouched the modal would offer 5 fake purchases that don't exist in our
 * math. Real modes: base (not purchasable, filtered out by BonusCards
 * itself via type!=='default') + 3 real buy-bonus tiers (see
 * docs/DECISIONS.md -- one per organic scatter-trigger tier, each forcing
 * its exact spin count instead of the old single blended "bonus" mode's
 * random tier). Text respects social-casino wording the same way
 * GameRulesContent.svelte/PayTableContent.svelte do -- see
 * components-ui-pixi/i18nDerived.ts for the same pattern on the button that
 * opens this modal.
 *
 * Object keys here (BASE/BONUS10/...) are the UI-side lookup key into
 * stateMeta.betModeMeta, matching this SDK's own default/reset convention
 * (stateBet.svelte.ts defaults activeBetModeKey to the literal 'BASE', and
 * several components reset it to 'BASE' after a buy-bonus round ends) --
 * NOT what gets sent to the RGS. Each entry's `mode` field is the exact
 * bet-mode name the math side declares (game_config.py's BetMode `name=`,
 * lowercase), which createPrimaryMachines.ts's requestBet call now reads
 * instead of the raw key (see that file for why: the two were silently
 * mismatched in casing before this round of changes, never actually
 * exercised against a live RGS purchase).
 */
const EMPTY_ASSETS = { icon: '', volatility: '', button: '', dialogImage: '', dialogVolatility: '' };
const bonusIllustration = (assets as any).bonus_illustration?.src ?? '';

type BonusTier = { key: string; mode: string; cost: number; maxWin: number; spins: number };

const bonusTiers: BonusTier[] = [
	{ key: 'BONUS10', mode: 'bonus10', cost: config.betModes.bonus10.cost, maxWin: config.betModes.bonus10.max_win, spins: 10 },
	{ key: 'BONUS12', mode: 'bonus12', cost: config.betModes.bonus12.cost, maxWin: config.betModes.bonus12.max_win, spins: 12 },
	{ key: 'BONUS15', mode: 'bonus15', cost: config.betModes.bonus15.cost, maxWin: config.betModes.bonus15.max_win, spins: 15 },
];

export const betModeMeta: BetModeMeta = {
	BASE: {
		mode: 'base',
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
	...Object.fromEntries(
		bonusTiers.map((tier) => [
			tier.key,
			{
				mode: tier.mode,
				costMultiplier: tier.cost,
				type: 'buy',
				parent: '',
				children: '',
				assets: { ...EMPTY_ASSETS, dialogImage: bonusIllustration },
				text: {
					title: `${tier.spins} Free Spins`,
					dialog: social
						? `Skip straight to ${tier.spins} free spins. Wild multipliers (×2 to ×10) still apply. Same return as regular play.`
						: `Buy ${tier.spins} free spins directly. Wild multipliers (×2 to ×10) still apply during the bonus. Same return to player as the base game.`,
					description: `Guaranteed ${tier.spins} free spins.`,
					button: social ? 'GET BONUS' : 'BUY',
					tickerIdle: '',
					tickerSpin: 'GOOD LUCK',
				},
				maxWin: tier.maxWin,
			},
		]),
	),
};
