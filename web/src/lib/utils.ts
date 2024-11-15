import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ZodObject, ZodString, ZodTypeAny } from 'zod';

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
