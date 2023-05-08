<script>
    import { page } from "$app/stores";

    const imports = {
        FormulaDoc: () => import("$lib/FormulaDoc/FormulaDoc.svelte"),
        SharedTwoDataObj: () =>
            import("$lib/SharedTwoDataObj/SharedTwoDataObj.svelte"),
        PageNotFound: () => import("$lib/PageNotFound.svelte"),
    };
</script>

<svelte:head>
    <title>{$page.data.mainData.title.toUpperCase().split("-").join(" ")}</title
    >
    <meta name="description" content={$page.data.mainData.description} />
    <meta name="keywords" content={$page.data.mainData.keywords} />
    <meta name="author" content={$page.data.mainData.author} />
</svelte:head>

{#await imports[$page.data.mainData.prototype]() then response}
    <svelte:component this={response.default} mainData={$page.data.mainData} />
{/await}
