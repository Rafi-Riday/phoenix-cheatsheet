<script>
    import Timer from "$lib/Timer.svelte";
    let dataSet = [
        { title: ["DU", "Admission"], date: "2023-05-12T00:00:00" },
        { title: ["CU", "Admission"], date: "2023-05-17T00:00:00" },
        { title: ["RU", "Admission"], date: "2023-05-29T00:00:00" },
        { title: ["GST", "Admission"], date: "2023-06-03T00:00:00" },
    ];
</script>

{#each dataSet as { title, date }, idx (idx)}
    <Timer {title} {date} />
{/each}
