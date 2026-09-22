<script lang="ts">
	/**
	 * Placeholder for the big win banner (ANIMATION_SPEC.md §3, "Big win"):
	 * zoom-in banner, counter that rolls up to the final amount, particle
	 * burst, interruptible on tap, capped at ~4s/tier. A colored rounded
	 * rectangle stands in for banner_frame.png.
	 */
	import { Tween } from 'svelte/motion';
	import { backOut, sineOut, quadIn } from 'svelte/easing';
	import { Container, Rectangle, Circle, Text } from 'pixi-svelte';

	import { ANIMATION_CONFIG, getBigWinTier, prefersReducedMotion } from '../../game/animationConfig';

	type Phase = 'intro' | 'idle' | 'outro';

	type Props = {
		x?: number;
		y?: number;
		totalWinX: number; // total win expressed in multiples of total bet
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const cfg = ANIMATION_CONFIG.bigWin;
	const tierKey = $derived(getBigWinTier(props.totalWinX));

	const BANNER_W = 520;
	const BANNER_H = 220;

	let phase = $state<Phase>('intro');
	const bannerScale = new Tween(0, { easing: backOut, duration: cfg.introDurationMs });
	const counter = new Tween(0);
	let particles = $state<{ id: number; x: number; y: number; vx: number; vy: number; alpha: number }[]>([]);

	let skipped = false;
	let rafId: number | null = null;
	let hardCapTimer: ReturnType<typeof setTimeout> | null = null;

	const spawnParticles = () => {
		const count = Math.min(24, cfg.maxSimultaneousParticles);
		particles = Array.from({ length: count }, (_, i) => {
			const angle = (i / count) * Math.PI * 2;
			const speed = 80 + Math.random() * 120;
			return {
				id: i,
				x: 0,
				y: 0,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				alpha: 1,
			};
		});

		let lastTs = 0;
		const step = (ts: number) => {
			const dt = lastTs ? (ts - lastTs) / 1000 : 0;
			lastTs = ts;
			particles = particles
				.map((p) => ({ ...p, x: p.x + p.vx * dt, y: p.y + p.vy * dt, alpha: p.alpha - dt * 0.8 }))
				.filter((p) => p.alpha > 0);
			if (particles.length > 0) rafId = requestAnimationFrame(step);
		};
		rafId = requestAnimationFrame(step);
	};

	const runSequence = async () => {
		if (prefersReducedMotion()) {
			// Show the final state immediately, no motion, no flashing particles.
			bannerScale.set(1, { duration: 0 });
			counter.set(props.totalWinX, { duration: 0 });
			await new Promise((r) => setTimeout(r, cfg.idleMinDurationMs));
			props.oncomplete?.();
			return;
		}

		phase = 'intro';
		await bannerScale.set(1);
		if (skipped) return finish();

		phase = 'idle';
		spawnParticles();
		await counter.set(props.totalWinX, { duration: cfg.counterDurationMs, easing: sineOut });
		if (skipped) return finish();

		await new Promise((r) => setTimeout(r, cfg.idleMinDurationMs));
		if (skipped) return finish();

		return finish();
	};

	const finish = async () => {
		if (hardCapTimer) clearTimeout(hardCapTimer);
		if (rafId !== null) cancelAnimationFrame(rafId);
		phase = 'outro';
		counter.set(props.totalWinX, { duration: 0 }); // snap to final value, no mid-air jump on skip
		await bannerScale.set(0, { duration: cfg.outroDurationMs, easing: quadIn });
		props.oncomplete?.();
	};

	const onTap = () => {
		if (skipped) return;
		skipped = true;
		finish();
	};

	$effect(() => {
		skipped = false;
		hardCapTimer = setTimeout(() => {
			if (!skipped) onTap();
		}, cfg.maxDurationPerTierMs);

		runSequence();

		return () => {
			if (hardCapTimer) clearTimeout(hardCapTimer);
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
	});
</script>

<Container x={props.x} y={props.y} scale={bannerScale.current} eventMode="static" cursor="pointer" onpointerup={onTap}>
	<Rectangle
		anchor={0.5}
		width={BANNER_W}
		height={BANNER_H}
		borderRadius={20}
		backgroundColor={0x2b1a4a}
		borderColor={0xffd700}
		borderWidth={4}
	/>
	<Text
		anchor={0.5}
		y={-40}
		text={tierKey.toUpperCase() + ' WIN'}
		style={{ fill: 0xffd700, fontSize: 36, fontWeight: 'bold' }}
	/>
	<Text
		anchor={0.5}
		y={30}
		text={`${counter.current.toFixed(2)}X`}
		style={{ fill: 0xffffff, fontSize: 48, fontWeight: 'bold' }}
	/>
	{#each particles as p (p.id)}
		<Circle anchor={0.5} x={p.x} y={p.y} diameter={10} backgroundColor={0xffd700} backgroundAlpha={p.alpha} />
	{/each}
</Container>
