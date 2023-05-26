<script>
    import { getContext } from "svelte";
    const { marked, Katexify } = getContext("md+k");
    const { addCrossOrigin, splitMdKatex } = getContext("utilities");
    import { PassageInfo } from "$lib/stores";
    export let submitted;
    export let dataSet;
    export let answers;
    export let resultSet;
    export let rerender;
    {
        let qi = 0;
        for (let i = 0; i < dataSet.length; i++) {
            if (!!dataSet[i].questions) {
                for (let j = 0; j < dataSet[i].questions.length; j++) {
                    if (Array.isArray(dataSet[i].questions[j])) {
                        dataSet[i].questions[j] = {
                            question: dataSet[i].questions[j][0],
                            options: dataSet[i].questions[j].slice(1),
                            answer: dataSet[i].questions[j][
                                answers[qi].toLowerCase().charCodeAt() - 96
                            ],
                            serial: qi + 1,
                        };
                    }
                    qi++;
                }
            }
        }
    }
    PassageInfo.set(dataSet.filter((p) => p.passage).map((d) => d.passage));
</script>

{#key rerender}
    <div class="grid grid-cols-1 gap-4 justify-items-center">
        {#each dataSet as data}
            {#if data.passage}
                <label
                    for="passage-sidebar"
                    class="btn btn-sm btn-primary shadow-2xl rounded lg:hidden"
                    >Open Question
                    <svg
                        width="30"
                        height="30"
                        stroke-width="0"
                        style="transform: translate(8px, 3px)"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            d="M4 6h2v12H4zm10.293-.707L7.586 12l6.707 6.707 1.414-1.414L11.414 13H20v-2h-8.586l4.293-4.293z"
                        /></svg
                    >
                </label>
                <span
                    class="text-justify w-full bg-base-100 px-3 py-4 rounded hidden lg:block"
                    use:addCrossOrigin
                >
                    {#each splitMdKatex(data.passage) as part, idx (idx)}
                        {#if part.md}
                            {@html marked.parseInline(part.md)}
                        {:else if part.k}
                            {@html Katexify(part.k)}
                        {/if}
                    {/each}
                </span>
                <label
                    for="passage-sidebar"
                    class="btn btn-circle btn-primary drawer-button absolute bottom-3 right-3 rotate-180 z-50 lg:hidden"
                >
                    <svg
                        width="30"
                        height="30"
                        stroke-width="0"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            fill-rule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        /></svg
                    >
                </label>
            {:else if data.string}
                <span
                    use:addCrossOrigin
                    class="text-justify w-full font-medium"
                >
                    {#each splitMdKatex(data.string) as part, idx (idx)}
                        {#if part.md}
                            {@html marked.parseInline(part.md)}
                        {:else if part.k}
                            {@html Katexify(part.k)}
                        {/if}
                    {/each}
                </span>
            {:else if data.questions}
                <span class="max-w-xl grid grid-cols-1 gap-4">
                    {#each data.questions as { question, options, answer, serial }, qIdx (qIdx)}
                        <fieldset
                            class="rounded border border-solid border-slate-300 bg-white text-left p-2"
                        >
                            <legend
                                class="bg-base-100 border border-slate-300 py-1 px-2 rounded"
                                ><span use:addCrossOrigin class="font-medium"
                                    >{serial}. {#each splitMdKatex(question) as part, idx (idx)}
                                        {#if part.md}
                                            {@html marked.parseInline(part.md)}
                                        {:else if part.k}
                                            {@html Katexify(part.k)}
                                        {/if}
                                    {/each}</span
                                ></legend
                            >
                            <div class="grid grid-cols-2 gap-2">
                                {#each options as option, opIdx (opIdx)}
                                    <div
                                        class="{option.length > 12
                                            ? 'col-span-2'
                                            : ''} flex flex-row items-center last:grow gap-1"
                                    >
                                        <input
                                            class="peer radio radio-xs hidden"
                                            type="radio"
                                            name="q_{qIdx}"
                                            id="op_{qIdx}_{opIdx}"
                                            value={option}
                                            disabled={submitted}
                                            on:click={() => {
                                                resultSet[qIdx] = {
                                                    option,
                                                    answer,
                                                };
                                            }}
                                        />
                                        <span
                                            >{String.fromCharCode(
                                                opIdx + 97
                                            )}.</span
                                        >
                                        <label
                                            class="sm:cursor-pointer w-full border rounded px-2 py-1 {!submitted
                                                ? 'bg-base-200 border-slate-300 peer-checked:bg-neutral peer-checked:text-neutral-content peer-checked:border-neutral-focus'
                                                : submitted === true &&
                                                  option === answer
                                                ? 'bg-info border-sky-600 peer-checked:bg-success peer-checked:border-green-600'
                                                : submitted === true &&
                                                  option !== answer
                                                ? 'border-slate-300 peer-checked:bg-error peer-checked:text-white peer-checked:border-red-600'
                                                : ''}"
                                            for="op_{qIdx}_{opIdx}"
                                        >
                                            {#each splitMdKatex(option) as part, idx (idx)}
                                                {#if part.md}
                                                    {@html marked.parseInline(
                                                        part.md
                                                    )}
                                                {:else if part.k}
                                                    {@html Katexify(part.k)}
                                                {/if}
                                            {/each}
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </fieldset>
                    {/each}
                </span>
            {/if}
        {/each}
    </div>
{/key}
