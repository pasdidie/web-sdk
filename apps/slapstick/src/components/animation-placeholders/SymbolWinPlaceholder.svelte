<script lang="ts">
	/**
	 * Placeholder for the "win" state of a symbol (ANIMATION_SPEC.md §3,
	 * "Gain": scale pulse 1 -> 1.12 -> 1 loop + glow + sweeping highlight).
	 * Colored rectangle stands in for the real symbol sprite until Phase 4
	 * wires in the real assets - swap the <Rectangle> for a <Sprite> with the
	 * same Container/Tween/filters wiring.
	 */
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Container, Rectangle, Graphics } from 'pixi-svelte';

	import { ANIMATION_CONFIG, prefersReducedMotion } from '../../game/animationConfig';

	type Props = {
		x?: number;
		y?: number;
		size?: number;
		color?: number;
		loop?: boolean;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const size = $derived(props.size ?? 150);
	const cfg = ANIMATION_CONFIG.symbolWin;

	const glow = new GlowFilter({
		color: cfg.glowColor,
		outerStrength: cfg.glowOuterStrength,
		innerStrength: cfg.glowInnerStrength,
	});

	const scale = new Tween(1, { easing: sineInOut, duration: cfg.loopDurationMs / 2 });
	const sweepX = new Tween(-cfg.sweepWidthRatio * size, {
		easing: sineInOut,
		duration: cfg.sweepDurationMs,
	});

	let running = true;

	const runPulseLoop = async () => {
		while (running) {
			await scale.set(cfg.scaleTo);
			if (!running) break;
			await scale.set(cfg.scaleFrom);
		}
	};

	const runSweepLoop = async () => {
		while (running) {
			await sweepX.set(-cfg.sweepWidthRatio * size, { duration: 0 });
			await sweepX.set(size * (1 + cfg.sweepWidthRatio), { duration: cfg.sweepDurationMs });
		}
	};

	$effect(() => {
		running = true;
		if (prefersReducedMotion()) {
			// Static win indication only: glow stays, no motion/flash.
			props.oncomplete?.();
			return () => {
				running = false;
			};
		}

		runPulseLoop();
		runSweepLoop();

		if (!props.loop) {
			// Fire oncomplete after one full pulse so callers using loop=false
			// (single "land on win" flash) can transition state, matching the
			// Spine `complete` listener contract used elsewhere.
			scale.set(cfg.scaleTo).then(() => scale.set(cfg.scaleFrom)).then(() => props.oncomplete?.());
		}

		return () => {
			running = false;
		};
	});
</script>

<Container x={props.x} y={props.y} scale={scale.current}>
	<Rectangle
		anchor={0.5}
		width={size}
		height={size}
		borderRadius={12}
		backgroundColor={props.color ?? 0xd4af37}
		filters={[glow]}
	/>
	<Graphics isMask draw={(g) => g.rect(-size / 2, -size / 2, size, size).fill(0xffffff)} />
	<Rectangle
		anchor={0.5}
		x={sweepX.current - size / 2}
		width={size * cfg.sweepWidthRatio}
		height={size * 1.4}
		rotation={0.4}
		backgroundColor={0xffffff}
		backgroundAlpha={0.35}
	/>
</Container>
