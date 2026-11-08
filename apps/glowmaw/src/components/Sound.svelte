<script lang="ts" module>
	import { sound, hasSound, type MusicName, type SoundEffectName, type SoundName } from '../game/sound';

	export type EmitterEventSound =
		| { type: 'soundMusic'; name: MusicName }
		| { type: 'soundOnce'; name: SoundEffectName; forcePlay?: boolean }
		| { type: 'soundLoop'; name: SoundEffectName }
		| { type: 'soundStop'; name: SoundName };
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { getContext } from '../game/context';

	const context = getContext();
	const once = (name: string, forcePlay = true) => hasSound(name) && sound.players.once.play({ name, forcePlay });

	context.eventEmitter.subscribeOnMount({
		soundPressGeneral: () => once('sfx_btn_general'),
		soundPressBet: () => once('sfx_btn_spin'),
		soundMusic: ({ name }) => hasSound(name) && sound.players.music.play({ name }),
		soundLoop: ({ name }) => hasSound(name) && sound.players.loop.play({ name }),
		soundOnce: ({ name, forcePlay }) => once(name, forcePlay ?? true),
		soundStop: ({ name }) => hasSound(name) && sound.stop({ name }),
	});

	onMount(() => {
		if (hasSound('bgm_main')) sound.players.music.play({ name: 'bgm_main' });
	});
</script>
