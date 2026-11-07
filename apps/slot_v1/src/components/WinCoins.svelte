<script lang="ts">
	/**
	 * Coin + spark fountain behind the free-spins total. Replaces the
	 * template's ParticleEmitter with its square-holed "SD2_Coin" sheet
	 * (off-theme) by our own particle system and the Gemini dwarven rune
	 * coin (fx_coin). Intensity follows the win level alias.
	 */
	import { MainContainer } from 'components-layout';
	import { Container } from 'pixi-svelte';

	import FxParticles from './FxParticles.svelte';
	import { getContext } from '../game/context';
	import type { WinLevelAlias } from '../game/winLevelMap';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = {
		emit?: boolean;
		levelAlias?: WinLevelAlias;
	};

	const props: Props = $props();
	const context = getContext();
	const reduced = prefersReducedMotion();

	const LEVELS: WinLevelAlias[] = ['zero', 'standard', 'small', 'nice', 'substantial', 'big', 'superwin', 'mega', 'epic', 'max'];
	const level = $derived(Math.max(1, LEVELS.indexOf(props.levelAlias ?? 'standard')));
	const coinRate = $derived(6 + level * 4); // coins per second
	const sparkRate = $derived(20 + level * 8);
	const width = $derived(context.stateGameDerived.boardLayout().width);
	let coinCarry = 0;
	let sparkCarry = 0;
</script>

{#if !reduced}
	<MainContainer>
		<Container
			x={context.stateGameDerived.boardLayout().x}
			y={context.stateGameDerived.boardLayout().y + context.stateGameDerived.boardLayout().height * 0.55}
		>
			<FxParticles
				max={160}
				onframe={(system, dt, tex) => {
					if (!props.emit) return;
					coinCarry += (coinRate * dt) / 1000;
					sparkCarry += (sparkRate * dt) / 1000;
					const coins = Math.floor(coinCarry);
					const sparks = Math.floor(sparkCarry);
					coinCarry -= coins;
					sparkCarry -= sparks;
					if (coins > 0)
						system.spawn({
							texture: tex('fx_coin'),
							x: 0,
							y: 0,
							spreadX: width * 0.3,
							count: coins,
							angle: -Math.PI / 2,
							cone: Math.PI * 0.45,
							speed: [900, 1350],
							gravity: 1500,
							drag: 0.05,
							life: [1500, 2100],
							size: [44, 70],
							endSizeRatio: 1,
							spin: [-7, 7],
							blend: 'normal',
						});
					if (sparks > 0)
						system.spawn({
							texture: tex('fx_spark'),
							x: 0,
							y: 0,
							spreadX: width * 0.35,
							count: sparks,
							angle: -Math.PI / 2,
							cone: Math.PI * 0.6,
							speed: [400, 900],
							gravity: 800,
							drag: 0.5,
							life: [800, 1400],
							size: [12, 26],
							endSizeRatio: 0.25,
							tint: [0x3fb6ff, 0xa8e4ff, 0xffd36b, 0xff9a3c],
							alignToVelocity: true,
							stretch: 2.4,
						});
				}}
			/>
		</Container>
	</MainContainer>
{/if}
