/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Roboto: ["sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
      boxShadow: {
        nav: "0px 2px 30px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
