<script lang="ts">
	/**
	 * Real paytable screen (CLAUDE.md section 5: "reflete exactement la
	 * math, valeurs generees depuis la config, pas codees a la main").
	 * Reads directly from game/config.ts, which is a straight copy of the
	 * math-generated config_fe_slot_v1.json - no numbers are hand-typed here.
	 * Static strings go through stateI18nDerived.translate(), same convention
	 * as GameRulesContent.svelte -- see the comment there for why.
	 */
	import { stateI18nDerived, stateUrlDerived } from 'state-shared';
	import config from '../game/config';
	import assets from '../game/assets';

	const t = stateI18nDerived.translate;
	const social = stateUrlDerived.social;

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

	// Reuses the exact same resolved URLs the Pixi board uses, rather than
	// rebuilding a path by hand -- a hardcoded absolute path like
	// `/assets/sprites/gemini/...` silently breaks the moment the game is
	// hosted under a sub-path (e.g. Stake Engine's own game folder, not
	// domain root), which this plain <img> (unlike Pixi's `new
	// URL(..., import.meta.url)` sprites) was doing.
	const iconSrc = (name: string) => {
		if (name === 'W') return (assets as any).sym_W_body.src;
		if (name === 'S') return (assets as any).sym_S_body.src;
		return (assets as any)[`sym_${name}`].src;
	};

	const formatMult = (n: number) => `${n}×`;

	const baseRtp = (config.betModes.base.rtp * 100).toFixed(2);
	const bonusRtp = (config.betModes.bonus.rtp * 100).toFixed(2);
	const maxWin = config.betModes.base.max_win;
	const bonusCost = config.betModes.bonus.cost;
</script>

<div class="pay-table">
	<h2>{t('High symbols')}</h2>
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

	<h2>{t('Low symbols')}</h2>
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
		<h2>{t('Wild')}</h2>
		<div class="grid">
			<div class="cell">
				<img src={iconSrc(wild.name)} alt="Wild" />
				<div class="rows">
					<span>{t('Substitutes for all symbols except Scatter.')}</span>
					{#each wild.paytable ?? [] as row}
						{#each Object.entries(row) as [count, mult]}
							<span>{count}× ({t('wild line')}) : {formatMult(mult)}</span>
						{/each}
					{/each}
					<span>{t('Free spins multiplier: adds up when multiple wilds land on the same line.')}</span>
				</div>
			</div>
		</div>
	{/if}

	{#if scatter}
		<h2>{t('Scatter')}</h2>
		<div class="grid">
			<div class="cell">
				<img src={iconSrc(scatter.name)} alt="Scatter" />
				<div class="rows">
					<span>
						{social()
							? t('Wins anywhere on the grid, not part of a line.')
							: t('Pays anywhere on the grid, does not pay on a line.')}
					</span>
					<span>{t('3 / 4 / 5 Scatters trigger the free spins.')}</span>
					<span>{t('3+ Scatters during free spins: +5 spins (retrigger).')}</span>
				</div>
			</div>
		</div>
	{/if}

	<h2>{t('Info')}</h2>
	<div class="info">
		<span>{t('Base mode RTP:')} {baseRtp}%</span>
		<span>
			{social()
				? t('Bonus mode RTP (instant access):')
				: t('Bonus mode RTP (direct buy):')}
			{bonusRtp}%
		</span>
		<span>
			{social() ? t('Bonus cost:') : t('Bonus buy cost:')}
			{bonusCost}×
		</span>
		<span>{t('Max win:')} {maxWin}×</span>
	</div>
</div>

<style>
	.pay-table {
		color: #f3e6c8;
		padding: 1rem;
		font-family: 'Cinzel', serif;
	}
	h2 {
		margin-top: 1.5rem;
		color: #d9a63f;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		font-size: 1rem;
		border-bottom: 1px solid rgba(217, 166, 63, 0.4);
		padding-bottom: 0.4rem;
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
		background: linear-gradient(180deg, rgba(60, 40, 20, 0.5) 0%, rgba(10, 6, 3, 0.6) 100%);
		border: 1px solid rgba(217, 166, 63, 0.3);
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
