<script>
    import "../app.css";
    import NavBar from "../lib/NavBar/NavBar.svelte";
    import SideBar from "../lib/SideBar.svelte";
</script>

<NavBar />

<SideBar>
    <main class="min-h-full flex flex-col w-full">
        <section class="py-20 px-2 lg:px-4 grow bg-base-200">
            <slot />
        </section>

        <!-- <footer class="">Footer</footer> -->
    </main>
</SideBar>
