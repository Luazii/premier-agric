/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#688e3c",   // moodboard green #688e3c
        bright: "#fde335",    // yellow
        fresh: "#83c553",     // light green
        deep: "#090b05",      // black-ish
      },
      fontFamily: {
        sans: ["Roboto", "Segoe UI", "system-ui", "sans-serif"],
        display: ["'Exo 2'", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}
