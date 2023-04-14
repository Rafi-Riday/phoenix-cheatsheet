<script>
    import { page } from "$app/stores";
    import InfoOverview from "../../lib/InfoOverview.svelte";
    let sideBarInfo = $page.data.mainData.sideBarInfo;
    $: sideBarInfo = $page.data.mainData.sideBarInfo;
</script>

<!-- rounded-2xl w-full p-4 shadow-2xl bg-accent text-accent-content -->
<main>
    <InfoOverview topic={sideBarInfo} idx={0} />
</main>
