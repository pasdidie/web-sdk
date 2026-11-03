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
 * Object keys here MUST equal each entry's own `mode` field exactly
 * (lowercase, game_config.py's BetMode `name=`): stateBonus.svelte.ts's
 * selectedBetModeData() (components-ui-html) does a direct
 * `stateMeta.betModeMeta[key]` lookup with the key BonusCard.svelte takes
 * from `betModeData.mode`; an uppercase key made the Buy Bonus confirm
 * modal crash on open (found live on Azure Anvil, web-sdk 1881adb).
 */
const EMPTY_ASSETS = { icon: '', volatility: '', button: '', dialogImage: '', dialogVolatility: '' };
const bonusIllustration = (assets as any).bonus_illustration?.src ?? '';

type BonusTier = { mode: string; cost: number; maxWin: number; spins: number };

// Slapstick has a single buy mode: the 8-spin "Special Screening".
const bonusTiers: BonusTier[] = [
	{ mode: 'bonus', cost: config.betModes.bonus.cost, maxWin: config.betModes.bonus.max_win, spins: 8 },
];

export const betModeMeta: BetModeMeta = {
	base: {
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
			tier.mode,
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
						? `Skip straight to ${tier.spins} free spins. Wild multipliers (×2 to ×5) still apply. Same return as regular play.`
						: `Buy ${tier.spins} free spins directly. Wild multipliers (×2 to ×5) still apply during the bonus. Same return to player as the base game.`,
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
