<script>
    import "../app.css";
</script>

<div class="fixed top-0 left-0 navbar bg-primary text-primary-content">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">Phoenix</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/english">English</a></li>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <li tabindex="0">
                <a href="/math">
                    Math
                    <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        ><path
                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                        /></svg
                    >
                </a>
                <ul class="p-2 bg-primary text-primary-content">
                    <li><a href="/math/geometry">Geometry</a></li>
                    <li><a href="/math/algebra">Algebra</a></li>
                    <li><a href="/math/arithemetic">Arithemetic</a></li>
                </ul>
            </li>
            <li><a href="/quiz">Quiz</a></li>
        </ul>
    </div>
</div>

<div class="mt-[70px]">
    <slot />
</div>
