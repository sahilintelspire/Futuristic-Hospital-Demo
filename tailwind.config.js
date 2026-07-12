/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hospitalBlue: "#0A192F",
        accentCyan: "#00F2FF",
      },
    },
  },
  plugins: [],
}