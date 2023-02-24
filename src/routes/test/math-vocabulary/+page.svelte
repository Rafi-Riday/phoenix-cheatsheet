<script>
    import mathVocabulary from "./math-vocabulary.json";

    let page = "Pass";

    let readPageVocabulary = mathVocabulary;
    let searchQ = "";
    $: if (searchQ !== "") {
        readPageVocabulary = mathVocabulary.filter(
            (v) =>
                v.en.toLowerCase().includes(searchQ.toLowerCase()) ||
                v.bn.includes(searchQ)
        );
        console.log(readPageVocabulary);
    } else {
        readPageVocabulary = mathVocabulary;
    }

    let questionLang = "en";
    const oneDirectionRange = 4;
    const returnQuestionSet = (idx) => {
        const optionSet = [];
        for (let i = 1; i <= oneDirectionRange; i++) {
            if (idx - i >= 0) {
                optionSet.push(mathVocabulary[idx - i]);
            } else {
                optionSet.push(mathVocabulary[mathVocabulary.length + idx - i]);
            }
            if (idx + i <= mathVocabulary.length - 1) {
                optionSet.push(mathVocabulary[idx + i]);
            } else {
                optionSet.push(mathVocabulary[idx + i - mathVocabulary.length]);
            }
        }
        return {
            optionSet,
            qSet: mathVocabulary[idx],
        };
    };
    const range = (max) => {
        return Math.floor(Math.random() * max);
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
        mathVocabulary.forEach(({ n }, idx) => {
            finalQuestionSet.push(returnMCQ(idx));
        });
    };
    generateFinalQuestionSet();

    const resultSet = {};
    let submitSection = "Submit";
    let markSheet;
    $: markSheet = {
        total: mathVocabulary.length,
        answered: Object.keys(resultSet).length,
        correct: Object.keys(resultSet).filter(
            (rIdx) => resultSet[rIdx].qSet.n === resultSet[rIdx].option.n
        ).length,
        wrong: Object.keys(resultSet).filter(
            (rIdx) => resultSet[rIdx].qSet.n !== resultSet[rIdx].option.n
        ).length,
    };

    let reRenderTest = true;

    let passField;
    $: passField?.focus();

    let startUpPass;
    $: if (startUpPass?.toLowerCase() === "isosceles") {
        page = "Read";
    }
</script>

