/** App-level UI state for the bespoke bar and HTML panels. */
const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

let msgTimer: ReturnType<typeof setTimeout> | undefined;

export const stateUiGame = $state({
	modal: null as null | 'buy' | 'auto' | 'info' | 'settings' | 'bet',
	anteOn: false,
	message: '',
	reducedMotion: !!prefersReduced,
	uiVisible: true,
	sceneReady: false,
	started: false,
	spin: () => {},
	flashMessage(text: string, ms = 2200) {
		stateUiGame.message = text;
		clearTimeout(msgTimer);
		msgTimer = setTimeout(() => (stateUiGame.message = ''), ms);
	},
});
