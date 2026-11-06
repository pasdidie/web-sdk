<script lang="ts">
	import ReelSymbol from './ReelSymbol.svelte';
	import ReelColumn from './ReelColumn.svelte';
	import { getContext } from '../game/context';

	const context = getContext();
</script>

{#each context.stateGame.board as reel, reelIndex (reelIndex)}
	<ReelColumn {reel} {reelIndex}>
		{#each reel.reelState.symbols as reelSymbol}
			<ReelSymbol {reelIndex} {reelSymbol} />
		{/each}
	</ReelColumn>
{/each}
