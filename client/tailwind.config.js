/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      poppins: ['Poppins', 'sans-serif'], // for headings
        lora: ['Lora', 'serif'], 
        fontFamily: {
          playfair: ['"Playfair Display"', 'serif'],
        },
    },
  },
  plugins: [],
}

