<script>
    import { page } from "$app/stores";
    import InfoOverview from "$lib/InfoOverview.svelte";
    import { SideBarInfo } from "$lib/stores";
    import Timer from "$lib/Timer.svelte";

    SideBarInfo.set({
        titles: $page.data.mainData.sideBarInfo.topicList.map((i) => i.section),
        prefix: "",
    });

    // duration left from exam time
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
    <center class="text-3xl my-3">
        <span class="font-bold text-primary">Phoenix</span> Cheat-Sheet
    </center>
    <Timer title={["NSU", "Admission"]} date={"2023-05-27T00:00:00"} />
    <section class="flex flex-col w-full gap-2 lg:gap-4">
        {#each $page.data.mainData.sideBarInfo.topicList as topic, idx (idx)}
            <InfoOverview {topic} {idx} />
        {/each}
    </section>
</main>
