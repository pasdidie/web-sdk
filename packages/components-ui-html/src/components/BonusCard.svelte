<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		image?: Snippet;
		// A snippet prop is always truthy once declared, even when it renders
		// nothing, so the card can't tell "no artwork" from "artwork here"
		// on its own -- the caller passes this explicitly. Without it a game
		// whose illustration hasn't been produced yet (or whose file 404s)
		// renders a broken-image icon, or an empty framed box.
		hasImage?: boolean;
		title: Snippet;
		description: Snippet;
		price: Snippet;
		button: Snippet;
	};

	const props: Props = $props();
</script>

<div class="bonus-card-wrap">
	{#if props.image && props.hasImage}
		<div class="image">
			{@render props.image()}
		</div>
	{/if}
	<div class="info">
		{@render props.title()}
		{@render props.description()}
		{@render props.price()}
	</div>
	{@render props.button()}
</div>

<style lang="scss">
	.bonus-card-wrap {
		padding: 0.5rem;
		flex-direction: column;
		display: flex;
		justify-content: space-between;

		border-radius: 10px;
		border: 1px solid rgba(217, 166, 63, 0.45);
		background: linear-gradient(180deg, rgba(60, 40, 20, 0.55) 0%, rgba(10, 6, 3, 0.65) 100%);
		text-align: left;
		min-width: 220px;
		max-width: 260px;
		gap: 0.5rem;
	}

	.image {
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: 7px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.3);
	}

	.image :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
