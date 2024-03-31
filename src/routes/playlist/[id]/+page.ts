import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch: _fetch, params, depends, route }) => {
	// use depends to reference for invalidation on error page retry button
	depends(`app:${route.id}`);

	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const playlistRes = await fetch(`/api/spotify/playlists/${params.id}`);
	if (!playlistRes.ok) {
		error(playlistRes.status, 'Failed to load playlist!');
	}

	const playlistResJSON: SpotifyApi.SinglePlaylistResponse = await playlistRes.json();

	// get image average-color for background effect
	let color = null;
	if (playlistResJSON.images.length > 0) {
		const colorRes = await fetch(
			`/api/average-color?${new URLSearchParams({
				image: playlistResJSON.images[0].url
			}).toString()}`
		);

		if (colorRes.ok) {
			color = (await colorRes.json()).color;
		}
	}

	return {
		playlist: playlistResJSON,
		title: playlistResJSON.name,
		color
	};
};
