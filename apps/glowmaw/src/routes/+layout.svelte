<script lang="ts">
	import { type Snippet } from 'svelte';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoadI18n } from 'components-shared';
	import { stateMeta } from 'state-shared';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { betModeMeta } from '../game/betModeMeta';
	import messagesMap from '../i18n/messagesMap';

	type Props = { children: Snippet };
	const props: Props = $props();

	stateMeta.betModeMeta = betModeMeta();
	setContext();
</script>

<GlobalStyle>
	<Authenticate>
		<LoadI18n {messagesMap}>
			<Game />
		</LoadI18n>
	</Authenticate>
</GlobalStyle>

{@render props.children()}
