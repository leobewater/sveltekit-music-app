import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ cookies, request }) => {
	cookies.delete('access_token', { path: '/' });
	cookies.delete('refresh_token', { path: '/' });

	// if headers has accept which is calling from JS
	if (request.headers.get('accept') === 'application/json') {
		return json({ success: true });
	}

  // otherwise redirect 
	redirect(303, '/login');
};
