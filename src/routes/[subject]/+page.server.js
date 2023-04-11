import { index } from '$lib/index';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const SideBarInfo = index.find(sec => sec.section === params.subject);
    if (SideBarInfo) {
        return { mainData: { sideBarInfo: SideBarInfo } }
    } else {
        throw error(404, { msg: 'Page not found' });
    }
}