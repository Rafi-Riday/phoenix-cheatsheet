<script>
    import { page } from "$app/stores";
    import { SideBarInfo } from "$lib/stores";
    // const { section, topicList } = $page.data.mainData.sideBarInfo; // not re-rendering issue
    $: SideBarInfo.set({
        titles: $page.data.mainData.sideBarInfo.topicList,
        prefix: `/${$page.data.mainData.sideBarInfo.section}`,
    });
</script>

<slot />
