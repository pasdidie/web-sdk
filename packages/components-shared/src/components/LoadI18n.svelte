<script lang="ts">
	// https://lingui.dev/installation#vite
	// https://lingui.dev/tutorials/javascript
	// https://lingui.dev/ref/vite-plugin

	import { stateI18nDerived } from 'state-shared';

	import { onMount, type Snippet } from 'svelte';

	import { stateUrlDerived, type Language } from 'state-shared';
	import type { MessagesMap } from 'utils-shared/i18n';

	type Props = {
		debug?: boolean;
		children: Snippet;
		messagesMap: MessagesMap;
	};

	const props: Props = $props();

	let loaded = $state(false);

	// Engine guideline [240]: an unsupported lang code must fall back to
	// English, not break the display. props.messagesMap[lang] simply returns
	// undefined for a code with no catalog (e.g. lang=zz) -- it never throws
	// -- so the try/catch fallback below, which only reacts to a thrown
	// error, never actually triggered for this case. Checking the lookup
	// explicitly closes that gap.
	const loadMessages = (lang: Language) => {
		const messages = props.messagesMap[lang];
		if (props.debug) console.log({ messages });
		if (!messages) throw new Error(`No message catalog for lang "${lang}"`);
		return messages;
	};

	onMount(() => {
		try {
			const messages = loadMessages(stateUrlDerived.lang());
			stateI18nDerived.init(stateUrlDerived.lang(), messages);
		} catch (error) {
			console.error("Loading fallback locale 'en' because of error", error);
			try {
				const messages = loadMessages('en');
				stateI18nDerived.init('en', messages);
			} catch (error) {
				console.error("Loading fallback locale 'en' without any messages because of error", error);
				stateI18nDerived.init('en', {});
			}
		}
		loaded = true;
	});
</script>

{#if loaded}
	{@render props.children()}
{/if}
