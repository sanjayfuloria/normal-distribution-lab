/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cream: '#FDF6EC',
        ink: '#1A1A2E',
        accent: '#E94560',
        gold: '#D4A853',
        slate: '#2C3E50',
        sage: '#4A7C59',
        paper: '#FAF3E0',
      },
    },
  },
  plugins: [],
};
