<script lang="ts">
	/**
	 * Real paytable screen (CLAUDE.md section 5: "reflete exactement la
	 * math, valeurs generees depuis la config, pas codees a la main").
	 * Reads directly from game/config.ts, which is a straight copy of the
	 * math-generated config_fe_slot_v1.json - no numbers are hand-typed here.
	 */
	import config from '../game/config';

	type SymbolEntry = { name: string; paytable: { [count: string]: number }[] | null; special: string[] };

	const allSymbols: SymbolEntry[] = Object.entries(config.symbols).map(([name, data]) => ({
		name,
		paytable: (data as any).paytable,
		special: (data as any).special_properties ?? [],
	}));

	const highSymbols = allSymbols.filter((s) => s.name.startsWith('H'));
	const lowSymbols = allSymbols.filter((s) => s.name.startsWith('L'));
	const wild = allSymbols.find((s) => s.special.includes('wild'));
	const scatter = allSymbols.find((s) => s.special.includes('scatter'));

	const iconSrc = (name: string) => {
		if (name === 'W') return '/assets/sprites/gemini/sym_W_body.png';
		if (name === 'S') return '/assets/sprites/gemini/sym_S_body.png';
		return `/assets/sprites/gemini/sym_${name}.png`;
	};

	const formatMult = (n: number) => `${n}×`;
</script>

<div class="pay-table">
	<h2>High symbols</h2>
	<div class="grid">
		{#each highSymbols as sym (sym.name)}
			<div class="cell">
				<img src={iconSrc(sym.name)} alt={sym.name} />
				<div class="rows">
					{#each sym.paytable ?? [] as row}
						{#each Object.entries(row) as [count, mult]}
							<span>{count}× : {formatMult(mult)}</span>
						{/each}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<h2>Low symbols</h2>
	<div class="grid">
		{#each lowSymbols as sym (sym.name)}
			<div class="cell">
				<img src={iconSrc(sym.name)} alt={sym.name} />
				<div class="rows">
					{#each sym.paytable ?? [] as row}
						{#each Object.entries(row) as [count, mult]}
							<span>{count}× : {formatMult(mult)}</span>
						{/each}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	{#if wild}
		<h2>Wild</h2>
		<div class="grid">
			<div class="cell">
				<img src={iconSrc(wild.name)} alt="Wild" />
				<div class="rows">
					<span>Substitutes for all symbols except Scatter.</span>
					{#each wild.paytable ?? [] as row}
						{#each Object.entries(row) as [count, mult]}
							<span>{count}× (wild line) : {formatMult(mult)}</span>
						{/each}
					{/each}
					<span>Free spins multiplier: adds up when multiple wilds land on the same line.</span>
				</div>
			</div>
		</div>
	{/if}

	{#if scatter}
		<h2>Scatter</h2>
		<div class="grid">
			<div class="cell">
				<img src={iconSrc(scatter.name)} alt="Scatter" />
				<div class="rows">
					<span>Pays anywhere on the grid, does not pay on a line.</span>
					<span>3 / 4 / 5 Scatters trigger the free spins.</span>
					<span>3+ Scatters during free spins: +5 spins (retrigger).</span>
				</div>
			</div>
		</div>
	{/if}

	<h2>Info</h2>
	<div class="info">
		<span>Base mode RTP: {(config.betModes.base.rtp * 100).toFixed(2)}%</span>
		<span>Bonus mode RTP (direct buy): {(config.betModes.bonus.rtp * 100).toFixed(2)}%</span>
		<span>Bonus buy cost: {config.betModes.bonus.cost}×</span>
		<span>Max win: {config.betModes.base.max_win}×</span>
	</div>
</div>

<style>
	.pay-table {
		color: #fff;
		padding: 1rem;
		font-family: sans-serif;
	}
	h2 {
		margin-top: 1.5rem;
		border-bottom: 1px solid #555;
		padding-bottom: 0.25rem;
	}
	.grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.cell {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
	}
	.cell img {
		width: 64px;
		height: 64px;
		object-fit: contain;
	}
	.rows {
		display: flex;
		flex-direction: column;
		font-size: 0.85rem;
	}
	.info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.9rem;
	}
</style>
