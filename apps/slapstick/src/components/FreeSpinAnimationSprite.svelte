<script lang="ts">
	/**
	 * Real-asset replacement for FreeSpinAnimation.svelte (Spine "fsIntro"
	 * panel shared by FreeSpinIntro/FreeSpinOutro). Same external contract
	 * (children snippet receiving {sizes}) so both callers only needed an
	 * import swap. banner_frame.png stands in for a dedicated panel asset.
	 */
	import type { Snippet } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';
	import { anchorToPivot, Container, Sprite, type Sizes } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	type Props = {
		children: Snippet<[{ sizes: Sizes }]>;
	};

	const props: Props = $props();
	const context = getContext();
	const cfg = ANIMATION_CONFIG.freeSpins;

	const BACKGROUND_RATIO = 920 / 720;
	const BACKGROUND_WIDTH = SYMBOL_SIZE * BOARD_DIMENSIONS.x;
	const BACKGROUND_SIZES = {
		width: BACKGROUND_WIDTH,
		height: BACKGROUND_WIDTH / BACKGROUND_RATIO,
	};
	const PANEL_SIZES = {
		width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
		height: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	};

	const scale = new Tween(0, { easing: backOut, duration: cfg.introDurationMs });

	$effect(() => {
		scale.set(1, prefersReducedMotion() ? { duration: 0 } : undefined);
	});
</script>

<MainContainer>
	<Container
		x={context.stateGameDerived.boardLayout().x}
		y={context.stateGameDerived.boardLayout().y}
		pivot={anchorToPivot({ anchor: 0.5, sizes: BACKGROUND_SIZES })}
	>
		<Container x={PANEL_SIZES.width * 0.5} y={PANEL_SIZES.height * 0.4} scale={scale.current}>
			<Sprite anchor={0.5} key="banner_frame" width={PANEL_SIZES.width * 0.9} height={PANEL_SIZES.width * 0.55} />
			{@render props.children({ sizes: BACKGROUND_SIZES })}
		</Container>
	</Container>
</MainContainer>
