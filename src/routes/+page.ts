import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
	const { user } = await parent();

	// let fetch them in parallel without awaiting
	const newReleases = fetch('/api/spotify/browse/new-releases?limit=6');
	const featuredPlaylists = fetch('/api/spotify/browse/featured-playlists?limit=6');
	const userPlaylists = fetch(`/api/spotify/users/${user?.id}/playlists?limit=6`);

	const [newReleasesRes, featuredPlaylistsRes, userPlaylistsRes] = await Promise.all([
		newReleases,
		featuredPlaylists,
		userPlaylists
	]);

	return {
		newReleasesRes: newReleasesRes.ok ? newReleasesRes.json() : undefined,
		featuredPlaylistsRes: featuredPlaylistsRes.ok ? featuredPlaylistsRes.json() : undefined,
		userPlaylistsRes: userPlaylistsRes.ok ? userPlaylistsRes.json() : undefined
	};
};
