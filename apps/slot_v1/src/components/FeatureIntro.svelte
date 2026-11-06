<script lang="ts">
	/**
	 * Feature intro shown between the loading screen and the game, like the
	 * top providers' "how it works" splash: three framed panels (Wild /
	 * Free spins / Max win) with staggered entrance + idle float. Values come
	 * from config where they exist (max win); every string goes through
	 * translate() and avoids restricted social-casino words (bet/buy/pay).
	 */
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut, cubicOut } from 'svelte/easing';
	import { Container, Graphics, Sprite, Text } from 'pixi-svelte';
	import { CanvasSizeRectangle, MainContainer } from 'components-layout';
	import { stateI18nDerived } from 'state-shared';

	import PressToContinue from './PressToContinue.svelte';
	import { getContext } from '../game/context';
	import config from '../game/config';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = { onclose: () => void };
	const props: Props = $props();
	const context = getContext();
	const t = stateI18nDerived.translate;
	const reduced = prefersReducedMotion();

	const main = $derived(context.stateLayoutDerived.mainLayout());
	const pw = $derived(Math.min(main.width * 0.27, 330));
	const ph = $derived(pw * (967 / 713));
	const gap = $derived(pw * 1.12);
	const cy = $derived(main.height * 0.54);
	const logoW = $derived(Math.min(main.width * 0.55, 560));

	const maxWinText = `${config.betModes.base.max_win.toLocaleString('en-US')}×`;

	const panels = [
		{
			art: 'sym_W_body',
			aura: 'sym_W_aura',
			title: t('WILD'),
			lines: [
				t('Substitutes for every symbol except Scatter.'),
				t('Free spins: wild multipliers add up on a line.'),
			],
		},
		{
			art: 'sym_S_body',
			aura: 'sym_S_aura',
			title: t('FREE SPINS'),
			lines: [t('3 / 4 / 5 Scatters award 10 / 12 / 15 free spins.'), t('3+ Scatters in free spins: +5 spins.')],
		},
		{
			art: 'mascot_cheer',
			aura: undefined,
			title: t('WIN UP TO'),
			lines: [],
		},
	];

	const enter = panels.map(() => new Tween(reduced ? 1 : 0, { duration: 650, easing: backOut }));
	const fade = new Tween(reduced ? 1 : 0, { duration: 400, easing: cubicOut });
	let time = $state(0);

	onMount(() => {
		if (reduced) return;
		fade.set(1);
		enter.forEach((tw, i) => setTimeout(() => tw.set(1), 180 + i * 160));
		let last = performance.now();
		let raf = requestAnimationFrame(function loop(ts) {
			time += Math.min(ts - last, 50);
			last = ts;
			raf = requestAnimationFrame(loop);
		});
		return () => cancelAnimationFrame(raf);
	});
</script>

<CanvasSizeRectangle backgroundColor={0x03050a} backgroundAlpha={0.72 * fade.current} />

<MainContainer>
	<Container alpha={fade.current}>
		<Sprite
			key="title_logo"
			anchor={0.5}
			x={main.width / 2}
			y={cy - ph / 2 - logoW * 0.2}
			width={logoW}
			height={logoW / (3584 / 1184)}
		/>

		{#each panels as panel, i (i)}
			{@const k = enter[i].current}
			{@const float = Math.sin(time / 1100 + i * 1.7) * 5}
			<Container
				x={main.width / 2 + (i - 1) * gap}
				y={cy + (1 - k) * 80 + float}
				alpha={Math.min(1, k)}
				scale={0.85 + 0.15 * k}
			>
				<Graphics
					draw={(g) => {
						g.clear();
						g.rect(-pw * 0.34, -ph * 0.38, pw * 0.68, ph * 0.765).fill({ color: 0x070a10, alpha: 0.92 });
						g.rect(-pw * 0.34, -ph * 0.38, pw * 0.68, ph * 0.3).fill({ color: 0x1b4f7a, alpha: 0.18 });
					}}
				/>

				{#if panel.aura}
					<Sprite
						key={panel.aura}
						anchor={0.5}
						y={-ph * 0.17}
						rotation={time / 4000}
						width={pw * 0.62}
						height={pw * 0.62}
						alpha={0.7}
					/>
					<Sprite key={panel.art} anchor={0.5} y={-ph * 0.17} width={pw * 0.5} height={pw * 0.5} />
				{:else}
					<Sprite
						key={panel.art}
						anchor={{ x: 0.5, y: 1 }}
						y={ph * 0.05}
						width={ph * 0.42 * (725 / 1014)}
						height={ph * 0.42}
					/>
				{/if}

				<Text
					anchor={0.5}
					y={ph * 0.1}
					text={panel.title}
					style={{
						fontFamily: 'Cinzel, serif',
						fontWeight: '700',
						fontSize: pw * 0.095,
						fill: 0xffe2a0,
						letterSpacing: 2,
						stroke: { color: 0x120a04, width: 4 },
						dropShadow: { color: 0x3fb6ff, blur: 10, distance: 0, alpha: 0.9, angle: 0 },
					}}
				/>

				{#if panel.lines.length}
					<Text
						anchor={{ x: 0.5, y: 0 }}
						y={ph * 0.16}
						text={panel.lines.join('\n')}
						style={{
							fontFamily: 'Cinzel, serif',
							fontWeight: '600',
							fontSize: pw * 0.052,
							fill: 0xcfe9ff,
							align: 'center',
							lineHeight: pw * 0.07,
							wordWrap: true,
							wordWrapWidth: pw * 0.6,
							stroke: { color: 0x05080e, width: 3 },
						}}
					/>
				{:else}
					<Text
						anchor={0.5}
						y={ph * 0.24}
						scale={1 + 0.04 * Math.sin(time / 500)}
						text={maxWinText}
						style={{
							fontFamily: 'Cinzel, serif',
							fontWeight: '700',
							fontSize: pw * 0.15,
							fill: 0xffe2a0,
							stroke: { color: 0x120a04, width: 5 },
							dropShadow: { color: 0x3fb6ff, blur: 16, distance: 0, alpha: 1, angle: 0 },
						}}
					/>
				{/if}

				<Sprite key="panel_frame" anchor={0.5} width={pw} height={ph} />
			</Container>
		{/each}
	</Container>
</MainContainer>

<PressToContinue onpress={() => props.onclose()} />
