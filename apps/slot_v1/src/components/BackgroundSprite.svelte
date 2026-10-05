<script lang="ts">
	/**
	 * Real-asset replacement for Background.svelte (Spine demo art). Layers
	 * our own bg_{base,free}_{far,mid,near}.png with a slow parallax drift on
	 * mid/near, per ANIMATION_SPEC.md section 3 "Ambiance: Parallaxe".
	 */
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	const context = getContext();
	const showBase = $derived(context.stateGame.gameType === 'basegame');
	const showFree = $derived(context.stateGame.gameType === 'freegame');
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const cfg = ANIMATION_CONFIG.parallax;

	const midX = new Tween(0, { easing: sineInOut, duration: 6000 });
	const nearX = new Tween(0, { easing: sineInOut, duration: 4000 });

	let running = true;

	const runDrift = async (tween: Tween<number>) => {
		while (running) {
			await tween.set(cfg.driftRangePx);
			if (!running) break;
			await tween.set(-cfg.driftRangePx);
		}
	};

	$effect(() => {
		running = true;
		if (!prefersReducedMotion()) {
			runDrift(midX);
			runDrift(nearX);
		}
		return () => {
			running = false;
		};
	});

	const overWidth = $derived(canvas.width * 1.1);
</script>

<Rectangle {...canvas} backgroundColor={0x000000} zIndex={-3} />

<FadeContainer show={showBase} duration={SECOND} zIndex={-2}>
	<Sprite anchor={0.5} x={canvas.width / 2} y={canvas.height / 2} width={canvas.width} height={canvas.height} key="bg_base_far" />
	<Sprite anchor={0.5} x={canvas.width / 2 + midX.current} y={canvas.height / 2} width={overWidth} height={canvas.height} key="bg_base_mid" />
	<Sprite anchor={0.5} x={canvas.width / 2 + nearX.current} y={canvas.height / 2} width={overWidth} height={canvas.height} key="bg_base_near" />
</FadeContainer>

<FadeContainer show={showFree} duration={SECOND} zIndex={-1}>
	<Sprite anchor={0.5} x={canvas.width / 2} y={canvas.height / 2} width={canvas.width} height={canvas.height} key="bg_free_far" />
	<Sprite anchor={0.5} x={canvas.width / 2 + midX.current} y={canvas.height / 2} width={overWidth} height={canvas.height} key="bg_free_mid" />
	<Sprite anchor={0.5} x={canvas.width / 2 + nearX.current} y={canvas.height / 2} width={overWidth} height={canvas.height} key="bg_free_near" />
</FadeContainer>
