import { indexDB, data404 } from '$lib/indexDB';

export const load = async ({ params, fetch }) => {
    const SideBarInfo = indexDB.find(sec => sec.section === params.subject);
    if (SideBarInfo) {
        const res2 = await fetch(`/db/${params.subject}/${params.topic}.json`);
        const mainData = await res2.json();
        return { mainData: { sideBarInfo: SideBarInfo, ...mainData } }
    } else {
        console.log(data404);
        return { mainData: data404 };
    }
};
