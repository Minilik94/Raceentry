import { message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { updateProfileSchema } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
// import { serialize } from 'object-to-formdata';

export const load = (async ({}) => {
	const accountData = await superValidate(zod(updateProfileSchema));
	return {
		accountData
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const formData = await request.formData();
		const avatarFile = formData.get('avatar') as File | null;

		console.log(formData, avatarFile, 'fromdata from server');

		if ((avatarFile?.size === 0)) {
			formData.delete('avatar');
		}
		formData.delete('avatar');

		const form = await superValidate(formData, zod(updateProfileSchema));
		if (!form.valid) {
			console.log(form);
			return fail(500, { form });
		}

		try {
			const { name, avatar } = await locals.pb.collection('users').update(locals?.user?.id, {
				name: form.data.name,
				avatar: avatarFile
			});

			console.log(name, avatar, 'name', 'avatar');
		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Something went wrong updating your profile');
		}

		return message(form, {
			text: 'Successfuly  updated profile',
			type: 'success'
		});
	}
};
