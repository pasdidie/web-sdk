<script lang="ts">
	/** Studio loader + feature intro (provider practice): logo, 3 feature cards, tap to dive in. */
	import { assetUrl } from './assetUrl';
	import config from '../game/config';

	type Props = { ready: boolean; progress: number; onstart: () => void };
	const props: Props = $props();
	const max = config.betModes.base.max_win.toLocaleString('en-US');
	const go = () => props.ready && props.onstart();
	const cards = [
		{ img: 'intro_tumble', title: 'WIN ANYWHERE', text: '8 or more matching symbols anywhere form a win. Winners dissolve and new ones fall from the dark.' },
		{ img: 'intro_orbs', title: 'GLOW ORBS', text: 'Orbs from ×2 to ×500 add together and multiply the whole tumble win.' },
		{ img: 'intro_frenzy', title: 'FEEDING FRENZY', text: 'Maw swallows every orb. The Lure never resets and multiplies every winning free spin.' },
	];
</script>

<svelte:window onkeydown={(e) => (e.code === 'Space' || e.code === 'Enter') && go()} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="intro" class:ready={props.ready} onclick={go} style="--bg: url({assetUrl('bg_far')})">
	<div class="glow"></div>
	<img class="logo" src={assetUrl('logo')} alt="Glowmaw" onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
	<div class="cards">
		{#each cards as c, i}
			<div class="card" style="animation-delay: {0.15 + i * 0.12}s">
				<div class="art" style="background-image: url({assetUrl(c.img)})"></div>
				<h3>{c.title}</h3>
				<p>{c.text}</p>
			</div>
		{/each}
	</div>
	<div class="maxwin">WIN UP TO <b>{max}×</b></div>
	{#if props.ready}
		<div class="tap">TAP TO DIVE IN</div>
	{:else}
		<div class="bar"><div class="fill" style="width: {Math.max(4, props.progress)}%"></div></div>
	{/if}
</div>

<style>
	.intro {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2.2vh;
		background: radial-gradient(ellipse at 50% 40%, rgba(4, 22, 40, 0.35) 0%, rgba(1, 6, 16, 0.85) 75%), var(--bg) center / cover no-repeat, #01040c;
		font-family: 'Exo 2', sans-serif;
		color: #e9fbff;
		overflow: hidden;
		cursor: default;
		user-select: none;
	}
	.intro.ready { cursor: pointer; }
	.glow {
		position: absolute;
		width: 80vmax;
		height: 80vmax;
		left: 50%;
		top: 32%;
		transform: translate(-50%, -50%);
		background: radial-gradient(circle, rgba(63, 245, 230, 0.16), rgba(155, 92, 255, 0.08) 40%, transparent 70%);
		animation: breathe 5s ease-in-out infinite;
	}
	.logo {
		position: relative;
		width: min(62vw, 520px);
		max-height: 24vh;
		object-fit: contain;
		filter: drop-shadow(0 0 24px rgba(63, 245, 230, 0.55));
		animation: float 4s ease-in-out infinite;
	}
	.cards { position: relative; display: flex; gap: 2vw; justify-content: center; padding: 0 3vw; }
	.card {
		width: min(28vw, 300px);
		background: linear-gradient(180deg, rgba(14, 58, 82, 0.85), rgba(3, 12, 26, 0.92));
		border: 1.5px solid rgba(63, 245, 230, 0.55);
		border-radius: 18px;
		box-shadow: 0 0 24px rgba(63, 245, 230, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.18);
		padding: 1.2vh 1vw 1.6vh;
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
		animation: rise 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards;
	}
	.art { width: 100%; aspect-ratio: 16 / 10; border-radius: 12px; background: #04101e center / cover no-repeat; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6); }
	h3 { margin: 1vh 0 0.4vh; font-weight: 900; font-style: italic; letter-spacing: 0.06em; font-size: clamp(13px, 1.6vw, 22px); color: #9ffcf3; text-shadow: 0 0 12px rgba(63, 245, 230, 0.8); }
	p { margin: 0; font-size: clamp(10px, 1.05vw, 15px); line-height: 1.35; color: #cfe9f2; font-weight: 600; }
	.maxwin { position: relative; font-weight: 800; letter-spacing: 0.15em; font-size: clamp(12px, 1.4vw, 20px); color: #ffd27a; text-shadow: 0 0 10px rgba(255, 184, 74, 0.7); }
	.maxwin b { font-size: 1.5em; font-style: italic; }
	.tap { position: relative; font-weight: 900; font-style: italic; letter-spacing: 0.2em; font-size: clamp(16px, 2vw, 28px); color: #fff; text-shadow: 0 0 16px #3ff5e6; animation: pulse 1.4s ease-in-out infinite; }
	.bar { position: relative; width: min(50vw, 380px); height: 10px; border-radius: 6px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(63, 245, 230, 0.5); overflow: hidden; }
	.fill { height: 100%; background: linear-gradient(90deg, #3ff5e6, #9b5cff, #ff3fb4); box-shadow: 0 0 12px #3ff5e6; transition: width 0.3s; }
	@media (max-aspect-ratio: 4/5) {
		.cards { flex-direction: column; gap: 1.2vh; }
		.card { width: min(80vw, 420px); display: grid; grid-template-columns: 38% 1fr; gap: 0 3vw; align-items: center; text-align: left; padding: 1.2vh 3vw; }
		.art { grid-row: span 2; }
		h3 { font-size: clamp(14px, 4.2vw, 22px); margin: 0; }
		p { font-size: clamp(11px, 3.2vw, 15px); }
		.logo { width: 78vw; }
	}
	@media (max-height: 460px) {
		.intro { gap: 1.2vh; }
		.logo { max-height: 20vh; }
		.art { aspect-ratio: 16 / 7; }
		p { font-size: 10px; }
	}
	@media (max-height: 300px) {
		.intro { gap: 4px; justify-content: space-evenly; }
		.logo { max-height: 16vh; }
		.card { padding: 4px 6px; }
		.card p { display: none; }
		.art { aspect-ratio: 16 / 6; }
		h3 { margin: 3px 0 0; font-size: 11px; }
		.maxwin { font-size: 10px; }
		.tap { font-size: 13px; }
	}
	@keyframes rise { to { opacity: 1; transform: translateY(0); } }
	@keyframes pulse { 50% { opacity: 0.45; transform: scale(0.96); } }
	@keyframes float { 50% { transform: translateY(-8px); } }
	@keyframes breathe { 50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.08); } }
	@media (prefers-reduced-motion: reduce) { .glow, .logo, .tap { animation: none; } }
</style>
