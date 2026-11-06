<script lang="ts">
	/**
	 * Symbols grouped per reel so each spinning reel gets a vertical motion
	 * blur (one filter pass per reel, not per symbol) -- symbols read as
	 * moving fast instead of sliding crisp static images down the column.
	 * Blur only exists while that reel is 'spinning'; it is removed the moment
	 * the reel starts bouncing so the landing is sharp.
	 */
	import { onDestroy } from 'svelte';
	import { MotionBlurFilter } from 'pixi-filters';
	import { Container } from 'pixi-svelte';

	import ReelSymbol from './ReelSymbol.svelte';
	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';

	const context = getContext();
	const reduced = prefersReducedMotion();
	const blurs = context.stateGame.board.map(
		() => new MotionBlurFilter({ velocity: { x: 0, y: 28 }, kernelSize: 7, offset: 0 }),
	);
	onDestroy(() => blurs.forEach((filter) => filter.destroy()));
</script>

{#each context.stateGame.board as reel, reelIndex (reelIndex)}
	<Container filters={!reduced && reel.reelState.motion === 'spinning' ? [blurs[reelIndex]] : []}>
		{#each reel.reelState.symbols as reelSymbol, rowIndex}
			<ReelSymbol {reelIndex} {rowIndex} {reelSymbol} />
		{/each}
	</Container>
{/each}
