import { writable } from "svelte/store";
import { indexDB } from '$lib/indexDB';

// SideBarInfo: {titles: [Str], prefix: Str}
// export const SideBarInfo = writable({ titles: indexDB.map(i => i.section), prefix: '' });
export const SideBarInfo = writable(null);
