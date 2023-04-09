<script>
    import "../app.css";
    import NavBar from "../lib/NavBar/NavBar.svelte";
    import SideBar from "../lib/SideBar/SideBar.svelte";
</script>

<NavBar />

<SideBar>
    <main class="min-h-full flex flex-col bg-base-200 w-full">
        <section class="pt-20 lg:pt-20 px-2 lg:px-4 grow">
            <slot />
        </section>

        <footer class="">asd</footer>
    </main>
</SideBar>
