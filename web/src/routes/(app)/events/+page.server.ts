import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
    console.log(locals.user?.role, 'user role from load');

    try {
        // Fetch all events regardless of user role
        const events = await locals.pb.collection('events').getFullList();
        
        console.log(events, 'events from load');
        return { events };
    } catch (err) {
        console.error('Error fetching events:', err);
        throw error(500, 'Error fetching events. Please try again later.');
    }
}) satisfies PageServerLoad;