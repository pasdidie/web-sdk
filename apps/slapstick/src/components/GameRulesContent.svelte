<script lang="ts">
	/**
	 * Real rules screen, reads grid size/paylines/RTP/max win from
	 * game/config.ts. Every player-facing string goes through
	 * stateI18nDerived.translate() (lingui message-ID-is-the-English-text
	 * convention already used by components-ui-pixi/html) so a translator can
	 * add a catalog entry later without touching this file. Strings with a
	 * restricted social-casino word (bet, buy, pay/pays) get an explicit
	 * social-safe alternative via stateUrlDerived.social(), same inline
	 * ternary pattern already used in components-ui-pixi/i18nDerived.ts for
	 * the BET/BUY BONUS button labels -- not a separate sweeps_<lang> file,
	 * to stay consistent with how this codebase already does it.
	 */
	import { stateI18nDerived, stateUrlDerived } from 'state-shared';
	import config from '../game/config';
	import { FREE_SPINS_AWARDED, FREE_SPINS_RETRIGGER, WILD_MULTIPLIERS } from '../game/constants';

	const t = stateI18nDerived.translate;
	const social = stateUrlDerived.social;

	const numPaylines = Object.keys(config.paylines).length;
	const baseRtp = (config.betModes.base.rtp * 100).toFixed(2);
	const maxWin = config.betModes.base.max_win;
	const bonusTiers = [
		{ spins: FREE_SPINS_AWARDED, cost: config.betModes.bonus.cost, rtp: (config.betModes.bonus.rtp * 100).toFixed(2) },
	];
</script>

<div class="rules">
	<h2>{t('How to play')}</h2>
	<p>
		{config.numReels}{t('-reel,')} {config.numRows[0]}{t('-row grid,')} {numPaylines}
		{t('fixed paylines.')}
		{social()
			? t('Wins read left to right, only the best win per line counts.')
			: t('Wins pay left to right, only the best win per line counts.')}
	</p>

	<h2>{t('Wild')}</h2>
	<p>
		{t('The Wild substitutes for all symbols except Scatter. During free spins, each Wild carries a multiplier')}
		({WILD_MULTIPLIERS.map((m) => `×${m}`).join(', ')}){t('; multiple wild multipliers on the same line add up.')}
	</p>

	<h2>{t('Scatter and free spins')}</h2>
	<p>
		{t('Scatters can land anywhere on the grid and do not form lines.')}
		{t('3 Scatters trigger')} {FREE_SPINS_AWARDED} {t('free spins. During free spins, 3 Scatters add')} +{FREE_SPINS_RETRIGGER}
		{t('extra spins, within the same round.')}
	</p>

	<h2>{social() ? t('Bonus') : t('Bonus buy')}</h2>
	<p>
		{social()
			? t('Skip straight to the free spins:')
			: t('Buy direct access to the free spins:')}
	</p>
	<ul>
		{#each bonusTiers as tier}
			<li>
				<strong>{tier.spins} {t('free spins')}</strong> — {tier.cost}{social()
					? t('× your spin.')
					: t('× the bet.')}
				{t('RTP:')} {tier.rtp}%.
			</li>
		{/each}
	</ul>

	<h2>{t('RTP and max win')}</h2>
	<p>
		{t('Base mode RTP:')} {baseRtp}%.
		{t('Max win:')} {maxWin}{social() ? t('× your spin.') : t('× the bet.')}
	</p>

	<h2>{t('Independent rounds')}</h2>
	<p>
		{social()
			? t('Every spin is independent: no progression or persistent element carries over between rounds.')
			: t('Every bet is independent: no progression or persistent element carries over between rounds.')}
	</p>

	<h2>{t('Controls')}</h2>
	<ul>
		<li>
			<strong>{social() ? t('Spin') : t('Bet')}</strong> — {social()
				? t('starts a round at the amount shown.')
				: t('places your wager and spins the reels.')}
		</li>
		<li><strong>+ / −</strong> — {t('raises or lowers the amount for the next spin.')}</li>
		<li>
			<strong>{t('Auto Spin')}</strong> — {t(
				'repeats spins automatically at the current amount, after you confirm how many in the menu it opens.',
			)}
		</li>
		<li><strong>{t('Turbo')}</strong> — {t('speeds up the spin and win animations.')}</li>
		<li>
			<strong>{social() ? t('Bonus') : t('Buy Bonus')}</strong> — {t(
				'opens a confirmation showing the cost before starting the bonus mode described above.',
			)}
		</li>
		<li><strong>{t('Sound')}</strong> — {t('mutes or restores all audio, including bonus and big-win screens.')}</li>
		<li><strong>{t('Settings')}</strong> — {t('opens display and audio options.')}</li>
		<li><strong>{t('Info')}</strong> — {t('opens this rules screen and the paytable.')}</li>
		<li><strong>{t('Fullscreen')}</strong> — {t('toggles fullscreen display.')}</li>
		<li><strong>{t('Menu')}</strong> — {t('opens the side menu (rules, paytable, settings, sound).')}</li>
	</ul>

	<h2>{t('Disclaimer')}</h2>
	<p class="disclaimer">
		{t(
			'Malfunction voids all wins and plays. A consistent internet connection is required. In the event of a disconnection, reload the game to finish any uncompleted rounds. The expected return is calculated over many plays. The game display is not representative of any physical device and is for illustrative purposes only. Winnings are settled according to the amount received from the Remote Game Server and not from events within the web browser. ™ and © 2026 Engine.',
		)}
	</p>
</div>

<style>
	.rules {
		color: #f2eee4;
		padding: 1rem;
		font-family: 'Limelight', 'Cinzel', serif;
		max-width: 600px;
	}
	h2 {
		margin-top: 1.25rem;
		color: #cfc8b8;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		font-size: 1rem;
		border-bottom: 1px solid rgba(242, 238, 228, 0.35);
		padding-bottom: 0.4rem;
	}
	p {
		font-size: 0.9rem;
		line-height: 1.4;
	}
	ul {
		margin: 0;
		padding-left: 1.1rem;
		font-size: 0.85rem;
		line-height: 1.5;
	}
	.disclaimer {
		font-size: 0.75rem;
		opacity: 0.75;
		line-height: 1.4;
	}
</style>
