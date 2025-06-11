/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: {
            light: '#FFFFFF',
            dark: '#111827'
          },
          secondary: {
            light: '#F3F4F6',
            dark: '#1F2937'
          },
          accent: {
            light: '#E5E7EB',
            dark: '#374151'
          }
        },
        primary: {
          DEFAULT: '#0EA5E9',
          light: '#38BDF8',
          dark: '#0369A1'
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#6D28D9'
        },
        accent: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669'
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706'
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#B91C1C'
        },
        text: {
          primary: {
            light: '#111827',
            dark: '#F9FAFB'
          },
          secondary: {
            light: '#4B5563',
            dark: '#D1D5DB'
          }
        }
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'scan': 'scan 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-out': 'fadeOut 0.5s ease-out',
        'theme-toggle': 'themeToggle 0.3s ease-in-out'
      },
      keyframes: {
        glow: {
          '0%': { 'box-shadow': '0 0 5px rgba(14, 165, 233, 0.5)' },
          '100%': { 'box-shadow': '0 0 20px rgba(14, 165, 233, 0.8)' }
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100%)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        themeToggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  plugins: []
};