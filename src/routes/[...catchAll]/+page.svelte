<script>
    const imports = {
        PageNotFound: () => import("$lib/PageNotFound.svelte"),
    };
</script>

<!-- this page autometically shows 404 page without throwing 404 error -->
{#await imports["PageNotFound"]() then PageNotFound}
    <svelte:component this={PageNotFound.default} />
{/await}
