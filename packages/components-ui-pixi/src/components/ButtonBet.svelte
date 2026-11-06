<script lang="ts">
	import { onMount } from 'svelte';
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';

	import UiSprite from './UiSprite.svelte';
	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { getMetalTextTheme, metalTextStyle } from '../metalTextStyle';
	import { getUiSkin } from '../uiSkin';
	import { getContext } from '../context';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

	// Optional skin: a film reel that spins up while a bet plays and coasts to a stop.
	const skin = getUiSkin();
	const context = getContext();
	const playing = $derived(!context.stateXstateDerived.isIdle());
	let reelAngle = $state(0);
	onMount(() => {
		if (!skin.spinReelKey) return;
		let speed = 0;
		let last = performance.now();
		let frame = requestAnimationFrame(function tick(now) {
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;
			const target = playing ? 9 : 0.25;
			speed += (target - speed) * Math.min(1, dt * (playing ? 3 : 1.6));
			reelAngle += speed * dt;
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<Button {...props} {sizes} {onpress} {disabled}>
			{#snippet children({ center, hovered, pressed })}
				{#if skin.spinReelKey}
					{@const isSpin = ['spin_default', 'spin_disabled'].includes(key)}
					{@const dimmed = disabled || ['spin_disabled', 'stop_disabled'].includes(key)}
					<Container {...center} scale={pressed ? 0.94 : hovered ? 1.04 : 1}>
						<Container rotation={reelAngle}>
							<Sprite
								anchor={0.5}
								key={skin.spinReelKey}
								width={sizes.width * 1.35}
								height={sizes.height * 1.35}
								alpha={dimmed ? 0.55 : 1}
							/>
						</Container>
						{#if isSpin && skin.iconKeys.spin}
							<Sprite
								anchor={0.5}
								x={sizes.width * 0.03}
								key={skin.iconKeys.spin}
								width={sizes.width * 0.4}
								height={sizes.height * 0.4}
								alpha={dimmed ? 0.55 : 1}
							/>
						{:else}
							<Text
								anchor={0.5}
								text={isSpin ? i18nDerived.bet() : i18nDerived.stop()}
								style={metalTextStyle(UI_BASE_FONT_SIZE * 0.42, { fontWeight: '600' })}
							/>
						{/if}
					</Container>
				{:else}
				<Container {...center}>
					<UiSprite
						key="bet"
						width={sizes.width}
						height={sizes.height}
						anchor={0.5}
						{...disabled || ['spin_disabled', 'stop_disabled'].includes(key)
							? {
									backgroundColor: 0xaaaaaa,
								}
							: {}}
					/>
					<Text
						anchor={0.5}
						text={['spin_default', 'spin_disabled'].includes(key)
							? i18nDerived.bet()
							: i18nDerived.stop()}
						style={{
							align: 'center',
							wordWrap: true,
							wordWrapWidth: sizes.width * getMetalTextTheme().buttonTextWidth,
							...metalTextStyle(UI_BASE_FONT_SIZE * 0.7, { fontWeight: '600' }),
						}}
					/>
				</Container>
				{/if}
			{/snippet}
		</Button>
	{/snippet}
</ButtonBetProvider>
