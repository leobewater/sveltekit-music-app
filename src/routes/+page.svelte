<script lang="ts">
	import { Button } from '$components';
	import type { PageData } from './$types';

	export let data: PageData;
	// $: console.log(data);

	let sections: {
		title: string;
		path: string;
		items: (SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified)[];
	}[] = [];

	// pushing items into sections array
	$: {
		if (data.newReleases) {
			sections.push({
				title: 'New Releases',
				path: '/section/new-releases',
				items: data.newReleases.albums.items
			});
		}

		if (data.featuredPlaylists) {
			sections.push({
				title: 'Featured Playlists',
				path: '/section/featured-playlists',
				items: data.featuredPlaylists.playlists.items
			});
		}

		data.homeCategories.forEach((category, index) => {
			const categoryPlaylist = data.categoriesPlaylists[index];
			if (categoryPlaylist) {
				sections.push({
					title: category.name,
					path: `/category/${category.id}`,
					items: categoryPlaylist.playlists.items
				});
			}
		});

		if (data.userPlaylists) {
			sections.push({
				title: 'Your Playlists',
				path: '/playlists',
				items: data.userPlaylists.items
			});
		}
	}

	// $:console.log(sections);
</script>

{#each sections as section}
	<section class="content-row">
		<div class="content-row-header">
			<div class="right">
				<h2 class="section-title">{section.title}</h2>
			</div>
			<div class="lef">
				<Button element="a" href={section.path} variant="outline">See All</Button>
			</div>
		</div>
	</section>
{/each}
