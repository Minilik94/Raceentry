import z from 'zod';

export const loginSchema = z.object({
	email: z
		.string({
			required_error: 'email is required'
		})
		.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: 'Please enter a valid email'
		})
		.trim(),
	password: z
		.string({
			required_error: 'password is required'
		})
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
		})
});

export const registerSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required' })
			.regex(/^[a-zA-z\s]*$/, { message: 'Name can only contain letters and spaces.' })
			.min(2, { message: 'Name must be at least 2 characters' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
				message: 'Please enter a valid email'
			})
			.trim(),
		username: z
			.string()
			.regex(/^[a-zA-Z0-9_]+$/, {
				message: 'Username can only contain letters, numbers, and underscores.'
			})
			.min(2, {
				message: 'username must be at least 2 characters long'
			})
			.max(50, {
				message: 'Name must be less than 50 characters'
			})
			.trim(),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

const imageTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/svg+xml',
	'image/gif'
];

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim(),
	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		})
});

export const updateAccountSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: 'Please enter a valid email'
		})
		.min(1, { message: 'Email is required' })
		.max(64, { message: 'Email must be 64 characters or less' })
		.trim(),

	username: z
		.string()
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: 'Username can only contain letters, numbers, and underscores.'
		})
		.min(2, {
			message: 'username must be at least 2 characters long'
		})
		.max(50, {
			message: 'Name must be less than 50 characters'
		})
		.trim()
});

export const updatePasswordSchema = z
	.object({
		currentPassword: z
			.string({ required_error: 'current password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Password confirm is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const createEventSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim(),
	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5 * 1024 * 1024) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 5MB'
					});
				}
				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		}),
	description: z
		.string()
		.max(256, { message: 'Description must be 256 characters or less' })
		.trim(),
	location: z
		.string()
		.min(1, { message: 'Location is required' })
		.max(128, { message: 'Location must be 128 characters or less' }),
	layout: z
		.string()
		.min(1, { message: 'Layout is required' })
		.max(64, { message: 'Layout must be 64 characters or less' }),
	date: z.string().or(z.date()).default('2024-01-12'),
	cost: z.number().nonnegative({ message: 'Cost must be a positive number' }),
	approx_number_of_cars: z
		.number()
		.int()
		.min(1, { message: 'Approximate number of cars must be at least 1' }),
	format: z
		.string()
		.min(1, { message: 'Format is required' })
		.max(64, { message: 'Format must be 64 characters or less' }),
	natsoft_timing: z.boolean(),
	sessions: z
		.string()
		.min(1, { message: 'Sessions are required' })
		.max(128, { message: 'Sessions must be 128 characters or less' }),
	eligible_cars: z
		.string()
		.min(1, { message: 'Eligible cars is required' })
		.max(128, { message: 'Eligible cars must be 128 characters or less' }),
	second_driver_policy: z
		.string()
		.min(1, { message: 'Second driver policy is required' })
		.max(64, { message: 'Second driver policy must be 64 characters or less' }),
	passenger_policy: z
		.string()
		.min(1, { message: 'Passenger policy is required' })
		.max(64, { message: 'Passenger policy must be 64 characters or less' }),
	aasa_license: z.boolean(),
	engine_requirement: z.boolean(),
	additional_infos: z.string().min(1, { message: 'Additional infos is required' }).trim().optional()
});

export const addVehicleSchema = z.object({
	car_year: z.string().min(1, { message: 'Car year is required' }),
	car_make: z.string().min(1, { message: 'Car make is required' }),
	car_model: z.string().min(1, { message: 'Car model is required' }),
	car_colour: z.string().min(1, { message: 'Car colour is required' }),
	drivetrain_layout: z.string().min(1, { message: 'Drivetrain layout is required' }),
	induction: z.string().min(1, { message: 'Induction is required' }),
	tyre_treadwear: z.string().min(1, { message: 'Tyre treadwear is required' })
});
