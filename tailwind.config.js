/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rotta: {
          darkest: '#0e0920',
          dark: '#160d33',
          navy: '#25174E',
          'navy-light': '#382375',
          'navy-lighter': '#4c3099',
          blue: '#3568FD',
          'blue-dark': '#244acc',
          'blue-light': '#608afd',
          'blue-subtle': '#eef2ff',
          cyan: '#2CE3FD',
          'cyan-dark': '#15b7cd',
          'cyan-light': '#8cf1fe',
          'cyan-subtle': '#e6fcff',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(14, 9, 32, 0.08)',
        glow: '0 0 30px rgba(44, 227, 253, 0.25)',
        'glow-blue': '0 0 30px rgba(53, 104, 253, 0.35)',
        'glow-lg': '0 0 60px rgba(44, 227, 253, 0.35)',
        card: '0 10px 30px -10px rgba(37, 23, 78, 0.08)',
        'card-hover': '0 25px 50px -12px rgba(37, 23, 78, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'rotta-gradient': 'linear-gradient(135deg, #25174E 0%, #160D33 50%, #0E0920 100%)',
        'rotta-hero': 'radial-gradient(ellipse at 50% 0%, #382375 0%, #25174E 45%, #160D33 100%)',
        'rotta-accent': 'linear-gradient(135deg, #2CE3FD 0%, #3568FD 100%)',
        'rotta-accent-hover': 'linear-gradient(135deg, #8CF1FE 0%, #2CE3FD 50%, #3568FD 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

