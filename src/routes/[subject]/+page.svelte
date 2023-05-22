<script>
    import { indexDB } from "$lib/indexDB";
    import { page } from "$app/stores";

    import InfoOverview from "$lib/InfoOverview.svelte";
    import { upperCaseWord } from "$lib/utilities";

    const topic = indexDB.find((sec) => sec.section === $page.params.subject);
</script>

<svelte:head>
    <title>{upperCaseWord($page.params.subject)} | Phoenix Cheat-Sheet</title>
</svelte:head>

<main>
    <InfoOverview {topic} idx={0} />
</main>
