<svelte:head>
    <title>Home</title>
</svelte:head>

<main class="m-4">
    <div class="flex flex-col">
        <div>
            <span class="text-[#ff3e00] text-xs sm:text-base pr-2">├</span>
            <a href="/test">
                <button
                    class="bg-[#ff3e0020] text-[#ff3e00] text-xs sm:text-base underline px-2 py-1 rounded my-1"
                    >Test
                </button>
            </a>
        </div>
        <div>
            <span class="text-[#ff3e00] text-xs sm:text-base pr-2">│ ├</span>
            <a href="/test/math-vocabulary">
                <button
                    class="bg-[#ff3e0020] text-[#ff3e00] text-xs sm:text-base underline px-2 py-1 rounded my-1"
                    >math-Vocabulary
                </button>
            </a>
            <span class="text-[#ff3e00] text-xs sm:text-base pr-2">├</span>
            <button
                class="bg-[#ff3e0020] text-[#ff3e00] text-xs sm:text-base px-2 py-1 rounded my-1 cursor-default"
                >Read vocabulary
            </button>
            <button
                class="bg-[#ff3e0020] text-[#ff3e00] text-xs sm:text-base px-2 py-1 rounded my-1 cursor-default"
                >Give test
            </button>
        </div>
    </div>
    <small class="mt-4">
        Copyright©<a
            class="text-sky-700 underline"
            href="https://www.facebook.com/PhoenixAdmissionCare"
            >Phoenix Admission Care</a
        >
    </small>
</main>
