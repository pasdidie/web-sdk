<script lang="ts">
	import { onMount } from 'svelte';
	import { Container, Graphics, Sprite } from 'pixi-svelte';
	import { FadeContainer, LoadingProgress } from 'components-pixi';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';
	import TransitionAnimation from './TransitionAnimationSprite.svelte';
	import PressToContinue from './PressToContinue.svelte';

	type Props = {
		onloaded: () => void;
	};

	const TITLE_HERO_ASPECT_RATIO = 1792 / 2400;
	const TITLE_HERO_HEIGHT = 420;
	// Slow idle bob + breathing scale so the mascot doesn't sit frozen while
	// the player reads the title screen -- continuous sine, same raf-driven
	// approach used for the aura idle rotation (see DECISIONS.md: chained
	// Tweens ping-ponging read as less smooth than a single sine wave).
	const HERO_BOB_PX = 8;
	const HERO_BOB_PERIOD_MS = 3200;
	const HERO_BREATH_SCALE = 0.02;

	const props: Props = $props();
	const context = getContext();
	// Only mount a Sprite once its texture is loaded (avoids load-time
	// 'key not found in loadedAssets' console errors).
	const hasAsset = (key: string) => !!context.stateApp?.loadedAssets?.[key];

	let loadingType = $state<'start' | 'transition'>('start');
	let heroBobY = $state(0);
	let heroScale = $state(1);

	onMount(() => {
		if (prefersReducedMotion()) return;
		let rafId = requestAnimationFrame(function tick(ts) {
			const phase = (ts / HERO_BOB_PERIOD_MS) * Math.PI * 2;
			heroBobY = Math.sin(phase) * HERO_BOB_PX;
			heroScale = 1 + Math.sin(phase) * HERO_BREATH_SCALE;
			rafId = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(rafId);
	});
</script>

<!-- logo and loading progress -->
<FadeContainer show={loadingType === 'start'}>
	<MainContainer>
		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.5}
		>
			<Container y={heroBobY} scale={heroScale}>
				{#if hasAsset('title_hero')}
				<Sprite
					key="title_hero"
					anchor={0.5}
					width={TITLE_HERO_HEIGHT * TITLE_HERO_ASPECT_RATIO}
					height={TITLE_HERO_HEIGHT}
				/>
				{/if}
			</Container>
			{#if !context.stateApp.loaded}
				<LoadingProgress y={250} width={320} height={18}>
					{#snippet background(sizes)}
						<Graphics
							draw={(g) => {
								g.clear();
								g.roundRect(0, 0, sizes.width, sizes.height, sizes.height / 2).fill({ color: 0x05080e, alpha: 0.9 });
							}}
						/>
					{/snippet}
					{#snippet progress(sizes)}
						<Graphics
							draw={(g) => {
								g.clear();
								g.roundRect(3, 3, sizes.width - 6, sizes.height - 6, (sizes.height - 6) / 2).fill({ color: 0x3fb6ff });
								g.roundRect(3, 3, sizes.width - 6, (sizes.height - 6) * 0.45, (sizes.height - 6) / 2).fill({ color: 0xbfeaff, alpha: 0.45 });
							}}
						/>
					{/snippet}
					{#snippet frame(sizes)}
						<Graphics
							draw={(g) => {
								g.clear();
								g.roundRect(0, 0, sizes.width, sizes.height, sizes.height / 2).stroke({ color: 0xc8a25a, width: 2.5, alpha: 0.9 });
							}}
						/>
					{/snippet}
				</LoadingProgress>
			{/if}
		</Container>
	</MainContainer>
</FadeContainer>

<!-- press to continue -->
<FadeContainer show={loadingType === 'start' && context.stateApp.loaded}>
	<PressToContinue onpress={() => (loadingType = 'transition')} />
</FadeContainer>

<!-- transition between the loading screen and the game -->
<FadeContainer show={loadingType === 'transition'}>
	<TransitionAnimation oncomplete={props.onloaded} />
</FadeContainer>
