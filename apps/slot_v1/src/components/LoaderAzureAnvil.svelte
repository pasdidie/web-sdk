<script lang="ts">
	/**
	 * Replaces components-shared/LoaderExample.svelte (the SDK's literal
	 * placeholder -- "Add Your Loader" text over a generic spinner GIF).
	 * Shown before Game.svelte/Pixi even mount, so this is plain HTML/CSS,
	 * not a Pixi component -- reuses the same raw PNG files as the Pixi
	 * board (via game/assets.ts's .src, same trick as BonusCard.svelte)
	 * instead of a second Pixi-only loading stage, since this screen
	 * previously showed nothing but a small spinning corner-badge icon on
	 * a flat color (see DECISIONS.md, "ça c'est nul" feedback) -- it now
	 * shows the same dungeon background + hero art as LoadingScreen.svelte
	 * so there's no jarring empty-looking screen between the mandatory
	 * Stake Engine loader and the real title screen.
	 */
	import { fade } from 'svelte/transition';
	import { waitForTimeout } from 'utils-shared/wait';
	import assets from '../game/assets';

	type Props = {
		oncomplete?: () => void;
	};

	const props: Props = $props();

	const bgSrc = (assets as any).bg_base_near?.src ?? '';
	const heroSrc = (assets as any).title_hero?.src ?? '';

	// Mirrors LoaderBase.svelte's contract: stay mounted (covering the Game
	// underneath, z-index 999) until `timeout` ms after the image loads, then
	// unmount so the Game shows through. Without this it would hide the game
	// forever instead of handing off to it.
	const MIN_VISIBLE_MS = 900;
	let loading = $state(true);
</script>

{#if loading}
	<div class="wrap" style="background-image: url({bgSrc})" transition:fade>
		<div class="glow"></div>
		<img
			src={heroSrc}
			alt=""
			class="hero"
			draggable="false"
			onload={async () => {
				await waitForTimeout(MIN_VISIBLE_MS);
				loading = false;
				props.oncomplete?.();
			}}
		/>
	</div>
{/if}

<style lang="scss">
	.wrap {
		position: absolute;
		inset: 0;
		z-index: 999;
		background-color: #140b06;
		background-size: cover;
		background-position: center;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.glow {
		position: absolute;
		width: 55vmin;
		height: 55vmin;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(90, 170, 255, 0.3) 0%, rgba(90, 170, 255, 0) 70%);
		animation: pulse 2.4s ease-in-out infinite;
	}

	.hero {
		position: relative;
		height: 60vmin;
		max-height: 640px;
		filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.6));
		animation: bob 2.4s ease-in-out infinite;
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-1.5%);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.6;
			scale: 1;
		}
		50% {
			opacity: 1;
			scale: 1.15;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.glow,
		.hero {
			animation: none;
		}
	}
</style>
