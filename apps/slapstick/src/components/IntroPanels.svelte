<script lang="ts">
	/**
	 * Title-screen feature cards (like the intro screens of the big studios):
	 * three silent-film intertitle cards, Wild multipliers, free spins and
	 * the max win, each popping in after the previous one. Values are read
	 * from the game config, never hard-coded. Row on wide screens, column in
	 * portrait.
	 */
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { stateI18nDerived } from 'state-shared';

	import config from '../game/config';
	import { FREE_SPINS_AWARDED, FREE_SPINS_RETRIGGER, WILD_MULTIPLIERS } from '../game/constants';
	import { silverText } from '../game/textStyles';
	import PopIn from './PopIn.svelte';

	type Props = { x: number; y: number; vertical: boolean };
	const props: Props = $props();
	const t = stateI18nDerived.translate;

	const CARD_W = 400;
	const CARD_H = CARD_W * (768 / 1376); // intertitle_frame.png
	const ICON = 170;
	const GAP = 36;

	const cards = [
		{ key: 'sym_W_body', title: t('WILD'), body: `${t('Free spin multipliers')}\n${WILD_MULTIPLIERS.map((m) => `×${m}`).join('  ')}` },
		{ key: 'sym_S_body', title: `${FREE_SPINS_AWARDED} ${t('FREE SPINS')}`, body: `${t('3 Scatters anywhere')}\n${t('retrigger')} +${FREE_SPINS_RETRIGGER}` },
		{ key: '', title: t('WIN UP TO'), body: `${config.betModes.base.max_win.toLocaleString('en-US')}×` },
	];

	const step = $derived(props.vertical ? CARD_H + ICON * 0.45 + GAP : CARD_W + GAP);
	const offset = (i: number) => (i - 1) * step;
</script>

<Container x={props.x} y={props.y}>
	{#each cards as card, i (card.title)}
		<PopIn x={props.vertical ? 0 : offset(i)} y={props.vertical ? offset(i) : 0} delayMs={250 + i * 220}>
			<Sprite key="intertitle_frame" anchor={0.5} width={CARD_W} height={CARD_H} />
			{#if card.key}
				<Sprite key={card.key} anchor={0.5} y={-CARD_H * 0.5 - ICON * 0.12} width={ICON} height={ICON} />
				<Text anchor={0.5} y={-CARD_H * 0.04} text={card.title} style={silverText(36)} />
				<Text
					anchor={0.5}
					y={CARD_H * 0.22}
					text={card.body}
					style={{ fontFamily: 'Limelight, serif', fontSize: 20, fill: 0xd8d3c8, align: 'center', lineHeight: 25 }}
				/>
			{:else}
				<Text anchor={0.5} y={-CARD_H * 0.17} text={card.title} style={silverText(34)} />
				<Text anchor={0.5} y={CARD_H * 0.13} text={card.body} style={silverText(76)} />
			{/if}
		</PopIn>
	{/each}
</Container>
