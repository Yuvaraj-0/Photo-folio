/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        vibrate: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(-1px, -1px)' },
          '60%': { transform: 'translate(1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
        },
      },
      animation: {
        vibrate: 'vibrate 1s infinite',
      },
      poppins: ['Poppins', 'sans-serif'], // for headings
        lora: ['Lora', 'serif'], 
        fontFamily: {
          playfair: ['"Playfair Display"', 'serif'],
        },
    },
  },
  plugins: [],
}

