<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	/**
	 * Reel house built from OUR frame_reels.png (Gemini) instead of the
	 * upstream example's frame_bg/frame_edge sprites + "reelhouse" Spine glow
	 * -- those were template art in a different style, one of the "mismatched
	 * art styles" points of the first Engine review.
	 *
	 * frame_reels.png inner opening, measured on the 2752x1536 asset:
	 * ~72.7% of its width and ~63.5% of its height, centered. The frame is
	 * scaled so that opening wraps the 5x3 board with a small margin.
	 *
	 * Free spins: azure glow on the frame that breathes, plus a brighter
	 * backing tint, replacing the Spine reelhouse_glow_* animations.
	 */
	import { onDestroy } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Container, Graphics, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { stateFx } from '../game/stateFx.svelte';
	import { prefersReducedMotion } from '../game/animationConfig';

	const context = getContext();
	const OPENING = { width: 0.727, height: 0.635 };
	const MARGIN = { width: 1.04, height: 1.07 };

	const layout = $derived(context.stateGameDerived.boardLayout());
	const frameWidth = $derived((layout.width * MARGIN.width) / OPENING.width);
	const frameHeight = $derived((layout.height * MARGIN.height) / OPENING.height);

	const glowLevel = new Tween(0, { duration: 700, easing: cubicOut });
	let breath = $state(0);
	let rafId: number | null = null;
	const glow = new GlowFilter({
		color: 0x3fb6ff,
		outerStrength: 0,
		innerStrength: 0,
		quality: 0.2,
		distance: 14,
	});
	onDestroy(() => {
		if (rafId !== null) cancelAnimationFrame(rafId);
		glow.destroy();
	});

	const loop = (ts: number) => {
		breath = 0.5 + 0.5 * Math.sin(ts / 520);
		rafId = requestAnimationFrame(loop);
	};
	if (!prefersReducedMotion()) rafId = requestAnimationFrame(loop);

	$effect(() => {
		glow.outerStrength = glowLevel.current * (2 + 2.5 * breath);
		glow.innerStrength = glowLevel.current * 0.6 * breath;
	});

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => glowLevel.set(1),
		boardFrameGlowHide: () => glowLevel.set(0),
	});
</script>

<Container x={layout.x + stateFx.shakeX * 0.6} y={layout.y + stateFx.shakeY * 0.6} zIndex={-1}>
	<!-- Dark backing behind the reels so symbols read on any background. -->
	<Graphics
		draw={(g) => {
			const w = layout.width * MARGIN.width;
			const h = layout.height * MARGIN.height;
			g.clear();
			g.rect(-w / 2, -h / 2, w, h).fill({ color: 0x070a10, alpha: 0.82 });
			g.rect(-w / 2, -h / 2, w, h).fill({ color: 0x1b4f7a, alpha: 0.12 + 0.18 * glowLevel.current * breath });
		}}
	/>
	<Sprite
		key="frame_reels"
		anchor={0.5}
		width={frameWidth}
		height={frameHeight}
		filters={glowLevel.current > 0.01 ? [glow] : []}
	/>
</Container>
