<div class="drawer drawer-mobile">
    <input id="app-sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <slot />
        <label
            for="app-sidebar"
            class="fixed bottom-4 right-4 btn btn-sm btn-primary rounded drawer-button lg:hidden"
            >Open drawer</label
        >
    </div>
    <div class="drawer-side">
        <label for="app-sidebar" class="drawer-overlay" />
        <ul
            class="menu p-4 bg-base-100 text-base-content pt-20 w-3/4 lg:w-full"
        >
            <!-- Sidebar content here -->
            <aside>
                <a href="/" class="btn btn-sm">Subject verb agreement</a>
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
