<script>
    import { indexDB } from "$lib/indexDB";
    import { page } from "$app/stores";
    import PageNotFound from "$lib/PageNotFound.svelte";

    import InfoOverview from "$lib/InfoOverview.svelte";
    import { upperCaseWord } from "$lib/utilities";

    const topic = indexDB.find((sec) => sec.section === $page.params.subject);
</script>

<svelte:head>
    <title>{upperCaseWord($page.params.subject)} | Phoenix Cheat-Sheet</title>
</svelte:head>

<main>
    {#if topic}
        <InfoOverview {topic} idx={0} />
    {:else}
        <PageNotFound />
    {/if}
</main>
