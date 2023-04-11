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
            <aside class="flex flex-col gap-3">
                <a
                    href="/"
                    class="border-2 border-l-8 border-primary text-neutral px-2 py-1 rounded"
                >
                    Subject verb agreement
                </a>
                {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as n}
                    <a
                        href="/"
                        class="border border-neutral text-neutral px-2 py-1 rounded"
                    >
                        Misspelling
                    </a>
                {/each}
            </aside>
            <!-- <label
                for="app-sidebar"
                class="btn btn-circle btn-error fixed bottom-4 right-4 drawer-overlay lg:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    /></svg
                >
            </label> -->
        </ul>
    </div>
</div>
