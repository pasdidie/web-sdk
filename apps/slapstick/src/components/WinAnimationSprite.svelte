<script lang="ts">
	/**
	 * Real-asset replacement for WinAnimation.svelte (Spine big-win banner).
	 * Same external contract (animationMap kept for prop-compatibility with
	 * Win.svelte/winLevelMap.ts even though the sprite version doesn't need
	 * named Spine animations) so Win.svelte only needed an import swap.
	 * The intertitle card is lowered into the frame like a hanging stage card:
	 * it drops from above, bounces at the end of its wires, swings on its
	 * pivot (damped pendulum) and keeps a slow sway while the amount counts
	 * up. The earlier zoom + GlowFilter pulse read as a generic effect
	 * (reviewer feedback "poor animations"), so there is no glow here.
	 *
	 * No x/y here: Win.svelte already wraps this in a Container translated to
	 * boardLayout().x/y (the board's on-screen center) -- adding boardLayout
	 * again here doubled the offset and would push the banner far off-screen
	 * the first time a win actually triggers it. Position relative to (0,0).
	 */
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { Container, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = {
		animationMap: unknown;
		children: Snippet;
	};

	const props: Props = $props();
	const context = getContext();

	// Silent-film intertitle card (1376x768) framing the amount, wider than the 3x3 board.
	const bannerWidth = $derived(context.stateGameDerived.boardLayout().height * 2.1);
	const bannerHeight = $derived(bannerWidth / (1376 / 768));
	// The card hangs from a point above its top edge, so it swings like a sign on two wires.
	const pivotY = $derived(-bannerHeight * 0.9);

	let t = $state(prefersReducedMotion() ? 10 : 0);

	onMount(() => {
		if (prefersReducedMotion()) return;
		let last = 0;
		let frame = requestAnimationFrame(function tick(ts) {
			t += last ? Math.min((ts - last) / 1000, 0.05) : 0;
			last = ts;
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});

	// Drop: falls from 1.6 card heights above with a damped bounce at the end of its wires.
	const drop = $derived(t < 0 ? 1 : Math.exp(-t * 7) * Math.cos(t * 14));
	const dropY = $derived(-bannerHeight * 1.6 * Math.max(-0.12, drop));
	// Swing: kicked by the stop, damped, then a slow residual sway.
	const swing = $derived(0.16 * Math.exp(-t * 2.6) * Math.sin(t * 7.5) + 0.012 * Math.sin(t * 1.7));
	// A short jolt in scale when the wires go taut.
	const taut = $derived(1 + 0.05 * Math.exp(-t * 10) * Math.sin(t * 30));
</script>

<Container y={pivotY + dropY} rotation={swing}>
	<Container y={-pivotY} scale={taut}>
		<Sprite anchor={0.5} key="banner_frame" width={bannerWidth} height={bannerHeight} />
		{@render props.children()}
	</Container>
</Container>
