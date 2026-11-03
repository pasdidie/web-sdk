<script lang="ts">
	/**
	 * Ambient forge embers drifting up across the whole canvas, plus a slow
	 * "forge breathing" glow from the bottom of the screen. Canvas space
	 * (rendered from BackgroundSprite, outside MainContainer). Colours follow
	 * the game mode: warm embers in base game, azure in free spins.
	 */
	import { Sprite } from 'pixi-svelte';

	import FxParticles from './FxParticles.svelte';
	import { getContext } from '../game/context';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const isFree = $derived(context.stateGame.gameType === 'freegame');
	const max = ANIMATION_CONFIG.ambienceParticles.maxSimultaneous;
	const reduced = prefersReducedMotion();

	let carry = 0;
	let t = $state(0);
	const breath = $derived(0.5 + 0.5 * Math.sin(t / 1800) * Math.sin(t / 700 + 1));
</script>

{#if !reduced}
	<Sprite
		key="fx_flame"
		anchor={{ x: 0.5, y: 1 }}
		x={canvas.width / 2}
		y={canvas.height * 1.08}
		width={canvas.width * 1.4}
		height={canvas.height * 0.55}
		tint={isFree ? 0x2f8fff : 0xff7a2a}
		alpha={0.1 + 0.12 * breath}
		blendMode="add"
	/>
	<FxParticles
		{max}
		onframe={(system, dt, tex) => {
			t += dt;
			carry += (9 * dt) / 1000;
			const n = Math.floor(carry);
			if (n <= 0) return;
			carry -= n;
			system.spawn({
				texture: tex('fx_spark'),
				x: canvas.width / 2,
				y: canvas.height + 10,
				spreadX: canvas.width / 2,
				count: n,
				angle: -Math.PI / 2,
				cone: 0.5,
				speed: [40, 110],
				life: [4000, 7500],
				size: [5, 12],
				endSizeRatio: 0.5,
				gravity: -6,
				tint: isFree ? [0x3fb6ff, 0xa8e4ff] : [0xff9a3c, 0xffc861, 0x3fb6ff],
				alpha: 0.85,
				fadeIn: 0.15,
			});
		}}
	/>
{/if}
