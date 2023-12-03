/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"],
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