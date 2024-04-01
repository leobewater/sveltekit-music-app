<script lang="ts">
	import { Button } from '$components';
	import type { ActionData as AddActionData } from '../../routes/playlists/new/$types';

	export let form: AddActionData;
	export let userID: string | undefined = undefined;
  export let action: string | undefined = undefined;
</script>

<form method="POST" {action}>
  {#if userID}
	  <input hidden name="userID" value={userID} />
  {/if}

	<div class="field" class:has-error={form?.nameError}>
		<label for="playlist-name">Name *</label>
		<input
			type="text"
			id="playlist-name"
			name="name"
			placeholder="Playlist Name"
			value={form?.name || ''}
		/>
		{#if form?.nameError}
			<p class="error">{form.nameError}</p>
		{/if}
	</div>
	<div class="field">
		<label for="playlist-description">Description</label>
		<input
			type="text"
			id="playlist-description"
			name="description"
			placeholder="Playlist Description"
			value={form?.description || ''}
		/>
	</div>
	{#if form?.apiError}
		<p class="error">{form.apiError}</p>
	{/if}
	<div class="submit-button">
		<Button element="button" type="submit">Create Playlist</Button>
	</div>
</form>
