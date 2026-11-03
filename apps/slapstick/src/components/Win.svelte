<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventWin =
		| { type: 'winShow' }
		| { type: 'winHide' }
		| { type: 'winUpdate'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Container, Text } from 'pixi-svelte';
	import { stateI18nDerived } from 'state-shared';
	import { FadeContainer, WinCountUpProvider, ResponsiveText } from 'components-pixi';
	import { silverText } from '../game/textStyles';
	import { waitForResolve, waitForTimeout } from 'utils-shared/wait';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { CanvasSizeRectangle, MainContainer } from 'components-layout';
	import { OnMount } from 'components-shared';

	import WinCoins from './WinCoins.svelte';
	import WinAnimation from './WinAnimationSprite.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { getContext } from '../game/context';

	const context = getContext();
	const t = stateI18nDerived.translate;

	// Silent-film intertitle line shown above the amount on big wins.
	const INTERTITLES: Partial<Record<string, string>> = {
		big: 'BRAVO!',
		superwin: 'WHAT LUCK!',
		mega: 'MARVELLOUS!',
		epic: 'SENSATIONAL!',
		max: 'THE GRAND FINALE!',
	};

	let show = $state(false);
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});
	let onCountUpComplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		winShow: () => (show = true),
		winHide: () => (show = false),
		winUpdate: async (emitterEvent) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		{@const isBigWin = winLevelData.type === 'big'}
		{@const duration = winLevelData.presentDuration}
		<WinCountUpProvider {amount} {duration} oncomplete={() => onCountUpComplete()}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				{#if isBigWin}
					<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />
				{/if}

				<OnMount
					onmount={async () => {
						await startCountUp();
						await waitForTimeout(300);
						oncomplete();
					}}
				/>

				<MainContainer>
					<Container
						x={context.stateGameDerived.boardLayout().x}
						y={context.stateGameDerived.boardLayout().y}
					>
						{#if winLevelData?.animation}
							<WinAnimation animationMap={winLevelData.animation}>
								{#if INTERTITLES[winLevelData.alias]}
									<Text
										anchor={0.5}
										y={-SYMBOL_SIZE * 1.15}
										text={t(INTERTITLES[winLevelData.alias] ?? '')}
										style={{
											fontFamily: 'Limelight, serif',
											fontSize: SYMBOL_SIZE * 0.42,
											fill: 0xf2eee4,
											letterSpacing: 4,
										}}
									/>
								{/if}
								<ResponsiveText
									anchor={0.5}
									y={SYMBOL_SIZE * 0.2}
									maxWidth={context.stateGameDerived.boardLayout().height * 1.7}
									text={bookEventAmountToCurrencyString(countUpAmount)}
									style={silverText(SYMBOL_SIZE * 1.05)}
								/>
							</WinAnimation>
						{:else}
							<ResponsiveText
								anchor={0.5}
								maxWidth={context.stateLayoutDerived.canvasSizes().width /
									context.stateLayoutDerived.mainLayout().scale}
								text={bookEventAmountToCurrencyString(countUpAmount)}
								style={silverText(SYMBOL_SIZE * 0.6)}
							/>
						{/if}
					</Container>
				</MainContainer>

				<WinCoins emit={!countUpCompleted} levelAlias={winLevelData?.alias} />

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
