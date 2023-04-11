<script>
    import Katex from "../lib/Katex.svelte";
</script>

<svelte:head>
    <title>Home</title>
    <meta
        name="description"
        content="North South University admission online coaching center, Phoenix Admission Care"
    />
    <meta
        name="keywords"
        content="Phoenix Admission Care, North South University admission online coaching center, Math, English, IBA, Private university coaching, online coaching"
    />
    <meta name="author" content="MD Rafiul Hossain Riday" />
</svelte:head>

<main class="">
    <a
        href="/math/vocabulary"
        class="bg-[#ff3e0020] text-[#ff3e00] text-xs sm:text-base underline px-2 py-1 rounded my-1"
    >
        math-Vocabulary
    </a>

    <div class="text-4xl">
        <Katex expression={"\\frac{a}{b}"} />
    </div>
</main>
