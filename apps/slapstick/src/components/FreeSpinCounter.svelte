<script lang="ts" module>
	export type EmitterEventFreeSpinCounter =
		| { type: 'freeSpinCounterShow' }
		| { type: 'freeSpinCounterHide' }
		| { type: 'freeSpinCounterUpdate'; current?: number; total?: number };
</script>

<script lang="ts">
	import { MainContainer } from 'components-layout';
	import { FadeContainer } from 'components-pixi';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { silverText } from '../game/textStyles';

	const context = getContext();
	// Small intertitle card just right of the screen frame (frame = board
	// height x 1.08 / 0.575 tall, 1200/896 ratio -- see BoardFrame.svelte).
	const panelKey = 'intertitle_frame';
	const PANEL_RATIO_DESKTOP = 1376 / 768;
	const panelWidth = $derived(SYMBOL_SIZE * 1.9);
	const frameHalfWidth = $derived(
		(((context.stateGameDerived.boardLayout().height * context.stateGameDerived.boardLayout().scale * 1.08) / 0.575) * (1200 / 896)) / 2,
	);
	const panelSizes = $derived({
		width: panelWidth,
		height: panelWidth / PANEL_RATIO_DESKTOP,
	});
	const scale = 1;
	const position = $derived({
		// portrait: centred on the frame top (its corner would leave the 800px stage)
		x:
			context.stateGameDerived.boardLayout().x +
			(context.stateLayoutDerived.layoutType() === 'portrait' ? 0 : frameHalfWidth - SYMBOL_SIZE * 0.45),
		y: context.stateGameDerived.boardLayout().y - context.stateGameDerived.boardLayout().height * 0.5 * context.stateGameDerived.boardLayout().scale,
	});

	const fontSize = SYMBOL_SIZE * 0.16;

	let show = $state(false);
	let current = $state(0);
	let total = $state(0);

	context.eventEmitter.subscribeOnMount({
		freeSpinCounterShow: () => (show = true),
		freeSpinCounterHide: () => (show = false),
		freeSpinCounterUpdate: (emitterEvent) => {
			if (emitterEvent.current !== undefined) current = emitterEvent.current;
			if (emitterEvent.total !== undefined) total = emitterEvent.total;
		},
	});
</script>

<MainContainer>
	<FadeContainer {show} {...position} {scale}>
		<Container x={panelSizes.width * 0.5} y={panelSizes.height * 0.5}>
			<Sprite key={panelKey} anchor={0.5} {...panelSizes} />
			<!-- two centred lines inside the intertitle card's black field -->
			<Text anchor={0.5} y={-panelSizes.height * 0.13} text="FREE SPINS" style={silverText(fontSize)} />
			<Text anchor={0.5} y={panelSizes.height * 0.15} text={`${current} / ${total}`} style={silverText(fontSize * 1.35)} />
		</Container>
	</FadeContainer>
</MainContainer>
