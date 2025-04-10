/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{html,js}",
    "./index.html"],
    safelist: [
      'mx-1', 'mx-2', 'mx-3', 'mx-4', 'mx-5', 'mx-6', 'mx-7', 'mx-8', 'mx-9', 'mx-10',
    ],
  theme: {
    extend: {
      colors: {
        gold: '#ffd700',
        silver: '#C0C0C0',
      },
      fontFamily: {
        'sans': ['Noto Sans', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      textColor: ['responsive', 'hover', 'focus', 'active'],
      display: ['responsive'],
      width: ['responsive'],
      position: ['responsive', 'fixed'],
    },
  },
  plugins: [],
}