import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://localhost:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();

			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	console.log(event.locals.user, event.url.pathname);
	if (event.url.pathname.startsWith('/(app)')) {
		console.log('Redirecting');
	}
	return response;
};