/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Enables Tailwind in all React components
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          100: "#f4ecfa",  // Soft lavender shade
        }
      }
    },
  },
  plugins: [],
}
