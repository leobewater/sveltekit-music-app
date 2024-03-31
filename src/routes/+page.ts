import type { PageLoad } from './$types';
import { fetchRefresh } from '$helpers';

export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
	// console.log('PAGE LOAD');

	// override fetch function with our own
	const fetch = (path: string) => fetchRefresh(_fetch, path);
	const { user } = await parent();

	// let fetch them in parallel without awaiting
	const newReleases = fetch('/api/spotify/browse/new-releases?limit=6');
	const featuredPlaylists = fetch('/api/spotify/browse/featured-playlists?limit=6');
	const userPlaylists = fetch(`/api/spotify/users/${user?.id}/playlists?limit=6`);

	// fetch 20 categories and choose 3 random categories and fetch their playlist
	const catsRes = await fetch(`/api/spotify/browse/categories`);
	const catsResJSON: SpotifyApi.MultipleCategoriesResponse | undefined = catsRes.ok
		? await catsRes.json()
		: undefined;
	const randomCats = catsResJSON
		? catsResJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3)
		: [];
	// console.log(randomCats);
	const randomCatsPromises = randomCats.map((cat) =>
		fetch(`/api/spotify/browse/categories/${cat.id}/playlists?limit=6`)
	);

	const [newReleasesRes, featuredPlaylistsRes, userPlaylistsRes, ...randomCatsRes] =
		await Promise.all([newReleases, featuredPlaylists, userPlaylists, ...randomCatsPromises]);
	// console.log(randomCatsRes);

	// cast them with the spotify types
	return {
		newReleases: newReleasesRes.ok
			? ((await newReleasesRes.json()) as SpotifyApi.ListOfNewReleasesResponse)
			: undefined,
		featuredPlaylists: featuredPlaylistsRes.ok
			? ((await featuredPlaylistsRes.json()) as SpotifyApi.ListOfFeaturedPlaylistsResponse)
			: undefined,
		userPlaylists: userPlaylistsRes.ok
			? ((await userPlaylistsRes.json()) as SpotifyApi.ListOfUsersPlaylistsResponse)
			: undefined,
		homeCategories: randomCats,
		categoriesPlaylists: await Promise.all(
			randomCatsRes.map(async (res) =>
				res.ok ? ((await res.json()) as SpotifyApi.CategoryPlaylistsResponse) : undefined
			)
		)
	};
};
