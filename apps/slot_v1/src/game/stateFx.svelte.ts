/** Screen-shake offset shared by everything that should shake with the board. */
export const stateFx = $state({
	shakeX: 0,
	shakeY: 0,
	/**
	 * Win presentation spotlight: while `dimming` is true every board symbol
	 * NOT listed in `highlight` ("reel:row" keys) is drawn dimmed, so the
	 * current winning line reads instantly (top-provider convention).
	 */
	dimming: false,
	highlight: [] as string[],
});

export const positionKey = (reel: number, row: number) => `${reel}:${row}`;
