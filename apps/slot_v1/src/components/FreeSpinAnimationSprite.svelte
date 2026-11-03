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
	import { onDestroy, onMount } from 'svelte';
	import FxParticles from './FxParticles.svelte';
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

	const hasOwnFrame = $derived(!!context.stateApp?.loadedAssets?.['bigwin_frame']);
	let time = $state(0);
	let raf: number | null = null;
	onMount(() => {
		if (prefersReducedMotion()) return;
		let last = performance.now();
		const loop = (ts: number) => {
			time += Math.min(ts - last, 50);
			last = ts;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
	});
	onDestroy(() => {
		if (raf !== null) cancelAnimationFrame(raf);
	});
	const ringK = $derived(Math.min(1, time / 700));
	let carry = 0;
</script>

<MainContainer>
	<Container
		x={context.stateGameDerived.boardLayout().x}
		y={context.stateGameDerived.boardLayout().y}
		pivot={anchorToPivot({ anchor: 0.5, sizes: BACKGROUND_SIZES })}
	>
		<Container x={PANEL_SIZES.width * 0.5} y={PANEL_SIZES.height * 0.4}>
			<Sprite key="fx_rays" anchor={0.5} width={PANEL_SIZES.width * 1.9} height={PANEL_SIZES.width * 1.9} rotation={time / 4000} tint={0x3fb6ff} alpha={0.7 * scale.current} blendMode="add" />
			{#if ringK < 1}
				<Sprite key="fx_ring" anchor={0.5} width={PANEL_SIZES.width * (0.3 + 1.6 * ringK)} height={PANEL_SIZES.width * (0.3 + 1.6 * ringK)} alpha={1 - ringK} tint={0x8fd8ff} blendMode="add" />
			{/if}
			{#if !prefersReducedMotion()}
				<FxParticles
					max={100}
					onframe={(system, dt, tex) => {
						carry += (45 * dt) / 1000;
						const n = Math.floor(carry);
						if (n <= 0) return;
						carry -= n;
						system.spawn({
							texture: tex('fx_spark'),
							x: 0,
							y: PANEL_SIZES.width * 0.12,
							spreadX: PANEL_SIZES.width * 0.4,
							count: n,
							angle: -Math.PI / 2,
							cone: 1.2,
							speed: [120, 380],
							gravity: -40,
							drag: 0.4,
							life: [900, 1600],
							size: [10, 22],
							tint: [0x3fb6ff, 0xa8e4ff, 0xffffff],
							alignToVelocity: true,
							stretch: 2,
						});
					}}
				/>
			{/if}
		</Container>
		<Container x={PANEL_SIZES.width * 0.5} y={PANEL_SIZES.height * 0.4} scale={scale.current}>
			<Sprite anchor={0.5} key={hasOwnFrame ? 'bigwin_frame' : 'banner_frame'} width={PANEL_SIZES.width * (hasOwnFrame ? 1 : 0.9)} height={PANEL_SIZES.width * (hasOwnFrame ? 0.4 : 0.55)} />
			{@render props.children({ sizes: BACKGROUND_SIZES })}
		</Container>
	</Container>
</MainContainer>
