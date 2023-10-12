/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bangers", "sans-serif"],
        body: ['"Comic Neue"', "cursive"],
      },
    },
  },
  plugins: [],
};
