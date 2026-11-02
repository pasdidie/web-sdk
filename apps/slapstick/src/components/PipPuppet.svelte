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
	 * `height` / PUPPET_HEIGHT. Motion = eased pose targets (Tween, so mood
	 * changes blend smoothly) + continuous oscillations from one rAF clock.
	 * Expression heads come from a different sheet (bigger scale) and are
	 * scaled down by HEAD_SCALE to match the body.
	 */
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { Container, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { prefersReducedMotion } from '../game/animationConfig';

	type Props = { x: number; y: number; height: number; showCamera?: boolean };
	const props: Props = $props();
	const context = getContext();

	const PUPPET_HEIGHT = 1000;
	const HEAD_SCALE = 145 / 253;
	const CAMERA_SCALE = 0.62 * (938 / 700); // camera_body was exported at 700px max side
	const CAMERA_X = 330;

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
		armL: number; // umbrella arm
		armRUpper: number; // crank arm, shoulder
		armRLower: number; // crank arm, elbow
		hatLift: number;
		hatTilt: number;
		umbrellaOpen: boolean;
		holdMs: number;
	};
	const IDLE: Pose = {
		head: 'neutral',
		lean: 0,
		armL: 0.12,
		armRUpper: -0.1,
		armRLower: 0.15,
		hatLift: 0,
		hatTilt: -0.1,
		umbrellaOpen: false,
		holdMs: 0,
	};
	const POSES: Record<PipMood, Pose> = {
		idle: IDLE,
		crank: { ...IDLE, armRUpper: -0.55, armRLower: -0.9, lean: 0.03, holdMs: 0 },
		anticipation: { ...IDLE, head: 'surprised', lean: 0.1, armRUpper: -0.3, armRLower: -1.6, holdMs: 0 },
		winSmall: { ...IDLE, head: 'sly', hatLift: 70, hatTilt: -0.45, armRUpper: -2.4, armRLower: -0.4, holdMs: 1100 },
		winMedium: { ...IDLE, head: 'sly', lean: -0.05, armL: 0.5, armRUpper: -0.9, armRLower: -0.5, holdMs: 1600 },
		winBig: {
			...IDLE,
			head: 'ecstatic',
			armL: -2.7,
			armRUpper: -2.2,
			armRLower: -0.6,
			hatLift: 40,
			hatTilt: 0.2,
			umbrellaOpen: true,
			holdMs: 0,
		},
		freeSpins: { ...IDLE, head: 'surprised', lean: 0.08, armRUpper: -1.45, armRLower: -0.1, holdMs: 0 },
		shrug: { ...IDLE, head: 'worried', armL: 0.35, armRUpper: 0.35, armRLower: -0.4, holdMs: 1300 },
	};

	const ease = { duration: 280, easing: cubicOut };
	const lean = new Tween(IDLE.lean, ease);
	const armL = new Tween(IDLE.armL, ease);
	const armRUpper = new Tween(IDLE.armRUpper, ease);
	const armRLower = new Tween(IDLE.armRLower, ease);
	const hatLift = new Tween(IDLE.hatLift, ease);
	const hatTilt = new Tween(IDLE.hatTilt, ease);

	let mood = $state<PipMood>('idle');
	let head = $state<HeadKey>('neutral');
	let umbrellaOpen = $state(false);
	let time = $state(0);
	let crankAngle = $state(0);
	let revertTimer: ReturnType<typeof setTimeout> | undefined;

	const setMood = (next: PipMood) => {
		const pose = POSES[next];
		mood = next;
		head = pose.head;
		umbrellaOpen = pose.umbrellaOpen;
		lean.set(pose.lean);
		armL.set(pose.armL);
		armRUpper.set(pose.armRUpper);
		armRLower.set(pose.armRLower);
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
	// Idle umbrella twirl every ~8s (a full spin of the closed umbrella).
	const twirlPhase = $derived(time % 8);
	const umbrellaSpin = $derived(mood === 'idle' && twirlPhase > 7 ? (twirlPhase - 7) * Math.PI * 2 : 0);
	// Crank arm follows the crank wheel while cranking.
	const crankArmUpper = $derived(mood === 'crank' ? Math.sin(crankAngle) * 0.22 : 0);
	const crankArmLower = $derived(mood === 'crank' ? Math.cos(crankAngle) * 0.45 : 0);

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
				anchor={{ x: 0.5, y: 0.2 }}
				x={-40}
				y={-938 * 0.62 * 0.68}
				scale={0.62}
				rotation={crankAngle}
			/>
		</Container>
	{/if}

	<Container rotation={lean.current + sway} y={bob}>
		<!-- legs + boots -->
		<Container x={-38} y={-448} rotation={-legKick}>
			<Sprite key="pip_leg_L" anchor={{ x: 0.5, y: 0 }} />
			<Sprite key="pip_boot_L" anchor={{ x: 0.6, y: 0.75 }} x={-12} y={400} />
		</Container>
		<Container x={38} y={-448} rotation={legKick}>
			<Sprite key="pip_leg_R" anchor={{ x: 0.5, y: 0 }} />
			<Sprite key="pip_boot_R" anchor={{ x: 0.4, y: 0.75 }} x={12} y={400} />
		</Container>

		<!-- umbrella arm (screen left) -->
		<Container x={-82} y={shoulderY} rotation={armL.current}>
			{#if umbrellaOpen}
				<Sprite key="pip_umbrella_open" anchor={{ x: 0.5, y: 0.95 }} x={0} y={380} scale={0.55} rotation={Math.PI} />
			{:else}
				<Container x={-6} y={360} rotation={0.08}>
					<Sprite key="pip_umbrella" anchor={{ x: 0.5, y: 0.02 }} rotation={umbrellaSpin} />
				</Container>
			{/if}
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
				y={-165 - hatLift.current}
				rotation={hatTilt.current}
			/>
		</Container>

		<Sprite key="pip_torso" anchor={{ x: 0.5, y: 0 }} y={-700} scale={{ x: 1, y: 1 + breathe }} />

		<!-- crank arm (screen right, articulated) -->
		<Container x={82} y={shoulderY} rotation={armRUpper.current + crankArmUpper}>
			<Sprite key="pip_arm_R_upper" anchor={{ x: 0.5, y: 0.08 }} />
			<Container y={140} rotation={armRLower.current + crankArmLower}>
				<Sprite key="pip_arm_R_lower" anchor={{ x: 0.5, y: 0.05 }} />
			</Container>
		</Container>
	</Container>
</Container>
