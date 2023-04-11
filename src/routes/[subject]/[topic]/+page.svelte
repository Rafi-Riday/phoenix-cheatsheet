<script>
    import { page } from "$app/stores";

    const imports = {
        SharedTwoDataObj: () =>
            import("$lib/SharedTwoDataObj/SharedTwoDataObj.svelte"),
        PageNotFound: () => import("$lib/PageNotFound/PageNotFound.svelte"),
    };
    const { title, description, keywords, author, prototype } =
        $page.data.mainData;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
</svelte:head>

{#await imports[prototype]() then response}
    <svelte:component this={response.default} mainData={$page.data.mainData} />
{/await}
