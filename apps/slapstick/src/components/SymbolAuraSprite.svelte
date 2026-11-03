<script lang="ts">
	/**
	 * Wild (top hat) and Scatter (projector): the symbol art over a soft lamp
	 * halo (lightTextures.ts), all motion driven by one rAF clock.
	 *   - mode "idle": halo breathes; the projector lamp flickers, the hat sways.
	 *   - mode "land": quick squash 1.1 -> 0.95 -> 1, then oncomplete.
	 *   - mode "win":  projector rattles and throws its beam; the hat hops and
	 *                  tips; halo brightens (no glow outline: same
	 *                  spotlight language as SymbolWinSprite). One cycle, or looped.
	 */
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { BaseSprite, Container, Sprite } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';
	import { getBeamTexture, getHaloTexture } from '../game/lightTextures';

	type Mode = 'idle' | 'land' | 'win';

	type Props = {
		x?: number;
		y?: number;
		bodyKey: string;
		motion: 'hat' | 'projector';
		sizeRatios: { width: number; height: number };
		mode: Mode;
		loop?: boolean;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const width = $derived(SYMBOL_SIZE * props.sizeRatios.width);
	const height = $derived(SYMBOL_SIZE * props.sizeRatios.height);
	const winCfg = ANIMATION_CONFIG.symbolWin;
	const landCfg = ANIMATION_CONFIG.symbolLand;
	const WIN_CYCLE_MS = 900;
	// Projector lens on sym_S_body, relative to the symbol centre (fraction of width).
	const LENS = { x: 0.2, y: 0.03 };

	const halo = getHaloTexture();
	const beam = getBeamTexture();

	const landScale = new Tween(1, { easing: sineInOut });
	let t = $state(0); // seconds since the mode started
	let flicker = $state(1); // lamp intensity noise, eased random walk

	const runLandSquash = async () => {
		await landScale.set(landCfg.squashFrom, { duration: landCfg.durationMs / 2 });
		await landScale.set(landCfg.squashTo, { duration: landCfg.durationMs / 2 });
		await landScale.set(landCfg.settleTo, { duration: landCfg.durationMs / 2 });
		props.oncomplete?.();
	};

	$effect(() => {
		const mode = props.mode;
		const loop = props.loop;
		t = 0;

		if (prefersReducedMotion()) {
			props.oncomplete?.();
			return;
		}
		if (mode === 'land') runLandSquash();

		let running = true;
		let done = false;
		let last = 0;
		let rafId = requestAnimationFrame(function tick(ts) {
			if (!running) return;
			const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
			last = ts;
			t += dt;
			flicker += ((0.75 + Math.random() * 0.25) - flicker) * Math.min(1, dt * 18);
			if (mode === 'win' && !loop && !done && t * 1000 >= WIN_CYCLE_MS) {
				done = true;
				props.oncomplete?.();
			}
			rafId = requestAnimationFrame(tick);
		});
		return () => {
			running = false;
			cancelAnimationFrame(rafId);
		};
	});

	const winning = $derived(props.mode === 'win' && (props.loop || t * 1000 < WIN_CYCLE_MS));
	// 0 -> 1 -> 0 over each win cycle
	const winWave = $derived(winning ? Math.sin(((t * 1000) / WIN_CYCLE_MS) * Math.PI) ** 2 : 0);

	const haloAlpha = $derived(
		props.motion === 'projector'
			? (0.38 + winWave * 0.5) * flicker
			: 0.32 + Math.sin(t * 2) * 0.06 + winWave * 0.45,
	);
	const haloScale = $derived(1.25 + winWave * 0.3);

	// Hat: idle sway; win = hop with a tip of the brim.
	const hatY = $derived(props.motion === 'hat' && winning ? -Math.abs(Math.sin((t * 1000 * Math.PI) / WIN_CYCLE_MS)) * height * 0.14 : 0);
	const hatRotation = $derived(
		props.motion !== 'hat' ? 0 : winning ? Math.sin((t * 1000 * Math.PI * 2) / WIN_CYCLE_MS) * 0.14 : Math.sin(t * 1.6) * 0.035,
	);
	// Projector: rattles while it runs (win).
	const rattle = $derived(props.motion === 'projector' && winning ? Math.sin(t * 46) * 0.035 : 0);
	const rattleY = $derived(props.motion === 'projector' && winning ? Math.sin(t * 61) * height * 0.012 : 0);
	const bodyScale = $derived(landScale.current * (1 + winWave * (winCfg.scaleTo - 1)));
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
	{#if props.motion === 'projector' && winning}
		<BaseSprite
			texture={beam}
			anchor={{ x: 0, y: 0.5 }}
			x={width * LENS.x}
			y={height * LENS.y}
			width={width * 1.4}
			height={height * 0.9}
			alpha={winWave * flicker}
			blendMode="add"
		/>
	{/if}
	<Container y={hatY + rattleY} rotation={hatRotation + rattle} scale={bodyScale}>
		<Sprite anchor={0.5} key={props.bodyKey} {width} {height} />
	</Container>
</Container>
