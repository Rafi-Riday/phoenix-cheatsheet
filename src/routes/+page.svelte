<script>
    import { getContext } from "svelte";
    const indexDB = getContext("indexDB");
    const imports = {
        InfoOverview: () => import("$lib/InfoOverview.svelte"),
        Timer: () => import("$lib/Timer.svelte"),
    };
</script>

<svelte:head>
    <title>Home</title>
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
    {#await imports["Timer"]() then Timer}
        <svelte:component
            this={Timer.default}
            title={["NSU", "Admission"]}
            date={"2023-05-27T00:00:00"}
        />
    {/await}
    <section class="flex flex-col w-full gap-2 lg:gap-4">
        {#each indexDB as topic, idx (idx)}
            {#await imports["InfoOverview"]() then InfoOverview}
                <svelte:component this={InfoOverview.default} {topic} {idx} />
            {/await}
        {/each}
    </section>
</main>
