<script>
    export let title = ["NSU", "Admission"];
    export let date = "2023-05-27T10:00:00";
    // duration left from exam time
    let duration = {};
    const durationFunc = () => {
        const now = new Date();
        const target = new Date(date);
        const diffS = Math.floor((target - now) / 1000);
        const diffDays = Math.floor(diffS / (24 * 60 * 60));
        const diffHours = Math.floor((diffS % (24 * 60 * 60)) / (60 * 60));
        const diffMinutes = Math.floor((diffS % (60 * 60)) / 60);
        const diffSeconds = diffS % 60;
        duration = { diffDays, diffHours, diffMinutes, diffSeconds };
    };
    durationFunc();
    setInterval(() => {
        durationFunc();
    }, 1000);
</script>

<main>
    <center class="text-3xl my-3">
        <span class="font-bold text-primary">{title[0]}</span>
        {title[1]}
    </center>
    <center class="mb-6">
        <span class="font-semibold">{duration.diffDays}</span> Days
        <span class="font-semibold">{duration.diffHours}</span> Hours
        <span class="font-semibold">{duration.diffMinutes}</span> Minutes
        <span class="font-semibold">{duration.diffSeconds}</span> Seconds
    </center>
</main>
