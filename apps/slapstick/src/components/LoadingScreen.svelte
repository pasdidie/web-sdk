<script lang="ts">
	import { onMount } from 'svelte';
	import { Container, Sprite } from 'pixi-svelte';
	import { FadeContainer, LoadingProgress } from 'components-pixi';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';
	import TransitionAnimation from './TransitionAnimationSprite.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import IntroPanels from './IntroPanels.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	type Props = {
		onloaded: () => void;
	};

	const TITLE_HERO_ASPECT_RATIO = 1200 / 397; // title_logo.png (SLAPSTICK wordmark)
	const TITLE_HERO_HEIGHT = 260;
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

	// Once loaded, the title rises to make room for the feature cards.
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const titleRise = new Tween(0, { duration: 700, easing: cubicInOut });
	$effect(() => {
		titleRise.set(context.stateApp.loaded ? 1 : 0, { duration: prefersReducedMotion() ? 0 : 700 });
	});
	const mainHeight = $derived(context.stateLayoutDerived.mainLayout().height);
	const titleY = $derived(mainHeight * (0.5 - titleRise.current * (portrait ? 0.33 : 0.27)));
	const titleScale = $derived(1 - titleRise.current * 0.3);

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
			y={titleY}
		>
			<Container y={heroBobY} scale={heroScale * titleScale}>
				<Sprite
					key="title_logo"
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

<!-- feature cards + press to continue -->
<FadeContainer show={loadingType === 'start' && context.stateApp.loaded}>
	{#if context.stateApp.loaded}
		<MainContainer>
			<IntroPanels
				x={context.stateLayoutDerived.mainLayout().width * 0.5}
				y={mainHeight * 0.6}
				vertical={portrait}
			/>
		</MainContainer>
	{/if}
	<PressToContinue onpress={() => (loadingType = 'transition')} />
</FadeContainer>

<!-- transition between the loading screen and the game -->
<FadeContainer show={loadingType === 'transition'}>
	<TransitionAnimation oncomplete={props.onloaded} onfinish={() => {}} />
</FadeContainer>
