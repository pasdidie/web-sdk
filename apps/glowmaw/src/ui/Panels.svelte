<script lang="ts">
	/**
	 * Bespoke HTML panels in the GLOWMAW look: buy feature (with cost
	 * confirmation, Engine [31]), autoplay setup (confirmation, [104]), bet
	 * levels, settings, full game info (paytable/rules/controls/disclaimer from
	 * the generated config) and RGS errors. Social wording when social=true.
	 */
	import {
		stateBet,
		stateBetDerived,
		stateConfig,
		stateModal,
		stateSound,
		stateUi,
		stateUrlDerived,
		AUTO_SPINS_TEXT_OPTIONS,
		AUTO_SPINS_TEXT_OPTION_MAP,
		AUTO_SPINS_LOSS_LIMIT_MULTIPLIER_MAP,
		AUTO_SPINS_SINGLE_WIN_LIMIT_MULTIPLIER_MAP,
		LOSS_LIMIT_TEXT_OPTIONS,
		SINGLE_WIN_LIMIT_TEXT_OPTIONS,
	} from 'state-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';

	import config from '../game/config';
	import { formatCurrency } from '../game/format';
	import { stateUiGame } from '../game/stateUiGame.svelte';
	import { assetUrl } from './assetUrl';

	const { eventEmitter } = getContextEventEmitter<any>();
	const social = $derived(stateUrlDerived.social());
	const W = (bet: string, play: string) => (social ? play : bet);

	const close = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUiGame.modal = null;
		confirming = null;
	};

	// ---------------------------------------------------------------- buy
	type BuyMode = 'bonus' | 'super';
	let confirming = $state<BuyMode | null>(null);
	const buyCards: { mode: BuyMode; name: string; text: string; img: string }[] = [
		{ mode: 'bonus', name: 'FEEDING FRENZY', text: '12 to 20 free spins. Every Glow Orb feeds the Lure, which multiplies every winning free spin.', img: 'buy_frenzy' },
		{ mode: 'super', name: 'SUPER FRENZY', text: '12 to 20 free spins with the Lure already lit at ×25.', img: 'buy_super' },
	];
	const costOf = (mode: BuyMode) => stateBet.betAmount * config.betModes[mode].cost;
	const canAfford = (mode: BuyMode) => costOf(mode) <= stateBet.balanceAmount;
	const confirmBuy = () => {
		if (!confirming || !canAfford(confirming)) return;
		stateBet.activeBetModeKey = confirming;
		stateUiGame.modal = null;
		confirming = null;
		eventEmitter.broadcast({ type: 'soundPressBet' });
		eventEmitter.broadcast({ type: 'bet' });
	};

	// ---------------------------------------------------------------- autoplay
	const startAuto = () => {
		if (!stateBetDerived.isBetCostAvailable()) return;
		stateBet.autoSpinsCounter = AUTO_SPINS_TEXT_OPTION_MAP[stateUi.autoSpinsText];
		stateBet.autoSpinsLossLimitAmount = stateBet.betAmount * AUTO_SPINS_LOSS_LIMIT_MULTIPLIER_MAP[stateUi.autoSpinsLossLimitText];
		stateBet.autoSpinsSingleWinLimitAmount = stateBet.betAmount * AUTO_SPINS_SINGLE_WIN_LIMIT_MULTIPLIER_MAP[stateUi.autoSpinsSingleWinLimitText];
		if (stateBetDerived.activeBetMode()?.type === 'buy') stateBet.activeBetModeKey = stateUiGame.anteOn ? 'ante' : 'base';
		stateUiGame.modal = null;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		eventEmitter.broadcast({ type: 'autoBet' });
	};

	// ---------------------------------------------------------------- info
	let tab = $state<'symbols' | 'features' | 'rules' | 'controls'>('symbols');
	const PAY_ORDER = ['H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4', 'L5'];
	const NAMES: Record<string, string> = { H1: 'Golden Nautilus', H2: 'Vampire Squid', H3: 'Crown Jelly', H4: 'Sea Dragon', L1: 'Ruby Urchin', L2: 'Emerald Star', L3: 'Sapphire Shell', L4: 'Amber Crystal', L5: 'Amethyst Shard' };
	const payFor = (sym: string, n: number) => {
		const table = (config.symbols as any)[sym]?.paytable as Record<string, number>[] | null;
		const row = table?.find((r) => Object.keys(r)[0] === String(n));
		return row ? Object.values(row)[0] : 0;
	};
	const amountFor = (x: number) => formatCurrency(stateBet.betAmount * x);
	const modes = $derived([
		{ key: 'base', name: 'Base game', cost: config.betModes.base.cost },
		{ key: 'ante', name: 'Lure Bait', cost: config.betModes.ante.cost },
		{ key: 'bonus', name: 'Feeding Frenzy', cost: config.betModes.bonus.cost },
		{ key: 'super', name: 'Super Frenzy', cost: config.betModes.super.cost },
	] as const);
	const pct = (v: number) => `${(v * 100).toFixed(2)}%`;

	// ---------------------------------------------------------------- bet levels
	const pickBet = (v: number) => {
		stateBetDerived.setBetAmount(v);
		close();
	};

	// errors from the shared RGS layer
	const error = $derived(stateModal.modal?.name === 'error' ? (stateModal.modal as any).error : null);
