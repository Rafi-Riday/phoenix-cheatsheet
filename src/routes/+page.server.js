export const load = async ({ fetch }) => {
    const res2 = await fetch(`/db/index.json`);
    if (res2.ok) {
        const SideBarInfo = await res2.json();
        const info = { section: "home" };
        info.topicLish = SideBarInfo.map(t => t.section)
        return { mainData: { sideBarInfo: info } }
    }
}