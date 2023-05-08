<script>
    import { upperCaseWord } from "$lib/utilities";
    import RecursiveComponent from "$lib/FormulaDoc/RecursiveComponent.svelte";
    export let mainData;
    const { title, dataSet } = mainData;
</script>

<main class="text-gray-900 p-0 flex flex-col gap-4">
    <center class="font-semibold text-3xl mt-1">{upperCaseWord(title)}</center>
    <RecursiveComponent {dataSet} titleSize={0} />
</main>
