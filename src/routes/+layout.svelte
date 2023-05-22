<script>
    import "../app.css";
    import NavBar from "$lib/NavBar/NavBar.svelte";
    import SideBar from "$lib/SideBar.svelte";

    import { page } from "$app/stores";
    import { indexDB } from "$lib/indexDB";
    import { SideBarInfo } from "$lib/stores";

    $: if ($page.params.subject) {
        const sideBarInfo = indexDB.find(
            (sec) => sec.section === $page.params.subject
        );
        SideBarInfo.set({
            titles: sideBarInfo.topicList,
            prefix: `/${sideBarInfo.section}`,
        });
    } else {
        SideBarInfo.set({
            titles: indexDB.map((i) => i.section),
            prefix: "",
        });
    }
</script>

<NavBar />

<SideBar>
    <main class="min-h-full flex flex-col w-full">
        <section class="py-20 px-2 lg:px-4 grow bg-base-200">
            <slot />
        </section>
    </main>
</SideBar>
