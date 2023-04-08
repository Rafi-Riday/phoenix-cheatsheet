import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
    try {
        const res = await fetch(`/db/${params.subject}/${params.topic}.json`);
        const mainData = await res.json();
        return { mainData }
    } catch (err) {
        throw error(404);
    }
};