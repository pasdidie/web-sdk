import * as PIXI from 'pixi.js';

import { anim, ease } from './anim';
import { C, SYMBOL_STYLE, orbTier, textStyle, COLORS } from './theme';
import { fx, tex } from './textures';

export type RawSymbol = { name: string; multiplier?: number; scatter?: boolean };

/**
 * One symbol on the board: soft additive back-glow, the art, an additive
 * "flash" copy of the art for win highlights, and for orbs the value text.
 * Always slightly alive (scatter breathes, orbs bob and shimmer).
 */
export class SymbolView {
	readonly root = new PIXI.Container();
	private body = new PIXI.Container();
	private glow = new PIXI.Sprite(fx.glow());
	private art = new PIXI.Sprite();
	private flash = new PIXI.Sprite();
	private value?: PIXI.Text;
	raw: RawSymbol = { name: 'L5' };
	private phase = Math.random() * Math.PI * 2;
	private dimmed = 0; // 0..1 animated
	private dimTarget = 0;
	highlight = 0; // 0..1 win glow
	taken = false; // orb already swallowed (free spins)
	baseScale = 1;
	squashX = 1;
	squashY = 1;
	pop = 1; // multiplicative scale used by animations
	stretch = 0; // motion stretch while falling

	constructor(raw: RawSymbol) {
		this.glow.anchor.set(0.5);
		this.glow.blendMode = 'add';
		this.art.anchor.set(0.5);
		this.flash.anchor.set(0.5);
		this.flash.blendMode = 'add';
		this.flash.alpha = 0;
		this.body.addChild(this.glow, this.art, this.flash);
		this.root.addChild(this.body);
		this.set(raw);
	}

	get isOrb() {
		return this.raw.name === 'M';
	}

	set(raw: RawSymbol) {
		this.raw = raw;
		this.taken = false;
		this.highlight = 0;
		this.pop = 1;
		this.root.alpha = 1;
		const style = SYMBOL_STYLE[raw.name] ?? SYMBOL_STYLE.L5;
		let key = `sym_${raw.name}`;
		let tint = style.tint;
		if (raw.name === 'M') {
			const tier = orbTier(raw.multiplier ?? 2);
			key = tier.key;
			tint = tier.tint;
		}
		const t = tex(key, raw.name === 'M' ? 'M' : raw.name);
		this.art.texture = t;
		this.flash.texture = t;
		const size = C * style.scale;
		const s = size / Math.max(t.width, t.height);
		this.baseScale = s;
		this.art.scale.set(s);
		this.flash.scale.set(s);
		this.glow.tint = tint;
		this.glow.scale.set((C * 1.25) / 256);
		this.glow.alpha = raw.name === 'S' || raw.name === 'M' ? 0.55 : 0.18;
		if (raw.name === 'M') {
			if (!this.value) {
				this.value = new PIXI.Text({ text: '', style: textStyle(34, { glow: tint }) });
				this.value.anchor.set(0.5);
				this.body.addChild(this.value);
			}
			this.value.visible = true;
			this.value.text = `×${raw.multiplier}`;
			this.value.style.fontSize = (raw.multiplier ?? 2) >= 100 ? 30 : 36;
			(this.value.style as any).dropShadow = { color: tint, blur: 10, distance: 0, alpha: 0.95, angle: 0 };
			this.value.y = 2;
		} else if (this.value) this.value.visible = false;
	}

	setDim(on: boolean) {
		this.dimTarget = on ? 1 : 0;
	}

