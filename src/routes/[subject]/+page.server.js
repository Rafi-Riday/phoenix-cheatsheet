import { indexDB } from '$lib/indexDB';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const SideBarInfo = indexDB.find(sec => sec.section === params.subject);
    if (SideBarInfo) {
        return { mainData: { sideBarInfo: SideBarInfo } }
    } else {
        throw error(404, { msg: 'Page not found' });
    }
}
