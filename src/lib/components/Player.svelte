<script lang="ts" context="module">
	// use context module and share the "current" variable
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	import { Pause, Play } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;

	export let track: Track;

	let audio: HTMLAudioElement;
	let paused: boolean = true;

	// Set up dispatch with type
	const dispatch = createEventDispatcher<{
		play: { track: Track };
		pause: { track: Track };
	}>();

	function onPlay() {
		// pause the current playing audio and reset position to 0
		if (current && current !== audio) {
			current.currentTime = 0;
			current.pause();
		}
		// play the current track
		current = audio;
		dispatch('play', { track });
	}

	function onPause() {
		dispatch('pause', { track });
	}
</script>

<div class="player">
	<audio
		on:play={onPlay}
		on:pause={onPause}
		bind:this={audio}
		bind:paused
		controls
		src={track.preview_url}
		preload="none"
	/>
	<button
		aria-label={paused ? `Play ${track.name}` : `Pause ${track.name}`}
		on:click={() => {
			if (paused) {
				audio.play();
			} else {
				audio.pause();
			}
		}}
	>
		{#if paused}
			<Play color="var(--text-color)" focusable="false" aria-hidden />
		{:else}
			<Pause color="var(--text-color)" focusable="false" aria-hidden />
		{/if}
	</button>
</div>

<style lang="scss">
	.player {
		audio {
			display: none;
		}
		button {
			width: 12px;
			height: 12px;
			padding: 0;
			background: none;
			border: none;
			cursor: pointer;
			:global(svg) {
				fill: var(--text-color);
				width: 12px;
				height: 12px;
			}
		}
	}
</style>
