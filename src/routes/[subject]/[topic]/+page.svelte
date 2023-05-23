<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import PageNotFound from "$lib/PageNotFound.svelte";

    let fetchPrefix =
        "https://raw.githubusercontent.com/Rafi-Riday/phoenix-cheatsheet/main/static";
    let mainData = null;

    // client side fetching
    const fetchData = async (subject, topic) => {
        try {
            const response = await fetch(
                `${fetchPrefix}/db/${subject}/${topic}.json`
            );
            mainData = await response.json();
        } catch (error) {
            mainData = 404;
        }
    };
    // updating page
    onMount(() => {
        fetchData($page.params.subject, $page.params.topic);
    });
    $: fetchData($page.params.subject, $page.params.topic);

    // importing component conditionally
    const imports = {
        FormulaDoc: () => import("$lib/FormulaDoc/FormulaDoc.svelte"),
        SharedTwoDataObj: () =>
            import("$lib/SharedTwoDataObj/SharedTwoDataObj.svelte"),
        Quiz: () => import("$lib/Quiz/Quiz.svelte"),
        PageNotFound: () => import("$lib/PageNotFound.svelte"),
    };
</script>

<svelte:head>
    {#if mainData !== null && mainData !== 404}
        <title>{mainData.title.toUpperCase().split("-").join(" ")}</title>
        <meta name="description" content={mainData.description} />
        <meta name="keywords" content={mainData.keywords} />
        <meta name="author" content={mainData.author} />
    {/if}
</svelte:head>

{#if mainData === null}
    <center class="text-2xl flex flex-col justify-center items-center h-full">
        <progress class="progress progress-primary w-5/6" />
    </center>
{:else if mainData === 404}
    <PageNotFound />
{:else if mainData}
    {#await imports[mainData.prototype]() then response}
        <svelte:component this={response.default} {mainData} />
    {/await}
{/if}
