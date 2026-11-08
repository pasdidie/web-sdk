<script lang="ts">
	/**
	 * Owns the imperative Pixi scene (scene/Scene.ts): creates it once the
	 * assets are loaded, ticks it, keeps it sized to the window, feeds the
	 * bespoke UI bar with live state and routes its buttons to the shared bet state.
	 */
	import * as PIXI from 'pixi.js';
	import { onDestroy } from 'svelte';
	import { stateBet, stateBetDerived, stateConfig, stateSound, stateUrlDerived, stateUi } from 'state-shared';

	import { getContext } from '../game/context';
	import { sceneRef } from '../game/sceneRef';
	import { formatCurrency, bookToCurrency, formatBook } from '../game/format';
	import { t } from '../game/text';
	import { stateUiGame } from '../game/stateUiGame.svelte';
	import config from '../game/config';
	import { Scene } from '../scene/Scene';
	import { UiBar } from '../scene/UiBar';
	import { anim } from '../scene/anim';

	type Props = { started: boolean };
	const props: Props = $props();
	const context = getContext();

	let scene: Scene | null = null;
	let bar: UiBar | null = null;
	let attached: PIXI.Ticker | null = null;

	const sfx = (name: string) => context.eventEmitter.broadcast({ type: 'soundOnce', name });
	const reduced = () => stateUiGame.reducedMotion;

	const idle = () => context.stateXstateDerived.isIdle();
	const press = () => context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

	const spinAction = () => {
		context.eventEmitter.broadcast({ type: 'soundPressBet' });
		if (stateUiGame.modal) return;
		if (idle()) {
			if (!stateBetDerived.isBetCostAvailable()) {
				stateUiGame.flashMessage(t.insufficient());
				return;
			}
			if (stateBetDerived.activeBetMode()?.type === 'buy') stateBet.activeBetModeKey = stateUiGame.anteOn ? 'ante' : 'base';
			context.eventEmitter.broadcast({ type: 'bet' });
		} else {
			if (stateBetDerived.hasAutoBetCounter()) stateBet.autoSpinsCounter = 0;
			context.eventEmitter.broadcast({ type: 'stopButtonClick' });
			scene?.stop();
		}
	};
	stateUiGame.spin = spinAction;

	const stepBet = (dir: 1 | -1) => {
		press();
		const opts = [...stateConfig.betAmountOptions].sort((a, b) => a - b);
		const cur = stateBet.betAmount;
		const next = dir > 0 ? opts.find((o) => o > cur + 1e-9) : [...opts].reverse().find((o) => o < cur - 1e-9);
		if (next !== undefined) stateBetDerived.setBetAmount(next);
	};

	const toggleAnte = () => {
		press();
		stateUiGame.anteOn = !stateUiGame.anteOn;
		stateBet.activeBetModeKey = stateUiGame.anteOn ? 'ante' : 'base';
	};

	const actions = {
		spin: spinAction,
		betUp: () => stepBet(1),
		betDown: () => stepBet(-1),
		betMenu: () => idle() && (press(), (stateUiGame.modal = 'bet')),
		turbo: () => (press(), stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true })),
		auto: () => {
			press();
			if (stateBetDerived.hasAutoBetCounter()) stateBet.autoSpinsCounter = 0;
			else stateUiGame.modal = 'auto';
		},
		sound: () => {
			press();
			stateSound.volumeValueMaster = stateSound.volumeValueMaster === 0 ? 75 : 0;
		},
		menu: () => (press(), (stateUiGame.modal = 'settings')),
		info: () => (press(), (stateUiGame.modal = 'info')),
		buy: () => (press(), (stateUiGame.modal = 'buy')),
		ante: toggleAnte,
	};

	const uiState = () => {
		const opts = stateConfig.betAmountOptions;
		const min = Math.min(...opts);
		const max = Math.max(...opts);
		const isIdle = idle();
		const auto = stateBet.autoSpinsCounter;
		const cost = stateBetDerived.betCost();
		return {
			layout: scene!.layoutType,
			balance: formatCurrency(stateBet.balanceAmount),
			bet: formatCurrency(stateUiGame.anteOn ? cost : stateBet.betAmount),
			betLabel: t.bet(),
			win: formatBook(stateBet.winBookEventAmount),
			idle: isIdle,
			canBet: stateBetDerived.isBetCostAvailable(),
			spinMode: (isIdle ? 'spin' : 'stop') as 'spin' | 'stop',
			autoCount: auto,
			turbo: stateBet.isTurbo,
			sound: stateSound.volumeValueMaster > 0,
			anteOn: stateUiGame.anteOn,
			anteCost: stateUiGame.anteOn ? 'ON · 1.25×' : 'OFF',
			anteLabel: t.anteTitle(),
			buyLabel: t.buy(),
			showFeatures: !scene!.inFreeSpins && stateUiGame.uiVisible,
			featureDisabled: false,
			hideAutoplay: stateConfig.jurisdiction.disabledAutoplay,
			hideTurbo: stateConfig.jurisdiction.disabledTurbo,
			hideBuy: stateConfig.jurisdiction.disabledBuyFeature,
			minBet: stateBet.betAmount <= min + 1e-9,
			maxBet: stateBet.betAmount >= max - 1e-9,
			message: stateUiGame.message,
		};
	};

	const tick = (ticker: PIXI.Ticker) => {
		if (!scene) return;
		const app = context.stateApp.pixiApplication!;
		scene.resize(app.screen.width, app.screen.height);
		anim.speed = stateBet.isTurbo ? 1.6 : 1;
		anim.reducedMotion = reduced();
		scene.update(ticker.deltaMS);
		if (bar) {
			bar.root.visible = props.started;
			bar.update(uiState(), Math.min(ticker.deltaMS, 50));
		}
	};

	$effect(() => {
		const app = context.stateApp.pixiApplication;
		if (!app || scene || !context.stateApp.loaded) return;
		scene = new Scene({
			sfx: (name, o) => sfx(name),
			music: (name) => context.eventEmitter.broadcast({ type: 'soundMusic', name }),
			formatAmount: formatBook,
			formatCurrency,
			bookToCurrency,
			turbo: () => stateBet.isTurbo,
			reducedMotion: reduced,
			autoplay: () => stateBetDerived.hasAutoBetCounter(),
			maxWin: config.betModes.base.max_win,
			wincapX: config.betModes.base.max_win,
		});
		scene.setAssets(context.stateApp.loadedAssets as Record<string, unknown>);
		bar = new UiBar(actions);
		bar.refreshArt();
		scene.uiLayer.addChild(bar.root);
		app.stage.addChild(scene.root);
		app.ticker.add(tick);
		attached = app.ticker;
		sceneRef.resolve(scene);
		stateUiGame.sceneReady = true;
	});

	context.eventEmitter.subscribeOnMount({
		uiHide: () => (stateUiGame.uiVisible = false),
		uiShow: () => (stateUiGame.uiVisible = true),
	});

	onDestroy(() => {
		attached?.remove(tick);
		scene?.root.destroy({ children: true });
	});
</script>
