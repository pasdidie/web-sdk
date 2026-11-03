export default {
	loader: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/loader/loader.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/loader/loader.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url).href,
		preload: true,
	},
	H1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h1.json', import.meta.url).href,
			scale: 2,
		},
	},
	H2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h2.json', import.meta.url).href,
			scale: 2,
		},
	},
	H3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h3.json', import.meta.url).href,
			scale: 2,
		},
	},
	H4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h4.json', import.meta.url).href,
			scale: 2,
		},
	},
	H5: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h5.json', import.meta.url).href,
			scale: 2,
		},
	},
	L1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l1.json', import.meta.url).href,
			scale: 2,
		},
	},
	L2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l2.json', import.meta.url).href,
			scale: 2,
		},
	},
	L3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l3.json', import.meta.url).href,
			scale: 2,
		},
	},
	L4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l4.json', import.meta.url).href,
			scale: 2,
		},
	},
	M: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/M.json', import.meta.url).href,
			scale: 2,
		},
	},
	S: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/S.json', import.meta.url).href,
			scale: 2,
		},
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},
	W: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/W.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelsFrame: {
		type: 'sprites',
		src: new URL('../../assets/sprites/reelsFrame/reels_frame.json', import.meta.url).href,
	},
	payFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	goldFont: {
		type: 'font',
		src: new URL('../../assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
	},
	goldBlur: {
		type: 'font',
		src: new URL('../../assets/fonts/goldBlur/miningfont_gold_blur.xml', import.meta.url).href,
	},
	silverFont: {
		type: 'font',
		src: new URL('../../assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},
	purpleFont: {
		type: 'font',
		src: new URL('../../assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	foregroundAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundAnimation/mm_bg.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundAnimation/mm_bg.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	foregroundFeatureAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url).href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},
	progressBar: {
		type: 'sprites',
		src: new URL('../../assets/sprites/progressBar/progressBar.json', import.meta.url).href,
		preload: true,
	},
	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url).href,
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},
	coins: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},

	// Slapstick art: Gemini renders processed by tools/assets (keyed + film-toned),
	// exported by tools/assets/export_to_web.py. pip_* = Monsieur Pip puppet pieces.
	sym_H1: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_H1.png', import.meta.url).href },
	sym_H2: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_H2.png', import.meta.url).href },
	sym_H3: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_H3.png', import.meta.url).href },
	sym_L1: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_L1.png', import.meta.url).href },
	sym_L2: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_L2.png', import.meta.url).href },
	sym_L3: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_L3.png', import.meta.url).href },
	sym_W_body: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_W_body.png', import.meta.url).href },
	sym_W_aura: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_W_aura.png', import.meta.url).href },
	sym_S_body: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_S_body.png', import.meta.url).href },
	sym_S_aura: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_S_aura.png', import.meta.url).href },
	badge_mult: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/badge_mult.png', import.meta.url).href },
	intertitle_frame: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/intertitle_frame.png', import.meta.url).href },
	banner_frame: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/intertitle_frame.png', import.meta.url).href },
	frame_screen: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/frame_screen.png', import.meta.url).href },
	logo_mark: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/logo_mark.png', import.meta.url).href },
	title_logo: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/title_logo.png', import.meta.url).href },
	fx_confetti: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/fx_confetti.png', import.meta.url).href },
	fx_particle: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/fx_confetti.png', import.meta.url).href },
	bg_theatre: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/bg_theatre.png', import.meta.url).href },
	bg_theatre_portrait: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/bg_theatre_portrait.png', import.meta.url).href },
	bg_free: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/bg_free.png', import.meta.url).href },
	title_hero: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/bg_theatre.png', import.meta.url).href },
	bonus_illustration: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/sym_S_body.png', import.meta.url).href },
	pip_umbrella_open: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/pip_umbrella_open.png', import.meta.url).href },
	ui_button: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/ui/ui_button.png', import.meta.url).href },
	bet: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/ui/ui_button_bet.png', import.meta.url).href },
	buyBonus: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/ui/ui_button_buybonus.png', import.meta.url).href },
	base_ticker: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/ui/ui_ticker_panel.png', import.meta.url).href },
	pip_arm_L: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/arm_L.png', import.meta.url).href },
	pip_arm_R: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/arm_R.png', import.meta.url).href },
	pip_arm_R_grip: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/arm_R_grip.png', import.meta.url).href },
	pip_arm_R_lower: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/arm_R_lower.png', import.meta.url).href },
	pip_arm_R_upper: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/arm_R_upper.png', import.meta.url).href },
	pip_boot_L: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/boot_L.png', import.meta.url).href },
	pip_boot_R: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/boot_R.png', import.meta.url).href },
	pip_camera_body: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/camera_body.png', import.meta.url).href },
	pip_camera_crank: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/camera_crank.png', import.meta.url).href },
	pip_hat: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/hat.png', import.meta.url).href },
	pip_head: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/head.png', import.meta.url).href },
	pip_head_ecstatic: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/head_ecstatic.png', import.meta.url).href },
	pip_head_neutral: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/head_neutral.png', import.meta.url).href },
	pip_head_sly: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/head_sly.png', import.meta.url).href },
	pip_head_surprised: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/head_surprised.png', import.meta.url).href },
	pip_head_worried: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/head_worried.png', import.meta.url).href },
	pip_leg_L: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/leg_L.png', import.meta.url).href },
	pip_leg_R: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/leg_R.png', import.meta.url).href },
	pip_moustache: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/moustache.png', import.meta.url).href },
	pip_torso: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/torso.png', import.meta.url).href },
	pip_umbrella: { type: 'sprite', src: new URL('../../assets/sprites/slapstick/rig/umbrella.png', import.meta.url).href },
} as const;
