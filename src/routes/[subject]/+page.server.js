import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
    const res2 = await fetch(`/db/index.json`);
    const SideBarInfo = await res2.json();
    const info = SideBarInfo.find(sec => sec.section === params.subject);
    if (info) {
        return { mainData: { sideBarInfo: info } }
    } else {
        throw error(404, { msg: 'Page not found' });
    }
}