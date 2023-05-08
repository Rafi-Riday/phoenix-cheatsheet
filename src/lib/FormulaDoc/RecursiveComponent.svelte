<script>
    import { upperCaseWord } from "$lib/utilities";
    import Katex from "$lib/Katex.svelte";
    export let dataSet;
    export let titleSize = 3;
    let titleSizeArray = ["text-xl", "text-lg", "text-base"];
    import { range } from "$lib/utilities";
</script>

<!-- FIXME: remove boilerplaty codes -->
{#each dataSet as { title, img, collapse, serial, noBadge, dataSet }, idx (idx)}
    <section class={collapse ? "collapse collapse-arrow grow" : ""}>
        <!-- collapse inp -->
        {#if collapse}
            <input type="checkbox" class="peer min-h-0" />
        {/if}
        <!-- title -->
        {#if title}
            <h2
                class="font-medium {titleSize <= titleSizeArray?.length - 1
                    ? titleSizeArray[titleSize]
                    : 'base'} {collapse
                    ? 'collapse-title p-0 min-h-0 border-b-2 peer-checked:mb-2'
                    : ''}"
            >
                {@html upperCaseWord(title)}
                {#if noBadge !== true}
                    <div class="badge badge-xs py-2 -translate-y-[2px]">
                        {img || dataSet
                            ? (img && img.len?.length === 2
                                  ? img.len[1] +
                                    1 -
                                    img.len[0] -
                                    (img.avoid ? img.avoid : []).length
                                  : 0) + (dataSet ? dataSet.length : 0)
                            : 0}
                    </div>
                {/if}
            </h2>
        {:else if collapse}
            <h2
                class="font-medium {titleSize <= titleSizeArray?.length - 1
                    ? titleSizeArray[titleSize]
                    : 'base'} {collapse
                    ? 'collapse-title p-0 min-h-0 border-b-2 peer-checked:mb-2'
                    : ''}"
            >
                <span class="text-neutral font-mono">Expand</span>
                {#if noBadge !== true}
                    <div class="badge badge-xs py-2 -translate-y-[2px]">
                        {img || dataSet
                            ? (img && img.len?.length === 2
                                  ? img.len[1] +
                                    1 -
                                    img.len[0] -
                                    (img.avoid ? img.avoid : []).length
                                  : 0) + (dataSet ? dataSet.length : 0)
                            : 0}
                    </div>
                {/if}
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
            {#if img && img.display === "formula"}
                <center>
                    <section
                        class="mb-6 flex flex-col items-center"
                        style="max-width:{img.width}; gap: {img.gap};"
                    >
                        {#each range(img.len[0], img.len[1] + 1).filter((a) => !(img.avoid ? img.avoid : []).includes(a)) as l, idx (idx)}
                            <div>
                                {#if serial}
                                    <span
                                        class="font-bold badge badge-xs py-2 px-3 mb-1"
                                        >{idx + 1}</span
                                    >
                                {/if}
                                <img
                                    class="w-full shadow-lg"
                                    src="{img.before}{l}{img.after}"
                                    alt="{l}{img.after}"
                                />
                            </div>
                        {/each}
                    </section>
                </center>
            {/if}
            {#if dataSet}
                {#each dataSet as formula, idxFormula (idxFormula)}
                    {#if typeof formula === "string" && formula.includes("\\text{")}
                        <div class="flex flex-row justify-start items-start">
                            {#if serial}
                                <span class="font-semibold"
                                    >{(img &&
                                    img.display === "formula" &&
                                    img.len?.length === 2
                                        ? img.len[1] +
                                          1 -
                                          img.len[0] -
                                          (img.avoid ? img.avoid : []).length
                                        : 0) +
                                        idxFormula +
                                        1}.&nbsp;</span
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
                                    >{(img &&
                                    img.display === "formula" &&
                                    img.len?.length === 2
                                        ? img.len[1] +
                                          1 -
                                          img.len[0] -
                                          (img.avoid ? img.avoid : []).length
                                        : 0) +
                                        idxFormula +
                                        1}.&nbsp;</span
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
                            <div
                                class="flex flex-row justify-start items-start"
                            >
                                {@html `<span class="font-semibold">${
                                    (img &&
                                    img.display === "formula" &&
                                    img.len?.length === 2
                                        ? img.len[1] +
                                          1 -
                                          img.len[0] -
                                          (img.avoid ? img.avoid : []).length
                                        : 0) +
                                    idxFormula +
                                    1
                                }.&nbsp;</span>
                            <span>${formula}</span>`}
                            </div>
                        {:else}
                            {@html `<div>${formula}</div>`}
                        {/if}
                    {:else if typeof formula === "object" && !Array.isArray(formula)}
                        <div class="flex flex-row justify-start items-start">
                            {#if serial}
                                <span class="font-semibold"
                                    >{(img &&
                                    img.display === "formula" &&
                                    img.len?.length === 2
                                        ? img.len[1] +
                                          1 -
                                          img.len[0] -
                                          (img.avoid ? img.avoid : []).length
                                        : 0) +
                                        idxFormula +
                                        1}.&nbsp;</span
                                >
                            {/if}
                            <svelte:self
                                dataSet={[formula]}
                                titleSize={titleSize + 1}
                            />
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    </section>
{/each}

<style>
    .collapse-title::after {
        transform: translate(0, -8px) rotate(45deg);
    }
</style>
