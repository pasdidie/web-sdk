<script lang="ts">
	/**
	 * Amount of the payline currently being presented, popped over the line
	 * (board-local coords, mounted in the animate BoardContainer). Driven by
	 * the `lineAmount` fx event from the winInfo handler -- purely visual,
	 * never awaited.
	 */
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut, cubicIn } from 'svelte/easing';
	import { Container, Text } from 'pixi-svelte';

	import { fx } from '../game/fx';
	import { SYMBOL_SIZE } from '../game/constants';

	let text = $state('');
	let x = $state(0);
	let y = $state(0);
	const scale = new Tween(0, { duration: 260, easing: backOut });
	const alpha = new Tween(0, { duration: 180, easing: cubicIn });
	const rise = new Tween(0, { duration: 900 });
	let hideTimer: ReturnType<typeof setTimeout> | undefined;

	onMount(() => {
		const unsubscribe = fx.subscribe((e) => {
			if (e.kind !== 'lineAmount') return;
			clearTimeout(hideTimer);
			text = e.text;
			x = e.point.x;
			y = e.point.y;
			scale.set(0.4, { duration: 0 }).then(() => scale.set(1));
			alpha.set(1, { duration: 0 });
			rise.set(0, { duration: 0 }).then(() => rise.set(-SYMBOL_SIZE * 0.18, { duration: e.durationMs }));
			hideTimer = setTimeout(() => alpha.set(0), Math.max(0, e.durationMs - 200));
		});
		return () => {
			unsubscribe();
			clearTimeout(hideTimer);
		};
	});
</script>

{#if alpha.current > 0.01}
	<Container {x} y={y + rise.current} scale={scale.current} alpha={alpha.current} zIndex={60}>
		<Text
			anchor={0.5}
			{text}
			style={{
				fontFamily: 'Cinzel, serif',
				fontWeight: '700',
				fontSize: SYMBOL_SIZE * 0.5,
				fill: 0xffe2a0,
				letterSpacing: 2,
				stroke: { color: 0x120a04, width: SYMBOL_SIZE * 0.06 },
				dropShadow: { color: 0x3fb6ff, blur: 16, distance: 0, alpha: 1, angle: 0 },
			}}
		/>
	</Container>
{/if}
