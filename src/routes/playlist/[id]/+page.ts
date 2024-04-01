import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch: _fetch, params, depends, route, url, parent }) => {
	// use depends to reference for invalidation on error page retry button
	depends(`app:${route.id}`);

	// check if user follows the playlist
	const { user } = await parent();

	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const limit = 100;
	const page = url.searchParams.get('page');

	const [playlistRes, isFollowingRes] = await Promise.all([
		fetch(`/api/spotify/playlists/${params.id}`),
		// get user follows playlist
		fetch(
			`/api/spotify/playlists/${params.id}/followers/contains?${new URLSearchParams({
				ids: user ? user.id : ''
			}).toString()}`
		)
	]);

	if (!playlistRes.ok) {
		error(playlistRes.status, 'Failed to load playlist!');
	}

	let isFollowing: boolean | null = null;
	if (isFollowingRes.ok) {
		const isFollowingJSON: SpotifyApi.UsersFollowPlaylistResponse = await isFollowingRes.json();
		isFollowing = isFollowingJSON[0];
	}

	const playlistResJSON: SpotifyApi.SinglePlaylistResponse = await playlistRes.json();

	// Pagination for no-js
	if (page && page !== '1') {
		const tracksRes = await fetch(
			`/api/spotify/playlists/${params.id}/tracks?${new URLSearchParams({
				limit: `${limit}`,
				offset: `${limit * (Number(page) - 1)}`
			}).toString()}`
		);
		if (!tracksRes.ok) {
			error(tracksRes.status, 'Failed to load playlist!');
		}
		const tracksResJSON = await tracksRes.json();
		playlistResJSON.tracks = tracksResJSON;
	}

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
		color,
		isFollowing
	};
};
