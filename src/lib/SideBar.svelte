<script>
    import { page } from "$app/stores";
    import { SideBarInfo } from "$lib/stores";
    import { upperCaseWord } from "$lib/utilities";
</script>

<!-- .split("-").map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(" ") -->
<div class="drawer drawer-mobile">
    <input id="app-sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <slot />
        <label
            for="app-sidebar"
            class="btn btn-circle btn-primary fixed bottom-3 left-3 drawer-button lg:hidden"
        >
            <svg
                width="30"
                height="30"
                stroke-width="0"
                class=""
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
            class="menu p-4 bg-base-100 text-base-content pt-20 w-3/4 lg:w-full lg:border-2 lg:border-slate-200"
        >
            <!-- Sidebar content here -->
            <aside class="flex flex-col">
                {#if $SideBarInfo}
                    {#each $SideBarInfo.titles as title}
                        <a
                            href="{$SideBarInfo.prefix}/{title}"
                            class="{$page.url.pathname ===
                            `${$SideBarInfo.prefix}/${title}`
                                ? 'btn btn-primary' // 'btn btn-info bg-[#2292e4] text-white hover:bg-[#2292e4]'
                                : 'btn btn-ghost'} justify-start rounded"
                        >
                            {upperCaseWord(title)}
                        </a>
                    {/each}
                {/if}
            </aside>
        </ul>
    </div>
</div>
