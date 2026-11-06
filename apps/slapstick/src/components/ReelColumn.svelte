<script lang="ts">
	/**
	 * One reel of the board. While it spins, the film strip smears vertically
	 * (BlurFilter, eased in/out, so symbols read as a moving strip rather than
	 * sliding stills); when it stops, the column takes a short damped squash
	 * around its centre, on top of the SDK's bounce-back, so each reel lands
	 * with some weight.
	 */
	import type { Snippet } from 'svelte';
	import { onDestroy } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { BlurFilter } from 'pixi.js';
	import { Container } from 'pixi-svelte';

	import type { Reel } from '../game/stateGame.svelte';
	import { BOARD_SIZES } from '../game/constants';
	import { getSymbolX } from '../game/utils';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	type Props = { reel: Reel; reelIndex: number; children: Snippet };

	const props: Props = $props();
	const cfg = ANIMATION_CONFIG.reels;

	const blur = new BlurFilter({ strengthX: 0, strengthY: 0, quality: 3 });
	onDestroy(() => blur.destroy());

	const spinning = $derived(props.reel.reelState.motion === 'spinning');
	const blurStrength = new Tween(0, { easing: cubicOut });
	$effect(() => {
		const target = spinning && !prefersReducedMotion() ? cfg.spinBlur : 0;
		blurStrength.set(target, { duration: spinning ? cfg.blurInMs : cfg.blurOutMs });
	});
	$effect(() => {
		blur.strengthY = blurStrength.current;
	});
	const blurOn = $derived(blurStrength.current > 0.2);
	const filters = $derived(blurOn ? [blur] : []);

	// Landing squash: damped oscillation, triggered on the spinning/bouncing -> stopped edge.
	let landT = $state(-1);
	let prevMotion = props.reel.reelState.motion;
	let frame = 0;
	$effect(() => {
		const motion = props.reel.reelState.motion;
		if (motion === 'stopped' && prevMotion !== 'stopped' && !prefersReducedMotion()) {
			cancelAnimationFrame(frame);
			const start = performance.now();
			const tick = (ts: number) => {
				landT = (ts - start) / 1000;
				if (landT > cfg.landSquashSeconds) {
					landT = -1;
					return;
				}
				frame = requestAnimationFrame(tick);
			};
			frame = requestAnimationFrame(tick);
		}
		prevMotion = motion;
	});
	onDestroy(() => cancelAnimationFrame(frame));

	const squash = $derived(landT < 0 ? 0 : cfg.landSquash * Math.exp(-landT * 9) * Math.sin(landT * 26));
	const columnX = $derived(getSymbolX(props.reelIndex));
</script>

<Container
	x={columnX}
	y={BOARD_SIZES.height / 2}
	pivot={{ x: columnX, y: BOARD_SIZES.height / 2 }}
	scale={{ x: 1 + squash * 0.5, y: 1 - squash }}
	{filters}
>
	{@render props.children()}
</Container>
