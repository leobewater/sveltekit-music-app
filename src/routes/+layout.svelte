<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user = data.user;
</script>

{#if user}
	<p>Hello {user.display_name}</p>
	<!-- form will work without JS enabled -->
	<form method="POST" action="/api/auth/logout">
		<button type="submit">Logout</button>
	</form>
{/if}

<slot />
