<script>
    import "../app.css";
    import SideBar from "$lib/SideBar.svelte";
    import { page } from "$app/stores";
    import { SideBarInfo } from "$lib/stores";
    import { onMount } from "svelte";
    import indexDB from "$lib/indexDB.js";
    // context api
    import { setContext } from "svelte";
    import {
        upperCaseWord,
        addCrossOrigin,
        splitMdKatex,
        range,
        shuffleArray,
        secondsToHMS,
        randomNumRange,
    } from "$lib/utilities";
    import { marked } from "marked";
    import Katexify from "$lib/Katexify";
    setContext("indexDB", indexDB);
    setContext("md+k", { marked, Katexify });
    setContext("utilities", {
        upperCaseWord,
        addCrossOrigin,
        splitMdKatex,
        range,
        shuffleArray,
        secondsToHMS,
        randomNumRange,
    });

    // to be lazy loaded
    const imports = {
        NavBar: () => import("$lib/NavBar/NavBar.svelte"),
        PageNotFound: () => import("$lib/PageNotFound.svelte"),
    };

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
    import { pwaInfo } from "virtual:pwa-info";
    let updating = false;

    const updateUI = (data) => {
        updating = !updating;
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
            if (
                event.data.type === "CACHE_UPDATED" ||
                event.data.type === "IMAGE_CACHE_UPDATED"
            ) {
                console.log("Cache updated:", event.data.request);
                // Update the UI with the latest data
                updateUI(event.data.response);
            }
        };
    });

    $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>

{#await imports["NavBar"]() then NavBar}
    <svelte:component this={NavBar.default} {indexDB} />
{/await}

<SideBar>
    <main class="min-h-full flex flex-col w-full">
        <section class="py-20 px-2 lg:px-4 grow bg-base-200">
            {#if validSubject}
                {#key updating}
                    <slot />
                {/key}
            {:else}
                {#await imports["PageNotFound"]() then PageNotFound}
                    <svelte:component this={PageNotFound.default} />
                {/await}
            {/if}
        </section>
    </main>
</SideBar>

<!-- lazy load components -->
<!-- {#await imports[""]() then response}
    <svelte:component this={response.default} />
{/await} -->
