import { writable } from 'svelte/store';
import uniqid from 'uniqid';

type ToastMessage = {
	type: 'info' | 'warning' | 'error' | 'success';
	message: string;
	id: string;
};

function createToastsStore() {
	// store requires to return a subscribe()
	const { subscribe } = writable<ToastMessage[]>([]);
	return {
		subscribe
	};
}

export default createToastsStore();
