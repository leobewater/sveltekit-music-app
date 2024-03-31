<script lang="ts">
	import { LogoutButton } from '$components';
	import { page } from '$app/stores';
	import { Button } from '$components';
	import { invalidate } from '$app/navigation';

	let isRetrying: boolean = false;

	const retryRoutes = ['/album/[id]'];
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="content">
	<h1>{$page.error?.message}</h1>
	{#if $page.status === 404}
		<p>The page you are trying to access cannot be found.</p>
		<div class="buttons">
			<Button element="a" href="/">Home</Button>
			<Button element="a" href="/search">Search</Button>
		</div>
	{/if}

	{#if $page.status === 401}
		<p>The current session has expired, please logout and login again.</p>
		<div class="buttons">
			<LogoutButton />
		</div>
	{/if}

  <!-- check route id and only show retry button for /album/id -->
	{#if ![404, 401].includes($page.status) && $page.route.id && retryRoutes.includes($page.route.id)}
		<div class="buttons">
			<Button
				disabled={isRetrying}
				element="button"
				on:click={async () => {
					isRetrying = true;
					await invalidate(`app:${$page.route.id}`);
					isRetrying = false;
				}}>Retry</Button
			>
		</div>
	{/if}
</div>

<style lang="scss">
	.content {
		text-align: center;
		h1 {
			font-size: functions.toRem(40);
		}
		p {
			font-size: functions.toRem(20);
		}
		.buttons {
			margin-top: 40px;
			:global(a) {
				margin: 0 5px;
			}
		}
	}
</style>
