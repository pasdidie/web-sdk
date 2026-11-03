/**
 * Tiny pub/sub for visual-only effects (particles, win lines, screen shake).
 * Kept separate from the typed game eventEmitter on purpose: nothing here
 * ever awaits, blocks the book-event sequence or carries game data -- it's
 * pure decoration fired alongside the real events, so a missing listener
 * (e.g. FxLayer not mounted yet) can never stall a bet.
 *
 * Coordinates are in BOARD-LOCAL space (same space as ReelSymbol x/y:
 * getSymbolX(reel), reelSymbol.symbolY()) unless the event says otherwise.
 */

export type FxPoint = { x: number; y: number };

export type FxEvent =
	| { kind: 'reelLand'; reelIndex: number; heavy?: boolean }
	| { kind: 'symbolWin'; points: FxPoint[]; special?: boolean }
	| { kind: 'winLine'; points: FxPoint[]; durationMs: number }
	| { kind: 'scatterLand'; point: FxPoint }
	| { kind: 'shake'; intensity: number; durationMs: number }
	| { kind: 'bigWinStart'; tier: number }
	| { kind: 'bigWinStop' }
	| { kind: 'forgeStrike' };

type Listener = (event: FxEvent) => void;

const listeners = new Set<Listener>();

export const fx = {
	emit(event: FxEvent) {
		for (const listener of listeners) {
			try {
				listener(event);
			} catch (error) {
				// Decoration must never break gameplay.
				console.error('fx listener failed', error);
			}
		}
	},
	subscribe(listener: Listener) {
		listeners.add(listener);
		return () => listeners.delete(listener);
	},
};
