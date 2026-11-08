<script lang="ts">
	import { type Snippet } from 'svelte';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoadI18n } from 'components-shared';
	import { onMount } from 'svelte';
	import { stateMeta, stateUrlDerived, stateBet } from 'state-shared';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { betModeMeta } from '../game/betModeMeta';
	import messagesMap from '../i18n/messagesMap';

	type Props = { children: Snippet };
	const props: Props = $props();

	stateMeta.betModeMeta = betModeMeta();
	setContext();

	// A replay whose fetch fails never authenticates: say so instead of a black screen (Engine [171]).
	let fatal = $state('');
	// replays have no session/authenticate: take the display currency from the URL (Engine [172])
	if (stateUrlDerived.replay()) {
		const cur = new URLSearchParams(location.search).get('currency');
		if (cur && /^[A-Z]{3}$/.test(cur)) stateBet.currency = cur;
	}
	onMount(() => {
		const onErr = () => {
			if (stateUrlDerived.replay()) fatal = 'This replay could not be loaded. Please check the link and try again.';
		};
		window.addEventListener('unhandledrejection', onErr);
		return () => window.removeEventListener('unhandledrejection', onErr);
	});
</script>

<GlobalStyle>
	<Authenticate>
		<LoadI18n {messagesMap}>
			<Game />
		</LoadI18n>
	</Authenticate>
</GlobalStyle>

{#if fatal}
	<div class="fatal">{fatal}</div>
{/if}

{@render props.children()}

<style>
	.fatal { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; text-align: center; background: #01040c; color: #9ffcf3; font: 800 18px 'Exo 2', sans-serif; }
</style>
