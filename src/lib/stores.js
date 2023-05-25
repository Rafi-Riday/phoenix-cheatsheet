import { writable } from "svelte/store";
/**
 * $SideBarInfo = {titles: str[], prefix: str}
 */
export const SideBarInfo = writable(null);
export const PassageInfo = writable([]);
