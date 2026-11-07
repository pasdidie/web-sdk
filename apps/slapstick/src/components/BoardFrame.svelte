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
	import { BOARD_DIMENSIONS, REEL_PITCH } from '../game/constants';
	import { getSymbolX } from '../game/utils';

	const context = getContext();
	const board = $derived(context.stateGameDerived.boardLayout());

	// frame_screen.png: 1200x896, transparent opening = 68.4% x 57.5% of it
	// (measured on the alpha). The frame is scaled uniformly so its opening
	// is just taller than the 3 rows; the screen is wider than the square
	// board, like a real cinema screen.
	const FRAME_RATIO = 1200 / 896;
	const OPENING = { width: 0.684, height: 0.575 };
	const frameHeight = $derived((board.height * board.scale * 1.08) / OPENING.height);
	const frameWidth = $derived(frameHeight * FRAME_RATIO);

	// One film strip per reel (reel_strip.png: three frames = the three rows),
	// separated by darker gaps, so the 3x3 reads as a grid.
	const columns = $derived(
		Array.from({ length: BOARD_DIMENSIONS.x }, (_, reelIndex) => board.x + (getSymbolX(reelIndex) - board.width / 2) * board.scale),
	);

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
	width={frameWidth * OPENING.width + 4}
	height={frameHeight * OPENING.height + 4}
	backgroundColor={0x070707}
	alpha={0.95}
/>

{#each columns as columnX}
	<Sprite
		key="reel_strip"
		anchor={0.5}
		x={columnX}
		y={board.y}
		width={REEL_PITCH * 0.94 * board.scale}
		height={board.height * 1.06 * board.scale}
		tint={0x8a8781}
	/>
{/each}

<Sprite key="frame_screen" anchor={0.5} x={board.x} y={board.y} width={frameWidth} height={frameHeight} filters={[glow]} />
