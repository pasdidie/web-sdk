import _ from 'lodash';

import type { RawSymbol, SymbolState } from './types';

// 3x3 board: same cell size as the 5x3 parent game keeps the board clear of the bottom UI bar.
export const SYMBOL_SIZE = 120;

export const REEL_PADDING = 0.53;
// Horizontal distance between reel centres. Wider than a cell: the projection
// screen opening is ~1.6:1, so square 3x3 cells left two empty bands on its
// sides; spreading the reels fills it and gives each reel its own column.
export const REEL_PITCH = SYMBOL_SIZE * 1.5;

// initial board (3 reels x 3 rows, padded top and bottom)
export const INITIAL_BOARD: RawSymbol[][] = [
	[{ name: 'L2' }, { name: 'H1' }, { name: 'L3' }, { name: 'S' }, { name: 'L1' }],
	[{ name: 'W' }, { name: 'L1' }, { name: 'H2' }, { name: 'L3' }, { name: 'H3' }],
	[{ name: 'L3' }, { name: 'H3' }, { name: 'L2' }, { name: 'L1' }, { name: 'H1' }],
];

export const BOARD_DIMENSIONS = { x: INITIAL_BOARD.length, y: INITIAL_BOARD[0].length - 2 };

export const BOARD_SIZES = {
	width: REEL_PITCH * BOARD_DIMENSIONS.x,
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

export const HIGH_SYMBOLS = ['H1', 'H2', 'H3'];

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

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

// Gemini assets processed by tools/assets (film-toned, keyed). 3 high + 3 low symbols.
// The art keeps a margin inside its square canvas, so it is drawn slightly larger than a cell.
const SYMBOL_ART_RATIOS = { width: 1.2, height: 1.2 };
const h1Static = { type: 'sprite', assetKey: 'sym_H1', sizeRatios: SYMBOL_ART_RATIOS };
const h2Static = { type: 'sprite', assetKey: 'sym_H2', sizeRatios: SYMBOL_ART_RATIOS };
const h3Static = { type: 'sprite', assetKey: 'sym_H3', sizeRatios: SYMBOL_ART_RATIOS };

const l1Static = { type: 'sprite', assetKey: 'sym_L1', sizeRatios: SYMBOL_ART_RATIOS };
const l2Static = { type: 'sprite', assetKey: 'sym_L2', sizeRatios: SYMBOL_ART_RATIOS };
const l3Static = { type: 'sprite', assetKey: 'sym_L3', sizeRatios: SYMBOL_ART_RATIOS };

// The upstream example's ratios (width 1.35, height ~2.6 for S) were tuned
// for its own Spine rigs' canvas/pivot and made our square Gemini art render
// 2+ cells oversized, overlapping the board frame. Our body+aura art is a
// single square canvas per symbol, like H/L, just slightly larger to still
// read as "special".
const wSizeRatios = { width: 1.2, height: 1.2 };
const sSizeRatios = { width: 1.2, height: 1.2 };

export const SYMBOL_INFO_MAP = {
	H1: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_H1',
			sizeRatios: h1Static.sizeRatios,
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
			sizeRatios: h2Static.sizeRatios,
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
			sizeRatios: h3Static.sizeRatios,
		},
		postWinStatic: h3Static,
		static: h3Static,
		spin: h3Static,
		land: h3Static,
	},
	L1: {
		explosion,
		win: {
			type: 'sprite-win',
			assetKey: 'sym_L1',
			sizeRatios: l1Static.sizeRatios,
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
			sizeRatios: l2Static.sizeRatios,
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
			sizeRatios: l3Static.sizeRatios,
		},
		postWinStatic: l3Static,
		static: l3Static,
		spin: l3Static,
		land: l3Static,
	},
	W: {
		explosion,
		// The SDK's 'explodedW.png' is a yellow demo sprite; keep our hat after a win.
		postWinStatic: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			motion: 'hat',
			mode: 'idle',
			sizeRatios: wSizeRatios,
		},
		static: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			motion: 'hat',
			mode: 'idle',
			sizeRatios: wSizeRatios,
		},
		spin: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			motion: 'hat',
			mode: 'idle',
			sizeRatios: wSizeRatios,
		},
		win: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			motion: 'hat',
			mode: 'win',
			sizeRatios: wSizeRatios,
		},
		land: {
			type: 'sprite-aura',
			bodyKey: 'sym_W_body',
			motion: 'hat',
			mode: 'land',
			sizeRatios: wSizeRatios,
		},
	},
	S: {
		explosion,
		postWinStatic: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			motion: 'projector',
			mode: 'idle',
			sizeRatios: sSizeRatios,
		},
		static: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			motion: 'projector',
			mode: 'idle',
			sizeRatios: sSizeRatios,
		},
		spin: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			motion: 'projector',
			mode: 'idle',
			sizeRatios: sSizeRatios,
		},
		win: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			motion: 'projector',
			mode: 'win',
			sizeRatios: sSizeRatios,
		},
		land: {
			type: 'sprite-aura',
			bodyKey: 'sym_S_body',
			motion: 'projector',
			mode: 'land',
			sizeRatios: sSizeRatios,
		},
	},
} as const;

export const SCATTER_LAND_SOUND_MAP = {
	1: 'sfx_scatter_stop_1',
	2: 'sfx_scatter_stop_2',
	3: 'sfx_scatter_stop_3',
} as const;

// Free-spin counts mirror math/games/slapstick/game_config.py freespin_triggers
// (not exported in config_fe_slapstick.json). Display-only.
export const FREE_SPINS_AWARDED = 8;
export const FREE_SPINS_RETRIGGER = 4;
export const WILD_MULTIPLIERS = [2, 3, 5];
