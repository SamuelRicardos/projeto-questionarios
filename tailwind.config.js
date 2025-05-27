/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    extend: {
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        pulseRed: {
          '0%, 100%': { transform: 'scale(1)', color: '#ef4444' },
          '50%': { transform: 'scale(1.15)', color: '#f87171' },
        },
        popCorrect: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.15)', opacity: '0.85' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        popWrong: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'pulse-red': 'pulseRed 1.2s ease-in-out infinite',
        'pop-correct': 'popCorrect 0.5s ease forwards',
        'pop-wrong': 'popWrong 0.5s ease forwards',
        shake: 'shake 0.3s ease',
      },
    },
  },
  plugins: [],
};
