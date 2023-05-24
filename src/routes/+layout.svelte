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

    // pwa functionality
    import { onMount } from "svelte";
    import { pwaInfo } from "virtual:pwa-info";
    let updating = false;

    const updateUIWithData = (data) => {
        // Implement your logic to update the UI with the latest data
        console.log("updated data from StaleWhileRevalidate");
        updating = !updating;
        console.log(data);
    };

    onMount(async () => {
        if (pwaInfo) {
            const { registerSW } = await import("virtual:pwa-register");
            registerSW({
                immediate: true,
                onRegistered(r) {
                    // console.log(`SW Registered: ${r}`);
                },
                onRegisterError(error) {
                    // console.log("SW registration error", error);
                },
            });
        }
        // Listen for cache updates
        const cacheUpdatesChannel = new BroadcastChannel("cache-updates");
        cacheUpdatesChannel.onmessage = (event) => {
            if (event.data.type === "CACHE_UPDATED") {
                console.log("Cache updated:", event.data.request);
                // Update the UI with the latest data
                updateUIWithData(event.data.response);
            }
        };
    });

    $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>

<NavBar />

<SideBar>
    <main class="min-h-full flex flex-col w-full">
        <section class="py-20 px-2 lg:px-4 grow bg-base-200">
            {#if validSubject}
                {#key updating}
                    <slot />
                {/key}
            {:else}
                <PageNotFound />
            {/if}
        </section>
    </main>
</SideBar>
