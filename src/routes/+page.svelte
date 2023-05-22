<script>
    import { indexDB } from "$lib/indexDB";
    import InfoOverview from "$lib/InfoOverview.svelte";
    import Timer from "$lib/Timer.svelte";
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
        {#each indexDB as topic, idx (idx)}
            <InfoOverview {topic} {idx} />
        {/each}
    </section>
</main>
