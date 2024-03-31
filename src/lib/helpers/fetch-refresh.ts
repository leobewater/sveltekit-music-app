import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

// refresh access token before fetch on the client side
export default async function fetchRefresh(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	path: string
) {
	const req = fetch(path);
	if (!browser) return req;
	const res = await req;

	// if response is 401, refresh token and re-fetch again
	if (res.status === 401) {
		// Store refresh token to a window object without refreshing tokens multiple times
		if (!window.refreshPromise) {
			window.refreshPromise = fetch('/api/auth/refresh').finally(() => {
				window.refreshPromise = null;
			});
		}
		const refreshRes = await window.refreshPromise;
		if (!refreshRes.ok) error(401, 'Session Expired!');

		return fetch(path);
	} else {
		return res;
	}
}
