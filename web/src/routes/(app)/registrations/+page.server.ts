import { message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { registerForEvent } from '$lib/schema';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	registerForEvent: async ({ request, locals }) => {
		const form = await superValidate(request, zod(registerForEvent));

		if (!form.valid) {
			console.log(form);
			return message(form, {
				text: 'Something went wrong',
				type: 'error'
			});
		}

		console.log(form.data, 'success form');

		return message(form, {
			text: 'Successfuly registered for the event',
			type: 'success'
		});
	}
};
