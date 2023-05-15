<script>
    export let producedUsableData;
    export let direction;
    export let switchToTest;

    // Search Functionality
    let filteredData;
    let searchQ = "";
    $: if (searchQ !== "") {
        filteredData = producedUsableData.filter(
            (v) =>
                v.dataOne.toLowerCase().includes(searchQ.toLowerCase()) ||
                v.dataTwo.includes(searchQ)
        );
    } else {
        filteredData = producedUsableData;
    }
</script>

<main class="relative">
    <center
        class="text-gray-700 mt-2 mb-4 px-2 max-w-sm flex flex-row first:grow"
    >
        <input
            class="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border border-slate-400 focus:outline-none focus:border-slate-600"
            type="text"
            placeholder="Search here"
            bind:value={searchQ}
        />
        <button
            on:click={(e) => {
                searchQ !== ""
                    ? (searchQ = "")
                    : e.target.parentElement.children[0].focus();
            }}
            class="flex items-center px-4 font-bold text-primary-content bg-primary hover:bg-indigo-500 border border-primary focus:border-black focus:outline-none"
            >{searchQ === "" ? "Filter" : "Clear"}</button
        >
    </center>
    <table class="border-collapse border border-slate-400">
        <thead>
            <tr>
                {#each ["Serial No.", direction.dataOne, direction.dataTwo] as header (header)}
                    <th class="bg-base-300 border border-slate-400 px-3 py-1"
                        >{header}</th
                    >
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each filteredData as { n, dataOne, dataTwo }, idx (n)}
                <tr
                    class="{(idx + 1) % 2 === 0
                        ? 'bg-base-200'
                        : 'bg-white'} hover:bg-base-300"
                >
                    <td class="font-semibold border border-slate-400 px-3 py-1"
                        >{idx + 1}</td
                    >
                    <td class="border border-slate-400 px-3 py-1 underline">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.google.com/search?q={dataOne.replace(
                                / /g,
                                '%20'
                            )}">{dataOne}</a
                        >
                    </td>
                    <td class="border border-slate-400 px-3 py-1 underline">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.google.com/search?q={dataTwo.replace(
                                / /g,
                                '%20'
                            )}">{dataTwo}</a
                        >
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <aside class="sticky bottom-3 mt-6">
        <button
            on:click={switchToTest}
            class="btn btn-accent text-accent-content shadow-custom"
        >
            Give Test
        </button>
    </aside>
</main>
