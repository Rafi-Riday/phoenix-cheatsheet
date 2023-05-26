<script>
    import { getContext } from "svelte";
    const { upperCaseWord } = getContext("utilities");
    const indexDB = getContext("indexDB");
    import { page } from "$app/stores";
    const imports = {
        InfoOverview: () => import("$lib/InfoOverview.svelte"),
        PageNotFound: () => import("$lib/PageNotFound.svelte"),
    };
    const topic = indexDB.find((sec) => sec.section === $page.params.subject);
</script>

<svelte:head>
    <title>{upperCaseWord($page.params.subject)}</title>
</svelte:head>

<main>
    {#if topic}
        {#await imports["InfoOverview"]() then InfoOverview}
            <svelte:component this={InfoOverview.default} {topic} idx={0} />
        {/await}
    {:else}
        {#await imports["PageNotFound"]() then PageNotFound}
            <svelte:component this={PageNotFound.default} />
        {/await}
    {/if}
</main>
