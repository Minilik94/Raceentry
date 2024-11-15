import { message, superValidate } from 'sveltekit-superforms';
import { loginSchema } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			console.log(form, 'from error');
			return fail(500, { form });
		}

		console.log(form);

		try {
			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);
			if (!locals.pb.authStore.model?.verified) {
				console.log(locals.pb.authStore.model?.verified);
				locals.pb.authStore.clear();

				return message(form, { text: 'Please verify your email', type: 'error' });
			}
		} catch (err: any) {
			console.log('Error', err);
			throw error(err.status, err.message);
		}

		redirect(303, '/');
	}
};
