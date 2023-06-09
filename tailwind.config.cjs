/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        bg1: "#FBF7F4",
        c1: "#334B80",
        c2: "#E07E5C",
        c50: "#fbf7f4",
        c100: "#f8efe8",
        c200: "#f2e2d6",
        c300: "#e8cdb9",
        c400: "#d9af90",
        c500: "#c8936b",
        c600: "#b37a4f",
        c700: "#956440",
        c800: "#7c5538",
        c900: "#694a33",
        c950: "#382517",
      },
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [],
};
