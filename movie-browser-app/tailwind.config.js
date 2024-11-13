/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark' : '#15141F'
      },
      backgroundColor: {
        'input-dark': "#211F30"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(200deg, #FF8F71 0%, #EF2D1A 100%)'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.bg-clip-text': {
          '-webkit-background-clip': 'text',
        },
        '.text-fill-transparent': {
          '-webkit-text-fill-color': 'transparent',
        },
      });
    },
  ],
}