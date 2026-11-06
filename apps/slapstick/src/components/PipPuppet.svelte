<script lang="ts" module>
	export type PipMood =
		| 'idle'
		| 'crank'
		| 'anticipation'
		| 'winSmall'
		| 'winMedium'
		| 'winBig'
		| 'freeSpins'
		| 'shrug';

	export type EmitterEventPip = { type: 'pipMood'; mood: PipMood };
</script>

<script lang="ts">
	/**
	 * Monsieur Pip, cut-out puppet (docs/CONCEPT.md section 2).
	 *
	 * Every piece is a separate Gemini PNG (tools/assets split_sheets.py ->
	 * rig/*.png). Coordinates below are in "sheet pixels" of the parts sheet,
	 * origin at the feet, y up = negative; the whole puppet is scaled by
	 * `height` / PUPPET_HEIGHT. Motion = pose targets reached through springs
	 * (Spring: a limb overshoots and settles like a real gesture instead of
	 * a linear tween) + continuous oscillations from one rAF clock.
	 * Hops land with a squash of the whole body (squash and stretch).
	 * The articulated arm pieces of the parts sheet are not used (the
	 * upper-arm piece reads as a loose sausage); both arms swing at the shoulder.
	 * The umbrella arm is arm_R_grip (tools/assets/compose_rig.py: arm_R with the
	 * curled hand of arm_R_lower): the umbrella is drawn behind it, its crook in
	 * the fist, and hangs from the grip on a damped spring so it swings behind
	 * every arm move instead of being glued to the arm.
	 * Expression heads come from a different sheet (bigger scale) and are
	 * scaled down by HEAD_SCALE to match the body.
	 */
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';
	import { Container, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = { x: number; y: number; height: number; showCamera?: boolean };
	const props: Props = $props();
	const context = getContext();

	const PUPPET_HEIGHT = 1000;
	const HEAD_SCALE = 145 / 253;
	const CAMERA_SCALE = 0.62 * (938 / 700); // camera_body was exported at 700px max side
	const CAMERA_X = -340; // camera stands at Pip's screen-left, lens towards the screen
	// Crank hub on the wooden side panel of the camera box (camera_body.png
	// 366x700 anchored at its feet: panel centre ~(145, 225) px -> rig units),
	// and the hub point of camera_crank.png (249x415, hub ~(80, 60) px).
	const CRANK_HUB = { x: (145 - 183) * CAMERA_SCALE, y: (225 - 700) * CAMERA_SCALE };
	const CRANK_PIVOT = { x: 80 / 249, y: 60 / 415 };
	const CRANK_SCALE = 0.28;
	// Inside the curled fist of arm_R_grip (96x351, anchored at its shoulder),
	// and the matching handle points of the two umbrella sprites.
	const GRIP = { x: 4, y: 316 };
	const UMBRELLA_HANDLE = { x: 49 / 77, y: 65 / 368 };
	const UMBRELLA_OPEN_HANDLE = { x: 0.5, y: 570 / 700 };
	// Umbrella pendulum: how much it hangs towards gravity vs follows the
	// wrist, spring stiffness and damping (critically damped ~ 2*sqrt(K)).
	const SWING_GRAVITY = 0.6;
	const SWING_K = 48;
	const SWING_DAMPING = 5.5;

	const HEADS = {
		neutral: 'pip_head_neutral',
		sly: 'pip_head_sly',
		surprised: 'pip_head_surprised',
		ecstatic: 'pip_head_ecstatic',
		worried: 'pip_head_worried',
	} as const;
	type HeadKey = keyof typeof HEADS;

	// Per-mood pose targets (radians / sheet px) and how long the mood holds
	// before Pip falls back to idle (0 = until the next mood).
	type Pose = {
		head: HeadKey;
		lean: number; // whole body rotation around the feet
		armCrank: number; // screen-left arm, turns the camera crank / tips the hat
		armUmbrella: number; // screen-right arm, holds the umbrella
		hatLift: number;
		hatTilt: number;
		umbrellaOpen: boolean;
		holdMs: number;
	};
	const IDLE: Pose = {
		head: 'neutral',
		lean: 0,
		armCrank: 0.1,
		armUmbrella: -0.08,
		hatLift: 0,
		hatTilt: -0.1,
		umbrellaOpen: false,
		holdMs: 0,
	};
	// Rotation sign: + swings an arm towards screen-left, - towards screen-right.
	const POSES: Record<PipMood, Pose> = {
		idle: IDLE,
		crank: { ...IDLE, armCrank: 0.45, lean: -0.03 },
		anticipation: { ...IDLE, head: 'surprised', lean: 0.1, armUmbrella: -0.5 },
		winSmall: { ...IDLE, head: 'sly', hatLift: 70, hatTilt: -0.45, armCrank: 2.75, holdMs: 1100 },
		winMedium: { ...IDLE, head: 'sly', lean: -0.05, armCrank: 0.6, armUmbrella: -0.6, holdMs: 1600 },
		winBig: { ...IDLE, head: 'ecstatic', armCrank: 2.3, armUmbrella: -2.6, hatLift: 40, hatTilt: 0.2, umbrellaOpen: true },
		freeSpins: { ...IDLE, head: 'surprised', lean: 0.08, armUmbrella: -1.5 },
		shrug: { ...IDLE, head: 'worried', armCrank: 0.4, armUmbrella: -0.4, holdMs: 1300 },
	};

	// Limbs are light and snappy, the body is heavier and slower.
	const limb = { stiffness: 0.14, damping: 0.38 };
	const body = { stiffness: 0.08, damping: 0.45 };
	const lean = new Spring(IDLE.lean, body);
	const armCrank = new Spring(IDLE.armCrank, limb);
	const armUmbrella = new Spring(IDLE.armUmbrella, limb);
	const hatLift = new Spring(IDLE.hatLift, { stiffness: 0.12, damping: 0.3 });
	const hatTilt = new Spring(IDLE.hatTilt, limb);

	let mood = $state<PipMood>('idle');
	let head = $state<HeadKey>('neutral');
	let umbrellaOpen = $state(false);
	let time = $state(0);
	let crankAngle = $state(0);
	let swing = $state(0); // closed umbrella angle relative to the arm
	let swingVelocity = 0;
	let lastFlourish = 0;
	let revertTimer: ReturnType<typeof setTimeout> | undefined;

	const setMood = (next: PipMood) => {
		const pose = POSES[next];
		mood = next;
		head = pose.head;
		umbrellaOpen = pose.umbrellaOpen;
		lean.set(pose.lean);
		armCrank.set(pose.armCrank);
		armUmbrella.set(pose.armUmbrella);
		hatLift.set(pose.hatLift);
		hatTilt.set(pose.hatTilt);
		clearTimeout(revertTimer);
		if (pose.holdMs) revertTimer = setTimeout(() => setMood('idle'), pose.holdMs);
	};

	context.eventEmitter.subscribeOnMount({
		pipMood: ({ mood: next }) => setMood(next),
	});

	onMount(() => {
		const still = prefersReducedMotion();
		let frame = 0;
		let last = performance.now();
		const tick = (now: number) => {
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;
			if (!still) time += dt;
			if (mood === 'crank') crankAngle += dt * 9;
			if (!still) {
				// keep the umbrella hanging (partly) plumb whatever the arm does
				const armWorld = armUmbrella.current + lean.current + sway;
				const target = -armWorld * SWING_GRAVITY;
				swingVelocity += (SWING_K * (target - swing) - SWING_DAMPING * swingVelocity) * dt;
				swing += swingVelocity * dt;
				// idle flourish every ~8s: a flick of the wrist sends it swinging
				if (mood === 'idle' && time - lastFlourish > 8) {
					lastFlourish = time;
					swingVelocity += 5;
				}
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(revertTimer);
		};
	});

	// Continuous motion layered on top of the eased pose.
	const breathe = $derived(Math.sin(time * 2.1) * 0.012);
	const bob = $derived(
		mood === 'winBig'
			? -Math.abs(Math.sin(time * 9)) * 45
			: mood === 'winMedium'
				? -Math.max(0, Math.sin(time * 6)) * 30
				: Math.sin(time * 2.1) * 3,
	);
	// Squash on each landing of a hop (bob back near 0), stretch at take-off.
	const hopPhase = $derived(mood === 'winBig' ? Math.abs(Math.sin(time * 9)) : mood === 'winMedium' ? Math.max(0, Math.sin(time * 6)) : 1);
	const squash = $derived(mood === 'winBig' || mood === 'winMedium' ? Math.max(0, 0.25 - hopPhase) * 0.32 - hopPhase * 0.03 : 0);
	const sway = $derived(mood === 'winBig' ? Math.sin(time * 4.5) * 0.06 : Math.sin(time * 0.7) * 0.015);
	const legKick = $derived(
		mood === 'winBig' ? Math.sin(time * 9) * 0.3 : mood === 'winMedium' ? Math.max(0, Math.sin(time * 6)) * 0.35 : 0,
	);
	const headTilt = $derived(Math.sin(time * 0.9) * 0.04 + (mood === 'shrug' ? 0.12 : 0));
	// Moustache twitch: a short burst every ~4.5s, constant when excited.
	const twitchPhase = $derived(time % 4.5);
	const moustacheRot = $derived(
		mood === 'winBig' || mood === 'anticipation'
			? Math.sin(time * 28) * 0.08
			: twitchPhase < 0.35
				? Math.sin(twitchPhase * 60) * 0.1
				: 0,
	);
	// The crank arm follows the crank wheel while cranking.
	const crankSwing = $derived(mood === 'crank' ? Math.sin(crankAngle) * 0.25 : 0);

	const scale = $derived(props.height / PUPPET_HEIGHT);
	const shoulderY = -640;
</script>

<Container x={props.x} y={props.y} scale={scale} zIndex={2}>
	{#if props.showCamera ?? true}
		<!-- Hand-cranked camera on its tripod, crank turns while the reels spin -->
		<Container x={CAMERA_X} y={0}>
			<Sprite key="pip_camera_body" anchor={{ x: 0.5, y: 1 }} scale={CAMERA_SCALE} />
			<Sprite
				key="pip_camera_crank"
				anchor={CRANK_PIVOT}
				x={CRANK_HUB.x}
				y={CRANK_HUB.y}
				scale={CRANK_SCALE}
				rotation={crankAngle}
			/>
		</Container>
	{/if}

	<Container rotation={lean.current + sway} y={bob} scale={{ x: 1 + squash * 0.6, y: 1 - squash }}>
		<!-- legs + boots -->
		<Container x={-38} y={-448} rotation={-legKick}>
			<Sprite key="pip_leg_L" anchor={{ x: 0.5, y: 0 }} />
			<Sprite key="pip_boot_L" anchor={{ x: 0.6, y: 0.75 }} x={-12} y={400} />
		</Container>
		<Container x={38} y={-448} rotation={legKick}>
			<Sprite key="pip_leg_R" anchor={{ x: 0.5, y: 0 }} />
			<Sprite key="pip_boot_R" anchor={{ x: 0.4, y: 0.75 }} x={12} y={400} />
		</Container>

		<!-- crank arm (screen left): turns the camera crank, tips the hat -->
		<Container x={-82} y={shoulderY} rotation={armCrank.current + crankSwing}>
			<Sprite key="pip_arm_L" anchor={{ x: 0.5, y: 0.04 }} />
		</Container>

		<!-- head (behind the collar) + moustache + hat -->
		<Container x={0} y={-668} rotation={headTilt}>
			<Sprite key={HEADS[head]} anchor={{ x: 0.5, y: 0.97 }} scale={HEAD_SCALE} />
			<!-- expression heads are drawn without moustache so it can twitch on its own -->
			<Sprite key="pip_moustache" anchor={{ x: 0.5, y: 0.3 }} y={-62} rotation={moustacheRot} scale={0.95} />

			<Sprite
				key="pip_hat"
				anchor={{ x: 0.5, y: 0.92 }}
				x={4}
				y={-140 - hatLift.current}
				rotation={hatTilt.current}
			/>
		</Container>

		<Sprite key="pip_torso" anchor={{ x: 0.5, y: 0 }} y={-700} scale={{ x: 1, y: 1 + breathe }} />

		<!-- umbrella arm (screen right): umbrella behind the fist, crook in the hand -->
		<Container x={82} y={shoulderY} rotation={armUmbrella.current}>
			{#if umbrellaOpen}
				<!-- held aloft: canopy kept upright whatever the arm angle -->
				<Sprite
					key="pip_umbrella_open"
					anchor={UMBRELLA_OPEN_HANDLE}
					x={GRIP.x}
					y={GRIP.y}
					scale={0.55}
					rotation={-armUmbrella.current - lean.current + 0.15 + Math.sin(time * 4.5) * 0.08}
				/>
			{:else}
				<Sprite key="pip_umbrella" anchor={UMBRELLA_HANDLE} x={GRIP.x} y={GRIP.y} rotation={swing} />
			{/if}
			<Sprite key="pip_arm_R_grip" anchor={{ x: 0.5, y: 0.04 }} />
		</Container>
	</Container>
</Container>
