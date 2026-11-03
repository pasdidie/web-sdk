<script lang="ts">
	/**
	 * Big-win celebration (replaces the example's Spine "bigwin" rig).
	 *
	 * Layers, back to front:
	 *   - two counter-rotating additive light-ray bursts (fx_rays), azure + gold
	 *   - impact flash + expanding shockwave rings on intro and every tier-up
	 *   - continuous spark/ember fountain from under the plaque (rate by tier)
	 *   - the plaque (bigwin_frame, falls back to banner_frame) with backOut
	 *     slam-in, breathing glow and a small screen shake on impact
	 *   - tier title (BIG / SUPER / MEGA / EPIC / MAX WIN) with its own pop
	 *   - the counting amount (children snippet from Win.svelte)
	 *
	 * Intensity scales with `tier` (1 = big ... 5 = max). Positioned around
	 * (0,0): Win.svelte already translates to the board centre.
	 */
	import type { Snippet } from 'svelte';
	import { onDestroy, onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut, cubicOut, elasticOut } from 'svelte/easing';
	import { GlowFilter } from 'pixi-filters';
	import { Container, Rectangle, Sprite, Text } from 'pixi-svelte';

	import FxParticles from './FxParticles.svelte';
	import { getContext } from '../game/context';
	import { fx } from '../game/fx';
	import { SYMBOL_SIZE } from '../game/constants';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	type Props = {
		animationMap: unknown;
		title?: string | null;
		tier?: number;
		children: Snippet;
	};

	const props: Props = $props();
	const context = getContext();
	const cfg = ANIMATION_CONFIG.bigWin;
	const reduced = prefersReducedMotion();

	const tier = $derived(Math.max(1, Math.min(5, props.tier ?? 1)));
	const hasOwnFrame = $derived(!!context.stateApp?.loadedAssets?.['bigwin_frame']);
	const bannerWidth = $derived(context.stateGameDerived.boardLayout().width * 0.95);
	const bannerHeight = $derived(bannerWidth * (hasOwnFrame ? 0.36 : 0.4));
	const raysSize = $derived(bannerWidth * (1.5 + tier * 0.18));

	const scale = new Tween(reduced ? 1 : 0, { easing: backOut, duration: cfg.introDurationMs });
	const titleScale = new Tween(reduced ? 1 : 0, { easing: elasticOut, duration: 900 });
	const flash = new Tween(0, { easing: cubicOut, duration: 380 });
	const raysAlpha = new Tween(0, { easing: cubicOut, duration: 600 });

	let time = $state(0);
	let rafId: number | null = null;
	const glow = new GlowFilter({ color: 0x3fb6ff, outerStrength: 2, innerStrength: 0.4, quality: 0.2, distance: 12 });
	onDestroy(() => {
		if (rafId !== null) cancelAnimationFrame(rafId);
		glow.destroy();
		fx.emit({ kind: 'bigWinStop' });
	});

	const impact = (strength: number) => {
		if (reduced) return;
		// flash-safety: at most one flash per tier-up, tier-ups are >= 1 s apart
		flash.set(0.55 * strength, { duration: 0 }).then(() => flash.set(0));
		fx.emit({ kind: 'shake', intensity: 6 + strength * 6, durationMs: 380 });
		rings.push({ age: 0, life: 700 }, { age: -120, life: 800 });
	};

	type Ring = { age: number; life: number };
	let rings = $state<Ring[]>([]);

	onMount(() => {
		if (reduced) return;
		raysAlpha.set(1);
		scale.set(1).then(() => titleScale.set(1));
		setTimeout(() => impact(1), cfg.introDurationMs * 0.55);
		let last = performance.now();
		const loop = (ts: number) => {
			const dt = Math.min(ts - last, 50);
			last = ts;
			time += dt;
			rings = rings
				.map((r) => ({ ...r, age: r.age + dt }))
				.filter((r) => r.age < r.life);
			const breath = 0.5 + 0.5 * Math.sin(time / 380);
			glow.outerStrength = 1.5 + 2.5 * breath;
			rafId = requestAnimationFrame(loop);
		};
		rafId = requestAnimationFrame(loop);
	});

	// Re-impact when the tier steps up mid-count (Win.svelte feeds the live tier).
	let lastTier = 0;
	$effect(() => {
		const t = tier;
		if (lastTier && t > lastTier) {
			impact(1 + (t - lastTier) * 0.3);
			titleScale.set(0.6, { duration: 0 }).then(() => titleScale.set(1));
		}
		lastTier = t;
	});

	const ringSize = (r: Ring) => {
		const t = Math.max(0, r.age) / r.life;
		return bannerWidth * (0.3 + 1.6 * (1 - Math.pow(1 - t, 3)));
	};
	const ringAlpha = (r: Ring) => (r.age < 0 ? 0 : 1 - r.age / r.life);

	const emberRate = $derived(30 + tier * 28); // particles per second
	let emberCarry = 0;
