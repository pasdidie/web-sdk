<script lang="ts">
	/**
	 * Win counter text in the game's Cinzel/gold style (replaces the template's
	 * western "gold" bitmap font). Shrinks to fit `maxWidth` so long amounts
	 * never spill out of the big-win plaque or over its title.
	 */
	import { Container, Text } from 'pixi-svelte';

	type Props = { text: string; fontSize: number; maxWidth: number };
	const props: Props = $props();

	let textWidth = $state(0);
	const fit = $derived(textWidth > props.maxWidth ? props.maxWidth / textWidth : 1);
</script>

<Container scale={fit}>
	<Text
		anchor={0.5}
		text={props.text}
		style={{
			fontFamily: 'Cinzel, serif',
			fontWeight: '700',
			fontSize: props.fontSize,
			fill: 0xffe2a0,
			letterSpacing: 2,
			stroke: { color: 0x1a0d04, width: Math.max(4, props.fontSize * 0.08) },
			dropShadow: { color: 0x3fb6ff, blur: 18, distance: 0, alpha: 1, angle: 0 },
		}}
		onresize={(sizes) => (textWidth = sizes.width)}
	/>
</Container>
