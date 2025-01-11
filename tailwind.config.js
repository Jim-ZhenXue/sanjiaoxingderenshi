/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'glow': 'glow 3s ease-in-out infinite',
        'final-bg': 'final-bg 1s ease-out forwards',
        'light-sweep': 'light-sweep 4.5s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.4',
            transform: 'scale(1.05)',
          },
        },
        'final-bg': {
          '0%': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
          '100%': {
            backgroundColor: 'rgba(0, 0, 0, 1)',
          },
        },
        'light-sweep': {
          '0%': {
            left: '-5%',
            opacity: '0',
            transform: 'translateY(-50%) scaleX(10)',
          },
          '5%': {
            left: '-5%',
            opacity: '1',
            transform: 'translateY(-50%) scaleX(10)',
          },
          '40%': {
            left: '100%',
            opacity: '0',
            transform: 'translateY(-50%) scaleX(10)',
          },
          '100%': {
            left: '100%',
            opacity: '0',
            transform: 'translateY(-50%) scaleX(10)',
          },
        },
      },
    },
  },
  plugins: [],
};
