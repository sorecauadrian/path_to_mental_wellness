/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#9333ea',
          DEFAULT: '#7e22ce',
          dark: '#6b21a8',
        },
        secondary: {
          light: '#18181b',
          DEFAULT: '#09090b',
          dark: '#000000',
        }
      }
    },
  },
  plugins: [],
};