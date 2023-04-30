<script>
    import { upperCaseWord } from "$lib/utilities";
    export let idx = 0;
    export let topic;
</script>

<div
    class="rounded-2xl w-full p-4 shadow-2xl
            {idx % 3 === 0
        ? 'bg-accent text-accent-content'
        : idx % 3 === 1
        ? 'bg-info text-info-content'
        : 'bg-[#ffd468] text-warning-content'}"
>
    <span class="relative -top-16" id={topic.section} />
    <h3 class="text-xl font-medium pb-2">
        {upperCaseWord(topic.section)}
    </h3>
    <div class="flex flex-col gap-2">
        {#each topic.topicList as sectionTitle}
            <li class="pl-1">
                <a
                    href="/{topic.section}/{sectionTitle}"
                    class="underline underline-offset-4 font-medium"
                    >{upperCaseWord(sectionTitle)}
                </a>
                {#if topic.topicDetails}
                    {#each Object.keys(topic.topicDetails) as d}
                        {#if d.toLowerCase() === sectionTitle.toLowerCase()}
                            <div
                                class="pl-10 no-underline flex flex-row flex-wrap gap-x-2"
                            >
                                {#each topic.topicDetails[d] as ttd, idx (idx)}
                                    <span class="underline underline-offset-4">
                                        {ttd.split("-").join(" ")}{idx !==
                                        topic.topicDetails[d].length - 1
                                            ? ","
                                            : ""}
                                    </span>
                                {/each}
                            </div>
                        {/if}
                    {/each}
                {/if}
            </li>
        {/each}
    </div>
</div>
