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
      "primary-dark": "#2a2d34",
      "primary-light": "#414550",
      "secondary": "#22c55e",
      "secondary-dark": "#1fb155",
      "secondary-light": "#29da6a",
      "secondary-dull": "#43644e",
      "white": "#fff",
      "black": "#000",
      "transparent": "transparent"
    },
    fontFamily: {
    },
  },
  plugins: [],
}
