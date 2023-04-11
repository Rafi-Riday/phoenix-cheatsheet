import { index } from '$lib/index';

export const load = async () => {
    const SideBarInfo = { section: "home" };
    SideBarInfo.topicLish = index.map(t => t.section);
    return { mainData: { sideBarInfo: SideBarInfo } }
}