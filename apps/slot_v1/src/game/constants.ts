import _ from 'lodash';

import type { RawSymbol, SymbolState } from './types';

export const SYMBOL_SIZE = 120;

export const REEL_PADDING = 0.53;

// initial board (padded top and bottom)
export const INITIAL_BOARD: RawSymbol[][] = [
	[
		{
			name: 'L2',
		},
		{
			name: 'L1',
		},
		{
			name: 'L4',
		},
		{
			name: 'H2',
		},
		{
			name: 'L1',
		},
	],
	[
		{
			name: 'H1',
		},
		{
			name: 'L5',
		},
		{
			name: 'L2',
		},
		{
			name: 'H3',
		},
		{
			name: 'L4',
		},
	],
	[
		{
			name: 'L3',
		},
		{
			name: 'L5',
		},
		{
			name: 'L3',
		},
		{
			name: 'H4',
		},
		{
			name: 'L4',
		},
	],
	[
		{
			name: 'H4',
		},
		{
			name: 'H3',
		},
		{
			name: 'L4',
		},
		{
			name: 'L5',
		},
		{
			name: 'L1',
		},
	],
	[
		{
			name: 'H3',
		},
		{
			name: 'L3',
		},
		{
			name: 'L3',
		},
		{
			name: 'H1',
		},
		{
			name: 'H1',
		},
	],
];

export const BOARD_DIMENSIONS = { x: INITIAL_BOARD.length, y: INITIAL_BOARD[0].length - 2 };

export const BOARD_SIZES = {
	width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	height: SYMBOL_SIZE * BOARD_DIMENSIONS.y,
};

export const BACKGROUND_RATIO = 2039 / 1000;
export const PORTRAIT_BACKGROUND_RATIO = 1242 / 2208;
const PORTRAIT_RATIO = 800 / 1422;
const LANDSCAPE_RATIO = 1600 / 900;
const DESKTOP_RATIO = 1422 / 800;

const DESKTOP_HEIGHT = 800;
const LANDSCAPE_HEIGHT = 900;
const PORTRAIT_HEIGHT = 1422;
export const DESKTOP_MAIN_SIZES = { width: DESKTOP_HEIGHT * DESKTOP_RATIO, height: DESKTOP_HEIGHT };
export const LANDSCAPE_MAIN_SIZES = {
	width: LANDSCAPE_HEIGHT * LANDSCAPE_RATIO,
	height: LANDSCAPE_HEIGHT,
};
export const PORTRAIT_MAIN_SIZES = {
	width: PORTRAIT_HEIGHT * PORTRAIT_RATIO,
	height: PORTRAIT_HEIGHT,
};

export const HIGH_SYMBOLS = ['H1', 'H2', 'H3', 'H4', 'H5'];

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

const HIGH_SYMBOL_SIZE = 0.9;
const LOW_SYMBOL_SIZE = 0.9;
const SPECIAL_SYMBOL_SIZE = 1;

const SPIN_OPTIONS_SHARED = {
	reelBounceBackSpeed: 0.15,
	reelSpinSpeedBeforeBounce: 4,
	reelPaddingMultiplierNormal: 1.2,
	reelPaddingMultiplierAnticipated: 10,
	reelSpinDelay: 145,
};

export const SPIN_OPTIONS_DEFAULT = {
	...SPIN_OPTIONS_SHARED,
	reelPreSpinSpeed: 2,
	reelSpinSpeed: 3,
	reelBounceSizeMulti: 0.3,
};

export const SPIN_OPTIONS_FAST = {
	...SPIN_OPTIONS_SHARED,
	reelPreSpinSpeed: 5,
	reelSpinSpeed: 5,
	reelBounceSizeMulti: 0.05,
};

export const MOTION_BLUR_VELOCITY = 31;

export const zIndexes = {
	background: {
		backdrop: -3,
		normal: -2,
		feature: -1,
	},
};

const explosion = {
	type: 'spine',
	assetKey: 'explosion',
	animationName: 'explosion',
	sizeRatios: { width: 1, height: 1 },
};

// Real Gemini assets (see stake-slot/docs/ASSETS.md). Our game only has
// H1-H4 / L1-L5 (no H5) - h5Static is left pointing at the example's demo
// art since our math/symbol set never produces an H5 raw symbol.
const h1Static = { type: 'sprite', assetKey: 'sym_H1', sizeRatios: { width: 1, height: 1 } };
const h2Static = { type: 'sprite', assetKey: 'sym_H2', sizeRatios: { width: 1, height: 1 } };
const h3Static = { type: 'sprite', assetKey: 'sym_H3', sizeRatios: { width: 1, height: 1 } };
const h4Static = { type: 'sprite', assetKey: 'sym_H4', sizeRatios: { width: 1, height: 1 } };
const h5Static = { type: 'sprite', assetKey: 'h5.webp', sizeRatios: { width: 1, height: 1 } };

