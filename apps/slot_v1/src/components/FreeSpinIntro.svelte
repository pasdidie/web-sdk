<script lang="ts" module>
	export type EmitterEventFreeSpinIntro =
		| { type: 'freeSpinIntroShow' }
		| { type: 'freeSpinIntroHide' }
		| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { Text } from 'pixi-svelte';
	import { stateI18nDerived } from 'state-shared';

	import { getContext } from '../game/context';
	import PressToContinue from './PressToContinue.svelte';
	import FreeSpinAnimation from './FreeSpinAnimationSprite.svelte';
	import NumberPopSprite from './NumberPopSprite.svelte';

	const context = getContext();

	let show = $state(false);
	let freeSpinsFromEvent = $state(0);
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinIntroShow: () => (show = true),
		freeSpinIntroHide: () => (show = false),
		freeSpinIntroUpdate: async (emitterEvent) => {
			// if (emitterEvent.extraSpins) {
			// 	context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_fs_respins' });
			// }
			// freeSpinsFromEvent = emitterEvent.extraSpins ?? emitterEvent.totalFreeSpins;
			freeSpinsFromEvent = emitterEvent.totalFreeSpins;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

	<FreeSpinAnimation>
		{#snippet children({ sizes })}
			<Text
				anchor={{ x: 0.5, y: 1 }}
				y={-sizes.width * 0.16}
				text={stateI18nDerived.translate('FREE SPINS')}
				style={{
					fontFamily: 'Cinzel, serif',
					fontWeight: '700',
					fontSize: sizes.width * 0.075,
					fill: 0xffe2a0,
					letterSpacing: 4,
					stroke: { color: 0x1a0d04, width: sizes.width * 0.008 },
					dropShadow: { color: 0x3fb6ff, blur: 16, distance: 0, alpha: 1, angle: 0 },
				}}
			/>

			<NumberPopSprite>
				<Text
					anchor={0.5}
					text={String(freeSpinsFromEvent)}
					style={{
						fontFamily: 'Cinzel, serif',
						fontWeight: '700',
						fontSize: sizes.width * 0.14,
						fill: 0xffe2a0,
						stroke: { color: 0x1a0d04, width: sizes.width * 0.012 },
						dropShadow: { color: 0x3fb6ff, blur: 20, distance: 0, alpha: 1, angle: 0 },
					}}
				/>
			</NumberPopSprite>
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
