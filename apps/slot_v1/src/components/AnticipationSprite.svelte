<script lang="ts">
	/**
	 * Real-asset replacement for Anticipation.svelte (Spine per-reel pulse).
	 * A glowing outline over the reel column, pulsing while it's still
	 * spinning, per ANIMATION_SPEC.md "Anticipation": "ralentissement des
	 * rouleaux restants + cadre du rouleau qui pulse". Calls oncomplete once
	 * the reel actually stops (same contract as the Spine version).
	 */
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Rectangle } from 'pixi-svelte';

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
	const glow = new GlowFilter({ color: 0xffcc00, outerStrength: 2.5 });

	let running = true;

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

<Rectangle
	anchor={0.5}
	x={context.stateGameDerived.boardLayout().x -
		context.stateGameDerived.boardLayout().width * 0.5 +
		(props.reel.reelIndex + REEL_PADDING) * SYMBOL_SIZE}
	y={context.stateGameDerived.boardLayout().y + (SYMBOL_SIZE * BOARD_DIMENSIONS.y) / 2}
	width={SYMBOL_SIZE * 0.95}
	height={SYMBOL_SIZE * BOARD_DIMENSIONS.y}
	borderColor={0xffcc00}
	borderWidth={5}
	borderAlpha={pulse.current}
	backgroundColor={0xffcc00}
	backgroundAlpha={pulse.current * 0.12}
	filters={[glow]}
/>
