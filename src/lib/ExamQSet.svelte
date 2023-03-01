<script>
    export let producedUsableData;
    export let direction;
    // predefined
    let questionDirection = "dataOne";
    let reRenderTest = true;
    let submitSection = "Submit";
    const oneDirectionRange = 4;

    const range = (max) => {
        return Math.floor(Math.random() * max);
    };

    const returnQuestionSet = (idx) => {
        const optionSet = [];
        for (let i = 1; i <= oneDirectionRange; i++) {
            if (idx - i >= 0) {
                optionSet.push(producedUsableData[idx - i]);
            } else {
                optionSet.push(
                    producedUsableData[producedUsableData.length + idx - i]
                );
            }
            if (idx + i <= producedUsableData.length - 1) {
                optionSet.push(producedUsableData[idx + i]);
            } else {
                optionSet.push(
                    producedUsableData[idx + i - producedUsableData.length]
                );
            }
        }
        return {
            optionSet,
            qSet: producedUsableData[idx],
        };
    };

    const returnMCQ = (idx) => {
        const { optionSet, qSet } = returnQuestionSet(idx);
        const selectedWrongAns = [];
        const recursiveRandomOption = () => {
            const randomOption = optionSet[range(optionSet.length)];
            if (!selectedWrongAns.find((o) => o.n === randomOption.n)) {
                selectedWrongAns.push(randomOption);
            }
            if (selectedWrongAns.length < oneDirectionRange - 1) {
                recursiveRandomOption();
            }
        };
        recursiveRandomOption();
        const rightOptionNum = range(oneDirectionRange);
        const finalOptionSet = []
            .concat(selectedWrongAns.slice(0, rightOptionNum))
            .concat([qSet])
            .concat(
                selectedWrongAns.slice(rightOptionNum, selectedWrongAns.length)
            );
        return {
            finalOptionSet,
            qSet,
        };
    };

    let finalQuestionSet = [];
    let generateFinalQuestionSet = () => {
        finalQuestionSet = [];
        producedUsableData.forEach(({ n }, idx) => {
            finalQuestionSet.push(returnMCQ(idx));
        });
    };
    generateFinalQuestionSet();

    const resultSet = {};
    let markSheet;
    $: markSheet = {
        total: producedUsableData.length,
        answered: Object.keys(resultSet).length,
        correct: Object.keys(resultSet).filter(
            (rIdx) => resultSet[rIdx].qSet.n === resultSet[rIdx].option.n
        ).length,
        wrong: Object.keys(resultSet).filter(
            (rIdx) => resultSet[rIdx].qSet.n !== resultSet[rIdx].option.n
        ).length,
    };
</script>

<main>
    <center class="mb-2"
        >Select the <span class="text-green-700">right</span> answer</center
    >
    <center class="mb-2">
        <button
            class="cursor-default px-2 py-1 bg-emerald-200 border border-green-800"
            >Right</button
        >
        <button
            class="cursor-default px-2 py-1 bg-sky-100 border border-sky-800"
            >Unselected Right</button
        >
        <button
            class="cursor-default px-2 py-1 bg-red-100 border border-red-600"
            >Wrong</button
        >
    </center>
    <center
        class="mb-4 flex {questionDirection === 'dataOne'
            ? 'flex-row'
            : 'flex-row-reverse'} gap-2 justify-center items-center"
    >
        <span>{direction.dataOne}</span>
        <button
            on:click={() =>
                questionDirection === "dataOne"
                    ? (questionDirection = "dataTwo")
                    : (questionDirection = "dataOne")}
            class="border border-sky-200 p-1 bg-sky-200 hover:bg-transparent"
        >
            <svg
                class="w-5 h-5"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"
                />
            </svg>
        </button>
        <span>{direction.dataTwo}</span>
    </center>
    {#key reRenderTest}
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-0 {submitSection ===
            'Submit'
                ? 'mb-12'
                : 'mb-44 sm:mb-32'}"
        >
            {#each finalQuestionSet as { finalOptionSet, qSet }, idx (qSet.n)}
                <fieldset
                    class="border border-solid border-slate-300 bg-white text-left p-2"
                >
                    <legend
                        class="bg-slate-200 border border-slate-300 py-1 px-2"
                        ><a
                            href="https://www.google.com/search?q={qSet[
                                questionDirection
                            ]
                                .split(' ')
                                .join('+')}"
                            target="_blank"
                            rel="noreferrer"
                            class="font-semibold underline"
                            >{idx + 1}. {qSet[questionDirection]}</a
                        ></legend
                    >
                    <div class="grid grid-cols-2 gap-2">
                        {#each finalOptionSet as option, opIdx (opIdx)}
                            <div class="flex flex-row last:grow gap-1">
                                <input
                                    class="peer"
                                    disabled={submitSection === "Submit"
                                        ? false
                                        : true}
                                    on:click={() => {
                                        resultSet[idx] = {
                                            qSet,
                                            option,
                                        };
                                    }}
                                    type="radio"
                                    name="q_{idx}"
                                    id="op_{idx}_{opIdx}"
                                    value={option[
                                        questionDirection === "dataOne"
                                            ? "dataTwo"
                                            : "dataOne"
                                    ]}
                                />
                                <label
                                    class="w-full border px-2 py-1 {submitSection ===
                                    'Submit'
                                        ? 'border-slate-300 peer-checked:bg-gray-300 peer-checked:border-slate-600'
                                        : submitSection === 'Reset' &&
                                          option.n === qSet.n
                                        ? 'bg-sky-100 border-sky-800 peer-checked:bg-emerald-200 peer-checked:border-green-800'
                                        : submitSection === 'Reset' &&
                                          option.n !== qSet.n
                                        ? 'border-slate-300 peer-checked:bg-red-100 peer-checked:border-red-600'
                                        : ''}"
                                    for="op_{idx}_{opIdx}"
                                >
                                    {option[
                                        questionDirection === "dataOne"
                                            ? "dataTwo"
                                            : "dataOne"
                                    ]}
                                </label>
                            </div>
                        {/each}
                    </div>
                </fieldset>
            {/each}
        </div>
        <div
            class="fixed {submitSection === 'Reset'
                ? '-bottom-6'
                : '-bottom-3'} left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
            {#if submitSection === "Submit"}
                <button
                    on:click={() => (submitSection = "Reset")}
                    class="bg-sky-400 shadow-custom font-semibold px-4 py-2 underline"
                >
                    Submit
                </button>
            {:else}
                <button
                    on:click={() => {
                        generateFinalQuestionSet();
                        reRenderTest = !reRenderTest;
                        submitSection = "Submit";
                        markSheet.answered = 0;
                        markSheet.correct = 0;
                        markSheet.wrong = 0;
                    }}
                    class="bg-sky-400 shadow-custom font-semibold px-4 py-2 underline"
                >
                    Reset
                </button>
                <div
                    class="bg-sky-200 mt-2 px-2 py-1 border border-slate-500 font-semibold shadow-custom"
                >
                    Total: {markSheet?.total}, Answered: {markSheet?.answered},
                    Correct: {markSheet?.correct}, Wrong: {markSheet?.wrong}
                </div>
            {/if}
        </div>
    {/key}
</main>

<style>
    .shadow-custom {
        box-shadow: rgba(0, 0, 0, 0.3) 0px -10px 38px,
            rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
</style>
