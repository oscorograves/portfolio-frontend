/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#ff4d4d', // OpenClaw Coral Bright
          600: '#e63946', // OpenClaw Coral Mid
          700: '#b91c1c',
          800: '#991b1b', // OpenClaw Coral Dark
          900: '#7f1d1d',
          950: '#450a0a',
          DEFAULT: '#ff4d4d',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // OpenClaw Cyan Mid
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
          DEFAULT: '#00e5cc', // OpenClaw Cyan Bright
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
          DEFAULT: '#00e5cc',
        },
        dark: {
          bg: '#050810',      // OpenClaw Deep BG
          surface: '#0a0f1a', // OpenClaw Surface
          elevated: '#111827' // OpenClaw Elevated
        }
      },
      fontFamily: {
        sans: ['"VT323"', 'monospace'], // Headings
        mono: ['"Space Mono"', 'monospace'], // Body/Technical
      },
    },
  },
  plugins: [],
}