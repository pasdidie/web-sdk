<script lang="ts" module>
	import { Rectangle, Sprite, type RectangleProps } from 'pixi-svelte';

	export type Props = RectangleProps & { key?: string };
</script>

<script lang="ts">
	/**
	 * Real-asset UI skin. Callers (UiButton, ButtonBet, ButtonBuyBonus,
	 * UiLabel) already pass `backgroundColor`/`borderColor`/`borderWidth` for
	 * their disabled/active states -- rather than touch every call site, those
	 * same props are reinterpreted here as sprite overlays (dim for disabled,
	 * a glowing outline ring for active) so the Rectangle -> Sprite swap only
	 * needed `key` added at each call site, not a state-passing rewrite.
	 */
	const props: Props = $props();

	const isDisabled = $derived(props.backgroundColor === 0xaaaaaa);
	const isActive = $derived(!!props.borderWidth);
</script>

{#if props.key}
	<Sprite
		key={props.key}
		anchor={props.anchor}
		x={props.x}
		y={props.y}
		width={props.width}
		height={props.height}
		alpha={isDisabled ? 0.55 : 1}
	/>
	{#if isActive}
		<Rectangle
			anchor={props.anchor}
			x={props.x}
			y={props.y}
			width={props.width}
			height={props.height}
			borderRadius={(props.width as number) * 0.5}
			backgroundAlpha={0}
			borderColor={props.borderColor}
			borderWidth={4}
			borderAlpha={0.9}
		/>
	{/if}
{:else}
	<Rectangle borderRadius={50} {...props} />
{/if}
