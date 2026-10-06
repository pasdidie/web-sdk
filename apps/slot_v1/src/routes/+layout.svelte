<script lang="ts">
	import { type Snippet } from 'svelte';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoaderStakeEngine, LoadI18n } from 'components-shared';
	import { stateMeta } from 'state-shared';
	import Game from '../components/Game.svelte';
	import LoaderAzureAnvil from '../components/LoaderAzureAnvil.svelte';
	import { setContext } from '../game/context';
	import { betModeMeta } from '../game/betModeMeta';

	import messagesMap from '../i18n/messagesMap';

	type Props = { children: Snippet };

	const props: Props = $props();

	let showYourLoader = $state(false);

	const loaderUrlStakeEngine = new URL('../../stake-engine-loader.gif', import.meta.url).href;
	const loaderUrl = new URL('../../assets/sprites/gemini/logo.png', import.meta.url).href;

	// Replaces state-shared's template Buy Bonus content (5 fake modes --
	// DOUBLE BOOST/SAMURAI SPIN/etc, see docs/DECISIONS.md) with our real,
	// single bonus-buy mode.
	stateMeta.betModeMeta = betModeMeta;

	setContext();
</script>

<GlobalStyle>
	<Authenticate>
		<LoadI18n {messagesMap}>
			<Game />
		</LoadI18n>
	</Authenticate>
</GlobalStyle>

<LoaderStakeEngine src={loaderUrlStakeEngine} oncomplete={() => (showYourLoader = true)} />

{#if showYourLoader}
	<LoaderAzureAnvil src={loaderUrl} />
{/if}

{@render props.children()}