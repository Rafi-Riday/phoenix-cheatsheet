<script>
    import ExamQSet from "$lib/TwoDataObj/ExamQSet.svelte";
    import ReadQSet from "$lib/TwoDataObj/ReadQSet.svelte";

    export let mainData;
    const { title, description, keywords, author, direction, dataSet } =
        mainData;

    // Page State
    let currentPage = "Test";
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

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
</svelte:head>

<main class="text-gray-900 flex flex-col gap-1 py-4 sm:px-4">
    <div class="flex flex-col gap-1">
        <center class="font-semibold text-lg">{title}</center>
        {#if currentPage === "Read" || currentPage === "Test"}
            <center>
                <button
                    on:click={() => (currentPage = "Read")}
                    class="bg-sky-200 font-semibold px-2 py-1 underline"
                    >Read</button
                >
                or
                <button
                    on:click={() => (currentPage = "Test")}
                    class="bg-sky-200 font-semibold px-2 py-1 underline"
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
