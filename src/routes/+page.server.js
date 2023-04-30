import { indexDB } from '$lib/indexDB';

export const load = async () => {
    const SideBarInfo = {};
    SideBarInfo.topicList = indexDB;
    return { mainData: { sideBarInfo: SideBarInfo } }
}
