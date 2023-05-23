<script>
    import "../app.css";
    import NavBar from "$lib/NavBar/NavBar.svelte";
    import SideBar from "$lib/SideBar.svelte";
    import PageNotFound from "$lib/PageNotFound.svelte";

    import { page } from "$app/stores";
    import { indexDB } from "$lib/indexDB";
    import { SideBarInfo } from "$lib/stores";

    const defaultSideBarInfo = () => {
        SideBarInfo.set({
            titles: indexDB.map((i) => i.section),
            prefix: "",
        });
    };
    /**
     * !$page.params.subject === home page
     * !sideBarInfo === undefined [subject]
     */
    let validSubject = false;
    $: {
        if ($page.params.subject) {
            const sideBarInfo = indexDB.find(
                (sec) => sec.section === $page.params.subject
            );
            if (sideBarInfo) {
                validSubject = true;
                SideBarInfo.set({
                    titles: sideBarInfo.topicList,
                    prefix: `/${sideBarInfo.section}`,
                });
            } else {
                validSubject = false;
                defaultSideBarInfo();
            }
        } else {
            validSubject = true;
            defaultSideBarInfo();
        }
    }
</script>

<NavBar />

<SideBar>
    <main class="min-h-full flex flex-col w-full">
        <section class="py-20 px-2 lg:px-4 grow bg-base-200">
            {#if validSubject}
                <slot />
            {:else}
                <PageNotFound />
            {/if}
        </section>
    </main>
</SideBar>