const l1Static = { type: 'sprite', assetKey: 'sym_L1', sizeRatios: { width: 1, height: 1 } };
const l2Static = { type: 'sprite', assetKey: 'sym_L2', sizeRatios: { width: 1, height: 1 } };
const l3Static = { type: 'sprite', assetKey: 'sym_L3', sizeRatios: { width: 1, height: 1 } };
const l4Static = { type: 'sprite', assetKey: 'sym_L4', sizeRatios: { width: 1, height: 1 } };
// L5 is a plain low symbol in our spec (no low-multiplier mechanic from the
// example game), unlike the upstream example's Spine-driven 'M' symbol.
const l5Static = { type: 'sprite', assetKey: 'sym_L5', sizeRatios: { width: 1, height: 1 } };

const wSizeRatios = { width: 1.5 * 0.9, height: SPECIAL_SYMBOL_SIZE * 1.15 };
const sSizeRatios = { width: 2.5, height: SPECIAL_SYMBOL_SIZE * 2.3 };

export const SYMBOL_INFO_MAP = {
	H1: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_H1',
			sizeRatios: { width: 0.5 * 1.15, height: HIGH_SYMBOL_SIZE * 0.57 },
		},
		postWinStatic: h1Static,
		static: h1Static,
		spin: h1Static,
		land: h1Static,
	},
	H2: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_H2',
			sizeRatios: { width: 0.5, height: HIGH_SYMBOL_SIZE * 0.57 },
		},
		postWinStatic: h2Static,
		static: h2Static,
		spin: h2Static,
		land: h2Static,
	},
	H3: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_H3',
			sizeRatios: { width: 0.5 * 0.9, height: HIGH_SYMBOL_SIZE * 0.53 },
		},
		postWinStatic: h3Static,
		static: h3Static,
		spin: h3Static,
		land: h3Static,
	},
	H4: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_H4',
			sizeRatios: { width: 0.5 * 0.9, height: HIGH_SYMBOL_SIZE * 0.53 },
		},
		postWinStatic: h4Static,
		static: h4Static,
		spin: h4Static,
		land: h4Static,
	},
	H5: {
		explosion,
		win: {
			type: 'spine',
			assetKey: 'H5',
			animationName: 'h5',
			sizeRatios: { width: 0.5 * 0.9, height: HIGH_SYMBOL_SIZE * 0.53 },
		},
		postWinStatic: h5Static,
		static: h5Static,
		spin: h5Static,
		land: h5Static,
	},
	L1: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_L1',
			sizeRatios: { width: 0.5 * 0.75, height: LOW_SYMBOL_SIZE * 0.65 },
		},
		postWinStatic: l1Static,
		static: l1Static,
		spin: l1Static,
		land: l1Static,
	},
	L2: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_L2',
			sizeRatios: { width: 0.5 * 0.75, height: LOW_SYMBOL_SIZE * 0.65 },
		},
		postWinStatic: l2Static,
		static: l2Static,
		spin: l2Static,
		land: l2Static,
	},
	L3: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_L3',
			sizeRatios: { width: 0.5 * 0.75, height: LOW_SYMBOL_SIZE * 0.63 },
		},
		postWinStatic: l3Static,
		static: l3Static,
		spin: l3Static,
		land: l3Static,
	},
	L4: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_L4',
			sizeRatios: { width: 0.5 * 0.75, height: LOW_SYMBOL_SIZE * 0.63 },
		},
		postWinStatic: l4Static,
		static: l4Static,
		spin: l4Static,
		land: l4Static,
	},
	L5: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_L5',
			sizeRatios: { width: 1, height: 1 },
		},
		postWinStatic: l5Static,
		static: l5Static,
		spin: l5Static,
		land: l5Static,
	},
	W: {
		explosion,
		postWinStatic: {
			type: 'sprite',
			assetKey: 'explodedW.png',
			sizeRatios: { width: 0.85, height: 0.85 },
		},
		static: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			auraKey: 'sym_W_aura',
			mode: 'idle',
			sizeRatios: wSizeRatios,
		},
		spin: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			auraKey: 'sym_W_aura',
			mode: 'idle',
			sizeRatios: wSizeRatios,
		},
		win: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			auraKey: 'sym_W_aura',
			mode: 'win',
			sizeRatios: wSizeRatios,
		},
		land: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			auraKey: 'sym_W_aura',
			mode: 'land',
			sizeRatios: wSizeRatios,
		},
	},
	S: {
		explosion,
		postWinStatic: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			auraKey: 'sym_S_aura',
			mode: 'idle',
			sizeRatios: sSizeRatios,
		},
		static: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			auraKey: 'sym_S_aura',
			mode: 'idle',
			sizeRatios: sSizeRatios,
		},
		spin: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			auraKey: 'sym_S_aura',
			mode: 'idle',
			sizeRatios: sSizeRatios,
		},
		win: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			auraKey: 'sym_S_aura',
			mode: 'win',
			sizeRatios: sSizeRatios,
		},
		land: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			auraKey: 'sym_S_aura',
			mode: 'land',
			sizeRatios: sSizeRatios,
		},
	},
} as const;

export const SCATTER_LAND_SOUND_MAP = {
	1: 'sfx_scatter_stop_1',
	2: 'sfx_scatter_stop_2',
	3: 'sfx_scatter_stop_3',
	4: 'sfx_scatter_stop_4',
	5: 'sfx_scatter_stop_5',
} as const;
