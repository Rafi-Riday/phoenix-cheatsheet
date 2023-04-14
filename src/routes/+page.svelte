<script>
    import { page } from "$app/stores";
    const { section, topicList } = $page.data.mainData.sideBarInfo;
    import InfoOverview from "../lib/InfoOverview.svelte";
</script>

<svelte:head>
    <title>Home</title>
    <meta
        name="description"
        content="North South University admission online coaching center, Phoenix Admission Care"
    />
    <meta
        name="keywords"
        content="Phoenix Admission Care, North South University admission online coaching center, Math, English, IBA, Private university coaching, online coaching"
    />
    <meta name="author" content="MD Rafiul Hossain Riday" />
</svelte:head>

<main>
    <section class="flex flex-col w-full gap-2 lg:gap-4">
        {#each topicList as topic, idx (idx)}
            <InfoOverview {topic} {idx} />
        {/each}
    </section>
</main>
