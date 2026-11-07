<script lang="ts">
	/**
	 * Full-screen "old print" look (docs/CONCEPT.md section 4): grain,
	 * scratches, vignette and a light projector flicker, applied as one
	 * OldFilmFilter on the Pixi stage. Sepia is 0 because every asset is
	 * already film-toned by tools/assets/monochrome.py. Animation runs at the
	 * display rate (smooth), only the grain seed is re-rolled per frame.
	 * Disabled entirely with prefers-reduced-motion (photosensitivity).
	 */
	import { OldFilmFilter, AdjustmentFilter } from 'pixi-filters';
	import { getContextApp } from 'pixi-svelte';

	import { prefersReducedMotion } from '../game/animationConfig';
	import { getContext } from '../game/context';

	const app = getContextApp();
	const context = getContext();

	// The vignette darkens the whole stage, UI included: on a tall portrait
	// screen the bet controls sit in its darkest band, so keep it light there.
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	let film: OldFilmFilter | undefined = $state();
	$effect(() => {
		if (!film) return;
		film.vignetting = portrait ? 0.2 : 0.32;
		film.vignettingAlpha = portrait ? 0.4 : 0.75;
	});

	// $effect (not onMount): the Pixi application is created asynchronously by <App>.
	$effect(() => {
		if (prefersReducedMotion()) return;
		const stage = app.stateApp.pixiApplication?.stage;
		if (!stage) return;

		const filmFilter = new OldFilmFilter({
			sepia: 0,
			noise: 0.18,
			noiseSize: 1,
			scratch: 0.35,
			scratchDensity: 0.25,
			scratchWidth: 1,
			vignetting: 0.32,
			vignettingAlpha: 0.75,
			vignettingBlur: 0.35,
		});
		const flicker = new AdjustmentFilter({ brightness: 1, contrast: 1.04 });
		film = filmFilter;
		stage.filters = [flicker, filmFilter];

		let frame = 0;
		let t = 0;
		const tick = () => {
			t += 1 / 60;
			filmFilter.seed = Math.random();
			// Two detuned sines + a rare dip read as an uneven projector lamp.
			const dip = Math.random() < 0.01 ? 0.06 : 0;
			flicker.brightness = 1 + Math.sin(t * 13) * 0.012 + Math.sin(t * 31) * 0.008 - dip;
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(frame);
			stage.filters = [];
			filmFilter.destroy();
			film = undefined;
			flicker.destroy();
		};
	});
</script>
