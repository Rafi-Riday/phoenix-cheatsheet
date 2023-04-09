<script>
    import Katex from "../lib/Katex.svelte";
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main class="">
    <a href="/math/vocabulary">
        <button
            class="bg-[#ff3e0020] text-[#ff3e00] text-xs sm:text-base underline px-2 py-1 rounded my-1"
            >math-Vocabulary
        </button>
    </a>
</main>

<div class="text-4xl">
    <Katex expression={"\\frac{a}{b}"} />
</div>
