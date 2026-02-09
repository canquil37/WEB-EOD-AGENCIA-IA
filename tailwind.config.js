/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidiana: '#050505',
        amarilloEOD: '#FFB800', // El amarillo vibrante de tu logo
        naranjaEOD: '#FF8A00',  // El tono naranja del chip
      },
    },
  },
  plugins: [],
}