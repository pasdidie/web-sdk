import type config from './config';

export type SymbolName = keyof typeof config.symbols;
export type RawSymbol = { name: string; multiplier?: number; scatter?: boolean };
export type BetMode = keyof typeof config.betModes;
export type GameType = 'basegame' | 'freegame';
export type Position = { reel: number; row: number };
