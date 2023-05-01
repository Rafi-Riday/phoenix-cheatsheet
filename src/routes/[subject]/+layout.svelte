<script>
    import { page } from "$app/stores";
    import { SideBarInfo } from "$lib/stores";
    $: SideBarInfo.set({
        titles: $page.data.mainData.sideBarInfo.topicList,
        prefix: `/${$page.data.mainData.sideBarInfo.section}`,
    });
</script>

<slot />
