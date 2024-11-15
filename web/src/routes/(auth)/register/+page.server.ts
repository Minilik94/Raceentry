import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { registerSchema } from '$lib/schema.js';

export const load = async () => {
	const form = await superValidate(zod(registerSchema));
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			console.log(form, 'from error');
			return fail(500, { form });
		}

		console.log({ ...form.data }, locals, 'from pb');

		try {
			await locals.pb.collection('users').create({ ...form.data, role: 'user' });
			await locals.pb.collection('users').requestVerification(form.data.email);
		} catch (err) {
			console.log('Error', err);
			throw error(500, 'Something went wrong while creating an account');
		}

		throw redirect(303, '/login');
	}
};
