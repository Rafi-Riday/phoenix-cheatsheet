<script>
    import ExamQSet from "$lib/SharedTwoDataObj/ExamQSet.svelte";
    import ReadQSet from "$lib/SharedTwoDataObj/ReadQSet.svelte";

    export let mainData;
    const { title, direction, dataSet } = mainData;

    // Page State
    let currentPage = "Read";
    const switchToTest = () => {
        currentPage = "Test";
    };
    // Producing Usable Database
    let producedUsableData = [];
    dataSet.forEach((dObj, objIdx) => {
        dObj.n = objIdx + 1;
        producedUsableData.push(dObj);
    });

    let passField;
    $: passField?.focus();

    let startUpPass;
    $: if (startUpPass === "Rima") {
        currentPage = "Read";
    }
</script>

<main class="text-gray-900 flex flex-col gap-1 p-0">
    <div class="flex flex-col gap-1">
        <center class="font-semibold text-lg">{title}</center>
        {#if currentPage === "Read" || currentPage === "Test"}
            <center>
                <button
                    on:click={() => (currentPage = "Read")}
                    class="btn btn-sm btn-accent text-accent-content rounded underline"
                    >Read</button
                >
                or
                <button
                    on:click={() => (currentPage = "Test")}
                    class="btn btn-sm btn-accent text-accent-content rounded underline"
                    >Give Test</button
                >
            </center>
        {/if}
    </div>

    <center>
        <!-- Password -->
        {#if currentPage === "Pass"}
            <center
                class="flex flex-col gap-2 font-semibold fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <center>Don't go Forward unless you are an admin!</center>
                <center
                    class="text-gray-700 mb-4 px-2 max-w-sm flex flex-row first:grow"
                >
                    <input
                        class="w-36 sm:w-full h-10 pl-3 pr-0 text-base placeholder-gray-600 border border-slate-400 focus:outline-none focus:border-slate-600"
                        type="text"
                        placeholder="Enter Password"
                        bind:value={startUpPass}
                        bind:this={passField}
                    />
                    <button
                        class="flex items-center px-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-600 focus:border-black focus:outline-none"
                        >Enter</button
                    >
                </center>
            </center>
        {/if}
        <!-- Read -->
        {#if currentPage === "Read"}
            <ReadQSet {producedUsableData} {direction} {switchToTest} />
        {/if}
        <!-- Test -->
        {#if currentPage === "Test"}
            <ExamQSet {producedUsableData} {direction} />
        {/if}
    </center>
</main>
