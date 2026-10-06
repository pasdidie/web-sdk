<script lang="ts">
	import { Text, Rectangle } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	import { UI_BASE_SIZE } from '../constants';
	import { metalTextStyle } from '../metalTextStyle';

	const fontSizeMultiplier = $derived.by(() => {
		if (stateBet.autoSpinsCounter === Infinity) return 3;
		if (stateBet.autoSpinsCounter > 99) return 1.5;
		if (stateBet.autoSpinsCounter > 9) return 2;
		return 2.5;
	});
</script>

{#if stateBet.autoSpinsCounter > 0}
	<Rectangle
		anchor={0.5}
		width={UI_BASE_SIZE * 0.9}
		height={UI_BASE_SIZE * 0.9}
		borderRadius={50}
	/>
	<Text
		anchor={0.5}
		text={stateBet.autoSpinsCounter === Infinity ? '∞' : stateBet.autoSpinsCounter}
		style={metalTextStyle(fontSizeMultiplier * UI_BASE_SIZE * 0.2, { fontWeight: 'bold' })}
	/>
{/if}
