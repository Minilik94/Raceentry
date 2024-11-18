import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit'

export const load = (async ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user
		};
	}
	throw redirect(303, '/login')
}) satisfies LayoutServerLoad;
