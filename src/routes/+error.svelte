<script>
    import PageNotFound from "$lib/PageNotFound.svelte";
    import { data404 } from "$lib/indexDB.js";
    const { title, description, keywords, author } = data404;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
</svelte:head>

<PageNotFound />
