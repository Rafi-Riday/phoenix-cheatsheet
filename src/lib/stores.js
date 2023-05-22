import { writable } from "svelte/store";
/**
 * $SideBarInfo = {title: str[], prefix: str}
 */
export const SideBarInfo = writable(null);
export const PassageInfo = writable([]);
