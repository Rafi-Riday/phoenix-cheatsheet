<script>
    export let title = ["NSU", "Admission"];
    export let date = "2023-05-27T10:00:00";
    let passed = false;
    // duration left from exam time
    let duration = {};
    const durationFunc = () => {
        const now = new Date();
        const target = new Date(date);
        const diffS = Math.floor((target - now) / 1000);
        if (diffS <= 0) {
            passed = true;
            return;
        }
        const diffDays = Math.floor(diffS / (24 * 60 * 60));
        const diffHours = Math.floor((diffS % (24 * 60 * 60)) / (60 * 60));
        const diffMinutes = Math.floor((diffS % (60 * 60)) / 60);
        const diffSeconds = diffS % 60;
        duration = { diffDays, diffHours, diffMinutes, diffSeconds };
    };
    if (!passed) {
        durationFunc();
        setInterval(() => {
            durationFunc();
        }, 1000);
    }
</script>

{#if !passed}
    <main>
        <center class="text-3xl my-3">
            <span class="font-bold text-primary">{title[0]}</span>
            {title[1]}
        </center>
        <center class="mb-6">
            {@html duration.diffDays !== 0
                ? `<span class="font-semibold">${duration.diffDays}</span> Days`
                : ""}
            {@html duration.diffHours !== 0
                ? `<span class="font-semibold">${duration.diffHours}</span> Hours`
                : ""}
            {@html duration.diffMinutes !== 0
                ? `<span class="font-semibold">${duration.diffMinutes}</span> Minutes`
                : ""}
            {@html duration.diffSeconds !== 0
                ? `<span class="font-semibold">${duration.diffSeconds}</span> Seconds`
                : ""}
        </center>
    </main>
{:else}
    <center class="text-3xl my-3">
        <span class="font-bold text-error">{title[0]}</span>
        {title[1]}
    </center>
    <!-- <center class="mb-6">
        <span class="font-semibold">Exam passed</span>
    </center> -->
{/if}
