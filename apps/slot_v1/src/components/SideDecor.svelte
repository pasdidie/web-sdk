<script lang="ts">
	/**
	 * Persistent decor around the reels, top-provider style:
	 *   - "WIN UP TO <max>×" plaque (value read from config, never hard-coded)
	 *   - the dwarf smith mascot beside the grid: breathing idle, switches to
	 *     the victory pose on `mascotCheer` fx events (big win, free spins
	 *     trigger, wild/scatter wins).
	 * Desktop/landscape: plaque left of the reel frame, mascot right of it.
	 * Portrait: no side room -> plaque above the frame, mascot hidden.
 * During free spins the plaque turns into the FREE SPINS "current / total"
 * counter (replaces the template's FreeSpinCounter, which sat on top of it).
	 * Rendered in a MainContainer *before* BoardFrame so it sits behind it.
	 */
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';
	import { Container, Graphics, Sprite, Text } from 'pixi-svelte';
	import { stateI18nDerived } from 'state-shared';

	import FxParticles from './FxParticles.svelte';
	import type { ParticleSystem } from '../game/particles';
	import { getContext } from '../game/context';
	import { fx } from '../game/fx';
	import config from '../game/config';
	import { prefersReducedMotion } from '../game/animationConfig';

	const context = getContext();
	const reduced = prefersReducedMotion();

	// Same frame maths as BoardFrame.svelte (opening ratio + margin).
	const layout = $derived(context.stateGameDerived.boardLayout());
	const main = $derived(context.stateLayoutDerived.mainLayout());
	const frameW = $derived((layout.width * 1.04) / 0.727);
	const frameH = $derived((layout.height * 1.07) / 0.635);
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const sideRoom = $derived(Math.max(0, (main.width - frameW) / 2));

	const maxWinText = `${config.betModes.base.max_win.toLocaleString('en-US')}×`;

	// ---- plaque geometry ---------------------------------------------------
	const PANEL_RATIO = 967 / 713; // panel_frame.png h/w
	const plaqueW = $derived(Math.min(240, sideRoom * 0.82));
	const plaqueH = $derived(plaqueW * PANEL_RATIO);
	const plaqueX = $derived(layout.x - frameW / 2 - sideRoom / 2);

	// ---- mascot geometry -----------------------------------------------------
	const MASCOT_RATIO = 725 / 1014; // mascot_idle.png w/h
	const mascotH = $derived(Math.min(frameH * 0.78, 470));
	const mascotW = $derived(mascotH * MASCOT_RATIO);
	const mascotX = $derived(layout.x + frameW / 2 + sideRoom * 0.42);
	const mascotBottom = $derived(layout.y + frameH * 0.42);
	const showMascot = $derived(!portrait && sideRoom > mascotW * 0.55);

	// ---- free spins counter (same plaque) ------------------------------------
	let fsActive = $state(false);
	let fsCurrent = $state(0);
	let fsTotal = $state(0);
	context.eventEmitter.subscribeOnMount({
		freeSpinCounterShow: () => (fsActive = true),
		freeSpinCounterHide: () => (fsActive = false),
		freeSpinCounterUpdate: (e) => {
			if (e.current !== undefined) fsCurrent = e.current;
			if (e.total !== undefined) fsTotal = e.total;
		},
	});
	const tr = stateI18nDerived.translate;
	const plaqueTop = $derived(fsActive ? tr('FREE SPINS') : tr('WIN UP TO'));
	const plaqueMain = $derived(fsActive ? `${fsCurrent} / ${fsTotal}` : maxWinText);
	const plaqueBottom = $derived(fsActive ? '' : tr('MAX WIN'));

	let t = $state(0);
	let cheering = $state(false);
	let cheerTimer: ReturnType<typeof setTimeout> | undefined;
	const pop = new Tween(1, { duration: 420, easing: backOut });
	let sparks: ParticleSystem | undefined;
	let sparkTex: ((key: string) => import('pixi.js').Texture) | undefined;

	onMount(() => {
		let raf = 0;
		if (!reduced) {
			let last = performance.now();
			raf = requestAnimationFrame(function loop(ts) {
				t += Math.min(ts - last, 50);
				last = ts;
				raf = requestAnimationFrame(loop);
			});
		}
		const unsubscribe = fx.subscribe((e) => {
			if (e.kind !== 'mascotCheer') return;
			clearTimeout(cheerTimer);
			if (!cheering && !reduced) {
				pop.set(0.9, { duration: 0 }).then(() => pop.set(1));
				// burst of azure sparks off the raised hammer head
				if (sparks && sparkTex) {
					sparks.spawn({
						texture: sparkTex('fx_spark'),
						x: mascotW * 0.25,
						y: -mascotH * 0.88,
						spreadX: mascotW * 0.12,
						spreadY: mascotH * 0.05,
						count: 26,
						speed: [160, 520],
						gravity: 600,
						drag: 0.3,
						life: [500, 1000],
						size: [10, 22],
						tint: [0x3fb6ff, 0xa8e4ff, 0xffffff, 0xffd36b],
						alignToVelocity: true,
						stretch: 2.4,
					});
				}
			}
			cheering = true;
			cheerTimer = setTimeout(() => (cheering = false), e.durationMs);
		});
		return () => {
			cancelAnimationFrame(raf);
			unsubscribe();
			clearTimeout(cheerTimer);
		};
	});

	const breath = $derived(Math.sin(t / 900));
	const glowPulse = $derived(0.5 + 0.5 * Math.sin(t / 650));
