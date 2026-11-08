import type { Scene } from '../scene/Scene';

/** The live scene (set by SceneHost once Pixi is up). Book handlers drive it. */
export const sceneRef: { scene: Scene | null; ready: Promise<Scene>; resolve: (s: Scene) => void } = (() => {
	let resolve!: (s: Scene) => void;
	const ready = new Promise<Scene>((r) => (resolve = r));
	return { scene: null, ready, resolve: (s: Scene) => { sceneRef.scene = s; resolve(s); } };
})();

export const getScene = () => sceneRef.ready;
