<script>
    import { shuffleArray } from "$lib/utilities";
    import Katex from "$lib/Katex.svelte";
    export let submitted;
    export let questions;
    export let answers;
    export let resultSet;
    export let rerender;
    let questionSet = shuffleArray(
        questions.map((q, i) => {
            return {
                question: q[0],
                options: q.slice(1),
                answer: q[answers[i].toLowerCase().charCodeAt() - 96],
            };
        })
    );
    $: if (rerender || !rerender) questionSet = shuffleArray(questionSet);
</script>

{#key rerender}
    <div class="grid grid-cols-1 max-w-lg gap-4">
        {#each questionSet as { question, options, answer }, qIdx (qIdx)}
            <fieldset
                class="rounded border border-solid border-slate-300 bg-white text-left p-2"
            >
                <legend
                    class="bg-base-100 border border-slate-300 py-1 px-2 rounded w-full"
                    ><span class="font-medium"
                        >{qIdx + 1}. {#if !question.includes("\\text{")}
                            {@html question}
                        {:else}
                            {#each question
                                .replace(/\\text{/g, "")
                                .slice(0, -1)
                                .split("$") as part, idxPart (idxPart)}
                                {#if idxPart % 2 === 0}
                                    {@html part.replace(/^ | $/g, "&nbsp;")}
                                {:else}
                                    <Katex expression={part} />
                                {/if}
                            {/each}
                        {/if}</span
                    ></legend
                >
                <div class="grid grid-cols-2 gap-2">
                    {#each options as option, opIdx (opIdx)}
                        <div class="flex flex-row items-center last:grow gap-1">
                            <input
                                class="peer radio radio-xs hidden"
                                type="radio"
                                name="q_{qIdx}"
                                id="op_{qIdx}_{opIdx}"
                                value={option}
                                disabled={submitted}
                                on:click={() => {
                                    resultSet[qIdx] = { option, answer };
                                }}
                            />
                            <span>{String.fromCharCode(opIdx + 97)}.</span>
                            <label
                                class="sm:cursor-pointer w-full border rounded px-2 py-1 {!submitted
                                    ? 'bg-base-200 border-slate-300 peer-checked:bg-neutral peer-checked:text-neutral-content peer-checked:border-neutral-focus'
                                    : submitted === true && option === answer
                                    ? 'bg-info border-sky-600 peer-checked:bg-success peer-checked:border-green-600'
                                    : submitted === true && option !== answer
                                    ? 'border-slate-300 peer-checked:bg-error peer-checked:text-white peer-checked:border-red-600'
                                    : ''}"
                                for="op_{qIdx}_{opIdx}"
                            >
                                {#if !option.includes("\\text{")}
                                    {@html option}
                                {:else}
                                    {#each option
                                        .replace(/\\text{/g, "")
                                        .slice(0, -1)
                                        .split("$") as part, idxPart (idxPart)}
                                        {#if idxPart % 2 === 0}
                                            {@html part.replace(
                                                /^ | $/g,
                                                "&nbsp;"
                                            )}
                                        {:else}
                                            <Katex expression={part} />
                                        {/if}
                                    {/each}
                                {/if}
                            </label>
                        </div>
                    {/each}
                </div>
            </fieldset>
        {/each}
    </div>
{/key}
