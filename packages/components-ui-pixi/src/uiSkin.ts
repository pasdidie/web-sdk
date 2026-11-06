import type { ButtonIcon } from './types';

/**
 * Optional per-game skin for the bottom UI bar. Every field is opt-in: with
 * the default (empty) skin the bar renders exactly as before (Azure Anvil),
 * a game sets what it wants with setUiSkin() at startup.
 */
type UiSkin = {
	// UiButton: sprite icon instead of the text caption, per icon.
	iconKeys: Partial<Record<ButtonIcon | 'spin', string>>;
	// ButtonBet: a reel sprite drawn over the bet button, turning while a bet plays.
	spinReelKey?: string;
	// Layouts: a nine-slice plate drawn behind the whole bar.
	console?: {
		key: string;
		// unstretched borders of the texture, in texture pixels
		slice: { left: number; right: number; top: number; bottom: number };
	};
	// UiLabel: texture of the balance / win / bet panels (default base_ticker).
	labelKey?: string;
	labelRatio?: number;
};

const uiSkin: UiSkin = { iconKeys: {} };

export const getUiSkin = (): Readonly<UiSkin> => uiSkin;

export const setUiSkin = (skin: Partial<UiSkin>) => Object.assign(uiSkin, skin);