<main class="text-gray-900 flex flex-col gap-4 py-4 sm:px-4">
    <center>
        <button
            on:click={() => (page = "Read")}
            class="bg-sky-200 font-semibold px-2 py-1 underline"
            >Read Vocabulary</button
        >
        or
        <button
            on:click={() => (page = "Test")}
            class="bg-sky-200 font-semibold px-2 py-1 underline"
            >Give Test</button
        >
    </center>
    <center>
        Click <u class="cursor-pointer">Links</u> to view definitions
    </center>
    <center>
        Copyright©<a
            class="text-sky-700 underline"
            href="https://www.facebook.com/PhoenixAdmissionCare"
            >Phoenix Admission Care</a
        >
    </center>

    <center>
        <!-- Password -->
        {#if page === "Pass"}
            <center
                class="text-gray-700 mb-4 px-2 max-w-sm flex flex-row first:grow"
            >
                <input
                    class="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border border-slate-400 focus:outline-none focus:border-slate-600"
                    type="text"
                    placeholder="Enter Password"
                    bind:value={startUpPass}
                    bind:this={passField}
                />
                <button
                    on:click={() => {}}
                    class="flex items-center px-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-600 focus:border-black focus:outline-none"
                    >Enter</button
                >
            </center>
        {/if}
        <!-- Read -->
        {#if page === "Read"}
            <center
                class="text-gray-700 mb-4 px-2 max-w-sm flex flex-row first:grow"
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
                    class="flex items-center px-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-600 focus:border-black focus:outline-none"
                    >{searchQ === "" ? "Search" : "Clear"}</button
                >
            </center>
            <table class="border-collapse border border-slate-400">
                <thead>
                    <tr>
                        {#each ["Serial No.", "English", "Bangla", "Reference ID"] as header (header)}
                            <th
                                class="bg-slate-300 border border-slate-400 px-3 py-1"
                                >{header}</th
                            >
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each readPageVocabulary as { n, en, bn }, idx (n)}
                        <tr
                            class="{(idx + 1) % 2 === 0
                                ? 'bg-slate-100'
                                : 'bg-white'} hover:bg-slate-300"
                        >
                            <td
                                class="font-semibold border border-slate-400 px-3 py-1"
                                >{idx + 1}</td
                            >
                            <td
                                class="border border-slate-400 px-3 py-1 underline"
                            >
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://www.google.com/search?q={en
                                        .split(' ')
                                        .join('+')}">{en}</a
                                >
                            </td>
                            <td
                                class="border border-slate-400 px-3 py-1 underline"
                            >
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://www.google.com/search?q={bn
                                        .split(' ')
                                        .join('+')}">{bn}</a
                                >
                            </td>
                            <td
                                class="border border-slate-400 px-3 py-1 text-center"
                                >{n}</td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
        <!-- Test -->
        {#if page === "Test"}
            <center class="mb-4"
                >Select the <span class="text-green-700">right</span> answer</center
            >
            <center class="mb-4">
                <button
                    class="cursor-default px-2 py-1 bg-emerald-200 border border-green-800"
                    >Right</button
                >
                <button
                    class="cursor-default px-2 py-1 bg-green-50 border border-green-700"
                    >Unselected Right</button
                >
                <button
                    class="cursor-default px-2 py-1 bg-red-50 border border-red-600"
                    >Wrong</button
                >
            </center>
            <center
                class="mb-4 flex {questionLang === 'en'
                    ? 'flex-row'
                    : 'flex-row-reverse'} gap-2 justify-center items-center"
            >
                <span>English</span>
                <button
                    on:click={() =>
                        questionLang === "en"
                            ? (questionLang = "bn")
                            : (questionLang = "en")}
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
                <span>Bangla</span>
            </center>
            {#key reRenderTest}
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-0 {submitSection ===
                    'Submit'
                        ? 'mb-10'
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
                                        questionLang
                                    ]
                                        .split(' ')
                                        .join('+')}"
                                    target="_blank"
                                    rel="noreferrer"
                                    class="font-semibold underline"
                                    >{idx + 1}. {qSet[questionLang]}</a
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
                                            on:click={(e) => {
                                                resultSet[idx] = {
                                                    qSet,
                                                    option,
                                                };
                                            }}
                                            type="radio"
                                            name="q_{idx}"
                                            id="op_{idx}_{opIdx}"
                                            value={option[
                                                questionLang === "en"
                                                    ? "bn"
                                                    : "en"
                                            ]}
                                        />
                                        <label
                                            class="w-full border px-2 py-1 {submitSection ===
                                            'Submit'
                                                ? 'border-slate-300 peer-checked:bg-gray-300 peer-checked:border-slate-600'
                                                : submitSection === 'Reset' &&
                                                  option.n === qSet.n
                                                ? 'bg-green-50 border-green-700 peer-checked:bg-emerald-200 peer-checked:border-green-800'
                                                : submitSection === 'Reset' &&
                                                  option.n !== qSet.n
                                                ? 'border-slate-300 peer-checked:bg-red-50 peer-checked:border-red-600'
                                                : ''}"
                                            for="op_{idx}_{opIdx}"
                                        >
                                            {option[
                                                questionLang === "en"
                                                    ? "bn"
                                                    : "en"
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
                            on:click={(e) => {
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
        {/if}
    </center>
</main>

<style>
    .shadow-custom {
        box-shadow: rgba(0, 0, 0, 0.3) 0px -10px 38px,
            rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
</style>
