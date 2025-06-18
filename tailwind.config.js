/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#3B82F6",
        "primary-dark": "#bed3ff",
        "primary-hover": "#F43F5E",
        "black-rgba": "rgba(255, 255, 255, 0.16)",
        "black-rgba-light": "rgba(255, 255, 255, 0.3)",
        "text-black-rgba": "rgba(255, 255, 255, 0.7)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
