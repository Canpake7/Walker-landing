/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./App.jsx", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          850: "#1b1b1f",
        },
      },
    },
  },
  plugins: [],
};
