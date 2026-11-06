<script lang="ts">
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';

	import UiSprite from './UiSprite.svelte';
	import type { ButtonIcon } from '../types';
	import type { Snippet } from 'svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { UI_BASE_FONT_SIZE } from '../constants';
	import { getMetalTextTheme, metalTextStyle } from '../metalTextStyle';
	import { getUiSkin } from '../uiSkin';

	type Props = Omit<ButtonProps, 'children'> & {
		icon: ButtonIcon;
		sizes: { width: number; height: number };
		active?: boolean;
		children?: Snippet;
		variant?: 'dark' | 'light';
	};

	const {
		icon,
		active,
		variant = 'dark',
		children: childrenFromParent,
		...buttonProps
	}: Props = $props();

	const theme = getMetalTextTheme();
	const label = $derived(i18nDerived[icon]());
	const fontScale = $derived(label.length <= 1 ? theme.buttonGlyphScale : 1);
	const iconKey = $derived(getUiSkin().iconKeys[icon]);
</script>

<Button {...buttonProps}>
	{#snippet children({ center, hovered, pressed })}
		<UiSprite
			{...center}
			key="ui_button"
			anchor={0.5}
			width={buttonProps.sizes.width}
			height={buttonProps.sizes.height}
			backgroundColor={variant === 'dark' ? 0x000000 : 0xffffff}
			{...buttonProps.disabled
				? {
						backgroundColor: 0xaaaaaa,
					}
				: {}}
			{...active
				? {
						borderWidth: 10,
						borderColor: variant === 'dark' ? 0xffffff : 0x000000,
					}
				: {}}
		/>

		{#if iconKey}
			<Container {...center} scale={pressed ? 0.9 : hovered ? 1.08 : 1}>
				<Sprite
					anchor={0.5}
					key={iconKey}
					width={buttonProps.sizes.width * 0.5}
					height={buttonProps.sizes.height * 0.5}
					alpha={buttonProps.disabled ? 0.5 : 1}
				/>
			</Container>
		{:else}
		<Text
			{...center}
			anchor={0.5}
			text={label}
			style={{
				align: 'center',
				wordWrap: true,
				wordWrapWidth: buttonProps.sizes.width * theme.buttonTextWidth,
				...metalTextStyle(UI_BASE_FONT_SIZE * 0.6 * fontScale, { fontWeight: '600' }),
			}}
		/>
		{/if}

		{@render childrenFromParent?.()}
	{/snippet}
</Button>
