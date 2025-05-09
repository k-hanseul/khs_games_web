/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scaleUp: "scale-up 0.2s",
        fadeOut: "fade-out 0.15s forwards",
        pingOn: "ping-on 2.5s forwards",
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
          // '0%': { opacity: 0, display: 'block'},
          // '50%': { opacity: 1 },
          // '100%': { opacity: 0, display: 'none' }
        },
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};