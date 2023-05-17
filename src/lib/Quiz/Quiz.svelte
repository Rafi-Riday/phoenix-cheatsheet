<script>
    import { upperCaseWord, secondsToHMS } from "$lib/utilities";
    import NoPassage from "$lib/Quiz/NoPassage.svelte";
    import Passage from "$lib/Quiz/Passage.svelte";
    export let mainData;
    const { passage, questions, dataSet, answers, title, time } = mainData;
    let submitted = false;
    let rerender = true;
    // result logic
    let resultSet = {};
    let markSheet = {};
    $: if (submitted) {
        markSheet = {
            total: passage
                ? dataSet
                      .filter((d) => d.questions)
                      .map((q) => q.questions)
                      .flat().length
                : questions.length,
            answered: passage ? 0 : Object.keys(resultSet).length, // Object.keys(resultSet).length,
            correct: passage
                ? 0
                : Object.keys(resultSet).filter(
                      (qIdx) =>
                          resultSet[qIdx].option === resultSet[qIdx].answer
                  ).length,
            wrong: passage
                ? 0
                : Object.keys(resultSet).filter(
                      (qIdx) =>
                          resultSet[qIdx].option !== resultSet[qIdx].answer
                  ).length,
        };
    }
    // timer logic
    let givingExam = false;
    let dynamicTime = time;
    let structTime = secondsToHMS(dynamicTime);
    $: if (dynamicTime > 359999) dynamicTime = 359999;
    $: structTime = secondsToHMS(dynamicTime);
    const timerFunc = () => {
        givingExam = true;
        const timer = setInterval(() => {
            if (dynamicTime <= 0) {
                clearInterval(timer);
                givingExam = false;
                submitted = true;
            } else if (givingExam === false) {
                clearInterval(timer);
            } else {
                dynamicTime -= 1;
            }
        }, 1000);
    };
</script>

<main>
    <center class="flex flex-col gap-2 mb-4 mt-1 items-center">
        <div class="font-semibold text-2xl">{upperCaseWord(title)}</div>
        <span class="font-medium"
            >Total Marks : {passage
                ? dataSet
                      .filter((d) => d.questions)
                      .map((q) => q.questions)
                      .flat().length
                : questions.length}</span
        >
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

    <center>
        {#if passage}
            <Passage {dataSet} {answers} {submitted} {rerender} {resultSet} />
        {:else}
            <NoPassage
                {questions}
                {answers}
                {submitted}
                {rerender}
                {resultSet}
            />
        {/if}
    </center>

    <center class="sticky bottom-2 sm:bottom-3 mt-12">
        {#if submitted === false}
            {#if givingExam === false}
                <button
                    on:click={() => {
                        timerFunc();
                    }}
                    class="btn btn-info text-info-content shadow-custom"
                >
                    Start Exam
                </button>
            {:else}
                <button
                    on:click={() => {
                        submitted = true;
                        givingExam = false;
                    }}
                    class="btn btn-sm btn-accent text-accent-content shadow-custom"
                >
                    Submit
                </button>
            {/if}
        {:else}
            <button
                on:click={() => {
                    submitted = false;
                    rerender = !rerender;
                    dynamicTime = time;
                    resultSet = {};
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
</main>
