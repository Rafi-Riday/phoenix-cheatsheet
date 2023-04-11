<script>
    import "../app.css";
    import { page } from "$app/stores";
    import NavBar from "../lib/NavBar/NavBar.svelte";
    import SideBar from "../lib/SideBar/SideBar.svelte";
</script>

<!-- <svelte:head>
    <meta
        name="description"
        content="North South University admission online coaching center, Phoenix Admission Care"
    />
    <meta
        name="keywords"
        content="Phoenix Admission Care, North South University admission online coaching center, Math, English, IBA, Private university coaching, online coaching"
    />
    <meta name="author" content="MD Rafiul Hossain Riday" />
</svelte:head> -->

<NavBar />

<SideBar>
    <main class="min-h-full flex flex-col w-full">
        <section class="pt-20 lg:pt-20 px-2 lg:px-4 grow bg-base-200">
            <slot />
        </section>

        <!-- <footer class="">Footer</footer> -->
    </main>
</SideBar>
