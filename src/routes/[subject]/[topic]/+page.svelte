<script>
    import { page } from "$app/stores";

    const imports = {
        TwoDataObj: () => import("$lib/TwoDataObj/TwoDataObj.svelte"),
    };

    let component = $page.data.mainData.prototype;
</script>

{#await imports[component]() then response}
    <svelte:component this={response.default} mainData={$page.data.mainData} />
{/await}
