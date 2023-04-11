import { index } from '$lib/index';

export const load = async ({ params, fetch }) => {
    const SideBarInfo = index.find(sec => sec.section === params.subject);
    if (SideBarInfo) {
        const res2 = await fetch(`/db/${params.subject}/${params.topic}.json`);
        const mainData = await res2.json();
        return { mainData: { sideBarInfo: SideBarInfo, ...mainData } }
    } else {
        // throw error(404, { msg: 'Page not found' });
        return { mainData: { prototype: 'PageNotFound' } };
    }
};