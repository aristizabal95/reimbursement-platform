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
      borderColor: {
        dark: "#C7C9D9",
      },
      colors: {
        pending: "#F54336",
        lightWhite200: "#FFFFFF",
        lightWhite: "#EAEAF1",
        darkBlack: "#C7C9D9",
        darkBlack700: "#191E3E",
        darkBlack600: "#555770",
        darkBlack400: "#C7C9D9",
      },
    },
  },
  plugins: [],
};