</script>

{#if stateUiGame.modal || stateModal.modal?.name === 'error'}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="veil" onclick={(e) => e.target === e.currentTarget && stateModal.modal?.name !== 'error' && close()}>
		{#if stateModal.modal?.name === 'error'}
			<div class="panel small">
				<h2>CONNECTION PROBLEM</h2>
				<p class="lead">Sorry, something went wrong. Please reload the game to continue any unfinished round.</p>
				{#if error}<p class="err">{error?.error ?? ''} {error?.message ?? (typeof error === 'string' ? error : '')}</p>{/if}
				<button class="cta" onclick={() => location.reload()}>RELOAD</button>
			</div>
		{:else if stateUiGame.modal === 'buy'}
			<div class="panel">
				<button class="x" onclick={close} aria-label="close">✕</button>
				{#if !confirming}
					<h2>{W('BUY FEATURE', 'GET FEATURE')}</h2>
					<div class="buy-grid">
						{#each buyCards as c}
							<button class="buy-card" class:poor={!canAfford(c.mode)} onclick={() => (confirming = c.mode)}>
								<div class="buy-art" style="background-image: url({assetUrl(c.img)})"></div>
								<h3>{c.name}</h3>
								<p>{c.text}</p>
								<div class="price">{formatCurrency(costOf(c.mode))}</div>
								<div class="mult">{config.betModes[c.mode].cost}× {W('BET', 'PLAY')} · RTP {pct(config.betModes[c.mode].rtp)}</div>
							</button>
						{/each}
					</div>
				{:else}
					<h2>{confirming === 'bonus' ? 'FEEDING FRENZY' : 'SUPER FRENZY'}</h2>
					<p class="lead">
						{W('Buy', 'Play')} {confirming === 'bonus' ? 'Feeding Frenzy' : 'Super Frenzy'} {W('for', 'for')}
						<b class="hot">{formatCurrency(costOf(confirming))}</b> ({config.betModes[confirming].cost}× your {W('bet', 'play')})?
					</p>
					{#if !canAfford(confirming)}<p class="warn">{W('Insufficient balance for this feature.', 'Not enough balance for this feature.')}</p>{/if}
					<div class="row">
						<button class="ghost" onclick={() => (confirming = null)}>BACK</button>
						<button class="cta" disabled={!canAfford(confirming)} onclick={confirmBuy}>{W('BUY', 'PLAY')} · {formatCurrency(costOf(confirming))}</button>
					</div>
				{/if}
			</div>
		{:else if stateUiGame.modal === 'auto'}
			<div class="panel small auto">
				<button class="x" onclick={close} aria-label="close">✕</button>
				<h2>AUTOPLAY</h2>
				<h4>NUMBER OF SPINS</h4>
				<div class="chips fill">
					{#each AUTO_SPINS_TEXT_OPTIONS as o}
						<button class:on={stateUi.autoSpinsText === o} onclick={() => (stateUi.autoSpinsText = o)}>{o}</button>
					{/each}
				</div>
				<h4>STOP IF LOSS EXCEEDS ({W('× BET', '× PLAY')})</h4>
				<div class="chips fill">
					{#each LOSS_LIMIT_TEXT_OPTIONS as o}
						<button class:on={stateUi.autoSpinsLossLimitText === o} onclick={() => (stateUi.autoSpinsLossLimitText = o)}>{o}</button>
					{/each}
				</div>
				<h4>STOP IF A SINGLE WIN EXCEEDS ({W('× BET', '× PLAY')})</h4>
				<div class="chips fill">
					{#each SINGLE_WIN_LIMIT_TEXT_OPTIONS as o}
						<button class:on={stateUi.autoSpinsSingleWinLimitText === o} onclick={() => (stateUi.autoSpinsSingleWinLimitText = o)}>{o}</button>
					{/each}
				</div>
				<button class="cta" disabled={!stateBetDerived.isBetCostAvailable()} onclick={startAuto}>START AUTOPLAY</button>
			</div>
		{:else if stateUiGame.modal === 'bet'}
			<div class="panel small">
				<button class="x" onclick={close} aria-label="close">✕</button>
				<h2>{W('BET', 'PLAY AMOUNT')}</h2>
				<!-- every level the RGS offers (betMenuOptions is the shared "most used" subset) -->
				<div class="chips bets">
					{#each stateConfig.betAmountOptions as v}
						<button class:on={Math.abs(stateBet.betAmount - v) < 1e-9} disabled={v * stateBetDerived.betCost() / Math.max(stateBet.betAmount, 1e-9) > stateBet.balanceAmount} onclick={() => pickBet(v)}>{formatCurrency(v)}</button>
					{/each}
				</div>
			</div>
		{:else if stateUiGame.modal === 'settings'}
			<div class="panel small">
				<button class="x" onclick={close} aria-label="close">✕</button>
				<h2>SETTINGS</h2>
				<label class="slider">MASTER<input type="range" min="0" max="100" bind:value={stateSound.volumeValueMaster} /></label>
				<label class="slider">MUSIC<input type="range" min="0" max="100" bind:value={stateSound.volumeValueMusic} /></label>
				<label class="slider">EFFECTS<input type="range" min="0" max="100" bind:value={stateSound.volumeValueSoundEffect} /></label>
				{#if !stateConfig.jurisdiction.disabledTurbo}
					<label class="toggle"><input type="checkbox" checked={stateBet.isTurbo} onchange={(e) => stateBetDerived.updateIsTurbo((e.currentTarget as HTMLInputElement).checked, { persistent: true })} />TURBO SPIN</label>
				{/if}
				<label class="toggle"><input type="checkbox" bind:checked={stateUiGame.reducedMotion} />REDUCE MOTION (no shake, fewer particles, calmer background)</label>
				<div class="row">
					<button class="ghost" onclick={() => ((stateUiGame.modal = 'info'), (tab = 'symbols'))}>GAME INFO</button>
				</div>
				<p class="ver">Glowmaw · math v1.0</p>
			</div>
		{:else if stateUiGame.modal === 'info'}
			<div class="panel wide">
				<button class="x" onclick={close} aria-label="close">✕</button>
				<h2>GAME INFO</h2>
				<div class="tabs">
					<button class:on={tab === 'symbols'} onclick={() => (tab = 'symbols')}>{W('PAYTABLE', 'SYMBOL WINS')}</button>
					<button class:on={tab === 'features'} onclick={() => (tab = 'features')}>FEATURES</button>
					<button class:on={tab === 'rules'} onclick={() => (tab = 'rules')}>RULES</button>
					<button class:on={tab === 'controls'} onclick={() => (tab = 'controls')}>CONTROLS</button>
				</div>
				<div class="scroll">
					{#if tab === 'symbols'}
						<p class="lead">Symbols {W('pay', 'win')} anywhere on the grid when 8 or more of the same kind land. Values shown for the current {W('bet', 'play')} of {formatCurrency(stateBet.betAmount)}.</p>
						<div class="pays">
							{#each PAY_ORDER as s}
								<div class="pay">
									<div class="sym" style="background-image: url({assetUrl('sym_' + s)})"></div>
									<div class="nm">{NAMES[s]}</div>
									<div class="lines">
										<span>12-30</span><b>{amountFor(payFor(s, 12))}</b>
										<span>10-11</span><b>{amountFor(payFor(s, 10))}</b>
										<span>8-9</span><b>{amountFor(payFor(s, 8))}</b>
									</div>
								</div>
							{/each}
						</div>
						<div class="special">
							<div class="sym" style="background-image: url({assetUrl('sym_S')})"></div>
							<p><b>ABYSS PEARL (SCATTER)</b> — 4, 5 or 6+ Pearls anywhere after the tumbles trigger 12, 15 or 20 free spins. During free spins, 3 or more Pearls add 5 more spins.</p>
						</div>
						<div class="special">
							<div class="sym" style="background-image: url({assetUrl('orb_2')})"></div>
							<p><b>GLOW ORB</b> — carries a multiplier from ×2 to ×500. Orbs never dissolve and stay on the grid while it tumbles.</p>
						</div>
					{:else if tab === 'features'}
						<h4>TUMBLES</h4>
						<p>After every win the winning symbols dissolve, the remaining symbols fall down and new symbols fill the gaps. This repeats as long as new wins form. All wins of a spin are added together.</p>
						<h4>GLOW ORBS — BASE GAME</h4>
						<p>When the tumbles of a spin end with a win, the values of every Glow Orb on the grid are added together and the total multiplies the win of that spin.</p>
						<h4>FEEDING FRENZY — FREE SPINS</h4>
						<p>4, 5 or 6+ Abyss Pearls award 12, 15 or 20 free spins. Maw swallows every Glow Orb that lands and adds its value to the <b>Lure</b>. The Lure never resets during the feature, and every winning free spin is multiplied by the Lure's current value. 3 or more Pearls during the feature award 5 more free spins, with no limit on retriggers.</p>
						<h4>LURE BAIT</h4>
						<p>Turn on Lure Bait to {W('bet', 'play')} 1.25× your {W('bet', 'play')} per spin for about double the chance to trigger Feeding Frenzy. Wins are calculated on the base {W('bet', 'play')}.</p>
						<h4>{W('BUY FEATURE', 'GET FEATURE')}</h4>
						<p><b>Feeding Frenzy</b>: {config.betModes.bonus.cost}× the {W('bet', 'play')}, starts the free spins straight away (12, 15 or 20 spins). <b>Super Frenzy</b>: {config.betModes.super.cost}× the {W('bet', 'play')}, same free spins with the Lure starting at ×25. A confirmation showing the cost is always displayed first.</p>
					{:else if tab === 'rules'}
						<h4>RETURN TO PLAYER AND MAX WIN</h4>
						<table>
							<thead><tr><th>Mode</th><th>{W('Cost', 'Price')}</th><th>RTP</th><th>Max win</th></tr></thead>
							<tbody>
								{#each modes as m}
									<tr><td>{m.name}</td><td>{m.cost}×</td><td>{pct(config.betModes[m.key].rtp)}</td><td>{config.betModes[m.key].max_win.toLocaleString('en-US')}×</td></tr>
								{/each}
							</tbody>
						</table>
						<h4>GENERAL</h4>
						<ul>
							<li>The grid has 6 reels and 5 rows. Wins {W('pay', 'count')} anywhere: 8 or more identical symbols on the grid form a win, regardless of position.</li>
							<li>Only the highest win per symbol counts in each tumble. Wins of different symbols in the same tumble are added.</li>
							<li>Free spins are played at the {W('bet', 'play')} that triggered them.</li>
							<li>The maximum win is {config.betModes.base.max_win.toLocaleString('en-US')}× the base {W('bet', 'play')} in every mode. When it is reached the round ends immediately and the win is awarded.</li>
							<li>Malfunction voids all wins and plays.</li>
							<li>A consistent internet connection is required. In the event of a disconnection, reload the game to finish any uncompleted rounds.</li>
							<li>The expected return is calculated over many plays.</li>
							<li>The game display is not representative of any physical device and is for illustrative purposes only.</li>
							<li>Winnings are settled according to the amount received from the Remote Game Server and not from events within the web browser.</li>
							<li>TM and © 2026 Engine.</li>
						</ul>
					{:else}
						<table class="controls">
							<tbody>
								<tr><td>SPIN</td><td>Starts a spin (space bar does the same). While a spin plays, press again to stop the reels quickly.</td></tr>
								<tr><td>+ / −</td><td>Raise or lower the {W('bet', 'play amount')}. Tap the {W('bet', 'play')} amount to choose from all levels.</td></tr>
								<tr><td>AUTOPLAY</td><td>Opens the autoplay setup (number of spins and stop limits); press again to stop autoplay.</td></tr>
								<tr><td>TURBO</td><td>Faster reels and animations.</td></tr>
								<tr><td>LURE BAIT</td><td>Toggles the 1.25× mode with about double free-spin chance.</td></tr>
								<tr><td>{W('BUY', 'GET')} FEATURE</td><td>Opens the feature menu; a cost confirmation is always shown.</td></tr>
								<tr><td>SOUND</td><td>Mutes or restores all sound and music.</td></tr>
								<tr><td>MENU</td><td>Settings: volume of music and effects, turbo, reduce motion, game info.</td></tr>
								<tr><td>INFO</td><td>This game information.</td></tr>
							</tbody>
						</table>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.veil {
		position: fixed;
		inset: 0;
		z-index: 60;
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(ellipse at center, rgba(3, 18, 36, 0.72), rgba(0, 2, 8, 0.9));
		backdrop-filter: blur(3px);
		font-family: 'Exo 2', sans-serif;
		color: #e9fbff;
		animation: fade 0.18s ease-out;
	}
	.panel {
		position: relative;
		width: min(92vw, 820px);
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 22px 26px;
		box-sizing: border-box;
		border-radius: 24px;
		background: linear-gradient(180deg, rgba(16, 60, 86, 0.96), rgba(4, 16, 32, 0.98) 60%, rgba(2, 8, 18, 0.98));
		border: 2px solid rgba(63, 245, 230, 0.7);
		box-shadow: 0 0 40px rgba(63, 245, 230, 0.25), 0 0 80px rgba(155, 92, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25);
		animation: pop 0.28s cubic-bezier(0.2, 1.4, 0.4, 1);
	}
	.panel.small { width: min(92vw, 520px); }
	.panel.wide { width: min(96vw, 940px); height: min(90vh, 760px); }
	h2 { margin: 0; text-align: center; font-weight: 900; font-style: italic; letter-spacing: 0.08em; font-size: clamp(20px, 3vw, 30px); color: #9ffcf3; text-shadow: 0 0 14px rgba(63, 245, 230, 0.9); }
	h3 { margin: 8px 0 4px; font-size: clamp(16px, 1.5vw, 22px); letter-spacing: 0.06em; font-weight: 900; font-style: italic; color: #ffd27a; text-shadow: 0 0 10px rgba(255, 184, 74, 0.7); }
	h4 { margin: 14px 0 6px; font-weight: 800; letter-spacing: 0.12em; font-size: 14px; color: #8fe9ff; }
	p, li, td { text-wrap: pretty; font-size: clamp(14px, 1.05vw, 16px); line-height: 1.45; font-weight: 600; color: #d4ecf4; }
	.lead { text-align: center; font-size: clamp(15px, 1.15vw, 17px); }
	.hot { color: #ffd27a; font-size: 1.2em; }
	.warn, .err { color: #ff8aa8; text-align: center; }
	.x { position: absolute; right: 12px; top: 10px; width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(63, 245, 230, 0.6); background: rgba(3, 18, 34, 0.9); color: #e9fbff; font-size: 18px; cursor: pointer; }
	button { font-family: inherit; }
	.cta, .ghost, .chips button, .tabs button {
		cursor: pointer;
		border-radius: 14px;
		font-weight: 900;
		font-style: italic;
		letter-spacing: 0.08em;
		color: #fff;
		border: 2px solid #3ff5e6;
		transition: transform 0.12s, box-shadow 0.12s;
	}
	.cta { padding: 14px 18px; font-size: 18px; background: linear-gradient(180deg, #23d8cf, #0a6f87 55%, #063a55); box-shadow: 0 0 22px rgba(63, 245, 230, 0.55); text-shadow: 0 0 8px #02121f; flex: 1; }
	.ghost { padding: 14px 18px; font-size: 16px; background: rgba(3, 18, 34, 0.9); flex: 1; }
	.cta:hover:not(:disabled), .ghost:hover, .chips button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 0 26px rgba(63, 245, 230, 0.7); }
	.cta:disabled, .chips button:disabled { opacity: 0.35; cursor: not-allowed; }
	.row { display: flex; gap: 12px; }
	.chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
	.chips button { min-width: 64px; padding: 9px 10px; font-size: 15px; background: rgba(3, 18, 34, 0.9); border-color: rgba(63, 245, 230, 0.45); }
	.chips button.on { background: linear-gradient(180deg, #23d8cf, #0a6f87); border-color: #bff9ff; box-shadow: 0 0 16px rgba(63, 245, 230, 0.7); }
	.chips.bets { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
	.bets button { min-width: 0; }
	/* autoplay: each option group is one even row across the panel (no orphan second row) */
	.panel.auto { width: min(92vw, 620px); }
	.chips.fill { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 6px; }
	.chips.fill button { min-width: 0; padding: 9px 2px; font-size: 14px; }
	.buy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
	.buy-card {
		cursor: pointer;
		border-radius: 18px;
		padding: 10px 12px 14px;
		text-align: center;
		color: #e9fbff;
		background: linear-gradient(180deg, rgba(60, 18, 76, 0.9), rgba(12, 4, 26, 0.95));
		border: 2px solid rgba(255, 63, 180, 0.8);
		box-shadow: 0 0 24px rgba(255, 63, 180, 0.3);
		transition: transform 0.15s, box-shadow 0.15s;
	}
	.buy-card:hover { transform: translateY(-4px); box-shadow: 0 0 36px rgba(255, 63, 180, 0.55); }
	.buy-card.poor { opacity: 0.55; }
	.buy-card { font-size: 14px; display: flex; flex-direction: column; }
	.buy-card p { font-size: clamp(13px, 1.05vw, 15px); min-height: 3.6em; margin: 4px 0 10px; flex: 1; }
	.buy-art { width: 100%; aspect-ratio: 16 / 10; border-radius: 12px; background: #120420 center / cover no-repeat; }
	.price { font-size: clamp(24px, 2.2vw, 32px); font-weight: 900; font-style: italic; color: #fff; text-shadow: 0 0 12px #ff3fb4; }
	.mult { font-size: 13px; font-weight: 700; letter-spacing: 0.1em; color: #ffb3e1; }
	.tabs { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
	.tabs button { padding: 9px 16px; font-size: 14px; background: rgba(3, 18, 34, 0.9); border-color: rgba(63, 245, 230, 0.4); }
	.tabs button.on { background: linear-gradient(180deg, #23d8cf, #0a6f87); border-color: #bff9ff; }
	.scroll { overflow-y: auto; padding-right: 6px; flex: 1; min-height: 0; }
	.scroll h4 + p, .scroll h4 + ul { margin-top: 0; } /* keep each rule title glued to its text */
	.scroll p { margin: 0 0 8px; }
	.scroll::-webkit-scrollbar { width: 6px; }
	.scroll::-webkit-scrollbar-thumb { background: rgba(63, 245, 230, 0.5); border-radius: 6px; }
	.pays { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 10px; } /* 9 symbols: 3x3 on desktop, no orphan row */
	.pay { display: grid; grid-template-columns: 64px 1fr; grid-template-rows: auto 1fr; gap: 0 8px; padding: 8px; border-radius: 14px; background: rgba(4, 22, 40, 0.8); border: 1px solid rgba(63, 245, 230, 0.25); }
	.pay .sym { grid-row: span 2; }
	.sym { width: 64px; height: 64px; background: center / contain no-repeat; filter: drop-shadow(0 0 6px rgba(63, 245, 230, 0.4)); }
	.nm { font-weight: 800; font-size: 13px; letter-spacing: 0.06em; color: #8fe9ff; }
	.lines { display: grid; grid-template-columns: auto 1fr; gap: 0 8px; font-size: 14px; }
	.lines span { color: #8fb8c8; font-weight: 700; }
	.lines b { color: #fff; text-align: right; }
	.special { display: flex; gap: 12px; align-items: center; margin-top: 10px; padding: 8px; border-radius: 14px; background: rgba(4, 22, 40, 0.8); border: 1px solid rgba(255, 63, 180, 0.3); }
	.special .sym { flex: none; }
	table { width: 100%; border-collapse: collapse; }
	th { text-align: left; font-size: 13px; letter-spacing: 0.1em; color: #8fe9ff; padding: 6px; border-bottom: 1px solid rgba(63, 245, 230, 0.3); }
	td { padding: 6px; border-bottom: 1px solid rgba(63, 245, 230, 0.12); }
	.controls td:first-child { font-weight: 900; color: #9ffcf3; white-space: nowrap; width: 1%; }
	.slider { padding: 5px 0; display: grid; grid-template-columns: 100px 1fr; align-items: center; font-weight: 800; font-size: 14px; letter-spacing: 0.1em; color: #8fe9ff; }
	input[type='range'] { accent-color: #3ff5e6; }
	.toggle { display: flex; gap: 10px; align-items: center; font-weight: 700; font-size: 14px; }
	input[type='checkbox'] { width: 20px; height: 20px; accent-color: #3ff5e6; }
	.ver { text-align: center; font-size: 12px; color: #5d8796; margin: 0; }
	@media (max-width: 560px) {
		.panel { padding: 16px 14px; }
		.chips.fill { grid-auto-flow: row; grid-template-columns: repeat(auto-fill, minmax(58px, 1fr)); }
		.buy-grid { grid-template-columns: 1fr; }
		.buy-card { display: grid; grid-template-columns: 38% 1fr; gap: 0 10px; text-align: left; align-items: center; }
		.buy-art { grid-row: span 4; aspect-ratio: 1; }
		.buy-card p { min-height: 0; margin: 0; }
		.price { font-size: 20px; }
	}
	@media (max-height: 460px) {
		.panel { max-height: 96vh; padding: 12px 18px; gap: 6px; }
		.panel.wide { height: 96vh; }
		.buy-art { aspect-ratio: 16 / 6; }
		.cta, .ghost { padding: 9px; }
	}
	@keyframes fade { from { opacity: 0; } }
	@keyframes pop { from { transform: scale(0.85); opacity: 0; } }
</style>
