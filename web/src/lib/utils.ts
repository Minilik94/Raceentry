import { type ClassValue, clsx } from 'clsx';
import { toast } from 'svelte-sonner';
import { superForm } from 'sveltekit-superforms';
import { zodClient } from 'sveltekit-superforms/adapters';
import { twMerge } from 'tailwind-merge';
import type { ZodObject, ZodString, ZodTypeAny } from 'zod';
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const serializeNonPOJOs = (obj: any) => {
	return structuredClone(obj);
};

export const validateData = async (
	formData: Iterable<readonly [PropertyKey, any]>,
	schema: ZodObject<
		{ email: ZodString; password: ZodString },
		'strip',
		ZodTypeAny,
		{ email: string; password: string },
		{ email: string; password: string }
	>
) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};

export const getImageURL = (collectionId: any, recordId: any, fileName: any, size = '0x0') => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

/**
 * Helper function to create a superForm with common behaviors.
 * @param {Object} data - The data for the form.
 * @param {Object} schema - The Zod schema for validation.
 * @param {Function} [onSuccess] - Optional callback for success handling.
 * @returns {Object} The superForm instance.
 **/

export const hanldeSuperForm = (data, schema, type) => {
	return superForm(data, {
		validators: zodClient(schema),
		onUpdated: ({ form }) => {
			if (form.message) {
				if (form.message.type == 'error') {
					toast.error(form.message.text);
				} else {
					toast.success(form.message.text);
				}
			}
		}
	});
};

export const formatDate = (date) => {
	const parsedDate = dayjs(date);
	return parsedDate.isValid() ? parsedDate.format('DD MMM YYYY') : 'Invalid Date';
};
