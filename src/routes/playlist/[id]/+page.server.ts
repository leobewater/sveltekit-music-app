import { SPOTIFY_BASE_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	followPlaylist: async ({ cookies, params, fetch }) => {
		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}/followers`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${cookies.get('access_token')}`
			}
		});

		if (!res.ok) {
			// add followForm to true since the /playlist/[id]/+page uses two forms
			// this would help identify the response
			return fail(res.status, { followError: res.statusText, followForm: true });
		}
	},
	unFollowPlaylist: async ({ cookies, params, fetch }) => {
		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}/followers`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${cookies.get('access_token')}`
			}
		});

		if (!res.ok) {
			return fail(res.status, { followError: res.statusText, followForm: true });
		}
	},
	removeItem: async ({ request, cookies, params, fetch }) => {
		const data = await request.formData();
		const track = data.get('track');
		const playlist = params.id;

		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${playlist}/tracks`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${cookies.get('access_token')}`
			},
			body: JSON.stringify({
				uris: [`spotify:track:${track}`]
			})
		});

		if (!res.ok) {
			redirect(303, `/playlist/${playlist}?error=${res.statusText}`);
		}

		redirect(303, `/playlist/${playlist}?success=Track removed successfully!`);
	}
};
