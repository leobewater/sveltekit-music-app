<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: LayoutData;

	$: user = data.user;
</script>

{#if user}
	<p>Hello {user.display_name}</p>
	<!-- form will use action when JS is disabled otherwise use submit() and invalidate page without full refresh -->
	<form
		method="POST"
		action="/api/auth/logout"
		on:submit|preventDefault={async () => {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				headers: {
					accept: 'application/json'
				}
			});

			// need to invalidate the page without full refresh
			if (response.ok) {
				invalidateAll();
			}
		}}
	>
		<button type="submit">Logout</button>
	</form>
{/if}

<slot />
