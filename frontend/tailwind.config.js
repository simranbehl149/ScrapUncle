/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#166534',
          emerald: '#10B981',
          yellow: '#FACC15',
        },
      },
    },
  },
  plugins: [],
};