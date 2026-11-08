import { stateUrlDerived } from 'state-shared';

/** Player-facing strings, with the Stake.US social wording when social=true. */
const S = () => stateUrlDerived.social();
export const t = {
	bet: () => (S() ? 'PLAY' : 'BET'),
	balance: () => 'BALANCE',
	win: () => 'WIN',
	buy: () => (S() ? 'GET' : 'BUY'),
	feature: () => 'FEATURE',
	anteTitle: () => 'LURE BAIT',
	insufficient: () => (S() ? 'Not enough balance for this play' : 'Insufficient balance for this bet'),
};
