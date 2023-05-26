/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  // plugins: [],
  plugins: [
    function ({ addVariant }) {
      addVariant('children', '& > *')
    },
    require("daisyui")
  ],
  daisyui: {
    themes: ["light",],
  },
}
