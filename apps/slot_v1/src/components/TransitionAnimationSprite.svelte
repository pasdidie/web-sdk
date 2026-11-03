<script lang="ts">
	/**
	 * Base <-> free spins transition: "forge strike".
	 * The screen darkens, the hammer (sym_H1) swings down onto the centre,
	 * and on impact: white-azure flash, double shockwave, spark burst and a
	 * screen shake; then the darkness lifts. Replaces the earlier
	 * falling-anvils wipe. Same contract: one oncomplete at the very end.
	 */
	import { onMount } from 'svelte';
	import { backIn, cubicOut } from 'svelte/easing';
	import { Container, Rectangle, Sprite } from 'pixi-svelte';

	import FxParticles from './FxParticles.svelte';
	import type { ParticleSystem } from '../game/particles';
	import { getContext } from '../game/context';
	import { fx } from '../game/fx';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = { oncomplete: () => void };
	const props: Props = $props();
	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const unit = $derived(Math.min(canvas.width, canvas.height));

	const T_COVER = 260;
	const T_SWING = 380;
	const T_HOLD = 380;
	const T_LIFT = 360;
	const TOTAL = T_COVER + T_SWING + T_HOLD + T_LIFT;
	const T_IMPACT = T_COVER + T_SWING;

	let t = $state(0);
	let system: ParticleSystem | undefined;
	let texFn: ((key: string) => import('pixi.js').Texture) | undefined;
	let impacted = false;

	const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
	const cover = $derived(
		t < T_COVER ? cubicOut(t / T_COVER) * 0.92 : t < T_IMPACT + T_HOLD ? 0.92 : 0.92 * (1 - cubicOut(clamp01((t - T_IMPACT - T_HOLD) / T_LIFT))),
	);
	const swing = $derived(backIn(clamp01((t - T_COVER * 0.5) / (T_SWING + T_COVER * 0.5))));
	const hammerRot = $derived(-1.5 + 1.75 * swing);
	const hammerAlpha = $derived(t < T_IMPACT + T_HOLD ? 1 : 1 - clamp01((t - T_IMPACT - T_HOLD) / (T_LIFT * 0.6)));
	const since = $derived(t - T_IMPACT);
	const flash = $derived(since < 0 ? 0 : Math.max(0, 0.85 * (1 - since / 320)));
	const ring = (delay: number, life: number) => {
		const k = (since - delay) / life;
		return k < 0 || k > 1 ? null : { size: unit * (0.15 + 1.4 * cubicOut(k)), alpha: 1 - k };
	};
	const r1 = $derived(ring(0, 650));
	const r2 = $derived(ring(110, 800));

	onMount(() => {
		if (prefersReducedMotion()) {
			props.oncomplete();
			return;
		}
		const start = performance.now();
		let raf = requestAnimationFrame(function tick(ts) {
			t = ts - start;
			if (!impacted && t >= T_IMPACT) {
				impacted = true;
				fx.emit({ kind: 'shake', intensity: 14, durationMs: 450 });
				if (system && texFn) {
					system.spawn({
						texture: texFn('fx_spark'),
						x: canvas.width / 2,
						y: canvas.height / 2,
						count: 90,
						speed: [300, 1100],
						drag: 0.15,
						gravity: 600,
						life: [600, 1300],
						size: [unit * 0.015, unit * 0.04],
						tint: [0x3fb6ff, 0xa8e4ff, 0xffffff, 0xffc861],
						alignToVelocity: true,
						stretch: 3,
					});
				}
			}
			if (t < TOTAL) raf = requestAnimationFrame(tick);
			else props.oncomplete();
		});
		return () => cancelAnimationFrame(raf);
	});
</script>

<Rectangle {...canvas} backgroundColor={0x03060c} backgroundAlpha={cover} />
<Sprite
	key="fx_rays"
	anchor={0.5}
	x={canvas.width / 2}
	y={canvas.height / 2}
	width={unit * 1.6}
	height={unit * 1.6}
	rotation={t / 2500}
	tint={0x3fb6ff}
	alpha={cover * 0.5 + flash * 0.5}
	blendMode="add"
/>
<!-- hammer pivots around its handle end, off to the upper right -->
<Container x={canvas.width / 2 + unit * 0.2} y={canvas.height / 2 - unit * 0.05} rotation={hammerRot} alpha={hammerAlpha}>
	<Sprite key="sym_H1" anchor={{ x: 0.75, y: 0.75 }} width={unit * 0.55} height={unit * 0.55} />
</Container>
{#if r1}
	<Sprite key="fx_ring" anchor={0.5} x={canvas.width / 2} y={canvas.height / 2} width={r1.size} height={r1.size} alpha={r1.alpha} tint={0x8fd8ff} blendMode="add" />
{/if}
{#if r2}
	<Sprite key="fx_ring" anchor={0.5} x={canvas.width / 2} y={canvas.height / 2} width={r2.size} height={r2.size} alpha={r2.alpha * 0.7} tint={0xffc861} blendMode="add" />
{/if}
<FxParticles
	max={150}
	onready={(s, tex) => {
		system = s;
		texFn = tex;
	}}
/>
{#if flash > 0.01}
	<Rectangle {...canvas} backgroundColor={0xe6f6ff} backgroundAlpha={flash} />
{/if}
