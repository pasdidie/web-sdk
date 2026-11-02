<script lang="ts">
	/**
	 * Opening of the show (docs/CONCEPT.md section 4 "Chargement"): a
	 * projectionist's countdown leader 3-2-1 with the sweeping hand, then the
	 * SLAPSTICK title card fades in on the logo emblem. Same contract as
	 * LoaderBase.svelte: covers the game (z-index 999) and unmounts once done.
	 * Reduced motion: no countdown, title card only.
	 */
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { waitForTimeout } from 'utils-shared/wait';

	import assets from '../game/assets';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = { oncomplete?: () => void };
	const props: Props = $props();

	const logoSrc = (assets as any).logo_mark?.src ?? '';
	const STEP_MS = 900;

	let loading = $state(true);
	let count = $state<number | null>(3);

	onMount(async () => {
		if (!prefersReducedMotion()) {
			for (const n of [3, 2, 1]) {
				count = n;
				await waitForTimeout(STEP_MS);
			}
		}
		count = null;
		await waitForTimeout(1400);
		loading = false;
		props.oncomplete?.();
	});
</script>

{#if loading}
	<div class="wrap" transition:fade={{ duration: 500 }}>
		{#if count !== null}
			{#key count}
				<div class="leader">
					<div class="ring outer"></div>
					<div class="ring inner"></div>
					<div class="cross h"></div>
					<div class="cross v"></div>
					<div class="sweep"></div>
					<span class="digit">{count}</span>
				</div>
			{/key}
		{:else}
			<div class="title" in:fade={{ duration: 400 }}>
				<img src={logoSrc} alt="" draggable="false" />
				<h1>SLAPSTICK</h1>
			</div>
		{/if}
		<div class="grain"></div>
	</div>
{/if}

<style lang="scss">
	.wrap {
		position: absolute;
		inset: 0;
		z-index: 999;
		background: #0d0d0d;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		color: #f2eee4;
		animation: flicker 0.18s steps(2) infinite;
	}

	.leader {
		position: relative;
		width: 62vmin;
		height: 62vmin;
		background: #8a877f;
	}
	.ring {
		position: absolute;
		border-radius: 50%;
		border: 0.8vmin solid #f2eee4;
		inset: 6%;
	}
	.ring.inner {
		inset: 14%;
	}
	.cross {
		position: absolute;
		background: #f2eee4;
	}
	.cross.h {
		left: 0;
		right: 0;
		top: calc(50% - 0.3vmin);
		height: 0.6vmin;
	}
	.cross.v {
		top: 0;
		bottom: 0;
		left: calc(50% - 0.3vmin);
		width: 0.6vmin;
	}
	.sweep {
		position: absolute;
		inset: 6%;
		border-radius: 50%;
		background: conic-gradient(rgba(13, 13, 13, 0.55) 0deg, rgba(13, 13, 13, 0.55) var(--a), transparent var(--a));
		animation: sweep 0.9s linear forwards;
	}
	.digit {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Limelight', serif;
		font-size: 34vmin;
		line-height: 1;
		color: #0d0d0d;
		text-shadow: 0 0 1px #f2eee4;
	}

	.title {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: min(90vw, 140vmin);
		}
		h1 {
			position: absolute;
			margin: 0;
			font-family: 'Limelight', serif;
			font-weight: 400;
			font-size: min(11vw, 16vmin);
			letter-spacing: 0.08em;
			color: #f2eee4;
			text-shadow:
				0 0.4vmin 0 #0d0d0d,
				0 0 2vmin rgba(13, 13, 13, 0.9);
		}
	}

	.grain {
		position: absolute;
		inset: -50%;
		pointer-events: none;
		opacity: 0.12;
		background-image: repeating-radial-gradient(circle at 17% 32%, #fff 0 0.6px, transparent 0.6px 3px);
		animation: grain 0.25s steps(3) infinite;
	}

	@property --a {
		syntax: '<angle>';
		inherits: false;
		initial-value: 0deg;
	}
	@keyframes sweep {
		to {
			--a: 360deg;
		}
	}
	@keyframes flicker {
		50% {
			filter: brightness(0.94);
		}
	}
	@keyframes grain {
		33% {
			transform: translate(-3%, 2%);
		}
		66% {
			transform: translate(2%, -3%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.wrap,
		.grain,
		.sweep {
			animation: none;
		}
	}
</style>
