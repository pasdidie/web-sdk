import { stateI18nDerived, stateUrlDerived } from 'state-shared';

export const i18nDerived = {
	// Social wording (Engine guideline [77]) -- same 'SPIN' choice already
	// established for the main bet action in components-ui-pixi/i18nDerived.ts,
	// kept consistent here rather than switching to the restricted-word
	// table's generic 'play' mid-flow (this screen is opened by that same
	// button).
	bet: () => (stateUrlDerived.social() ? 'SPIN' : stateI18nDerived.translate('BET')),
	max: () => stateI18nDerived.translate('MAX'),
	betMenu: () => (stateUrlDerived.social() ? 'SPIN MENU' : stateI18nDerived.translate('BET MENU')),
	selectYourBet: () =>
		stateUrlDerived.social() ? 'SELECT YOUR SPIN AMOUNT' : stateI18nDerived.translate('SELECT YOUR BET'),
	confirm: () => stateI18nDerived.translate('CONFIRM'),
	masterVolume: () => stateI18nDerived.translate('MASTER VOLUME'),
	musicVolume: () => stateI18nDerived.translate('MUSIC VOLUME'),
	soundEffectVolume: () => stateI18nDerived.translate('SOUND EFFECT VOLUME'),
	autoSpins: () => stateI18nDerived.translate('AUTO SPINS'),
	numberOfRounds: () => stateI18nDerived.translate('NUMBER OF ROUNDS'),
	advanced: () => stateI18nDerived.translate('ADVANCED'),
	singleWinLimit: () => stateI18nDerived.translate('SINGLE WIN LIMIT'),
	lossLimit: () => stateI18nDerived.translate('LOSS LIMIT'),
	startAutoplay: () => stateI18nDerived.translate('START AUTOPLAY'),
	notification: () => stateI18nDerived.translate('NOTIFICATION'),
	autoSpinsStopInfo: () => stateI18nDerived.translate('AUTO PLAY HAS STOPPED DUE TO'),
	insufficientFunds: () =>
		stateUrlDerived.social()
			? 'INSUFFICIENT BALANCE TO PLACE THIS SPIN. PLEASE ADD COINS TO YOUR BALANCE OR LOWER THE SPIN LEVEL.'
			: stateI18nDerived.translate(
					'INSUFFICIENT FUNDS TO PLACE THIS BET. PLEASE ADD FUNDS TO YOUR ACCOUNT OR LOWER THE BET LEVEL.',
				),
	lossLimitReached: () => stateI18nDerived.translate('LOSS LIMIT REACHED'),
	singleWinLimitReached: () => stateI18nDerived.translate('SINGLE WIN LIMIT REACHED'),
	settings: () => stateI18nDerived.translate('SETTINGS'),
};
