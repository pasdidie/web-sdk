<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventFreeSpinOutro =
		| { type: 'freeSpinOutroShow' }
		| { type: 'freeSpinOutroHide' }
		| { type: 'freeSpinOutroCountUp'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { BitmapText, ResponsiveBitmapText } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider } from 'components-pixi';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { waitForResolve } from 'utils-shared/wait';
	import { CanvasSizeRectangle } from 'components-layout';
	import { OnMount } from 'components-shared';

	import { getContext } from '../game/context';
	import FreeSpinAnimation from './FreeSpinAnimationSprite.svelte';
	import NumberPopSprite from './NumberPopSprite.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import WinCoins from './WinCoins.svelte';

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
						<BitmapText
							anchor={{ x: 0.5, y: 1 }}
							y={-sizes.width * (isBigWin ? 0.18 : 0.12)}
							text={isBigWin ? 'FREE SPINS COMPLETE' : 'WIN'}
							style={{ fontFamily: 'gold', fontSize: sizes.width * 0.07, fontWeight: 'bold', align: 'center' }}
						/>

						<NumberPopSprite>
							<ResponsiveBitmapText
								anchor={0.5}
								style={{
									fontFamily: 'gold',
									fontSize: sizes.width * 0.08,
								}}
								text={bookEventAmountToCurrencyString(countUpAmount)}
								maxWidth={sizes.width}
							/>
						</NumberPopSprite>

						<BitmapText
							anchor={{ x: 0.5, y: 0 }}
							y={sizes.width * 0.14}
							text="TOTAL WIN"
							style={{ fontFamily: 'gold', fontSize: sizes.width * 0.05, fontWeight: 'bold', align: 'center' }}
						/>
					{/snippet}
				</FreeSpinAnimation>

				<WinCoins emit={!countUpCompleted} levelAlias={winLevelData?.alias} />

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
