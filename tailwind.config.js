/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#137fec",
        "primary-hover": "#1170d2",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "surface-light": "#ffffff",
        "surface-dark": "#1a242f",
        "border-light": "#e2e8f0",
        "border-dark": "#283039",
        "text-main-dark": "#ffffff",
        "text-secondary": "#9dabb9",
      },
      fontFamily: {
        display: ["Inter", "Noto Sans SC", "sans-serif"],
        body: ["Inter", "Noto Sans SC", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
