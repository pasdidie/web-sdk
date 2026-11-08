<script lang="ts">
	import { onMount } from 'svelte';
	import { App } from 'pixi-svelte';
	import { EnablePixiExtension } from 'components-pixi';
	import { stateBet } from 'state-shared';

	import { getContext } from '../game/context';
	import { stateUiGame } from '../game/stateUiGame.svelte';
	import { sceneRef } from '../game/sceneRef';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import SceneHost from './SceneHost.svelte';
	import Panels from '../ui/Panels.svelte';
	import Intro from '../ui/Intro.svelte';

	const context = getContext();

	// Pixi draws canvas text once: wait for Exo 2 before the first Text is created.
	let fontsReady = $state(false);
	onMount(() => {
		const faces = ['900 italic 32px "Exo 2"', '700 32px "Exo 2"', '800 32px "Exo 2"'].map((f) => document.fonts?.load(f));
		Promise.race([Promise.allSettled(faces), new Promise((r) => setTimeout(r, 3000))]).then(() => (fontsReady = true));

		// Space = the spin button (Engine [228]); never while a panel is open.
		const onKey = (e: KeyboardEvent) => {
			if (e.code !== 'Space') return;
			e.preventDefault();
			if (e.repeat || !stateUiGame.started || stateUiGame.modal) return;
			stateUiGame.spin();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	const start = () => {
		stateUiGame.started = true;
		if (stateBet.activeBetModeKey.toLowerCase() === 'ante') stateUiGame.anteOn = true;
	};
</script>

{#if fontsReady}
	<App>
		<EnableSound />
		<EnableGameActor />
		<EnablePixiExtension />
		<SceneHost started={stateUiGame.started} />
		{#if stateUiGame.started}
			<ResumeBet />
			<Sound />
		{/if}
	</App>
{/if}

{#if !stateUiGame.started}
	<Intro ready={context.stateApp.loaded && stateUiGame.sceneReady} progress={context.stateApp.loadingProgress} onstart={start} />
{/if}
<Panels />
