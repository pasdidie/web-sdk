<script lang="ts">
	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolInfo, getSymbolX } from '../game/utils';
	import type { ReelSymbol } from '../game/stateGame.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { Container } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { ANIMATION_CONFIG } from '../game/animationConfig';

	type Props = {
		reelIndex: number;
		reelSymbol: ReelSymbol;
	};

	const props: Props = $props();
	const context = getContext();

	// Spotlight: while a win is shown, every symbol not in it fades down.
	const dimmed = $derived(context.stateGame.winSpotlight && props.reelSymbol.symbolState !== 'win');
	const alpha = new Tween(1, { duration: ANIMATION_CONFIG.symbolDim.durationMs * 2, easing: cubicOut });
	$effect(() => {
		alpha.set(dimmed ? ANIMATION_CONFIG.symbolDim.opacity : 1);
	});

	const symbolInfo = $derived(
		getSymbolInfo({ rawSymbol: props.reelSymbol.rawSymbol, state: props.reelSymbol.symbolState }),
	);
</script>

<SymbolWrap
	x={getSymbolX(props.reelIndex)}
	y={props.reelSymbol.symbolY()}
	animating={['spine', 'sprite-win', 'sprite-aura'].includes(symbolInfo.type) &&
		(props.reelSymbol.symbolState === 'land' || props.reelSymbol.symbolState === 'win')}
>
	<Container alpha={alpha.current}>
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
