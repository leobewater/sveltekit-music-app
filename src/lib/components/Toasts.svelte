<script lang="ts">
	import { toasts } from '$stores';
</script>

{#if $toasts.length > 0}
	<div class="toasts">
		{#each $toasts as toast (toast.id)}
			<div class="toast {toast.type}">
				<div class="content" role="status">{toast.message}</div>
			</div>
		{/each}
	</div>
{/if}
