<script lang="ts">
	/** Real rules screen, reads grid size/paylines/RTP/max win from game/config.ts. */
	import config from '../game/config';

	const numPaylines = Object.keys(config.paylines).length;
</script>

<div class="rules">
	<h2>How to play</h2>
	<p>
		{config.numReels}-reel, {config.numRows[0]}-row grid, {numPaylines} fixed paylines. Wins pay
		left to right, only the best win per line counts.
	</p>

	<h2>Wild</h2>
	<p>
		The Wild substitutes for all symbols except Scatter. During free spins, each Wild can carry a
		multiplier (×2, ×3, ×5, rarely ×10); multiple wild multipliers on the same line add up.
	</p>

	<h2>Scatter and free spins</h2>
	<p>
		Scatter pays anywhere on the grid (not on a line). 3, 4 or 5 Scatters trigger 10, 12 or 15
		free spins respectively. During free spins, 3 or more Scatters retrigger +5 extra spins,
		within the same round.
	</p>

	<h2>Bonus buy</h2>
	<p>
		Bonus mode lets you buy direct access to the free spins for {config.betModes.bonus.cost}× the
		bet.
	</p>

	<h2>RTP and max win</h2>
	<p>
		Base mode RTP: {(config.betModes.base.rtp * 100).toFixed(2)}%. Bonus mode RTP:
		{(config.betModes.bonus.rtp * 100).toFixed(2)}%. Max win: {config.betModes.base.max_win}× the
		bet.
	</p>

	<h2>Independent rounds</h2>
	<p>Every bet is independent: no progression or persistent element carries over between rounds.</p>
</div>

<style>
	.rules {
		color: #fff;
		padding: 1rem;
		font-family: sans-serif;
		max-width: 600px;
	}
	h2 {
		margin-top: 1.25rem;
		border-bottom: 1px solid #555;
		padding-bottom: 0.25rem;
	}
	p {
		font-size: 0.9rem;
		line-height: 1.4;
	}
</style>
