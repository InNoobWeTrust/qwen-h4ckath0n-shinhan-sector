/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shinhan: {
          blue: '#003C82',
          light: '#E8F1FA',
          accent: '#00A3E0',
          green: '#4CAF50',
          red: '#E53935'
        }
      }
    },
  },
  plugins: [],
}
