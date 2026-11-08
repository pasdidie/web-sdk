import { stateBet } from 'state-shared';
import { numberToCurrencyString, bookEventAmountToNormalisedAmount } from 'utils-shared/amount';

const SOCIAL_CODES: Record<string, string> = { XSC: 'SC', XGC: 'GC', XEC: 'SC' };

/** Currency text. Social coins read "10.00 SC" (code after the amount, Engine [78]). */
export const formatCurrency = (v: number) => {
	const code = SOCIAL_CODES[stateBet.currency];
	const s = numberToCurrencyString(v);
	if (code) return `${s.replace(code, '').trim()} ${code}`;
	return s;
};

/** Book amount (x100 of the base bet) -> currency number. */
export const bookToCurrency = (bookAmount: number) => bookEventAmountToNormalisedAmount(bookAmount);
export const formatBook = (bookAmount: number) => formatCurrency(bookToCurrency(bookAmount));
