import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const event = await locals.pb.collection('events').getOne(`${params.id}`);
	console.log(event, 'event from load');
	return {
		event
	};
}) satisfies PageServerLoad;
