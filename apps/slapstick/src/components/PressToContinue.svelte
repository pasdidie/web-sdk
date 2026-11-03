<script lang="ts">
	import { MainContainer, OnPressFullScreen } from 'components-layout';
	import { OnHotkey } from 'components-shared';
	import { Text } from 'pixi-svelte';
	import { onMount } from 'svelte';

	import { prefersReducedMotion } from '../game/animationConfig';
	import { silverText } from '../game/textStyles';

	import { getContext } from '../game/context';

	type Props = {
		onpress: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	// Theme-font caption (was the SDK's baked western-font image), gently
	// breathing like a lamp so the prompt reads as alive.
	let pulse = $state(1);
	onMount(() => {
		if (prefersReducedMotion()) return;
		let frame = requestAnimationFrame(function tick(ts) {
			pulse = 0.75 + Math.sin(ts / 450) * 0.25;
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});
</script>

<MainContainer alignVertical="bottom">
	<Text
		anchor={{ x: 0.5, y: 1 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height - 40}
		alpha={pulse}
		text="PRESS ANYWHERE TO CONTINUE"
		style={silverText(42)}
	/>
</MainContainer>
<OnHotkey hotkey="Space" onpress={() => props.onpress()} />
<OnPressFullScreen onpress={() => props.onpress()} />
