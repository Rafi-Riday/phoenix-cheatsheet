<script>
    import { upperCaseWord } from "$lib/utilities";
    import Katex from "$lib/Katex.svelte";
    export let dataSet;
    export let titleSize;
    let titleSizeArray = ["2xl", "xl", "lg", "base"];
</script>

{#each dataSet as { title, img, dataSet }, idx (idx)}
    <section class="flex flex-col gap-2">
        {#if title}
            <h2
                class="text-{titleSize <= titleSizeArray.length - 1
                    ? titleSizeArray[titleSize]
                    : 'base'} font-medium"
            >
                {upperCaseWord(title)}
            </h2>
        {/if}
        {#each dataSet as formula}
            {#if typeof formula === "string" && formula.includes("\\text{")}
                <!-- `\\text{$a$}`.replace(/\\text{/g, '').slice(0, -1).split('$').map((a,idx)=>idx%2) -->
                <div>
                    {#each formula
                        .replace(/\\text{/g, "")
                        .slice(0, -1)
                        .split("$") as part, idx (idx)}
                        {#if idx % 2 === 0}
                            {@html `<span>${part.replace(
                                /^\s|\s$/g,
                                "&nbsp;"
                            )}</span>`}
                        {:else}
                            <Katex expression={part} />
                        {/if}
                    {/each}
                </div>
            {:else if Array.isArray(formula)}
                <div>
                    {#each formula as part (part)}
                        {#if !Array.isArray(part)}
                            {part}
                        {:else}
                            <Katex expression={part[0]} />
                        {/if}
                    {/each}
                </div>
            {:else if typeof formula === "string" && !formula.includes("\\text{")}
                <div>{formula}</div>
            {:else if typeof formula === "object" && !Array.isArray(formula)}
                <svelte:self dataSet={[formula]} titleSize={titleSize + 1} />
            {/if}
        {/each}
    </section>
{/each}
