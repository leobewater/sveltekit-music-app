import type { LayoutServerLoad } from './$types';
import { SPOTIFY_BASE_URL } from '$env/static/private';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	// get access token from cookie
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		return {
			user: null
		};
	}

	// get user profile
	const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (profileRes.ok) {
		const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();

		return {
			user: profile
		};
	} else {
		return {
			user: null
		};
	}
};
