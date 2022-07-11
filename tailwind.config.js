/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "primary": "#2f323a",
      "primary-dark": "#1f2126",
      "secondary": "#B12236",
      "white": "#fff",
      "black": "#000",
      "transparent": "transparent"
    },
    fontFamily: {
    },
  },
  plugins: [],
}
