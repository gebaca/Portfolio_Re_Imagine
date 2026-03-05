/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' es la fuente por defecto para párrafos
        sans: ['Inter', 'sans-serif'],
        // 'hand' será para tus títulos y logo
        hand: ['"Amatic SC"', 'cursive'],
      },
    },
  },
  plugins: [],
};
