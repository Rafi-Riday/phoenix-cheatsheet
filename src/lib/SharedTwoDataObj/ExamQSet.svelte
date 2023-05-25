<script>
    import { getContext } from "svelte";
    const { randomNumRange, shuffleArray } = getContext("utilities");
    export let producedUsableData;
    export let direction;
    // predefined
    let questionDirection = "dataOne";
    let reRenderTest = true;
    let submitSection = "Submit";
    const oneDirectionRange = 5;
    // options to be selectes as wrong option
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
    // selected option set generator
    const returnMCQ = (idx) => {
        const { optionSet, qSet } = returnQuestionSet(idx);

        const selectedWrongAns = [];
        const recursiveRandomOption = () => {
            const randomOption = optionSet[randomNumRange(optionSet.length)];
            if (!selectedWrongAns.find((o) => o.n === randomOption.n)) {
                selectedWrongAns.push(randomOption);
            }
            if (selectedWrongAns.length < oneDirectionRange - 1) {
                recursiveRandomOption();
            }
        };
        recursiveRandomOption();
        const rightOptionNum = randomNumRange(oneDirectionRange);
        const finalOptionSet = shuffleArray(
            []
                .concat(selectedWrongAns.slice(0, rightOptionNum))
                .concat([qSet])
                .concat(
                    selectedWrongAns.slice(
                        rightOptionNum,
                        selectedWrongAns.length
                    )
                )
        );
        return {
            finalOptionSet,
            qSet,
        };
    };
    // randomizing question set
    let randomizedQuestionSet;
    const randomizeQuestionSetFunc = () => {
        randomizedQuestionSet = shuffleArray(
            Array.from({ length: producedUsableData.length }, (_, i) => i).map(
                (idx) => returnMCQ(idx)
            )
        );
    };
    randomizeQuestionSetFunc();
    // result logic
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

<main class="relative">
    <center class="mb-2"
        >Select the <span class="text-green-700">right</span> answer</center
    >
    <center class="mb-2">
        <button class="duration-300 btn btn-sm btn-success rounded"
            >Right</button
        >
        <button class="duration-300 btn btn-sm btn-info rounded"
            >Unselected Right</button
        >
        <button class="duration-300 btn btn-sm btn-error rounded text-white"
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
            class="btn btn-xs btn-accent"
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each randomizedQuestionSet as { finalOptionSet, qSet }, idx (qSet.n)}
                <fieldset
                    class="rounded border border-solid border-slate-300 bg-white text-left p-2"
                >
                    <legend
                        class="bg-base-300 border border-slate-300 py-1 px-2 rounded"
                        ><span class="font-semibold underline"
                            >{idx + 1}. {qSet[questionDirection]}</span
                        ></legend
                    >
                    <div class="grid grid-cols-2 gap-2">
                        {#each finalOptionSet as option, opIdx (opIdx)}
                            <div
                                class="flex flex-row items-center last:grow gap-1"
                            >
                                <input
                                    class="peer radio radio-xs hidden"
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
                                <span>{String.fromCharCode(opIdx + 97)}.</span>
                                <label
                                    class="sm:cursor-pointer w-full border rounded px-2 py-1 {submitSection ===
                                    'Submit'
                                        ? 'bg-base-200 border-slate-300 peer-checked:bg-neutral peer-checked:text-neutral-content peer-checked:border-neutral-focus'
                                        : submitSection === 'Reset' &&
                                          option.n === qSet.n
                                        ? 'bg-info border-sky-600 peer-checked:bg-success peer-checked:border-green-600'
                                        : submitSection === 'Reset' &&
                                          option.n !== qSet.n
                                        ? 'border-slate-300 peer-checked:bg-error peer-checked:text-white peer-checked:border-red-600'
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
            class="sticky {submitSection === 'Reset'
                ? 'bottom-6 mt-12'
                : 'bottom-3 mt-6'}"
        >
            {#if submitSection === "Submit"}
                <button
                    on:click={() => (submitSection = "Reset")}
                    class="btn btn-accent text-accent-content shadow-custom"
                >
                    Submit
                </button>
            {:else}
                <button
                    on:click={() => {
                        randomizeQuestionSetFunc();
                        submitSection = "Submit";
                        markSheet.answered = 0;
                        markSheet.correct = 0;
                        markSheet.wrong = 0;
                    }}
                    class="btn btn-warning text-warning-content shadow-custom"
                >
                    Reset
                </button>
                <div
                    class="bg-warning text-warning-content rounded mt-2 px-2 py-1 shadow-custom grid grid-cols-2 w-fit"
                >
                    <span>Total: {markSheet?.total},</span>
                    <span>Answered: {markSheet?.answered},</span>
                    <span>Correct: {markSheet?.correct},</span>
                    <span>Wrong: {markSheet?.wrong}</span>
                </div>
            {/if}
        </div>
    {/key}
</main>
