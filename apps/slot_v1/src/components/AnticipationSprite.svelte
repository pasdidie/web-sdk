<script lang="ts">
	/**
	 * Real-asset replacement for Anticipation.svelte (Spine per-reel pulse).
	 * A glowing outline over the reel column, pulsing while it's still
	 * spinning, per ANIMATION_SPEC.md "Anticipation": "ralentissement des
	 * rouleaux restants + cadre du rouleau qui pulse". Calls oncomplete once
	 * the reel actually stops (same contract as the Spine version).
	 */
	import { onDestroy } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Rectangle } from 'pixi-svelte';
	import FxParticles from './FxParticles.svelte';

	import { getContext } from '../game/context';
	import type { Reel } from '../game/stateGame.svelte';
	import { REEL_PADDING, SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = {
		reel: Reel;
		oncomplete: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	const pulse = new Tween(0.35, { easing: sineInOut, duration: 500 });
	const glow = new GlowFilter({ color: 0x3fb6ff, outerStrength: 3, quality: 0.2, distance: 12 });

	// See SymbolWinSprite.svelte -- Container.destroy() doesn't free attached
	// filters, so every anticipation pulse leaks a GlowFilter without this.
	onDestroy(() => glow.destroy());

	let running = true;
	let flameCarry = 0;
	const reelX = $derived(
		context.stateGameDerived.boardLayout().x -
			context.stateGameDerived.boardLayout().width * 0.5 +
			(props.reel.reelIndex + REEL_PADDING) * SYMBOL_SIZE,
	);
	const reelBottom = $derived(
		context.stateGameDerived.boardLayout().y + (SYMBOL_SIZE * BOARD_DIMENSIONS.y) / 2,
	);

	const runPulseLoop = async () => {
		while (running) {
			await pulse.set(1);
			if (!running) break;
			await pulse.set(0.35);
		}
	};

	$effect(() => {
		running = true;
		if (!prefersReducedMotion()) runPulseLoop();
		return () => {
			running = false;
		};
	});

	$effect(() => {
		if (props.reel.reelState.motion === 'stopped') {
			running = false;
			props.oncomplete();
		}
	});
</script>

<FxParticles
	max={60}
	onframe={(system, dt, tex) => {
		if (!running) return;
		flameCarry += (38 * dt) / 1000;
		const n = Math.floor(flameCarry);
		if (n <= 0) return;
		flameCarry -= n;
		system.spawn({
			texture: tex('fx_flame'),
			x: reelX,
			y: reelBottom,
			spreadX: SYMBOL_SIZE * 0.4,
			count: n,
			angle: -Math.PI / 2,
			cone: 0.25,
			speed: [160, 320],
			life: [700, 1100],
			size: [SYMBOL_SIZE * 0.35, SYMBOL_SIZE * 0.6],
			endSizeRatio: 0.15,
			tint: [0x3fb6ff, 0x5cc4ff, 0xa8e4ff],
			alpha: 0.75,
			spin: [-0.6, 0.6],
		});
	}}
/>

<Rectangle
	anchor={0.5}
	x={context.stateGameDerived.boardLayout().x -
		context.stateGameDerived.boardLayout().width * 0.5 +
		(props.reel.reelIndex + REEL_PADDING) * SYMBOL_SIZE}
	y={context.stateGameDerived.boardLayout().y - SYMBOL_SIZE * 0.06}
	width={SYMBOL_SIZE * 0.95}
	height={SYMBOL_SIZE * BOARD_DIMENSIONS.y}
	borderColor={0x6fd0ff}
	borderWidth={5}
	borderAlpha={pulse.current}
	backgroundColor={0x3fb6ff}
	backgroundAlpha={pulse.current * 0.12}
	filters={[glow]}
/>
