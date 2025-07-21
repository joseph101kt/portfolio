/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    './*.html'
  ],
  theme: {
    extend: {
      colors: {
        text:{
          light: '#0f0f0b',
          dark: '#f4f4f0',
        },
        primary: {
          light: '#e1e156',
          dark: '#e1e156',
        },
        secondary: {
          light: '#a857e6',
          dark: '#a857e6',
        },
        accent: {
          light: '#b1b4c4',
          dark: '#b1b4c4',
        },
        neutral: {
          light: '#fafaf9',
          dark: '#171717',
        },
      },
    }
  },
  plugins: [],
}

