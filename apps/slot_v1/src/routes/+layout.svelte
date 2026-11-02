<script lang="ts">
	import { type Snippet } from 'svelte';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoadI18n } from 'components-shared';
	import { stateMeta } from 'state-shared';
	import Game from '../components/Game.svelte';
	import LoaderAzureAnvil from '../components/LoaderAzureAnvil.svelte';
	import { setContext } from '../game/context';
	import { betModeMeta } from '../game/betModeMeta';

	import messagesMap from '../i18n/messagesMap';

	type Props = { children: Snippet };

	const props: Props = $props();

	// Replaces state-shared's template Buy Bonus content (5 fake modes --
	// DOUBLE BOOST/SAMURAI SPIN/etc, see docs/DECISIONS.md) with our real
	// bet modes (base + 3 buy-bonus tiers).
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

<!--
	No LoaderStakeEngine ("Powered By [Stake logo]" splash) here -- the
	Engine approval checklist's PreChecks explicitly says the submitted
	game should not contain it (see docs/DECISIONS.md). Straight to our
	own loader.
-->
<LoaderAzureAnvil />

{@render props.children()}