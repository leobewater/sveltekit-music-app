<script lang="ts">
	import { invalidateAll } from '$app/navigation';
</script>
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
