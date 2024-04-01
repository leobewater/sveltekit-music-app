import { writable } from 'svelte/store';
import uniqid from 'uniqid';

function createToastsStore() {
	// store requires to return a subscribe()
	const { subscribe } = writable([]);
	return {
		subscribe
	};
}

export default createToastsStore();
