<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventFreeSpinOutro =
		| { type: 'freeSpinOutroShow' }
		| { type: 'freeSpinOutroHide' }
		| { type: 'freeSpinOutroCountUp'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider } from 'components-pixi';
	import { stateI18nDerived } from 'state-shared';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { waitForResolve } from 'utils-shared/wait';
	import { CanvasSizeRectangle } from 'components-layout';
	import { OnMount } from 'components-shared';

	import { getContext } from '../game/context';
	import FreeSpinAnimation from './FreeSpinAnimationSprite.svelte';
	import NumberPopSprite from './NumberPopSprite.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import WinCoins from './WinCoins.svelte';
	import WinAmountText from './WinAmountText.svelte';

	const titleStyle = (fontSize: number) => ({
		fontFamily: 'Cinzel, serif',
		fontWeight: '700' as const,
		fontSize,
		fill: 0xffe2a0,
		letterSpacing: 3,
		align: 'center' as const,
		stroke: { color: 0x1a0d04, width: Math.max(4, fontSize * 0.1) },
		dropShadow: { color: 0x3fb6ff, blur: 12, distance: 0, alpha: 0.9, angle: 0 },
	});

	const context = getContext();

	let show = $state(true);
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});
	let onCountUpComplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinOutroShow: () => (show = true),
		freeSpinOutroHide: async () => (show = false),
		freeSpinOutroCountUp: async (emitterEvent) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		{@const duration = winLevelData.presentDuration}
		{@const isBigWin = winLevelData.type === 'big'}
		<WinCountUpProvider {amount} {duration} oncomplete={() => onCountUpComplete()}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount onmount={() => startCountUp()} />

				<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

				<FreeSpinAnimation>
					{#snippet children({ sizes })}
						<Text
							anchor={{ x: 0.5, y: 1 }}
							y={-sizes.width * (isBigWin ? 0.17 : 0.12)}
							text={stateI18nDerived.translate(isBigWin ? 'FREE SPINS COMPLETE' : 'WIN')}
							style={titleStyle(sizes.width * 0.06)}
						/>

						<NumberPopSprite>
							<WinAmountText
								text={bookEventAmountToCurrencyString(countUpAmount)}
								fontSize={sizes.width * 0.13}
								maxWidth={sizes.width * 0.62}
							/>
						</NumberPopSprite>

						<Text
							anchor={{ x: 0.5, y: 0 }}
							y={sizes.width * 0.14}
							text={stateI18nDerived.translate('TOTAL WIN')}
							style={titleStyle(sizes.width * 0.045)}
						/>
					{/snippet}
				</FreeSpinAnimation>

				<WinCoins emit={!countUpCompleted} levelAlias={winLevelData?.alias} />

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
