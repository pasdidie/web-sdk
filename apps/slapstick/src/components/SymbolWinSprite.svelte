<script lang="ts">
	/**
	 * Win state of the single-layer symbols (H1-H3, L1-L3): the symbol steps
	 * into the spotlight. A soft lamp halo (lightTextures.ts) fades in behind
	 * it, the symbol pops in with a springy overshoot, then breathes and rocks
	 * gently while the line is shown; the losing symbols are dimmed elsewhere
	 * (symbolDim), so the contrast does the highlighting.
	 * Replaced the original glow outline + diagonal white sweep: on square
	 * Gemini art they traced the card's edges and read as a cheap effect.
	 * One rAF clock drives everything (no chained tweens, no filters).
	 */
	import { BaseSprite, Container, Sprite } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';
	import { getHaloTexture } from '../game/lightTextures';

	type Props = {
		x?: number;
		y?: number;
		assetKey: string;
		sizeRatios: { width: number; height: number };
		loop?: boolean;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const width = $derived(SYMBOL_SIZE * props.sizeRatios.width);
	const height = $derived(SYMBOL_SIZE * props.sizeRatios.height);
	const cfg = ANIMATION_CONFIG.symbolWin;
	const halo = getHaloTexture();

	let t = $state(0); // seconds since the win started

	$effect(() => {
		const loop = props.loop;
		t = 0;
		if (prefersReducedMotion()) {
			t = 1;
			props.oncomplete?.();
			return;
		}
		let running = true;
		let done = false;
		let last = 0;
		let frame = requestAnimationFrame(function tick(ts) {
			if (!running) return;
			t += last ? Math.min((ts - last) / 1000, 0.05) : 0;
			last = ts;
			if (!loop && !done && t * 1000 >= cfg.loopDurationMs * 1.5) {
				done = true;
				props.oncomplete?.();
			}
			frame = requestAnimationFrame(tick);
		});
		return () => {
			running = false;
			cancelAnimationFrame(frame);
		};
	});

	// Entry: damped spring 0 -> 1 with one soft overshoot (~350ms).
	const entry = $derived(1 - Math.exp(-t * 9) * Math.cos(t * 13));
	// Then a slow breath (one cycle per loopDurationMs * 2).
	const breath = $derived((1 - Math.cos((t * 1000 * Math.PI) / cfg.loopDurationMs)) / 2);

	const bodyScale = $derived(1 + (cfg.scaleTo - 1) * (0.6 * entry + 0.4 * breath));
	const bodyRotation = $derived(Math.sin((t * 1000 * Math.PI) / cfg.loopDurationMs) * 0.03 * Math.min(1, t * 3));
	const haloAlpha = $derived(Math.min(1, t * 4) * (0.35 + breath * 0.25));
	const haloScale = $derived(1.2 + breath * 0.12);
</script>

<Container x={props.x} y={props.y}>
	<BaseSprite
		texture={halo}
		anchor={0.5}
		width={width * haloScale}
		height={height * haloScale}
		alpha={haloAlpha}
		blendMode="add"
	/>
	<Container scale={bodyScale} rotation={bodyRotation}>
		<Sprite anchor={0.5} key={props.assetKey} {width} {height} />
	</Container>
</Container>
