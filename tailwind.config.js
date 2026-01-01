// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryPurple: '#7C3AED',
        darkBg: '#111827',
        goldGlow: '#FFD700',
      },
      animation: {
        breathe: 'breathe 2s infinite ease-in-out',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700' },
          '50%': { boxShadow: '0 0 20px #FFD700, 0 0 40px #FFD700' },
        },
      },
    },
  },
  plugins: [],
};
