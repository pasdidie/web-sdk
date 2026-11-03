<script lang="ts">
	/**
	 * Mounts a ParticleSystem (game/particles.ts) at the current pixi-svelte
	 * parent and ticks it. `onframe` runs every frame with the system and the
	 * frame delta so the owner can spawn continuously (fountains, embers)
	 * without managing its own ticker.
	 */
	import * as PIXI from 'pixi.js';
	import { onDestroy } from 'svelte';
	import { getContextApp, getContextParent } from 'pixi-svelte';

	import { ParticleSystem, getFxTexture } from '../game/particles';

	type Props = {
		max?: number;
		zIndex?: number;
		onready?: (system: ParticleSystem, tex: (key: string) => PIXI.Texture) => void;
		onframe?: (system: ParticleSystem, deltaMs: number, tex: (key: string) => PIXI.Texture) => void;
	};

	const props: Props = $props();
	const app = getContextApp();
	const parent = getContextParent();

	// svelte-ignore state_referenced_locally
	const system = new ParticleSystem(props.max ?? 150);
	// svelte-ignore state_referenced_locally
	system.container.zIndex = props.zIndex ?? 0;
	parent.addToParent(system.container);

	const tex = (key: string) => getFxTexture(app.stateApp.loadedAssets, key);
	// svelte-ignore state_referenced_locally
	props.onready?.(system, tex);

	const tick = (ticker: PIXI.Ticker) => {
		const dt = Math.min(ticker.deltaMS, 50);
		props.onframe?.(system, dt, tex);
		system.update(dt);
	};

	let attached: PIXI.Ticker | undefined;
	$effect(() => {
		const ticker = app.stateApp.pixiApplication?.ticker;
		if (ticker && ticker !== attached) {
			attached?.remove(tick);
			ticker.add(tick);
			attached = ticker;
		}
	});

	onDestroy(() => {
		attached?.remove(tick);
		system.destroy();
	});
</script>
