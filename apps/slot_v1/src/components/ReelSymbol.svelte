<script lang="ts">
	import { Container } from 'pixi-svelte';

	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolInfo, getSymbolX } from '../game/utils';
	import { getContext } from '../game/context';
	import { stateFx, positionKey } from '../game/stateFx.svelte';
	import type { ReelSymbol } from '../game/stateGame.svelte';

	type Props = {
		reelIndex: number;
		rowIndex: number;
		reelSymbol: ReelSymbol;
	};

	const props: Props = $props();
	const context = getContext();
	const symbolInfo = $derived(
		getSymbolInfo({ rawSymbol: props.reelSymbol.rawSymbol, state: props.reelSymbol.symbolState }),
	);
	const isSpecial = $derived(['W', 'S'].includes(props.reelSymbol.rawSymbol.name));
	const reelSpinning = $derived(
		context.stateGame.board[props.reelIndex].reelState.motion === 'spinning',
	);
	// Wild/Scatter are drawn larger than a cell. Once their reel has stopped
	// they move to the unmasked board layer so the overflow isn't clipped at
	// the top/bottom board edge (and they sit above their neighbours).
	const animating = $derived(
		(isSpecial && !reelSpinning) ||
			(['spine', 'sprite-win', 'sprite-aura'].includes(symbolInfo.type) &&
				(props.reelSymbol.symbolState === 'land' || props.reelSymbol.symbolState === 'win')),
	);
	const dimmed = $derived(
		stateFx.dimming && !stateFx.highlight.includes(positionKey(props.reelIndex, props.rowIndex)),
	);
</script>

<SymbolWrap x={getSymbolX(props.reelIndex)} y={props.reelSymbol.symbolY()} {animating}>
	<Container alpha={dimmed ? 0.35 : 1}>
		<Symbol
			state={props.reelSymbol.symbolState}
			rawSymbol={props.reelSymbol.rawSymbol}
			oncomplete={() => {
				if (props.reelSymbol.symbolState === 'win') props.reelSymbol.oncomplete();
				if (props.reelSymbol.symbolState === 'land') props.reelSymbol.symbolState = 'static';
			}}
		/>
	</Container>
</SymbolWrap>
