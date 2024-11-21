import { message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { addVehicleSchema } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const vehicles = await locals.pb.collection('vehicle').getFullList({
		filter: `user_id.id="${locals.user?.id}"`
	});
	const vehicleData = await superValidate(zod(addVehicleSchema));

	return {
		vehicles,
		vehicleData
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	addNewVehicle: async ({ request, locals }) => {
		const form = await superValidate(request, zod(addVehicleSchema));

		if (!form.valid) {
			console.log(form);
			return message(form, {
				text: 'Something went wrong',
				type: 'error'
			});
		}

		console.log(form.data, 'success form');

		try {
			const vehicle = await locals.pb
				.collection('vehicle')
				.create({ ...form.data, user_id: locals.user.id });

			console.log(vehicle, 'vehicle');

			return message(form, {
				text: 'Successfuly  added a new vehicle to your collection',
				type: 'success'
			});
		} catch (err: any) {
			console.log('Error:', err.response.data, 'res data');
			console.log('Error1:', err.response, '');

			throw error(400, 'Something went wrong while adding a new vehicle');
		}
	}
};
