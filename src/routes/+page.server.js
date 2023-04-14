import { indexDB } from '$lib/indexDB';

export const load = async () => {
    const SideBarInfo = { section: "home" };
    SideBarInfo.topicList = indexDB;
    return { mainData: { sideBarInfo: SideBarInfo } }
}
