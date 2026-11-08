import type { BetType } from 'rgs-requests';

import type { RawSymbol, GameType, Position } from './types';

type E<T extends string, P> = { index: number; type: T } & P;

export type BookEventReveal = E<'reveal', { board: RawSymbol[][]; paddingPositions: number[]; anticipation: number[]; gameType: GameType }>;
export type BookEventWinInfo = E<'winInfo', {
	totalWin: number;
	wins: { symbol: string; win: number; positions: Position[]; meta: { globalMult: number; clusterMult: number; winWithoutMult: number; overlay: Position } }[];
}>;
export type BookEvent =
	| BookEventReveal
	| BookEventWinInfo
	| E<'updateTumbleWin', { amount: number }>
	| E<'setTotalWin', { amount: number }>
	| E<'freeSpinTrigger', { totalFs: number; positions: Position[] }>
	| E<'freeSpinRetrigger', { totalFs: number; positions: Position[] }>
	| E<'updateFreeSpin', { amount: number; total: number }>
	| E<'freeSpinEnd', { amount: number; winLevel: number }>
	| E<'boardMultiplierInfo', { multInfo: { positions: (Position & { multiplier: number })[] }; winInfo: { tumbleWin: number; boardMult: number; totalWin: number } }>
	| E<'lureCollect', { positions: (Position & { multiplier: number })[]; added: number; lure: number }>
	| E<'lureApply', { lure: number; baseWin: number; totalWin: number }>
	| E<'tumbleBoard', { explodingSymbols: Position[]; newSymbols: RawSymbol[][] }>
	| E<'wincap', { amount: number }>
	| E<'finalWin', { amount: number }>
	| E<'setWin', { amount: number; winLevel: number }>
	| E<'createBonusSnapshot', { bookEvents: BookEvent[] }>;

export type Bet = BetType<BookEvent>;
export type BookEventOfType<T> = Extract<BookEvent, { type: T }>;
export type BookEventContext = { bookEvents: BookEvent[] };