	/** per-frame idle life + derived visuals */
	update(dt: number) {
		this.phase += dt * 0.0025;
		this.dimmed += (this.dimTarget - this.dimmed) * Math.min(1, dt * 0.012);
		let idleS = 1;
		let rot = 0;
		if (this.raw.name === 'S') {
			idleS = 1 + Math.sin(this.phase * 1.6) * 0.035;
			this.glow.alpha = 0.5 + Math.sin(this.phase * 2.2) * 0.18 + this.highlight * 0.5;
		} else if (this.raw.name === 'M') {
			idleS = 1 + Math.sin(this.phase * 2.0) * 0.04;
			rot = Math.sin(this.phase * 1.3) * 0.05;
			this.glow.alpha = this.taken ? 0.08 : 0.5 + Math.sin(this.phase * 3) * 0.15 + this.highlight * 0.5;
		} else {
			this.glow.alpha = 0.14 + this.highlight * 0.75;
		}
		const sc = idleS * this.pop;
		const st = 1 + this.stretch;
		this.body.scale.set(sc * this.squashX / Math.sqrt(st), sc * this.squashY * st);
		this.body.rotation = rot;
		this.glow.scale.set(((C * 1.25) / 256) * (1 + this.highlight * 0.35));
		this.flash.alpha = this.highlight * (0.35 + Math.sin(this.phase * 9) * 0.15);
		const k = 1 - this.dimmed * 0.62;
		const tint = (Math.round(255 * k) << 16) | (Math.round(255 * k) << 8) | Math.round(255 * (k * 0.9 + 0.1));
		this.art.tint = tint;
		if (this.taken) this.art.alpha = 0.28;
		else this.art.alpha = 1;
		if (this.value) this.value.alpha = this.taken ? 0 : 1 - this.dimmed * 0.5;
	}

	/** Squash on landing. */
	async land(strength = 1) {
		this.squashX = 1 + 0.16 * strength;
		this.squashY = 1 - 0.2 * strength;
		await anim.tween({ duration: 260, ease: ease.outElastic }, (t) => {
			this.squashX = 1 + 0.16 * strength * (1 - t);
			this.squashY = 1 - 0.2 * strength * (1 - t);
		});
		this.squashX = this.squashY = 1;
	}

	/** Win highlight: pop + glow, holds until clearHighlight. */
	async win() {
		this.setDim(false);
		await anim.tween({ duration: 380, ease: ease.outBack }, (t) => {
			this.highlight = t;
			this.pop = 1 + 0.16 * Math.sin(t * Math.PI) + 0.06 * t;
		});
	}

	async explode() {
		await anim.tween({ duration: 220, ease: ease.inCubic }, (t) => {
			this.pop = 1.06 + 0.3 * t;
			this.root.alpha = 1 - t;
			this.highlight = 1;
		});
	}

	/** Scatter / orb celebration pulse */
	async pulse(times = 2) {
		for (let i = 0; i < times; i++) {
			await anim.tween({ duration: 300, ease: ease.inOutQuad }, (t) => {
				this.pop = 1 + 0.22 * Math.sin(t * Math.PI);
				this.highlight = Math.sin(t * Math.PI);
			});
		}
	}

	clearHighlight() {
		this.highlight = 0;
		this.pop = 1;
	}

	get tint() {
		if (this.raw.name === 'M') return orbTier(this.raw.multiplier ?? 2).tint;
		return (SYMBOL_STYLE[this.raw.name] ?? SYMBOL_STYLE.L5).tint;
	}

	/** Snapshot sprite for flying effects (orb flying to Maw). */
	makeGhost(): PIXI.Container {
		const c = new PIXI.Container();
		const g = new PIXI.Sprite(fx.glow());
		g.anchor.set(0.5);
		g.blendMode = 'add';
		g.tint = this.tint;
		g.scale.set((C * 1.4) / 256);
		const a = new PIXI.Sprite(this.art.texture);
		a.anchor.set(0.5);
		a.scale.set(this.baseScale);
		c.addChild(g, a);
		if (this.value) {
			const v = new PIXI.Text({ text: this.value.text, style: this.value.style.clone() });
			v.anchor.set(0.5);
			v.y = 2;
			c.addChild(v);
		}
		return c;
	}

	destroy() {
		this.root.destroy({ children: true });
	}
}

export { COLORS };
