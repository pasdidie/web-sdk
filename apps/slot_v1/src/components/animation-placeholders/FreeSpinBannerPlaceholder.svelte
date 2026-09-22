<script lang="ts">
	/**
	 * Placeholder for free spins intro/outro/retrigger banners
	 * (ANIMATION_SPEC.md §3, "Free spins"). Colored rounded rectangle stands
	 * in for banner_frame.png; real copy comes from i18n at integration time
	 * (no text baked into images, per spec §1.4).
	 */
	import { Tween } from 'svelte/motion';
	import { backOut, sineIn } from 'svelte/easing';
	import { Container, Rectangle, Text } from 'pixi-svelte';

	import { ANIMATION_CONFIG, prefersReducedMotion } from '../../game/animationConfig';

	type Kind = 'intro' | 'outro' | 'retrigger';

	type Props = {
		x?: number;
		y?: number;
		kind: Kind;
		title: string;
		subtitle?: string;
		holdDurationMs?: number;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const cfg = ANIMATION_CONFIG.freeSpins;
	const isRetrigger = $derived(props.kind === 'retrigger');

	const introMs = $derived(isRetrigger ? cfg.retriggerPopDurationMs : cfg.introDurationMs);
	const outroMs = $derived(props.kind === 'outro' ? cfg.outroDurationMs : cfg.retriggerPopDurationMs);
	const holdMs = $derived(props.holdDurationMs ?? (isRetrigger ? 900 : 1600));

	const scale = new Tween(0, { easing: backOut, duration: introMs });
	const alpha = new Tween(0, { duration: introMs });

	$effect(() => {
		if (prefersReducedMotion()) {
			scale.set(1, { duration: 0 });
			alpha.set(1, { duration: 0 });
			const t = setTimeout(() => props.oncomplete?.(), holdMs);
			return () => clearTimeout(t);
		}

		let cancelled = false;
		(async () => {
			await Promise.all([scale.set(1), alpha.set(1)]);
			if (cancelled) return;
			await new Promise((r) => setTimeout(r, holdMs));
			if (cancelled) return;
			await Promise.all([
				scale.set(isRetrigger ? 1 : 0, { duration: outroMs, easing: sineIn }),
				alpha.set(isRetrigger ? 1 : 0, { duration: outroMs }),
			]);
			if (!cancelled) props.oncomplete?.();
		})();

		return () => {
			cancelled = true;
		};
	});
</script>

<Container x={props.x} y={props.y} scale={scale.current} alpha={alpha.current}>
	<Rectangle
		anchor={0.5}
		width={isRetrigger ? 320 : 560}
		height={isRetrigger ? 120 : 200}
		borderRadius={18}
		backgroundColor={0x1a2a4a}
		borderColor={0x66ccff}
		borderWidth={4}
	/>
	<Text
		anchor={0.5}
		y={props.subtitle ? -20 : 0}
		text={props.title}
		style={{ fill: 0x66ccff, fontSize: isRetrigger ? 32 : 40, fontWeight: 'bold' }}
	/>
	{#if props.subtitle}
		<Text anchor={0.5} y={30} text={props.subtitle} style={{ fill: 0xffffff, fontSize: 24 }} />
	{/if}
</Container>
