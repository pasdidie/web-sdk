import { stateI18n } from 'state-shared';

import { BOOK_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
import { stateBet } from 'state-shared';

const NO_LOCALISATION_CURRENCY_MAP: Record<string, string> = {
	XGC: 'GC',
	XSC: 'SC',
	XEC: 'EC',
};

// JPY has no minor unit (¥10, never ¥10.00) -- Intl.NumberFormat already
// knows this per-currency, but the generic path below used to force
// minimumFractionDigits/maximumFractionDigits: 2 on every currency,
// overriding that and producing "¥10.00".
const ZERO_DECIMAL_CURRENCIES = new Set(['JPY']);

// Engine guideline [273]: a payout under the currency's normal smallest unit
// (e.g. 0.001 on a currency that normally shows 2 decimals) must still show
// as a real nonzero number, not round away to "0.00" or round up to "0.01".
// Extends the decimal count just enough to show it, capped so it never gets
// absurd; leaves ordinary amounts (>= the normal unit) at the normal count.
const decimalsNeededToShow = (value: number, normalDecimals: number): number => {
	if (value === 0) return normalDecimals;
	const smallestNormalUnit = 10 ** -normalDecimals;
	if (Math.abs(value) >= smallestNormalUnit) return normalDecimals;
	return Math.min(6, Math.ceil(-Math.log10(Math.abs(value))) + 1);
};

// bookEventAmount: is the amount or win numbers in the events of books, e.g. the amount in setTotalWin bookEvent
// {
// 	"index": 3,
// 	"type": "setTotalWin",
// 	"amount": 100
// },
// if betting on $1,   100 bookEventAmount equals to $1.    betAmountMultiplier is (100 / BOOK_AMOUNT_MULTIPLIER =) 1
// if betting on $1,    50 bookEventAmount equals to $0.5.  betAmountMultiplier is ( 50 / BOOK_AMOUNT_MULTIPLIER =) 0.5
// if betting on $0.5, 100 bookEventAmount equals to $0.5.  betAmountMultiplier is (100 / BOOK_AMOUNT_MULTIPLIER =) 1
// if betting on $0.5,  50 bookEventAmount equals to $0.25. betAmountMultiplier is ( 50 / BOOK_AMOUNT_MULTIPLIER =) 0.5

export const bookEventAmountToBetAmountMultiplier = (bookEventAmount: number) =>
	bookEventAmount / BOOK_AMOUNT_MULTIPLIER;

export const bookEventAmountToNormalisedAmount = (bookEventAmount: number) => {
	const betAmountMultiplier = bookEventAmountToBetAmountMultiplier(bookEventAmount);
	return stateBet.wageredBetAmount * betAmountMultiplier;
};

export const numberToFloat = (value: number) => Number.parseFloat(`${value}`);

export const numberToCurrencyString = (value: number) => {
	if (stateBet.currency in NO_LOCALISATION_CURRENCY_MAP) {
		const decimals = decimalsNeededToShow(numberToFloat(value), 2);
		return `${NO_LOCALISATION_CURRENCY_MAP[stateBet.currency]} ${numberToFloat(value).toFixed(decimals)}`;
	}

	const normalDecimals = ZERO_DECIMAL_CURRENCIES.has(stateBet.currency) ? 0 : 2;
	const decimals = decimalsNeededToShow(value, normalDecimals);

	return stateI18n.i18n.number(value, {
		minimumFractionDigits: normalDecimals,
		maximumFractionDigits: decimals,
		style: 'currency',
		currency: stateBet.currency,
		// numberingSystem: 'latn',
	});
};

export const bookEventAmountToCurrencyString = (bookEventAmount: number) => {
	const normalisedAmount = bookEventAmountToNormalisedAmount(bookEventAmount);
	return numberToCurrencyString(normalisedAmount);
};
