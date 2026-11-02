<script lang="ts">
	/**
	 * Silent-film iris wipe between game states: a black screen with a round
	 * hole closes onto the centre of the board, holds a beat on black, then
	 * opens again. The game state switch happens while the screen is fully
	 * black (oncomplete is called at the hold), so the change is never seen
	 * mid-wipe; onfinish fires once the iris is fully open again.
	 */
	import { onMount } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { Graphics } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = { oncomplete: () => void; onfinish: () => void };

	const props: Props = $props();
	const context = getContext();

	const CLOSE_MS = 650;
	const HOLD_MS = 250;
	const OPEN_MS = 650;

	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const maxRadius = $derived(Math.hypot(canvas.width, canvas.height) / 2);

	let radius = $state(Number.POSITIVE_INFINITY);

	onMount(() => {
		if (prefersReducedMotion()) {
			props.oncomplete();
			props.onfinish();
			return;
		}
		const start = performance.now();
		let completed = false;
		let rafId = requestAnimationFrame(function tick(ts) {
			const t = ts - start;
			if (t < CLOSE_MS) {
				radius = maxRadius * (1 - cubicIn(t / CLOSE_MS));
			} else if (t < CLOSE_MS + HOLD_MS) {
				radius = 0;
			} else if (t < CLOSE_MS + HOLD_MS + OPEN_MS) {
				if (!completed) {
					completed = true;
					props.oncomplete();
				}
				radius = maxRadius * cubicOut((t - CLOSE_MS - HOLD_MS) / OPEN_MS);
			} else {
				props.onfinish();
				return;
			}
			rafId = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(rafId);
	});
</script>

<Graphics
	zIndex={100}
	draw={(g) => {
		g.rect(0, 0, canvas.width, canvas.height).fill(0x0d0d0d);
		if (radius > 0) g.circle(canvas.width / 2, canvas.height / 2, Math.min(radius, maxRadius)).cut();
	}}
/>
