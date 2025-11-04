import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b0b0f',
        foreground: '#ffffff',
        muted: {
          DEFAULT: '#737373',
          foreground: '#a3a3a3',
        },
        accent: {
          DEFAULT: '#e50914',
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: '#141414',
          foreground: '#ffffff',
        },
        modal: {
          DEFAULT: '#181818',
          foreground: '#ffffff',
        }
      },
      animation: {
        'fade-in': 'fadeIn 400ms ease-out',
        'fade-up': 'fadeUp 400ms ease-out',
        'scale-in': 'scaleIn 220ms ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.98)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
