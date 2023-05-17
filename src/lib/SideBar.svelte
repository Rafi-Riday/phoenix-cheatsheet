<script>
    import { page } from "$app/stores";
    import { SideBarInfo, PassageInfo } from "$lib/stores";
    import { upperCaseWord } from "$lib/utilities";
</script>

<div class="drawer drawer-end">
    <input id="passage-sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <!-- Main sidebar content starts -->
        <div class="drawer drawer-mobile overflow-y-auto">
            <input id="app-sidebar" type="checkbox" class="drawer-toggle" />
            <div
                class="drawer-content overflow-y-visible flex flex-col items-center justify-center"
            >
                <!-- Page slot -->
                <slot />
                <!-- Close btn -->
                <label
                    for="app-sidebar"
                    class="btn btn-circle btn-primary fixed bottom-3 left-3 drawer-button lg:hidden"
                >
                    <svg
                        width="30"
                        height="30"
                        stroke-width="0"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            fill-rule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        /></svg
                    >
                </label>
            </div>
            <div class="drawer-side">
                <label for="app-sidebar" class="drawer-overlay" />
                <ul
                    class="menu p-4 bg-base-100 text-base-content w-3/4 lg:w-full pt-20 lg:border-2 lg:border-slate-200"
                >
                    <!-- Sidebar info -->
                    <aside class="flex flex-col">
                        {#if $SideBarInfo}
                            {#each $SideBarInfo.titles as title}
                                <a
                                    href="{$SideBarInfo.prefix}/{title}"
                                    class="{$page.url.pathname ===
                                    `${$SideBarInfo.prefix}/${title}`
                                        ? 'btn btn-primary'
                                        : 'btn btn-ghost'} justify-start rounded"
                                >
                                    {upperCaseWord(title)}
                                </a>
                            {/each}
                        {/if}
                        <!--  -->
                        <a
                            href="/others"
                            class="{$page.url.pathname === '/others'
                                ? 'btn btn-primary'
                                : 'btn btn-ghost'} justify-start rounded underline"
                        >
                            Others
                        </a>
                        <a
                            href="/timer"
                            class="{$page.url.pathname === '/timer'
                                ? 'btn btn-primary'
                                : 'btn btn-ghost'} justify-start rounded underline"
                        >
                            Timer
                        </a>
                    </aside>
                </ul>
            </div>
        </div>
        <!-- Main sidebar ends -->
    </div>
    <div class="drawer-side">
        <label for="passage-sidebar" class="drawer-overlay" />
        <ul
            class="menu bg-gray-400 text-base-content w-full px-2 pt-20 relative flex flex-col gap-16"
        >
            <!-- Passage Sidebar info -->
            {#if $PassageInfo.length > 0}
                {#each $PassageInfo as p}
                    <span
                        class="text-justify text-sm w-full bg-base-100 px-2 pt-6 pb-2 rounded leading-4"
                    >
                        {@html p}
                    </span>
                {/each}
            {/if}
            <label
                for="passage-sidebar"
                class="btn btn-circle btn-primary drawer-button sticky bottom-3 left-3"
            >
                <svg
                    width="30"
                    height="30"
                    stroke-width="0"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        fill-rule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                    /></svg
                >
            </label>
        </ul>
    </div>
</div>
