import { message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createEventSchema } from '$lib/schema';
import { error } from '@sveltejs/kit';

export const load = (async ({}) => {
	const form = await superValidate(zod(createEventSchema));
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createEvent: async ({ request, locals }) => {
		const form = await superValidate(request, zod(createEventSchema));
		console.log(form, 'from page.server.ts');

		if (!form.valid) {
			return message(form, {
				text: 'Something went wrong',
				type: 'error'
			});
		}

		if(form.data.avatar?.size == 0) {
			form.data.avatar = undefined;
		}

		try {
			await locals.pb.collection('events').create(form?.data)

		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Something went wrong updating your profile');
		}

		return message(form, {
			text: 'Event created',
			type: 'success'
		});
	}
};
