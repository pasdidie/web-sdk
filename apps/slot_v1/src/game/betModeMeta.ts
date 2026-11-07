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
 * (lowercase, matching game_config.py's BetMode `name=` on the math side).
 * stateBonus.svelte.ts's selectedBetModeData() (components-ui-html) does a
 * *direct* `stateMeta.betModeMeta[key]` lookup with no case fallback, and
 * BonusCard.svelte sets that key from `betModeData.mode` on click -- an
 * earlier version of this file used uppercase object keys (matching the
 * SDK's own 'BASE' default/reset convention elsewhere) while `mode` stayed
 * lowercase for the RGS; that mismatch made selectedBetModeData() return
 * undefined the instant a Buy Bonus card was clicked, crashing
 * ModalBuyBonusConfirm.svelte on `.text.title` before any purchase request
 * was ever sent -- caught by actually clicking Buy in the portal, not by
 * the build or static review (see docs/DECISIONS.md). stateBetDerived's
 * OWN activeBetMode() (state-shared, used by the base-mode reset
 * call-sites and by createPrimaryMachines.ts's requestBet) has a dual-case
 * fallback and tolerates either casing, so this rename doesn't break that
 * path -- it's specifically the bonus-selection path that required exact
 * key===mode equality.
 */
const EMPTY_ASSETS = { icon: '', volatility: '', button: '', dialogImage: '', dialogVolatility: '' };
// Buy Bonus dialog art: one HTML <img> per tier, escalating intensity
// (10 -> 12 -> 15 spins). Plain URLs, not Pixi assets: nothing to preload.
const bonusIllustration: Record<number, string> = {
	10: new URL('../../assets/sprites/gemini/bonus_10.jpg', import.meta.url).href,
	12: new URL('../../assets/sprites/gemini/bonus_12.jpg', import.meta.url).href,
	15: new URL('../../assets/sprites/gemini/bonus_15.jpg', import.meta.url).href,
};

type BonusTier = { mode: string; cost: number; maxWin: number; spins: number };

const bonusTiers: BonusTier[] = [
	{ mode: 'bonus10', cost: config.betModes.bonus10.cost, maxWin: config.betModes.bonus10.max_win, spins: 10 },
	{ mode: 'bonus12', cost: config.betModes.bonus12.cost, maxWin: config.betModes.bonus12.max_win, spins: 12 },
	{ mode: 'bonus15', cost: config.betModes.bonus15.cost, maxWin: config.betModes.bonus15.max_win, spins: 15 },
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
				assets: { ...EMPTY_ASSETS, dialogImage: bonusIllustration[tier.spins] },
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
