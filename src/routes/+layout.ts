import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

// run on both client and server side
export const load: LayoutLoad = ({ data, url }) => {
  // console.log("LOAD UNIVERSAL");
	
  // extra user profile , user can be undefined
	const { user } = data || {};

	// if there is a user, but on the login page, redirect to the homepage
	if (user && url.pathname === '/login') {
		throw redirect(307, '/');
	}

	// if no user, redirect to the login page
	if (!user && url.pathname !== '/login') {
		throw redirect(307, '/login');
	}

	return {
		user
	};
};