</script>

{#if !portrait && sideRoom > 140}
	<!-- WIN UP TO plaque, left of the frame -->
	<Container x={plaqueX} y={layout.y - frameH * 0.08}>
		<Graphics
			draw={(g) => {
				g.clear();
				g.rect(-plaqueW * 0.34, -plaqueH * 0.38, plaqueW * 0.68, plaqueH * 0.76).fill({
					color: 0x070a10,
					alpha: 0.88,
				});
				g.rect(-plaqueW * 0.34, -plaqueH * 0.38, plaqueW * 0.68, plaqueH * 0.76).fill({
					color: 0x1b4f7a,
					alpha: 0.12 + 0.14 * glowPulse,
				});
			}}
		/>
		<Sprite key="panel_frame" anchor={0.5} width={plaqueW} height={plaqueH} />
		<Text
			anchor={0.5}
			y={-plaqueH * 0.17}
			text={plaqueTop}
			style={{
				fontFamily: 'Cinzel, serif',
				fontWeight: '700',
				fontSize: plaqueW * 0.1,
				fill: 0xcfe9ff,
				letterSpacing: 2,
				align: 'center',
				stroke: { color: 0x05080e, width: 4 },
			}}
		/>
		<Text
			anchor={0.5}
			y={plaqueH * 0.03}
			scale={1 + 0.03 * glowPulse}
			text={plaqueMain}
			style={{
				fontFamily: 'Cinzel, serif',
				fontWeight: '700',
				fontSize: plaqueW * 0.155,
				fill: 0xffe2a0,
				letterSpacing: 1,
				stroke: { color: 0x120a04, width: 5 },
				dropShadow: { color: 0x3fb6ff, blur: 10 + 8 * glowPulse, distance: 0, alpha: 1, angle: 0 },
			}}
		/>
		<Text
			anchor={0.5}
			y={plaqueH * 0.2}
			text={plaqueBottom}
			style={{
				fontFamily: 'Cinzel, serif',
				fontWeight: '700',
				fontSize: plaqueW * 0.085,
				fill: 0xcfe9ff,
				letterSpacing: 3,
				stroke: { color: 0x05080e, width: 4 },
			}}
		/>
	</Container>
{:else}
	<!-- portrait / tablet (no side room): compact plaque above the frame -->
	<Container x={layout.x} y={layout.y - frameH / 2 - 62}>
		<Sprite key="bigwin_frame" anchor={0.5} width={frameW * 0.5} height={frameW * 0.5 * 0.36} />
		<Text
			anchor={0.5}
			text={`${plaqueTop} ${plaqueMain}`}
			style={{
				fontFamily: 'Cinzel, serif',
				fontWeight: '700',
				fontSize: 30,
				fill: 0xffe2a0,
				letterSpacing: 2,
				stroke: { color: 0x120a04, width: 5 },
				dropShadow: { color: 0x3fb6ff, blur: 10 + 8 * glowPulse, distance: 0, alpha: 1, angle: 0 },
			}}
		/>
	</Container>
{/if}

{#if showMascot}
	<Container x={mascotX} y={mascotBottom} scale={pop.current}>
		<!-- soft azure ground glow -->
		<Sprite
			key="fx_flame"
			anchor={{ x: 0.5, y: 0.9 }}
			width={mascotW * 1.1}
			height={mascotH * 0.35}
			tint={0x3fb6ff}
			alpha={0.18 + 0.12 * glowPulse + (cheering ? 0.2 : 0)}
			blendMode="add"
		/>
		<Container scale={{ x: 1, y: 1 + 0.012 * breath }}>
			<Sprite
				key={cheering ? 'mascot_cheer' : 'mascot_idle'}
				anchor={{ x: 0.5, y: 1 }}
				y={cheering ? 0 : 2 * breath}
				width={mascotW}
				height={mascotH}
			/>
		</Container>
		{#if !reduced}
			<FxParticles
				max={60}
				onready={(system, tex) => {
					sparks = system;
					sparkTex = tex;
				}}
			/>
		{/if}
	</Container>
{/if}
