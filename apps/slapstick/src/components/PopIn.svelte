<script lang="ts">
	/**
	 * Springy entrance for a piece of text or a badge: scales up from 0.4
	 * with one soft overshoot and a small tilt that settles, instead of
	 * appearing on a hard cut.
	 */
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { Container } from 'pixi-svelte';

	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = { x?: number; y?: number; delayMs?: number; children: Snippet };
	const props: Props = $props();

	let t = $state(prefersReducedMotion() ? 10 : -(props.delayMs ?? 0) / 1000);

	onMount(() => {
		if (prefersReducedMotion()) return;
		let last = 0;
		let frame = requestAnimationFrame(function tick(ts) {
			t += last ? Math.min((ts - last) / 1000, 0.05) : 0;
			last = ts;
			if (t < 1.5) frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});

	const tt = $derived(Math.max(0, t));
	const scale = $derived(1 - 0.6 * Math.exp(-tt * 8) * Math.cos(tt * 15));
	const rotation = $derived(-0.08 * Math.exp(-tt * 6) * Math.cos(tt * 11));
</script>

<Container x={props.x} y={props.y} {scale} {rotation} alpha={Math.max(0, Math.min(1, t * 8))}>
	{@render props.children()}
</Container>
