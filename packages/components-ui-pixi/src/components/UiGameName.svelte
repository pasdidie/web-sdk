<script lang="ts">
	/**
	 * `props.name` is kept only as a fallback/accessibility label (and so
	 * callers don't need to change) -- the visible wordmark is the real
	 * `title_logo` asset (game-specific, baked-in typography), not code text.
	 */
	import { SvelteDate } from 'svelte/reactivity';

	import { Text, Sprite, REM } from 'pixi-svelte';
	import { WHITE } from 'constants-shared/colors';

	type Props = {
		name: string;
	};

	const props: Props = $props();
	const LOGO_ASPECT_RATIO = 3584 / 1184;
	const LOGO_HEIGHT = REM * 2.5;
	const reactiveDate = new SvelteDate();
	const clock = $derived(
		reactiveDate.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
		}),
	);
	const textProps = {
		style: {
			fontFamily: 'Cinzel',
			fontSize: REM * 1.5,
			fontWeight: '600',
			lineHeight: REM * 2,
			fill: WHITE,
		},
	} as const;

	let clockSizes = $state({ width: 0, height: 0 });

	$effect(() => {
		const interval = setInterval(() => {
			reactiveDate.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<Text text={clock} onresize={(value) => (clockSizes = value)} {...textProps} />
<Sprite
	key="title_logo"
	x={clockSizes.width + 12}
	y={(textProps.style.lineHeight - LOGO_HEIGHT) / 2}
	width={LOGO_HEIGHT * LOGO_ASPECT_RATIO}
	height={LOGO_HEIGHT}
/>
