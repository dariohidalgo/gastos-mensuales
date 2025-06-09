/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitar modo oscuro usando clases
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1c1c1e',
          gray: '#f5f5f7',
          text: '#f5f5f7',
          border: '#333333',
        },
        light: {
          DEFAULT: '#ffffff',
          gray: '#f4f4f4',
          text: '#333333',
          border: '#cccccc',
        }
      },
      backgroundColor: {
        primary: {
          light: '#ffffff',
          dark: '#1c1c1e',
        }
      },
      textColor: {
        primary: {
          light: '#333333',
          dark: '#f5f5f7',
        }
      }
    },
  },
  plugins: [],
}
