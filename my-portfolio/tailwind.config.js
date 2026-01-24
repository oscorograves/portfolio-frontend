/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"VT323"', 'monospace'], // Headings
        mono: ['"Space Mono"', 'monospace'], // Body/Technical
      },
    },
  },
  plugins: [],
}