</script>

<!-- light rays -->
<Container alpha={raysAlpha.current}>
	<Sprite
		key="fx_rays"
		anchor={0.5}
		width={raysSize}
		height={raysSize}
		rotation={time / 4200}
		tint={0x3fb6ff}
		alpha={0.75}
		blendMode="add"
	/>
	<Sprite
		key="fx_rays"
		anchor={0.5}
		width={raysSize * 0.8}
		height={raysSize * 0.8}
		rotation={-time / 3000}
		tint={0xffc861}
		alpha={0.45 + 0.1 * tier}
		blendMode="add"
	/>
</Container>

<!-- shockwaves -->
{#each rings as ring, i (i)}
	<Sprite
		key="fx_ring"
		anchor={0.5}
		width={ringSize(ring)}
		height={ringSize(ring)}
		alpha={ringAlpha(ring)}
		tint={0x8fd8ff}
		blendMode="add"
	/>
{/each}

<!-- ember fountain -->
{#if !reduced}
	<FxParticles
		max={cfg.maxSimultaneousParticles}
		onframe={(system, dt, tex) => {
			emberCarry += (emberRate * dt) / 1000;
			const n = Math.floor(emberCarry);
			if (n <= 0) return;
			emberCarry -= n;
			system.spawn({
				texture: tex('fx_spark'),
				x: 0,
				y: bannerHeight * 0.3,
				spreadX: bannerWidth * 0.42,
				count: n,
				angle: -Math.PI / 2,
				cone: Math.PI * 0.55,
				speed: [380, 820],
				gravity: 780,
				drag: 0.5,
				life: [900, 1600],
				size: [14, 30],
				endSizeRatio: 0.25,
				tint: [0x3fb6ff, 0xa8e4ff, 0xffd36b, 0xff9a3c],
				alignToVelocity: true,
				stretch: 2.4,
			});
		}}
	/>
{/if}

<!-- plaque + texts -->
<Container scale={scale.current}>
	<Sprite
		anchor={0.5}
		key={hasOwnFrame ? 'bigwin_frame' : 'banner_frame'}
		width={bannerWidth}
		height={bannerHeight}
		filters={[glow]}
	/>
	{#if props.title}
		<Container y={-bannerHeight * 0.62} scale={titleScale.current}>
			<Text
				anchor={0.5}
				text={props.title}
				style={{
					fontFamily: 'Cinzel, serif',
					fontWeight: '700',
					fontSize: SYMBOL_SIZE * (0.62 + tier * 0.05),
					fill: 0xffe2a0,
					stroke: { color: 0x1a0d04, width: SYMBOL_SIZE * 0.07 },
					letterSpacing: 6,
					dropShadow: { color: 0x3fb6ff, blur: 18, distance: 0, alpha: 0.95, angle: 0 },
				}}
			/>
		</Container>
	{/if}
	{@render props.children()}
</Container>

<!-- impact flash -->
{#if flash.current > 0.01}
	<Rectangle anchor={0.5} width={8000} height={8000} backgroundColor={0xdff4ff} backgroundAlpha={flash.current} />
{/if}
