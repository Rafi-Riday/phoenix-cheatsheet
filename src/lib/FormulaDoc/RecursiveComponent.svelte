<script>
    import { upperCaseWord } from "$lib/utilities";
    import Katex from "$lib/Katex.svelte";
    export let dataSet;
    export let titleSize = 3;
    let titleSizeArray = ["text-xl", "text-lg", "text-base"];
</script>

{#each dataSet as { title, img, collapse, serial, dataSet }, idx (idx)}
    <section class={collapse ? "collapse collapse-arrow" : ""}>
        <!-- collapse inp -->
        {#if collapse}
            <input type="checkbox" class="peer min-h-0" />
        {/if}
        <!-- title -->
        {#if title}
            <h2
                class="font-medium {titleSize <= titleSizeArray.length - 1
                    ? titleSizeArray[titleSize]
                    : 'base'} {collapse
                    ? 'collapse-title p-0 min-h-0 border-b-2 peer-checked:mb-2'
                    : ''}"
            >
                {@html upperCaseWord(title)}
            </h2>
        {/if}
        <!-- body -->
        <div
            class="flex flex-col gap-2 {collapse
                ? 'collapse-content'
                : title
                ? 'px-4 mt-2'
                : ''}"
            style="padding-bottom: 0 !important;"
        >
            {#each dataSet as formula, idxFormula (idxFormula)}
                {#if typeof formula === "string" && formula.includes("\\text{")}
                    <!-- `\\text{$a$}`.replace(/\\text{/g, '').slice(0, -1).split('$').map((a,idx)=>idx%2) -->
                    <div class="flex flex-row justify-start items-start">
                        {#if serial}
                            <span class="font-semibold"
                                >{idxFormula + 1}.&nbsp;</span
                            >
                        {/if}
                        <div>
                            {#each formula
                                .replace(/\\text{/g, "")
                                .slice(0, -1)
                                .split("$") as part, idxPart (idxPart)}
                                {#if idxPart % 2 === 0}
                                    {@html `${part.replace(
                                        /^ | $/g,
                                        "&nbsp;"
                                    )}`}
                                {:else}
                                    <Katex expression={part} />
                                {/if}
                            {/each}
                        </div>
                    </div>
                {:else if Array.isArray(formula)}
                    <div class="flex flex-row justify-start items-start">
                        {#if serial}
                            <span class="font-semibold"
                                >{idxFormula + 1}.&nbsp;</span
                            >
                        {/if}
                        <div>
                            {#each formula as part, idxPart (idxPart)}
                                {#if !Array.isArray(part)}
                                    {@html `${part.replace(
                                        /^ | $/g,
                                        "&nbsp;"
                                    )}`}
                                {:else}
                                    <Katex expression={part[0]} />
                                {/if}
                            {/each}
                        </div>
                    </div>
                {:else if typeof formula === "string" && !formula.includes("\\text{")}
                    {#if serial}
                        <div class="flex flex-row justify-start items-start">
                            {@html `<span class="font-semibold">${
                                idxFormula + 1
                            }.&nbsp;</span>
                        <span>${formula}</span>`}
                        </div>
                    {:else}
                        {@html `<div>${formula}</div>`}
                    {/if}
                {:else if typeof formula === "object" && !Array.isArray(formula)}
                    <svelte:self
                        dataSet={[formula]}
                        titleSize={titleSize + 1}
                    />
                {/if}
            {/each}
        </div>
    </section>
{/each}

<style>
    .collapse-title::after {
        transform: translate(0, -8px) rotate(45deg);
    }
</style>
