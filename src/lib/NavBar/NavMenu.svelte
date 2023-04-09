<script>
    export let navData;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
{#each navData as navItem}
    {#if navItem.topicList}
        <li tabindex="0">
            <span class="justify-between p-2 gap-0">
                {navItem.section
                    .split("-")
                    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
                    .join(" ")}
                <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    ><path
                        d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                    /></svg
                >
            </span>
            <ul class="p-2 lg:p-3 bg-primary lg:border-0 shadow-custom">
                {#each navItem.topicList as topicList}
                    <li>
                        <a
                            href="/{navItem.section}/{topicList}"
                            class="px-1 py-2 lg:px-2"
                            >{topicList
                                .split("-")
                                .map(
                                    (str) =>
                                        str.charAt(0).toUpperCase() +
                                        str.slice(1)
                                )
                                .join(" ")}</a
                        >
                    </li>
                {/each}
                <li>
                    <a href="/{navItem.section}" class="px-1 py-2 underline"
                        >See all...</a
                    >
                </li>
            </ul>
        </li>
    {:else}
        <li>
            <a href="/{navItem.section}" class="p-2"
                >{navItem.section
                    .split("-")
                    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
                    .join(" ")}</a
            >
        </li>
    {/if}
{/each}
