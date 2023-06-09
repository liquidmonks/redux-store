/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eerie': '#131921'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}