<script lang="ts">
	/**
	 * Real-asset replacement for WinAnimation.svelte (Spine big-win banner).
	 * Same external contract (animationMap kept for prop-compatibility with
	 * Win.svelte/winLevelMap.ts even though the sprite version doesn't need
	 * named Spine animations) so Win.svelte only needed an import swap.
	 * Intro zoom-in -> idle pulse+glow loop, per ANIMATION_SPEC.md "Big win".
	 * banner_frame.png stands in until a dedicated big-win frame asset exists.
	 */
	import type { Snippet } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut, sineInOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Container, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	type Props = {
		animationMap: unknown;
		children: Snippet;
	};

	const props: Props = $props();
	const context = getContext();
	const cfg = ANIMATION_CONFIG.bigWin;

	const bannerWidth = $derived(context.stateGameDerived.boardLayout().width * 0.85);
	const bannerHeight = $derived(bannerWidth * 0.4);

	const scale = new Tween(0, { easing: backOut, duration: cfg.introDurationMs });
	const glowStrength = new Tween(1, { easing: sineInOut, duration: 900 });

	const glow = new GlowFilter({ color: 0xffd700, outerStrength: glowStrength.current, innerStrength: 0.5 });

	let running = true;

	const runIdleGlowLoop = async () => {
		while (running) {
			await glowStrength.set(3);
			if (!running) break;
			await glowStrength.set(1);
		}
	};

	$effect(() => {
		running = true;
		if (prefersReducedMotion()) {
			scale.set(1, { duration: 0 });
			return () => {
				running = false;
			};
		}
		scale.set(1).then(() => runIdleGlowLoop());
		return () => {
			running = false;
		};
	});

	$effect(() => {
		glow.outerStrength = glowStrength.current;
	});
</script>

<Container
	x={context.stateGameDerived.boardLayout().x + context.stateGameDerived.boardLayout().width / 2}
	y={context.stateGameDerived.boardLayout().y + context.stateGameDerived.boardLayout().height / 2}
	scale={scale.current}
>
	<Sprite anchor={0.5} key="banner_frame" width={bannerWidth} height={bannerHeight} filters={[glow]} />
	{@render props.children()}
</Container>
