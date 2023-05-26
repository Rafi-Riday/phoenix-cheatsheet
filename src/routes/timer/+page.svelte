<script>
    import { getContext } from "svelte";
    const { secondsToHMS } = getContext("utilities");
    // timer logic
    let submitted = false;
    let givingExam = false;
    let dynamicTime = 600;
    let structTime = secondsToHMS(dynamicTime);
    $: if (dynamicTime > 359999) dynamicTime = 359999;
    $: structTime = secondsToHMS(dynamicTime);
    const timerFunc = () => {
        givingExam = true;
        const timer = setInterval(() => {
            if (dynamicTime <= 0 || givingExam === false) {
                dynamicTime = 600;
                clearInterval(timer);
                givingExam = false;
            } else {
                dynamicTime -= 1;
            }
        }, 1000);
    };
    // counter logic
    let submittedCounter = false;
    let givingExamCounter = false;
    let dynamicTimeCounter = 0;
    let structTimeCounter = secondsToHMS(dynamicTimeCounter);
    $: structTimeCounter = secondsToHMS(dynamicTimeCounter);
    const counterFunc = () => {
        givingExamCounter = true;
        const counterTimer = setInterval(() => {
            if (givingExamCounter === false) {
                clearInterval(counterTimer);
            } else {
                dynamicTimeCounter += 1;
            }
        }, 1000);
    };
</script>

<main>
    <!-- set timer manually -->
    <center class="flex flex-col gap-2 mb-4 mt-1 items-center">
        <!-- set time manually -->
        {#if !givingExam && !submitted}
            <span class="flex items-center">
                <span>Time&nbsp;:&nbsp;</span>
                <input
                    class="max-w-[90px] w-full h-10 px-2 text-base placeholder-gray-600 border border-slate-400 focus:outline-none focus:border-slate-600"
                    type="number"
                    placeholder="time (s)"
                    bind:value={dynamicTime}
                />
                <span>&nbsp;Seconds</span>
            </span>
        {/if}
    </center>
    <!-- timer display -->
    <center class="mt-8">
        {#if submitted === false}
            {#if givingExam === false}
                <button
                    on:click={() => {
                        timerFunc();
                    }}
                    class="btn btn-info text-info-content shadow-custom"
                >
                    Start Timer
                </button>
            {:else}
                <button
                    on:click={() => {
                        submitted = true;
                        givingExam = false;
                    }}
                    class="btn btn-accent text-accent-content shadow-custom"
                >
                    Stop
                </button>
            {/if}
        {:else}
            <button
                on:click={() => {
                    submitted = false;
                    dynamicTime = 600;
                }}
                class="btn btn-warning text-warning-content shadow-custom"
            >
                Reset
            </button>
        {/if}
        <center
            class="mt-2 sm:mt-3 grid grid-flow-col gap-3 text-center auto-cols-max justify-center"
        >
            {#each ["hours", "min", "sec"] as t}
                <div
                    class="flex gap-1 sm:gap-0 sm:flex-col p-2 bg-neutral rounded text-neutral-content items-center text-[10px] sm:text-xs shadow-custom {dynamicTime <=
                    10
                        ? 'text-red-300'
                        : ''}"
                >
                    <span class="countdown font-mono text-xs sm:text-sm">
                        <span style="--value:{structTime[t]};" />
                    </span>
                    {t}
                </div>
            {/each}
        </center>
    </center>
    <!-- counter -->
    <center class="mt-16">
        {#if submittedCounter === false}
            {#if givingExamCounter === false}
                <button
                    on:click={() => {
                        counterFunc();
                    }}
                    class="btn btn-info text-info-content shadow-custom"
                >
                    Start Counter
                </button>
            {:else}
                <button
                    on:click={() => {
                        submittedCounter = true;
                        givingExamCounter = false;
                    }}
                    class="btn btn-accent text-accent-content shadow-custom"
                >
                    Pause
                </button>
            {/if}
        {:else}
            <button
                on:click={() => {
                    submittedCounter = false;
                    counterFunc();
                }}
                class="btn btn-accent text-accent-content shadow-custom"
            >
                Resume
            </button>
            <button
                on:click={() => {
                    submittedCounter = false;
                    givingExamCounter = false;
                    dynamicTimeCounter = 0;
                }}
                class="btn btn-warning text-warning-content shadow-custom"
            >
                Reset
            </button>
        {/if}
        <center
            class="mt-2 sm:mt-3 grid grid-flow-col gap-3 text-center auto-cols-max justify-center"
        >
            {#each ["hours", "min", "sec"] as t}
                <div
                    class="flex gap-1 sm:gap-0 sm:flex-col p-2 bg-neutral rounded text-neutral-content items-center text-[10px] sm:text-xs shadow-custom"
                >
                    <span class="countdown font-mono text-xs sm:text-sm">
                        <span style="--value:{structTimeCounter[t]};" />
                    </span>
                    {t}
                </div>
            {/each}
        </center>
    </center>
</main>
