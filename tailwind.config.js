/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        addProductColor: "#045692",
        buttonHoverColor: "#464776",
        tableHeaderColor: "#CFD5DB",
        tableRowColor: "#FAFAFA",
        modalBgColor: "#F7F7FA",
        savebuttonColor: "#1890FF",
        deleteConfirmColor: "#EB5757",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xxs: "200px",
      xs: "350px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [require("flowbite/plugin")],
};
