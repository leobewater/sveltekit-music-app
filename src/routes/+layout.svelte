<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { Navigation } from '$components';

	export let data: LayoutData;

	$: user = data.user;
</script>

<div id="main">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		<div id="topbar">topbar</div>
		<main id="main-content">
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;

		#content {
			flex: 1;

			#topbar {
				position: fixed;
				height: var(--header-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
        width: 100%;
        z-index: 100;
        @include breakpoint.up('md') {
					padding: 0 30px;
          width: calc(100% - var(--sidebar-width));
				}
			}

			main#main-content {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
			}
		}
	}
</style>
