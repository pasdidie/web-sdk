<script lang="ts">
	/**
	 * Placeholder for Wild/Scatter idle state (ANIMATION_SPEC.md §3, "Idle":
	 * aura rotating slowly or pulsing opacity 0.6-1, 2-3s loop). Two colored
	 * shapes stand in for the real sym_{W,S}_body.png / sym_{W,S}_aura.png
	 * layers - swap for Sprites with the same two-layer Container wiring.
	 */
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { Container, Circle } from 'pixi-svelte';

	import { ANIMATION_CONFIG, prefersReducedMotion } from '../../game/animationConfig';

	type Props = {
		x?: number;
		y?: number;
		size?: number;
		bodyColor?: number;
		auraColor?: number;
		auraMode?: 'rotate' | 'pulse';
	};

	const props: Props = $props();
	const size = $derived(props.size ?? 150);
	const cfg = ANIMATION_CONFIG.symbolIdleAura;
	const mode = $derived(props.auraMode ?? 'rotate');

	const opacity = new Tween(cfg.opacityMax, { easing: sineInOut, duration: cfg.pulseDurationMs / 2 });
	let rotation = $state(0);
	let running = true;
	let rafId: number | null = null;
	let lastTs = 0;

	const runOpacityLoop = async () => {
		while (running) {
			await opacity.set(cfg.opacityMin);
			if (!running) break;
			await opacity.set(cfg.opacityMax);
		}
	};

	const runRotationLoop = (ts: number) => {
		if (!running) return;
		if (lastTs) {
			const dtSec = (ts - lastTs) / 1000;
			rotation += cfg.rotationRadPerSec * dtSec;
		}
		lastTs = ts;
		rafId = requestAnimationFrame(runRotationLoop);
	};

	$effect(() => {
		running = true;
		if (prefersReducedMotion()) {
			return () => {
				running = false;
			};
		}

		if (mode === 'pulse') {
			runOpacityLoop();
		} else {
			rafId = requestAnimationFrame(runRotationLoop);
		}

		return () => {
			running = false;
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
	});
</script>

<Container x={props.x} y={props.y}>
	<Container rotation={mode === 'rotate' ? rotation : 0} alpha={mode === 'pulse' ? opacity.current : 1}>
		<Circle
			anchor={0.5}
			diameter={size * 1.4}
			backgroundColor={props.auraColor ?? 0x66ccff}
			backgroundAlpha={0.5}
		/>
	</Container>
	<Circle anchor={0.5} diameter={size} backgroundColor={props.bodyColor ?? 0xffffff} />
</Container>
