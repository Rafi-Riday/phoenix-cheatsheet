<script>
    const imports = {
        PageNotFound: () => import("$lib/PageNotFound.svelte"),
    };
    const data404 = {
        title: "Page not found",
        description: "404 page of phoenix coaching cheatsheet",
        keywords: "404, page-not-found",
        author: "Rafiul Hossain Riday",
        prototype: "PageNotFound",
    };
    const { title, description, keywords, author } = data404;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
</svelte:head>

{#await imports["PageNotFound"]() then PageNotFound}
    <svelte:component this={PageNotFound.default} />
{/await}
