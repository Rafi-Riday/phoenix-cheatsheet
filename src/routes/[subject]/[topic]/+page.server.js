// import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
    const res = await fetch(`/db/index.json`);
    const SideBarInfo = await res.json();
    const info = SideBarInfo.find(sec => sec.section === params.subject);
    if (info) {
        const res2 = await fetch(`/db/${params.subject}/${params.topic}.json`);
        const mainData = await res2.json();
        return { mainData: { sideBarInfo: info, ...mainData } }
    } else {
        // throw error(404, { msg: 'Page not found' });
        return { mainData: { prototype: 'PageNotFound' } };
    }
};