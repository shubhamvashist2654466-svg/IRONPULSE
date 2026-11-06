/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#080808',
          900: '#121212',
          850: '#141414',
          800: '#181818',
          700: '#222222',
          600: '#292929',
          500: '#383838',
        },
        neon: {
          DEFAULT: '#C6FF3D',
          hover: '#b5ef2b',
          glow: '#C6FF3D44',
          dim: '#8cb527',
          dark: '#243305',
        },
        border: {
          DEFAULT: '#292929',
          light: '#3a3a3a',
          neon: '#C6FF3D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 25px -5px rgba(198, 255, 61, 0.35)',
        'neon-sm': '0 0 12px -2px rgba(198, 255, 61, 0.4)',
        'neon-lg': '0 0 45px -5px rgba(198, 255, 61, 0.45)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(198, 255, 61, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(198, 255, 61, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}

