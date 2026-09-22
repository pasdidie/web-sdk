/**
 * Single source of truth for animation timings/amplitudes/colors, per
 * ANIMATION_SPEC.md section 4 ("Tous les paramètres centralisés dans un seul
 * fichier de config d'animation."). Values are starting points from the
 * spec's indicative durations, tuned by eye against the placeholder preview
 * (src/stories/AnimationPlaceholders.stories.svelte) before real assets land.
 */

export const ANIMATION_CONFIG = {
	symbolLand: {
		squashFrom: 1.1,
		squashTo: 0.95,
		settleTo: 1,
		durationMs: 200,
	},
	symbolWin: {
		scaleFrom: 1,
		scaleTo: 1.12,
		loopDurationMs: 600,
		glowColor: 0xffd700,
		glowOuterStrength: 3,
		glowInnerStrength: 1,
		sweepDurationMs: 600,
		sweepWidthRatio: 0.35, // sweep highlight width as a fraction of symbol width
	},
	symbolDim: {
		opacity: 0.4,
		durationMs: 150,
	},
	symbolIdleAura: {
		opacityMin: 0.6,
		opacityMax: 1,
		pulseDurationMs: 2500,
		rotationRadPerSec: 0.15,
	},
	scatterTrigger: {
		scaleFrom: 1,
		scaleTo: 1.3,
		durationMs: 800,
	},
	wildMultiplierBadge: {
		popFrom: 0,
		popOvershoot: 1.2,
		popTo: 1,
		durationMs: 300,
	},
	reels: {
		bounceOvershootRatio: 0.08, // ~8% overshoot then settle
		bounceDurationMs: 175, // midpoint of the 150-200ms spec range
		anticipationExtraMsPerReel: 800,
	},
	bigWin: {
		// Thresholds are multiples of total bet; tune against real math once
		// Phase 3 (math optimisée) gives real win-distribution tail shape.
		tiers: [
			{ key: 'big', thresholdX: 10 },
			{ key: 'super', thresholdX: 25 },
			{ key: 'mega', thresholdX: 50 },
			{ key: 'epic', thresholdX: 100 },
			{ key: 'max', thresholdX: 5000 }, // matches CLAUDE.md wincap
		],
		introDurationMs: 500,
		counterDurationMs: 2200,
		idleMinDurationMs: 600,
		outroDurationMs: 400,
		maxDurationPerTierMs: 4000, // hard cap per spec section 3, interruptible before this
		maxSimultaneousParticles: 150,
	},
	freeSpins: {
		introDurationMs: 900,
		outroDurationMs: 900,
		retriggerPopDurationMs: 300,
		counterBounceDurationMs: 150,
	},
	parallax: {
		midSpeedPxPerSec: 6,
		nearSpeedPxPerSec: 12,
		driftRangePx: 24, // sinusoidal back-and-forth amplitude
	},
	ambienceParticles: {
		maxSimultaneous: 20,
	},
	flashSafety: {
		maxFlashesPerSecond: 3,
	},
} as const;

export type BigWinTierKey = (typeof ANIMATION_CONFIG.bigWin.tiers)[number]['key'];

export const getBigWinTier = (winMultiplierX: number): BigWinTierKey => {
	const { tiers } = ANIMATION_CONFIG.bigWin;
	const match = [...tiers].reverse().find((tier) => winMultiplierX >= tier.thresholdX);
	return (match ?? tiers[0]).key;
};

export const prefersReducedMotion = (): boolean => {
	if (typeof window === 'undefined' || !window.matchMedia) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
