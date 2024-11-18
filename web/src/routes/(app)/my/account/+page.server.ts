import { message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { updateAccountSchema, updatePasswordSchema, updateProfileSchema } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
// import { serialize } from 'object-to-formdata';

export const load = (async ({}) => {
	const accountData = await superValidate(zod(updateProfileSchema));
	const profileData = await superValidate(zod(updateAccountSchema));
	const passwordData = await superValidate(zod(updatePasswordSchema));
	return {
		accountData,
		profileData,
		passwordData
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const formData = await request.formData();
		const avatarFile = formData.get('avatar') as File | null;

		console.log(formData, avatarFile?.size, 'fromdata from server');

		if (avatarFile?.size === 0) {
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
				avatar: avatarFile?.size === 0 ? locals.user.avatar : avatarFile
			});

			locals.user.name = name;
			locals.user.avatar = avatar;

			console.log(name, avatar, 'name', 'avatar');
		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Something went wrong updating your profile');
		}

		return message(form, {
			text: 'Successfuly  updated profile',
			type: 'success'
		});
	},

	updateAccount: async ({ request, locals }) => {
		const form = await superValidate(request, zod(updateAccountSchema));

		if (!form.valid) {
			console.log(form);
			return message(form, {
				text: 'Something went wrong',
				type: 'error'
			});
		}

		if (form.data.email === locals.user.email && form.data.username === locals.user.username) {
			return message(form, {
				text: 'No changes made',
				type: 'error'
			});
		}

		try {
			const { email, username } = await locals.pb.collection('users').update(locals.user.id, {
				email: form.data.email,
				username: form.data.username
			});

			locals.user.email = email;
			locals.user.username = username;
		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Something went wrong updating your account details');
		}

		return message(form, {
			text: 'Successfuly  updated your account',
			type: 'success'
		});
	},

	updatePassword: async ({ request, locals }) => {
		const form = await superValidate(request, zod(updatePasswordSchema));

		if (!form.valid) {
			console.log(form);
			return message(form, {
				text: 'Something went wrong',
				type: 'error'
			});
		}

		console.log(form.data.currentPassword, form.data.password, form.data.passwordConfirm);
		try {
			await locals.pb.collection('users').update(locals.user.id, {
				oldPassword: form.data.currentPassword,
				password: form.data.password,
				passwordConfirm: form.data.passwordConfirm
			});

			setTimeout(() => {
				locals.pb.authStore.clear();
			}, 1000);
		} catch (err: any) {
			console.log('Error:', err.response.data, 'res data');
			console.log('Error1:', err.response, '');

			throw error(400, 'Something went wrong updating your account details');
		}

		return message(form, {
			text: 'Successfuly  updated your password',
			type: 'success'
		});
	}
};
