import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
    const res = await fetch(`/db/${params.subject}/${params.topic}.json`);
    if (res.ok) {
        const mainData = await res.json();
        return { mainData }
    } else {
        throw error(404, { msg: 'You are lost' });
    }
};