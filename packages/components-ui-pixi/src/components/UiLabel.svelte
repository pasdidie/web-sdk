<script lang="ts">
	import { Text } from 'pixi-svelte';

	import UiSprite from './UiSprite.svelte';
	import { UI_BASE_FONT_SIZE } from '../constants';
	import { metalTextStyle } from '../metalTextStyle';

	type Props = {
		label: string;
		value: string;
		tiled?: boolean;
		stacked?: boolean;
	};

	const props: Props = $props();

	// The panel art has a gem bump + thicker border at the top than the
	// bottom, so the actual safe interior isn't vertically centered in the
	// sprite's bounding box -- nudged down and sized down a bit from the
	// flat-rectangle-era values to keep clear of it. Needs eyeballing against
	// a live render to fine-tune further.
	const labelStyle = metalTextStyle(UI_BASE_FONT_SIZE * 0.7, { fontWeight: '600' });
	const valueStyle = metalTextStyle(UI_BASE_FONT_SIZE * 0.92);
</script>

{#if props.stacked}
	{#if props.tiled}
		<UiSprite
			y={-20}
			anchor={{ x: 0.5, y: 0 }}
			key="base_ticker"
			width={UI_BASE_FONT_SIZE * 3 * (326 / 73)}
			height={UI_BASE_FONT_SIZE * 3}
			borderRadius={35}
		/>
	{/if}
	<Text anchor={{ x: 0.5, y: 0 }} text={props.label} style={labelStyle} y={8} />
	<Text
		anchor={{ x: 0.5, y: 0 }}
		text={props.value}
		style={valueStyle}
		y={UI_BASE_FONT_SIZE * 0.8}
	/>
{:else}
	{#if props.tiled}
		<UiSprite
			x={-90}
			anchor={{ x: 0, y: 0.5 }}
			key="base_ticker"
			width={UI_BASE_FONT_SIZE * 3 * (326 / 73)}
			height={UI_BASE_FONT_SIZE * 3}
			borderRadius={35}
		/>
	{/if}
	<Text anchor={{ x: 0, y: 0.5 }} text={props.label} style={labelStyle} />
	<Text
		anchor={{ x: 1, y: 0.5 }}
		text={props.value}
		style={valueStyle}
		x={UI_BASE_FONT_SIZE * 10}
	/>
{/if}
