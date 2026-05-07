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
      animation: {
        scroll: 'scroll 60s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },

  plugins: [],
}
