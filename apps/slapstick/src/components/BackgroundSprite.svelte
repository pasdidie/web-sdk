<script lang="ts">
	/**
	 * Picture-palace backdrop: bg_theatre (base game) and bg_free (gala night,
	 * free spins), cover-fitted to the canvas so the art keeps its ratio.
	 * Portrait layouts use bg_theatre_portrait for the base game. A very slow
	 * push-in keeps the still image alive without competing with the reels.
	 */
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';

	const context = getContext();
	const showBase = $derived(context.stateGame.gameType === 'basegame');
	const showFree = $derived(context.stateGame.gameType === 'freegame');
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');

	const LANDSCAPE_RATIO = 1376 / 768;
	const PORTRAIT_RATIO = 768 / 1376;

	const cover = (ratio: number) => {
		const byWidth = { width: canvas.width, height: canvas.width / ratio };
		return byWidth.height >= canvas.height ? byWidth : { width: canvas.height * ratio, height: canvas.height };
	};

	const zoom = new Tween(1, { easing: sineInOut, duration: 20 * SECOND });
	let running = true;
	$effect(() => {
		running = true;
		if (!prefersReducedMotion()) {
			(async () => {
				while (running) {
					await zoom.set(1.04);
					if (!running) break;
					await zoom.set(1);
				}
			})();
		}
		return () => {
			running = false;
		};
	});

	const baseKey = $derived(portrait ? 'bg_theatre_portrait' : 'bg_theatre');
	const baseSize = $derived(cover(portrait ? PORTRAIT_RATIO : LANDSCAPE_RATIO));
	const freeSize = $derived(cover(LANDSCAPE_RATIO));
</script>

<Rectangle {...canvas} backgroundColor={0x0d0d0d} zIndex={-3} />

<FadeContainer show={showBase} duration={SECOND} zIndex={-2}>
	<Sprite
		key={baseKey}
		anchor={0.5}
		x={canvas.width / 2}
		y={canvas.height / 2}
		width={baseSize.width * zoom.current}
		height={baseSize.height * zoom.current}
	/>
</FadeContainer>

<FadeContainer show={showFree} duration={SECOND} zIndex={-1}>
	<Sprite
		key="bg_free"
		anchor={0.5}
		x={canvas.width / 2}
		y={canvas.height / 2}
		width={freeSize.width * zoom.current}
		height={freeSize.height * zoom.current}
	/>
</FadeContainer>
