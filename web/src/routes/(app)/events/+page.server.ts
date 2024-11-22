import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { error, type Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { createEventSchema } from '$lib/schema';

export const load = (async ({ locals }) => {
	const form = await superValidate(zod(createEventSchema));

	try {
		// Fetch all events regardless of user role
		const events = await locals.pb.collection('events').getFullList();

		// console.log(events, 'events from load');
		return { events, form };
	} catch (err) {
		console.error('Error fetching events:', err);
		return {
			form,
			events: []
		};
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	createNewEvent: async ({ request, locals }) => {
		const form = await superValidate(request, zod(createEventSchema));
		console.log(form, 'from page.server.ts');

		if (!form.valid) {
			return message(form, {
				text: 'Something went wrong',
				type: 'error'
			});
		}

		if (form.data.avatar?.size == 0) {
			form.data.avatar = undefined;
		}

		try {
			await locals.pb.collection('events').create(form?.data);
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
