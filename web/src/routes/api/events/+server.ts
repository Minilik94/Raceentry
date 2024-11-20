import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {

	const events = await locals.pb.collection('events').create(await request.json());
	console.log(events, 'events from api');
	return new Response(JSON.stringify(events));
};
