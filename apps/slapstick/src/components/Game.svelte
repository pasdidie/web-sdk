<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App } from 'pixi-svelte';
	import { stateModal } from 'state-shared';

	import { UI, UiGameName, setMetalTextTheme, setUiSkin } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';
	import PayTableContent from './PayTableContent.svelte';
	import GameRulesContent from './GameRulesContent.svelte';

	import { getContext } from '../game/context';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './BackgroundSprite.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import FilmOverlay from './FilmOverlay.svelte';
	import PipPuppet from './PipPuppet.svelte';
	import MaxWinPlaque from './MaxWinPlaque.svelte';
	import { Filter } from 'pixi.js';

	const context = getContext();

	// Pixi renders filters at resolution 1 by default: on a retina canvas every
	// glowing symbol went soft/blurry. Follow the render target instead.
	Filter.defaultOptions.resolution = 'inherit';

	// Silver + Art Deco titles for the shared UI labels (default is Azure Anvil's gold).
	// Near-flat cream (a strong silver gradient on silver button rims was
	// unreadable), Limelight's single real weight, labels kept inside the
	// buttons' black centre, bigger +/- glyphs.
	setMetalTextTheme({
		fontFamily: 'Limelight, Cinzel, serif',
		colorStops: [0xffffff, 0xf2eee4, 0xd2cdc2],
		strokeColor: 0x0d0d0d,
		fontWeight: '400',
		buttonTextWidth: 0.6,
		buttonGlyphScale: 3,
	});

	// Bespoke bar (reviewer feedback "poor bet UI bar"): a projection-booth
	// console behind the controls, engraved silver icons instead of words,
	// a film reel spin button that turns while a bet plays, ticket labels.
	const ICONS = ['increase', 'decrease', 'menu', 'turbo', 'autoSpin', 'soundOn', 'soundOff', 'settings', 'info', 'payTable', 'menuExit', 'spin'] as const;
	setUiSkin({
		iconKeys: Object.fromEntries(ICONS.map((icon) => [icon, `icon_${icon}`])),
		spinReelKey: 'ui_reel',
		// ui_console.png is 968x207: stepped end caps ~110px wide each
		console: { key: 'ui_console', slice: { left: 110, right: 110, top: 30, bottom: 30 } },
		labelKey: 'ui_ticket',
		labelRatio: 900 / 281,
	});

	// Monsieur Pip stands on the stage left of the screen (landscape), or
	// below it on the left in portrait. Main-container coordinates.
	const pipPlacement = $derived.by(() => {
		const board = context.stateGameDerived.boardLayout();
		if (context.stateLayoutDerived.layoutType() === 'portrait') {
			// stage-left of the WIN panel, below the screen frame; no camera (no room)
			return { x: 125, y: board.y + board.height * board.scale * 0.5 + 410, height: 360, showCamera: false };
		}
		// Just left of the screen frame (frame is ~2.5x the board height wide), feet above the UI bar.
		return { x: board.x - board.height * 1.07 - 110, y: board.y + board.height / 2 + 88, height: 430, showCamera: true };
	});

	// Pixi draws canvas text once and never re-renders it when a web font
	// arrives later: if Limelight/Cinzel aren't loaded when the first Text is
	// created, the UI stays in the browser's fallback serif. Mount the Pixi app
	// only once both faces are ready (or after 3s, never block the game).
	let fontsReady = $state(false);
	onMount(() => {
		context.stateLayout.showLoadingScreen = true;
		const faces = ['400 32px Limelight', '400 32px Cinzel', '700 32px Cinzel'].map((f) => document.fonts?.load(f));
		Promise.race([Promise.allSettled(faces), new Promise((r) => setTimeout(r, 3000))]).then(() => (fontsReady = true));
	});

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});
</script>

{#if fontsReady}
<App>
	<EnableSound />
	<EnableHotkey />
	<EnableGameActor />
	<EnablePixiExtension />

	<Background />

	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
	{:else}
		<ResumeBet />
		<!--
			The reason why <Sound /> is rendered after clicking the loading screen:
			"Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
			Ref: https://developer.chrome.com/blog/autoplay
		-->
		<Sound />

		<MainContainer>
			<BoardFrame />
		</MainContainer>

		<MainContainer>
			<Board />
			<Anticipations />
		</MainContainer>

		<MainContainer>
			<PipPuppet {...pipPlacement} />
			<!-- desktop only (landscape puts buttons there); hidden during free spins, where the spin counter takes that corner -->
			{#if context.stateLayoutDerived.layoutType() === 'desktop' && context.stateGame.gameType !== 'freegame'}
				{@const board = context.stateGameDerived.boardLayout()}
				<!-- stage right of the screen frame (its outer edge is ~1.03 board heights from the centre) -->
				<MaxWinPlaque x={board.x + board.height * 1.03 * board.scale + 112} y={board.y - board.height * 0.15} width={190} />
			{/if}
		</MainContainer>

		<UI>
			{#snippet gameName()}
				<UiGameName name="SLAPSTICK" />
			{/snippet}
			{#snippet logo()}
				<!-- the SLAPSTICK wordmark already sits by the clock (UiGameName) -->
			{/snippet}
		</UI>
		<Win />
		<FreeSpinIntro />
		{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
			<FreeSpinCounter />
		{/if}
		<FreeSpinOutro />
		<Transition />
	{/if}

	<FilmOverlay />
</App>
{/if}

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
	{#snippet payTable()}
		<PayTableContent />
	{/snippet}
	{#snippet gameRules()}
		<GameRulesContent />
	{/snippet}
</Modals>
