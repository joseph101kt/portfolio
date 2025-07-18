/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    './*.html', // Scans all HTML files in the root folder
    './src/**/*.html', // Scans HTML files in the src folder and its subfolders
    './src/**/*.js', // Scans JS files if you are dynamically adding classes
    './src/**/*.jsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

