<script lang="ts">
	import SymbolSpine from './SymbolSpine.svelte';
	import SymbolSprite from './SymbolSprite.svelte';
	import SymbolWinSprite from './SymbolWinSprite.svelte';
	import SymbolAuraSprite from './SymbolAuraSprite.svelte';
	import NumberPopSprite from './NumberPopSprite.svelte';
	import { getSymbolInfo } from '../game/utils';
	import type { SymbolState, RawSymbol } from '../game/types';
	import { getContext } from '../game/context';
	import { Sprite, Text } from 'pixi-svelte';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		state: SymbolState;
		rawSymbol: RawSymbol;
		oncomplete?: () => void;
		loop?: boolean;
	};

	const props: Props = $props();
	const context = getContext();
	const symbolInfo = $derived(getSymbolInfo({ rawSymbol: props.rawSymbol, state: props.state }));
</script>

{#if symbolInfo.type === 'sprite'}
	<SymbolSprite {symbolInfo} x={props.x} y={props.y} oncomplete={props.oncomplete} />
{:else if symbolInfo.type === 'sprite-win'}
	<SymbolWinSprite
		x={props.x}
		y={props.y}
		assetKey={symbolInfo.assetKey}
		sizeRatios={symbolInfo.sizeRatios}
		loop={props.loop}
		oncomplete={props.oncomplete}
	/>
{:else if symbolInfo.type === 'sprite-aura'}
	<SymbolAuraSprite
		x={props.x}
		y={props.y}
		bodyKey={symbolInfo.bodyKey}
		motion={symbolInfo.motion}
		sizeRatios={symbolInfo.sizeRatios}
		mode={symbolInfo.mode}
		loop={props.loop}
		oncomplete={props.oncomplete}
	/>
{:else}
	<SymbolSpine
		loop={props.loop}
		{symbolInfo}
		x={props.x}
		y={props.y}
		showWinFrame={props.state === 'win' && !['S', 'M'].includes(props.rawSymbol.name)}
		listener={{
			complete: props.oncomplete,
			event: (_, event) => {
				if (event.data?.name === 'wildExplode') {
					context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_wild_explode' });
				}
			},
		}}
	/>
{/if}

{#if props.rawSymbol.multiplier}
	<!-- small plaque on the hat's brim; badge_mult.png is a square canvas
	     whose plaque fills ~64% x 35% of it -->
	<NumberPopSprite x={props.x} y={(props.y ?? 0) + SYMBOL_SIZE * 0.36}>
		<Sprite anchor={0.5} key="badge_mult" width={SYMBOL_SIZE * 0.9} height={SYMBOL_SIZE * 0.9} />
		<Text
			anchor={0.5}
			text={`×${props.rawSymbol.multiplier}`}
			style={{ fontFamily: 'Limelight', fontSize: SYMBOL_SIZE * 0.2, fill: 0xf2eee4 }}
		/>
	</NumberPopSprite>
{/if}
