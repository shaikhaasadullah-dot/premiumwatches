/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#E8DCB8',
          300: '#D4AF37', // Gold
          400: '#C5A028',
          500: '#B8860B', // Dark Goldenrod
          600: '#906A08',
          700: '#684B05',
          800: '#402E02',
          900: '#181100',
        },
        obsidian: {
          50: '#f6f6f7',
          100: '#e3e3e7',
          200: '#c7c7d0',
          300: '#a3a4b2',
          400: '#797b8f',
          500: '#5e6073',
          600: '#4a4b5d',
          700: '#3c3d4b',
          800: '#23242c',
          900: '#111216',
          950: '#0a0a0d',
        },
        champagne: {
          DEFAULT: '#F7E7CE',
          light: '#FFF9E6',
          gold: '#D4AF37',
          rose: '#B76E79',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
