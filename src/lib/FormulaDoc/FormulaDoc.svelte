<script>
    import { getContext } from "svelte";
    const { upperCaseWord } = getContext("utilities");
    const imports = {
        RecursiveComponent: () =>
            import("$lib/FormulaDoc/RecursiveComponent.svelte"),
    };
    export let mainData;
    const { title, dataSet } = mainData;
</script>

<main class="text-gray-900 p-0 flex flex-col gap-4">
    <center class="font-semibold text-3xl mt-1">{upperCaseWord(title)}</center>
    {#await imports["RecursiveComponent"]() then RecursiveComponent}
        <svelte:component
            this={RecursiveComponent.default}
            {dataSet}
            titleSize={0}
        />
    {/await}
</main>
