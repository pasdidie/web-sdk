<script lang="ts" module>
	import type { RawSymbol, Position } from '../game/types';

	export type EmitterEventBoard =
		| { type: 'boardSettle'; board: RawSymbol[][] }
		| { type: 'boardShow' }
		| { type: 'boardHide' }
		| {
				type: 'boardWithAnimateSymbols';
				symbolPositions: Position[];
		  };
</script>

<script lang="ts">
	import { waitForResolve } from 'utils-shared/wait';
	import { BoardContext } from 'components-shared';

	import { getContext } from '../game/context';
	import BoardContainer from './BoardContainer.svelte';
	import BoardMask from './BoardMask.svelte';
	import BoardBase from './BoardBase.svelte';
	import FxLayer from './FxLayer.svelte';
	import LineWinAmount from './LineWinAmount.svelte';
	import { fx } from '../game/fx';
	import { getSymbolX } from '../game/utils';

	const context = getContext();

	let show = $state(true);

	context.eventEmitter.subscribeOnMount({
		stopButtonClick: () => context.stateGameDerived.enhancedBoard.stop(),
		boardSettle: ({ board }) => context.stateGameDerived.enhancedBoard.settle(board),
		boardShow: () => (show = true),
		boardHide: () => (show = false),
		boardWithAnimateSymbols: async ({ symbolPositions }) => {
			const reels = context.stateGame.board;
			const points = symbolPositions.map((position) => ({
				x: getSymbolX(position.reel),
				y: reels[position.reel].reelState.symbols[position.row].symbolY(),
			}));
			const names = symbolPositions.map(
				(position) => reels[position.reel].reelState.symbols[position.row].rawSymbol.name,
			);
			const isScatterWin = names.includes('S');
			const special = isScatterWin || names.includes('W');
			fx.emit({ kind: 'symbolWin', points, special });
			if (!isScatterWin) {
				const linePoints = [...points].sort((a, b) => a.x - b.x);
				fx.emit({ kind: 'winLine', points: linePoints, durationMs: 1100 });
			} else {
				fx.emit({ kind: 'shake', intensity: 6, durationMs: 320 });
			}
			const getPromises = () =>
				symbolPositions.map(async (position) => {
					const reelSymbol = context.stateGame.board[position.reel].reelState.symbols[position.row];
					reelSymbol.symbolState = 'win';
					await waitForResolve((resolve) => (reelSymbol.oncomplete = resolve));
					reelSymbol.symbolState = 'postWinStatic';
				});

			await Promise.all(getPromises());
		},
	});

	context.stateGameDerived.enhancedBoard.readyToSpinEffect();
</script>

{#if show}
	<BoardContext animate={false}>
		<BoardContainer>
			<BoardMask />
			<BoardBase />
		</BoardContainer>
	</BoardContext>

	<BoardContext animate={true}>
		<BoardContainer>
			<BoardBase />
			<FxLayer />
			<LineWinAmount />
		</BoardContainer>
	</BoardContext>
{/if}
