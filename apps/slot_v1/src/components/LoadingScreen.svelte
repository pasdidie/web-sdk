<script lang="ts">
	import { onMount } from 'svelte';
	import { Container, Sprite } from 'pixi-svelte';
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
				<Sprite
					key="title_hero"
					anchor={0.5}
					width={TITLE_HERO_HEIGHT * TITLE_HERO_ASPECT_RATIO}
					height={TITLE_HERO_HEIGHT}
				/>
			</Container>
			{#if !context.stateApp.loaded}
				<LoadingProgress y={250} width={1967 * 0.2} height={346 * 0.2}>
					{#snippet background(sizes)}
						<Sprite key="progressBarBackground.png" {...sizes} />
					{/snippet}
					{#snippet progress(sizes)}
						<Sprite key="progressBar.png" {...sizes} />
					{/snippet}
					{#snippet frame(sizes)}
						<Sprite key="progressBarFrame.png" {...sizes} />
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
