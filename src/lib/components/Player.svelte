<script lang="ts">
	import { Pause, Play } from 'lucide-svelte';

	type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;

	export let track: Track;

	let audio: HTMLAudioElement;
	let paused: boolean = true;
</script>

<div class="player">
	<audio bind:this={audio} bind:paused controls src={track.preview_url} preload="none" />
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
