<script lang="ts">
	/**
	 * Real-asset replacement for the small SpineProvider+SpineSlot wrapper
	 * FreeSpinIntro/Outro used just to pop the spin-count / win-total number
	 * into view. Pop 0 -> overshoot -> 1, per ANIMATION_SPEC.md "Wild
	 * multiplicateur" timing (closest catalogued pop entry), then holds.
	 */
	import type { Snippet } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';
	import { Container } from 'pixi-svelte';

	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	type Props = {
		x?: number;
		y?: number;
		children: Snippet;
	};

	const props: Props = $props();
	const cfg = ANIMATION_CONFIG.wildMultiplierBadge;

	const scale = new Tween(cfg.popFrom, { easing: backOut, duration: cfg.durationMs });

	$effect(() => {
		scale.set(cfg.popTo, prefersReducedMotion() ? { duration: 0 } : undefined);
	});
</script>

<Container x={props.x} y={props.y} scale={scale.current}>
	{@render props.children()}
</Container>
