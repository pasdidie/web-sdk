<script lang="ts">
	/**
	 * Real-asset replacement for TransitionAnimation.svelte (Spine "falling
	 * rocks" wipe). Per the user: same idea, but falling anvils -- reuses
	 * sym_H4 (already an anvil icon, no new asset needed). A column of
	 * oversized, overlapping anvils falls across the full screen width at
	 * once so there's a brief moment of total coverage (that's what makes it
	 * work as a wipe between game states), each spinning and gravity-eased,
	 * then the whole thing clears and oncomplete fires. Same contract as the
	 * Spine version: a single oncomplete callback, no intermediate events.
	 */
	import { onMount } from 'svelte';
	import { quadIn } from 'svelte/easing';
	import { Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = {
		oncomplete: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	const COLUMNS = 6;
	const OVERLAP = 1.35; // anvil width as a multiple of its column's share of the screen
	const FALL_DURATION_MS = 650;
	const MAX_STAGGER_MS = 130;
	const MAX_ROTATION_TURNS = 0.6; // of a full turn, direction randomized per anvil

	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const anvilSize = $derived((canvas.width / COLUMNS) * OVERLAP);

	type Anvil = { x: number; staggerMs: number; spinDir: 1 | -1 };
	const anvils: Anvil[] = Array.from({ length: COLUMNS }, (_, i) => ({
		x: (canvas.width / COLUMNS) * (i + 0.5),
		staggerMs: Math.random() * MAX_STAGGER_MS,
		spinDir: Math.random() < 0.5 ? 1 : -1,
	}));

	let progress = $state(0); // 0 at top, 1 fully past the bottom, per anvil below

	onMount(() => {
		if (prefersReducedMotion()) {
			props.oncomplete();
			return;
		}
		const startTs = performance.now();
		const totalDuration = FALL_DURATION_MS + MAX_STAGGER_MS;
		let rafId = requestAnimationFrame(function tick(ts) {
			const elapsed = ts - startTs;
			progress = Math.min(elapsed / totalDuration, 1);
			if (elapsed < totalDuration) {
				rafId = requestAnimationFrame(tick);
			} else {
				props.oncomplete();
			}
		});
		return () => cancelAnimationFrame(rafId);
	});

	const anvilY = (anvil: Anvil) => {
		const local = Math.min(Math.max((progress * (FALL_DURATION_MS + MAX_STAGGER_MS) - anvil.staggerMs) / FALL_DURATION_MS, 0), 1);
		const eased = quadIn(local);
		return -anvilSize / 2 + eased * (canvas.height + anvilSize);
	};

	const anvilRotation = (anvil: Anvil) => {
		const local = Math.min(Math.max((progress * (FALL_DURATION_MS + MAX_STAGGER_MS) - anvil.staggerMs) / FALL_DURATION_MS, 0), 1);
		return anvil.spinDir * local * MAX_ROTATION_TURNS * Math.PI * 2;
	};
</script>

{#each anvils as anvil (anvil.x)}
	<Sprite
		key="sym_H4"
		anchor={0.5}
		x={anvil.x}
		y={anvilY(anvil)}
		rotation={anvilRotation(anvil)}
		width={anvilSize}
		height={anvilSize}
	/>
{/each}
