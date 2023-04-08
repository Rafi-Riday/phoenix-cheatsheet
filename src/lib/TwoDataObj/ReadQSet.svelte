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

    let searchField;
    $: searchField?.focus();
</script>

<main class="pb-12">
    <center
        class="text-gray-700 mt-2 mb-4 px-2 max-w-sm flex flex-row first:grow"
    >
        <input
            class="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border border-slate-400 focus:outline-none focus:border-slate-600"
            type="text"
            placeholder="Search here"
            bind:value={searchQ}
            bind:this={searchField}
        />
        <button
            on:click={(e) => {
                searchQ !== ""
                    ? (searchQ = "")
                    : e.target.parentElement.children[0].focus();
            }}
            class="flex items-center px-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-600 focus:border-black focus:outline-none"
            >{searchQ === "" ? "Search" : "Clear"}</button
        >
    </center>
    <table class="border-collapse border border-slate-400">
        <thead>
            <tr>
                {#each ["Serial No.", `${direction.dataOne}`, `${direction.dataTwo}`] as header (header)}
                    <th class="bg-slate-300 border border-slate-400 px-3 py-1"
                        >{header}</th
                    >
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each filteredData as { n, dataOne, dataTwo }, idx (n)}
                <tr
                    class="{(idx + 1) % 2 === 0
                        ? 'bg-slate-100'
                        : 'bg-white'} hover:bg-slate-300"
                >
                    <td class="font-semibold border border-slate-400 px-3 py-1"
                        >{idx + 1}</td
                    >
                    <td class="border border-slate-400 px-3 py-1 underline">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.google.com/search?q={dataOne
                                .split(' ')
                                .join('+')}">{dataOne}</a
                        >
                    </td>
                    <td class="border border-slate-400 px-3 py-1 underline">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.google.com/search?q={dataTwo
                                .split(' ')
                                .join('+')}">{dataTwo}</a
                        >
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <aside class="fixed -bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
            on:click={switchToTest}
            class="bg-sky-400 shadow-custom font-semibold px-4 py-2 underline"
        >
            Give Test
        </button>
    </aside>
</main>

<style>
    .shadow-custom {
        box-shadow: rgba(0, 0, 0, 0.3) 0px -10px 38px,
            rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
</style>
