import * as PIXI from 'pixi.js';

import { COLORS } from './theme';
import { hasArt, tex } from './textures';

/**
 * Themed panel. Uses the Gemini plaque art as a nine-slice when present
 * (`ui_plaque`, slice margins in PLAQUE_SLICE), otherwise a layered vector
 * fallback (deep gradient, inner glow line, bright rim).
 */
export const PLAQUE_SLICE = { left: 120, right: 120, top: 90, bottom: 90 };

export class Plaque extends PIXI.Container {
	private nine?: PIXI.NineSliceSprite;
	private g = new PIXI.Graphics();
	private w = 100;
	private h = 50;
	constructor(private accent = COLORS.cyan, private artKey = 'ui_plaque', private slice = PLAQUE_SLICE) {
		super();
		this.addChild(this.g);
		this.refreshArt();
	}

	refreshArt() {
		if (hasArt(this.artKey) && !this.nine) {
			this.nine = new PIXI.NineSliceSprite({ texture: tex(this.artKey), leftWidth: this.slice.left, rightWidth: this.slice.right, topHeight: this.slice.top, bottomHeight: this.slice.bottom });
			this.addChildAt(this.nine, 0);
			this.g.visible = false;
		}
		this.resize(this.w, this.h);
	}

	resize(w: number, h: number) {
		this.w = w;
		this.h = h;
		if (this.nine) {
			const k = Math.min(1, h / (this.slice.top + this.slice.bottom), w / (this.slice.left + this.slice.right));
			this.nine.scale.set(k);
			this.nine.width = w / k;
			this.nine.height = h / k;
			this.nine.x = -w / 2;
			this.nine.y = -h / 2;
			return;
		}
		const g = this.g;
		g.clear();
		const r = Math.min(h * 0.32, 26);
		const grad = new PIXI.FillGradient(0, 0, 0, 1);
		grad.addColorStop(0, 0x0d3348);
		grad.addColorStop(0.5, 0x06182b);
		grad.addColorStop(1, 0x030b18);
		g.roundRect(-w / 2 - 3, -h / 2 - 3, w + 6, h + 6, r + 3).fill({ color: 0x000000, alpha: 0.55 });
		g.roundRect(-w / 2, -h / 2, w, h, r).fill(grad);
		g.roundRect(-w / 2, -h / 2, w, h, r).stroke({ color: this.accent, width: 2.5, alpha: 0.95 });
		g.roundRect(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10, r - 4).stroke({ color: this.accent, width: 1, alpha: 0.3 });
		g.moveTo(-w / 2 + r, -h / 2 + 1.5).lineTo(w / 2 - r, -h / 2 + 1.5).stroke({ color: 0xffffff, width: 1.5, alpha: 0.5 });
	}
}
