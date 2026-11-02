<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/<AnimationPlaceholders>',
	});
</script>

<script lang="ts">
	import { Container, Text, Rectangle } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';

	import SymbolWinPlaceholder from '../components/animation-placeholders/SymbolWinPlaceholder.svelte';
	import SymbolAuraPlaceholder from '../components/animation-placeholders/SymbolAuraPlaceholder.svelte';
	import BigWinBannerPlaceholder from '../components/animation-placeholders/BigWinBannerPlaceholder.svelte';
	import FreeSpinBannerPlaceholder from '../components/animation-placeholders/FreeSpinBannerPlaceholder.svelte';
	import { ANIMATION_CONFIG } from '../game/animationConfig';

	let bigWinTotalWinX = $state<number | null>(null);
	let freeSpinBanner = $state<{ kind: 'intro' | 'outro' | 'retrigger'; title: string; subtitle?: string } | null>(
		null,
	);

	const Button = ({ label, x, y, onTap }: { label: string; x: number; y: number; onTap: () => void }) => ({
		label,
		x,
		y,
		onTap,
	});

	const bigWinButtons = ANIMATION_CONFIG.bigWin.tiers.map((tier, i) =>
		Button({
			label: `${tier.key} (${tier.thresholdX}x)`,
			x: 20,
			y: 40 + i * 40,
			onTap: () => (bigWinTotalWinX = tier.thresholdX + 1),
		}),
	);
</script>

<Story name="win pulse + aura idle">
	{#snippet template()}
		<StoryPixiApp assets={{}}>
			<Text x={20} y={20} text="Symbol win pulse (loop)" style={{ fill: 0x222222, fontSize: 18 }} />
			<SymbolWinPlaceholder x={100} y={100} loop color={0xd4af37} />
			<SymbolWinPlaceholder x={280} y={100} loop color={0xc0392b} />
			<SymbolWinPlaceholder x={460} y={100} loop color={0x2980b9} />

			<Text x={20} y={220} text="Wild/Scatter aura idle" style={{ fill: 0x222222, fontSize: 18 }} />
			<SymbolAuraPlaceholder x={100} y={320} auraMode="rotate" bodyColor={0xf1c40f} auraColor={0xff8800} />
			<Text x={60} y={400} text="wild (rotate)" style={{ fill: 0xaaaaaa, fontSize: 14 }} />
			<SymbolAuraPlaceholder x={280} y={320} auraMode="pulse" bodyColor={0x9b59b6} auraColor={0xe0aaff} />
			<Text x={230} y={400} text="scatter (pulse)" style={{ fill: 0xaaaaaa, fontSize: 14 }} />
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="big win banner">
	{#snippet template()}
		<StoryPixiApp assets={{}}>
			<Text x={20} y={20} text="Tap a tier to trigger; tap the banner to skip" style={{ fill: 0x222222, fontSize: 18 }} />
			{#each bigWinButtons as btn}
				<Container x={btn.x} y={btn.y} eventMode="static" cursor="pointer" onpointerup={btn.onTap}>
					<Rectangle width={160} height={30} backgroundColor={0x333333} borderColor={0xffd700} borderWidth={1} />
					<Text x={8} y={6} text={btn.label} style={{ fill: 0xffd700, fontSize: 14 }} />
				</Container>
			{/each}

			{#if bigWinTotalWinX !== null}
				{#key bigWinTotalWinX}
					<BigWinBannerPlaceholder
						x={500}
						y={300}
						totalWinX={bigWinTotalWinX}
						oncomplete={() => (bigWinTotalWinX = null)}
					/>
				{/key}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="free spins banners">
	{#snippet template()}
		<StoryPixiApp assets={{}}>
			<Text x={20} y={20} text="Tap a button to trigger" style={{ fill: 0x222222, fontSize: 18 }} />

			<Container
				x={20}
				y={60}
				eventMode="static"
				cursor="pointer"
				onpointerup={() =>
					(freeSpinBanner = { kind: 'intro', title: '10 FREE SPINS', subtitle: 'Good luck!' })}
			>
				<Rectangle width={160} height={30} backgroundColor={0x333333} borderColor={0x66ccff} borderWidth={1} />
				<Text x={8} y={6} text="intro" style={{ fill: 0x66ccff, fontSize: 14 }} />
			</Container>

			<Container
				x={190}
				y={60}
				eventMode="static"
				cursor="pointer"
				onpointerup={() => (freeSpinBanner = { kind: 'retrigger', title: '+5' })}
			>
				<Rectangle width={160} height={30} backgroundColor={0x333333} borderColor={0x66ccff} borderWidth={1} />
				<Text x={8} y={6} text="retrigger" style={{ fill: 0x66ccff, fontSize: 14 }} />
			</Container>

			<Container
				x={360}
				y={60}
				eventMode="static"
				cursor="pointer"
				onpointerup={() =>
					(freeSpinBanner = { kind: 'outro', title: 'TOTAL WIN', subtitle: '48.20X' })}
			>
				<Rectangle width={160} height={30} backgroundColor={0x333333} borderColor={0x66ccff} borderWidth={1} />
				<Text x={8} y={6} text="outro" style={{ fill: 0x66ccff, fontSize: 14 }} />
			</Container>

			{#if freeSpinBanner}
				{#key freeSpinBanner}
					<FreeSpinBannerPlaceholder
						x={500}
						y={300}
						kind={freeSpinBanner.kind}
						title={freeSpinBanner.title}
						subtitle={freeSpinBanner.subtitle}
						oncomplete={() => (freeSpinBanner = null)}
					/>
				{/key}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>
