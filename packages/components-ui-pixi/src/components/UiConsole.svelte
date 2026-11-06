<script lang="ts">
	/**
	 * Optional skin plate behind the whole bottom bar (getUiSkin().console):
	 * a nine-slice sprite, so the end caps and rim keep their shape whatever
	 * width each layout needs. Renders nothing for games without a console skin.
	 */
	import * as PIXI from 'pixi.js';
	import { getContextApp, getContextParent } from 'pixi-svelte';

	import { getUiSkin } from '../uiSkin';

	type Props = { x: number; y: number; width: number; height: number };

	const props: Props = $props();
	const skin = getUiSkin().console;
	const app = getContextApp();
	const parentContext = getContextParent();

	if (skin) {
		const plate = new PIXI.NineSliceSprite({
			texture: PIXI.Texture.EMPTY,
			leftWidth: skin.slice.left,
			rightWidth: skin.slice.right,
			topHeight: skin.slice.top,
			bottomHeight: skin.slice.bottom,
		});
		plate.eventMode = 'none';
		// Drawn at the texture's own height then scaled uniformly to the box
		// height, so the end caps keep their proportions and only the plain
		// middle stretches horizontally.
		$effect(() => {
			const texture = app.stateApp.loadedAssets?.[skin.key] as PIXI.Texture | undefined;
			if (!texture) return;
			plate.texture = texture;
			const scale = props.height / texture.height;
			plate.width = Math.max(props.width / scale, skin.slice.left + skin.slice.right);
			plate.height = texture.height;
			plate.scale.set(scale);
			plate.x = props.x;
			plate.y = props.y;
		});
		parentContext.addToParent(plate);
	}
</script>
