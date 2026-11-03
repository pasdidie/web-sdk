<script lang="ts">
	import { MainContainer, OnPressFullScreen } from 'components-layout';
	import { OnHotkey } from 'components-shared';
	import { onMount } from 'svelte';
	import { stateI18nDerived } from 'state-shared';
	import { Text } from 'pixi-svelte';

	import { getContext } from '../game/context';

	type Props = {
		onpress: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	// Our own Cinzel label instead of the SDK example's pre-rendered
	// "press anywhere" sprite (template art in another style).
	let pulse = $state(1);
	onMount(() => {
		let raf = requestAnimationFrame(function tick(ts) {
			pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(ts / 420));
			raf = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(raf);
	});
</script>

<MainContainer alignVertical="bottom">
	<Text
		anchor={{ x: 0.5, y: 1 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height - 40}
		alpha={pulse}
		text={stateI18nDerived.translate('PRESS ANYWHERE TO CONTINUE')}
		style={{
			fontFamily: 'Cinzel, serif',
			fontWeight: '700',
			fontSize: 34,
			fill: 0xffe2a0,
			letterSpacing: 4,
			stroke: { color: 0x120a04, width: 5 },
			dropShadow: { color: 0x3fb6ff, blur: 14, distance: 0, alpha: 0.9, angle: 0 },
		}}
	/>
</MainContainer>
<OnHotkey hotkey="Space" onpress={() => props.onpress()} />
<OnPressFullScreen onpress={() => props.onpress()} />
