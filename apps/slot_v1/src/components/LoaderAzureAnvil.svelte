<script lang="ts">
	/**
	 * Replaces components-shared/LoaderExample.svelte (the SDK's literal
	 * placeholder -- "Add Your Loader" text over a generic spinner GIF).
	 * Shown before Game.svelte/Pixi even mount, so this is plain HTML/CSS,
	 * not a Pixi component. Reuses the existing logo.png emblem (no new
	 * asset) with a CSS pulse + rotate for motion -- a real animated GIF
	 * would mean an AI-generated frame sequence, which flickers frame to
	 * frame (see ANIMATION_SPEC.md "Pas d'animation image par image
	 * générée par IA"); CSS keyframes give smooth motion from a single
	 * static image instead, consistent with how every other animation in
	 * this project is code-driven rather than baked into the asset.
	 */
	import { fade } from 'svelte/transition';
	import { waitForTimeout } from 'utils-shared/wait';

	type Props = {
		src: string;
		oncomplete?: () => void;
	};

	const props: Props = $props();

	// Mirrors LoaderBase.svelte's contract: stay mounted (covering the Game
	// underneath, z-index 999) until `timeout` ms after the image loads, then
	// unmount so the Game shows through. Without this it would hide the game
	// forever instead of handing off to it.
	const MIN_VISIBLE_MS = 900;
	let loading = $state(true);
</script>

{#if loading}
	<div class="wrap" transition:fade>
		<div class="glow"></div>
		<img
			src={props.src}
			alt=""
			class="emblem"
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
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.glow {
		position: absolute;
		width: 40vmin;
		height: 40vmin;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 170, 60, 0.35) 0%, rgba(255, 170, 60, 0) 70%);
		animation: pulse 2.4s ease-in-out infinite;
	}

	.emblem {
		position: relative;
		width: 18vmin;
		max-width: 220px;
		animation:
			spin 3.5s linear infinite,
			bob 2.4s ease-in-out infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes bob {
		0%,
		100% {
			scale: 1;
		}
		50% {
			scale: 1.08;
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
		.emblem {
			animation: none;
		}
	}
</style>
