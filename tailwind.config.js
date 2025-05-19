/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scaleUp: "scale-up 0.2s",
        fadeOut: "fade-out 0.15s forwards",
        pingOn: "ping-on 2.5s forwards",
        catLose: "cat-lose 1.5s forwards ease-in-out",
        catWin: "cat-win 1.5s forwards ease-in-out",
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(0)' },
          '75%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, display: 'none' }
        },
        'ping-on': {
          '0%': { opacity: 0},
          '50%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        'cat-lose': {
          '0%': {  transform: 'translateY(0%) scale(1)' },
          '40%': { transform: 'translateY(15%) scale(0.9)' },
          '100%': {  transform: 'translateY(0%) scale(1)' },
        },
        'cat-win': {
          '0%': {  transform: 'translateY(0%) scale(1)' },
          '30%': { transform: 'translateY(-20%) scale(1.1)' },
          '100%': {  transform: 'translateY(0%) scale(1)' },
        }, 
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};