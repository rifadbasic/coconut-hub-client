/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-color) / <alpha-value>)",
        secondary: "rgb(var(--secondary-color) / <alpha-value>)",
        background: "rgb(var(--bg-color) / <alpha-value>)",
        text: "rgb(var(--text-color) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
