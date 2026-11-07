<script lang="ts">
	/**
	 * Persistent "WIN UP TO 2,500×" intertitle card on the stage right of the
	 * screen (wide layouts), balancing Monsieur Pip on the left. Swings very
	 * gently on its hanging point. The max win is read from the game config.
	 */
	import { onMount } from 'svelte';
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { stateI18nDerived } from 'state-shared';

	import config from '../game/config';
	import { silverText } from '../game/textStyles';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = { x: number; y: number; width: number };
	const props: Props = $props();
	const t = stateI18nDerived.translate;

	const height = $derived(props.width * (768 / 1376)); // intertitle_frame.png
	const maxWin = `${config.betModes.base.max_win.toLocaleString('en-US')}×`;

	let swing = $state(0);
	onMount(() => {
		if (prefersReducedMotion()) return;
		let frame = requestAnimationFrame(function tick(ts) {
			swing = Math.sin(ts / 1300) * 0.025;
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});
</script>

<Container x={props.x} y={props.y - height} rotation={swing}>
	<Container y={height}>
		<Sprite key="intertitle_frame" anchor={0.5} width={props.width} height={height} />
		<Text anchor={0.5} y={-height * 0.17} text={t('WIN UP TO')} style={silverText(props.width * 0.085)} />
		<Text anchor={0.5} y={height * 0.12} text={maxWin} style={silverText(props.width * 0.19)} />
	</Container>
</Container>
