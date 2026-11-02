<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	/**
	 * The "projection screen" the reels play on: a dark screen plate behind
	 * the 3x3 board and the Art Deco frame_screen around it. During free
	 * spins (boardFrameGlowShow/Hide) the frame gets a soft cream glow, like
	 * a lit marquee.
	 */
	import { onDestroy } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Rectangle, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';

	const context = getContext();
	const board = $derived(context.stateGameDerived.boardLayout());

	// frame_screen.png: 1200x896 canvas, inner opening ~ 74% x 66% of it.
	const FRAME_RATIO = 1200 / 896;
	const OPENING = { width: 0.74, height: 0.66 };
	const frameWidth = $derived((board.width * 1.06) / OPENING.width);
	const frameHeight = $derived(frameWidth / FRAME_RATIO);

	const glowStrength = new Tween(0, { easing: sineInOut, duration: 600 });
	const glow = new GlowFilter({ color: 0xf2eee4, outerStrength: 0, innerStrength: 0, distance: 18 });
	onDestroy(() => glow.destroy());
	$effect(() => {
		glow.outerStrength = glowStrength.current;
	});

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => glowStrength.set(2.2),
		boardFrameGlowHide: () => glowStrength.set(0),
	});
</script>

<Rectangle
	anchor={0.5}
	x={board.x}
	y={board.y}
	width={board.width * 1.08}
	height={board.height * 1.08}
	backgroundColor={0x111111}
	alpha={0.92}
/>

<Sprite key="frame_screen" anchor={0.5} x={board.x} y={board.y} width={frameWidth} height={frameHeight} filters={[glow]} />
