<script>
    import { page } from "$app/stores";
    let sideBarInfo = $page.data.mainData.sideBarInfo;
    $: sideBarInfo = $page.data.mainData.sideBarInfo;
</script>

<main>
    To be sent <span class="text-[#f00]">{sideBarInfo.section}</span> data.
</main>
