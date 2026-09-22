<script lang="ts">
	/**
	 * Real-asset replacement for SymbolSpine's wild/scatter states
	 * (previously wild_dynamite/scatter_spin/scatter_win Spine animations).
	 * Two layered sprites (body + aura) animated in code per
	 * ANIMATION_SPEC.md section 3:
	 *   - mode "idle"  (static/spin state): aura rotates slowly, loops.
	 *   - mode "land":  quick squash 1.1 -> 0.95 -> 1, then oncomplete.
	 *   - mode "win":   scale pulse + glow on top of the idle aura rotation.
	 */
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Container, Sprite } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	type Mode = 'idle' | 'land' | 'win';

	type Props = {
		x?: number;
		y?: number;
		bodyKey: string;
		auraKey: string;
		sizeRatios: { width: number; height: number };
		mode: Mode;
		loop?: boolean;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const width = $derived(SYMBOL_SIZE * props.sizeRatios.width);
	const height = $derived(SYMBOL_SIZE * props.sizeRatios.height);
	const auraCfg = ANIMATION_CONFIG.symbolIdleAura;
	const winCfg = ANIMATION_CONFIG.symbolWin;
	const landCfg = ANIMATION_CONFIG.symbolLand;

	const glow = new GlowFilter({
		color: winCfg.glowColor,
		outerStrength: winCfg.glowOuterStrength,
		innerStrength: winCfg.glowInnerStrength,
	});

	const bodyScale = new Tween(1, { easing: sineInOut });
	let auraRotation = $state(0);
	let running = true;
	let rafId: number | null = null;
	let lastTs = 0;

	const runAuraRotation = (ts: number) => {
		if (!running) return;
		if (lastTs) auraRotation += auraCfg.rotationRadPerSec * ((ts - lastTs) / 1000);
		lastTs = ts;
		rafId = requestAnimationFrame(runAuraRotation);
	};

	const runWinPulse = async () => {
		while (running) {
			await bodyScale.set(winCfg.scaleTo, { duration: winCfg.loopDurationMs / 2 });
			if (!running) break;
			await bodyScale.set(winCfg.scaleFrom, { duration: winCfg.loopDurationMs / 2 });
		}
	};

	const runLandSquash = async () => {
		await bodyScale.set(landCfg.squashFrom, { duration: landCfg.durationMs / 2 });
		await bodyScale.set(landCfg.squashTo, { duration: landCfg.durationMs / 2 });
		await bodyScale.set(landCfg.settleTo, { duration: landCfg.durationMs / 2 });
		props.oncomplete?.();
	};

	$effect(() => {
		running = true;
		lastTs = 0;

		if (prefersReducedMotion()) {
			props.oncomplete?.();
			return () => {
				running = false;
			};
		}

		if (props.mode === 'idle' || props.mode === 'win') {
			rafId = requestAnimationFrame(runAuraRotation);
		}
		if (props.mode === 'win') {
			runWinPulse();
			if (!props.loop) {
				bodyScale
					.set(winCfg.scaleTo, { duration: winCfg.loopDurationMs / 2 })
					.then(() => bodyScale.set(winCfg.scaleFrom, { duration: winCfg.loopDurationMs / 2 }))
					.then(() => props.oncomplete?.());
			}
		} else if (props.mode === 'land') {
			runLandSquash();
		}

		return () => {
			running = false;
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
	});
</script>

<Container x={props.x} y={props.y} scale={bodyScale.current}>
	<Container rotation={auraRotation}>
		<Sprite anchor={0.5} key={props.auraKey} width={width * 1.3} height={height * 1.3} />
	</Container>
	<Sprite anchor={0.5} key={props.bodyKey} {width} {height} filters={props.mode === 'win' ? [glow] : []} />
</Container>
