<script lang="ts">
	/**
	 * The winning payline, drawn on like a pen stroke from the left edge of
	 * the screen through each winning symbol (stateGame.winLine). It sits in
	 * the animated board layer: above the dimmed symbols, below the winners
	 * stepping into the spotlight. A dark underlay keeps the cream stroke
	 * readable over both light and dark art.
	 */
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { Graphics } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { REEL_PITCH, SYMBOL_SIZE } from '../game/constants';
	import { getSymbolX } from '../game/utils';
	import { ANIMATION_CONFIG, prefersReducedMotion } from '../game/animationConfig';

	const context = getContext();
	const cfg = ANIMATION_CONFIG.winLine;

	// Reel symbols are padded with one hidden row on top (reelY rests at -SYMBOL_SIZE).
	const nodes = $derived(
		[...context.stateGame.winLine]
			.sort((a, b) => a.reel - b.reel)
			.map((position) => ({ x: getSymbolX(position.reel), y: (position.row - 0.5) * SYMBOL_SIZE })),
	);
	const path = $derived(
		nodes.length
			? [
					{ x: nodes[0].x - REEL_PITCH * 0.5, y: nodes[0].y },
					...nodes,
					{ x: nodes[nodes.length - 1].x + REEL_PITCH * 0.5, y: nodes[nodes.length - 1].y },
				]
			: [],
	);

	const progress = new Tween(0, { easing: cubicOut });
	$effect(() => {
		if (!path.length) return;
		progress.set(0, { duration: 0 });
		progress.set(1, { duration: prefersReducedMotion() ? 0 : cfg.drawMs });
	});

	const draw = (g: import('pixi.js').Graphics) => {
		if (path.length < 2) return;
		const lengths = path.slice(1).map((point, i) => Math.hypot(point.x - path[i].x, point.y - path[i].y));
		let remaining = lengths.reduce((sum, length) => sum + length, 0) * progress.current;
		const visible = [path[0]];
		for (let i = 1; i < path.length && remaining > 0; i++) {
			const step = Math.min(1, remaining / lengths[i - 1]);
			const from = path[i - 1];
			visible.push({ x: from.x + (path[i].x - from.x) * step, y: from.y + (path[i].y - from.y) * step });
			remaining -= lengths[i - 1];
		}
		const stroke = (width: number, color: number, alpha: number) => {
			g.moveTo(visible[0].x, visible[0].y);
			visible.slice(1).forEach((point) => g.lineTo(point.x, point.y));
			g.stroke({ width, color, alpha, cap: 'round', join: 'round' });
		};
		stroke(cfg.shadowWidth, 0x0d0d0d, 0.55);
		stroke(cfg.width, cfg.color, 0.95);
		// a rivet on each winning symbol the stroke has reached
		nodes.forEach((node) => {
			if (visible.some((point) => point.x >= node.x - 0.5)) {
				g.circle(node.x, node.y, cfg.width * 1.6).fill({ color: cfg.color, alpha: 0.95 });
			}
		});
	};
</script>

{#if path.length}
	<Graphics draw={(g) => draw(g)} />
{/if}
