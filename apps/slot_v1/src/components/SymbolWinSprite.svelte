<script lang="ts">
	/**
	 * Real-asset replacement for SymbolSpine's "win" state on single-layer
	 * symbols (H1-H4, L1-L5): scale pulse + glow + sweeping highlight over the
	 * static symbol art, per ANIMATION_SPEC.md section 3 ("Gain"). See
	 * animation-placeholders/SymbolWinPlaceholder.svelte for the prototype
	 * this was adapted from (same tween/mask approach, real Sprite instead of
	 * a colored Rectangle).
	 */
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Container, Sprite, Graphics, Rectangle } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

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

	const glow = new GlowFilter({
		color: cfg.glowColor,
		outerStrength: cfg.glowOuterStrength,
		innerStrength: cfg.glowInnerStrength,
	});

	const scale = new Tween(1, { easing: sineInOut, duration: cfg.loopDurationMs / 2 });
	const sweepX = new Tween(0, { easing: sineInOut, duration: cfg.sweepDurationMs });

	let running = true;
	let pulseRafId: number | null = null;
	let pulseStartTs = 0;

	// Continuous sine wave instead of two chained eased Tweens ping-ponging
	// between scaleFrom/scaleTo: chaining introduces a resync/microtask gap
	// at every turnaround (visible as a tiny stutter), where a single sine
	// has a continuous derivative throughout the loop -- same raf-driven
	// approach already used for the aura idle rotation in SymbolAuraSprite.
	const runPulseLoop = (ts: number) => {
		if (!running) return;
		if (!pulseStartTs) pulseStartTs = ts;
		const elapsed = ts - pulseStartTs;
		const phase = (elapsed / cfg.loopDurationMs) * Math.PI * 2;
		const amplitude = (cfg.scaleTo - cfg.scaleFrom) / 2;
		const mid = (cfg.scaleTo + cfg.scaleFrom) / 2;
		scale.set(mid - amplitude * Math.cos(phase), { duration: 0 });
		pulseRafId = requestAnimationFrame(runPulseLoop);
	};

	const runSweepLoop = async () => {
		while (running) {
			await sweepX.set(-cfg.sweepWidthRatio * width, { duration: 0 });
			await sweepX.set(width * (1 + cfg.sweepWidthRatio), { duration: cfg.sweepDurationMs });
		}
	};

	$effect(() => {
		running = true;
		pulseStartTs = 0;
		if (prefersReducedMotion()) {
			props.oncomplete?.();
			return () => {
				running = false;
			};
		}

		runSweepLoop();

		// Sustained display (part of an active win line): continuous raf pulse.
		// Single flash (e.g. a one-off highlight): the original one-shot Tween,
		// which previously ran *concurrently* with the loop below and fought
		// it for control of `scale` -- that double-write was part of why this
		// read as not-smooth.
		if (props.loop) {
			pulseRafId = requestAnimationFrame(runPulseLoop);
		} else {
			scale.set(cfg.scaleTo).then(() => scale.set(cfg.scaleFrom)).then(() => props.oncomplete?.());
		}

		return () => {
			running = false;
			if (pulseRafId !== null) cancelAnimationFrame(pulseRafId);
		};
	});
</script>

<Container x={props.x} y={props.y} scale={scale.current}>
	<Sprite anchor={0.5} key={props.assetKey} {width} {height} filters={[glow]} />
	<Graphics isMask draw={(g) => g.rect(-width / 2, -height / 2, width, height).fill(0xffffff)} />
	<Rectangle
		anchor={0.5}
		x={sweepX.current - width / 2}
		width={width * cfg.sweepWidthRatio}
		height={height * 1.4}
		rotation={0.4}
		backgroundColor={0xffffff}
		backgroundAlpha={0.35}
	/>
</Container>
