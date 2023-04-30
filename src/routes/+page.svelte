<script>
    import { page } from "$app/stores";
    import InfoOverview from "$lib/InfoOverview.svelte";
    import { SideBarInfo } from "$lib/stores";
    const { topicList } = $page.data.mainData.sideBarInfo;
    SideBarInfo.set({ titles: topicList.map((i) => i.section), prefix: "" });
</script>

<svelte:head>
    <title>Home | Phoenix Cheat-Sheet</title>
    <meta
        name="description"
        content="North South University admission online coaching center, Phoenix Admission Care"
    />
    <meta
        name="keywords"
        content="Phoenix Admission Care, North South University admission online coaching center, Math, English, IBA-question, Private university coaching, online coaching"
    />
    <meta name="author" content="MD Rafiul Hossain Riday" />
</svelte:head>

<main>
    <center class="text-3xl mt-3 mb-6">
        <span class="font-bold text-primary">Phoenix</span> Cheat-Sheet
        <!-- TODO: -->
        {parseInt(
            (
                (new Date("may 27 2023 10:00").getTime() -
                    new Date().getTime()) /
                1000 /
                60
            ).toFixed(0)
        )}
    </center>
    <section class="flex flex-col w-full gap-2 lg:gap-4">
        {#each topicList as topic, idx (idx)}
            <InfoOverview {topic} {idx} />
        {/each}
    </section>
</main>
