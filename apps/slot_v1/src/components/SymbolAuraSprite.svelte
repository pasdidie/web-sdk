<script lang="ts">
	/**
	 * Real-asset replacement for SymbolSpine's wild/scatter states
	 * (previously wild_dynamite/scatter_spin/scatter_win Spine animations).
	 * Two layered sprites (body + aura) animated in code per
	 * ANIMATION_SPEC.md section 3:
	 *   - mode "idle"  (static/spin state): aura rotates slowly, loops.
	 *   - mode "land":  quick squash 1.1 -> 0.95 -> 1, then oncomplete.
	 *   - mode "win":   scale pulse + glow on top of the idle aura rotation.
	 */
	import { onDestroy } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Container, Sprite } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	type Mode = 'idle' | 'land' | 'win';

	type Props = {
		x?: number;
		y?: number;
		bodyKey: string;
		auraKey: string;
		sizeRatios: { width: number; height: number };
		mode: Mode;
		loop?: boolean;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const width = $derived(SYMBOL_SIZE * props.sizeRatios.width);
	const height = $derived(SYMBOL_SIZE * props.sizeRatios.height);
	const auraCfg = ANIMATION_CONFIG.symbolIdleAura;
	const winCfg = ANIMATION_CONFIG.symbolWin;
	const landCfg = ANIMATION_CONFIG.symbolLand;

	const glow = new GlowFilter({
		color: winCfg.glowColor,
		outerStrength: winCfg.glowOuterStrength,
		innerStrength: winCfg.glowInnerStrength,
		quality: winCfg.glowQuality,
		distance: winCfg.glowDistance,
	});

	// See SymbolWinSprite.svelte -- Container.destroy() doesn't free attached
	// filters, so each Wild/Scatter win leaks a GlowFilter without this.
	onDestroy(() => glow.destroy());

	const bodyScale = new Tween(1, { easing: sineInOut });
	let auraRotation = $state(0);
	let running = true;
	let rafId: number | null = null;
	let pulseRafId: number | null = null;
	let lastTs = 0;
	let pulseStartTs = 0;

	// Living-flame layer: three additive fx_flame tongues with independent,
	// non-repeating flicker (sum of incommensurate sines), plus a breathing
	// aura alpha and a land shockwave -- so wild/scatter never sit still.
	let flameT = $state(0);
	let ringT = $state(1);
	const flicker = (seed: number) =>
		0.5 +
		0.25 * Math.sin(flameT / 90 + seed * 2.1) +
		0.15 * Math.sin(flameT / 37 + seed * 5.3) +
		0.1 * Math.sin(flameT / 151 + seed);
	const auraAlpha = $derived(
		auraCfg.opacityMin +
			(auraCfg.opacityMax - auraCfg.opacityMin) *
				(0.5 + 0.5 * Math.sin((flameT / auraCfg.pulseDurationMs) * Math.PI * 2)),
	);
	const FLAMES = [
		{ seed: 0, dx: 0, h: 0.95, w: 0.42 },
		{ seed: 1, dx: -0.16, h: 0.7, w: 0.3 },
		{ seed: 2, dx: 0.16, h: 0.72, w: 0.3 },
	];

	const runAuraRotation = (ts: number) => {
		if (!running) return;
		if (lastTs) {
			const dt = ts - lastTs;
			auraRotation += auraCfg.rotationRadPerSec * (dt / 1000);
			flameT += dt;
			if (ringT < 1) ringT = Math.min(1, ringT + dt / 420);
		}
		lastTs = ts;
		rafId = requestAnimationFrame(runAuraRotation);
	};

	// Continuous sine wave instead of two chained eased Tweens ping-ponging
	// (see SymbolWinSprite.svelte for why -- same pattern, same fix).
	const runWinPulse = (ts: number) => {
		if (!running) return;
		if (!pulseStartTs) pulseStartTs = ts;
		const elapsed = ts - pulseStartTs;
		const phase = (elapsed / winCfg.loopDurationMs) * Math.PI * 2;
		const amplitude = (winCfg.scaleTo - winCfg.scaleFrom) / 2;
		const mid = (winCfg.scaleTo + winCfg.scaleFrom) / 2;
		bodyScale.set(mid - amplitude * Math.cos(phase), { duration: 0 });
		pulseRafId = requestAnimationFrame(runWinPulse);
	};

	const runLandSquash = async () => {
		await bodyScale.set(landCfg.squashFrom, { duration: landCfg.durationMs / 2 });
		await bodyScale.set(landCfg.squashTo, { duration: landCfg.durationMs / 2 });
		await bodyScale.set(landCfg.settleTo, { duration: landCfg.durationMs / 2 });
		props.oncomplete?.();
	};

	$effect(() => {
		running = true;
		lastTs = 0;
		pulseStartTs = 0;

		if (prefersReducedMotion()) {
			props.oncomplete?.();
			return () => {
				running = false;
			};
		}

		rafId = requestAnimationFrame(runAuraRotation);
		if (props.mode === 'land') ringT = 0;
		if (props.mode === 'win') {
			if (props.loop) {
				pulseRafId = requestAnimationFrame(runWinPulse);
			} else {
				bodyScale
					.set(winCfg.scaleTo, { duration: winCfg.loopDurationMs / 2 })
					.then(() => bodyScale.set(winCfg.scaleFrom, { duration: winCfg.loopDurationMs / 2 }))
					.then(() => props.oncomplete?.());
			}
		} else if (props.mode === 'land') {
			runLandSquash();
		}

		return () => {
			running = false;
			if (rafId !== null) cancelAnimationFrame(rafId);
			if (pulseRafId !== null) cancelAnimationFrame(pulseRafId);
		};
	});
</script>

<Container x={props.x} y={props.y} scale={bodyScale.current}>
	{#if ringT < 1}
		<Sprite
			key="fx_ring"
			anchor={0.5}
			width={width * (0.6 + 1.4 * ringT)}
			height={width * (0.6 + 1.4 * ringT)}
			alpha={1 - ringT}
			tint={0x3fb6ff}
			blendMode="add"
		/>
	{/if}
	<Container rotation={auraRotation} alpha={auraAlpha}>
		<Sprite anchor={0.5} key={props.auraKey} width={width * 1.3} height={height * 1.3} />
	</Container>
	<Sprite anchor={0.5} key={props.bodyKey} {width} {height} filters={props.mode === 'win' ? [glow] : []} />
	{#each FLAMES as flame (flame.seed)}
		{@const f = flicker(flame.seed)}
		<Sprite
			key="fx_flame"
			anchor={{ x: 0.5, y: 0.92 }}
			x={width * flame.dx}
			y={-height * 0.02}
			width={width * flame.w * (0.9 + 0.2 * f)}
			height={height * flame.h * (0.75 + 0.45 * f) * (props.mode === 'win' ? 1.25 : 1)}
			skew={{ x: (f - 0.5) * 0.25, y: 0 }}
			alpha={0.35 + 0.45 * f}
			tint={0x5cc4ff}
			blendMode="add"
		/>
	{/each}
</Container>
