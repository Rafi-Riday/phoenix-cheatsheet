<script>
    import { page } from "$app/stores";
    import InfoOverview from "$lib/InfoOverview.svelte";
    import { SideBarInfo } from "$lib/stores";

    SideBarInfo.set({
        titles: $page.data.mainData.sideBarInfo.topicList.map((i) => i.section),
        prefix: "",
    });

    // duration left from exam time
    let duration = {};
    const durationFunc = () => {
        const now = new Date();
        const target = new Date("2023-05-27T10:00:00");
        const diffS = Math.floor((target - now) / 1000);
        const diffDays = Math.floor(diffS / (24 * 60 * 60));
        const diffHours = Math.floor((diffS % (24 * 60 * 60)) / (60 * 60));
        const diffMinutes = Math.floor((diffS % (60 * 60)) / 60);
        const diffSeconds = diffS % 60;
        duration = { diffDays, diffHours, diffMinutes, diffSeconds };
    };
    durationFunc();
    setInterval(() => {
        durationFunc();
    }, 1000);
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
    <center class="mb-6">
        <span class="font-semibold">{duration.diffDays}</span> Days
        <span class="font-semibold">{duration.diffHours}</span> Hours
        <span class="font-semibold">{duration.diffMinutes}</span> Minutes
        <span class="font-semibold">{duration.diffSeconds}</span> Seconds
    </center>
    <section class="flex flex-col w-full gap-2 lg:gap-4">
        {#each $page.data.mainData.sideBarInfo.topicList as topic, idx (idx)}
            <InfoOverview {topic} {idx} />
        {/each}
    </section>
</main>
