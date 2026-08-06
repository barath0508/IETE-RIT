/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          navy: '#1E3A8A',
          dark: '#0F172A',
          accent: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
          purple: '#8B5CF6',
          bg: '#FFFFFF',
          section: '#F8FAFC',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(37, 99, 235, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 12px 32px -4px rgba(37, 99, 235, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
        'card-hover': '0 20px 40px -15px rgba(37, 99, 235, 0.18)',
        'card-elevated': '0 25px 50px -12px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #F0F7FF 0%, #FFFFFF 50%, #E0F2FE 100%)',
        'card-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        'brand-gradient': 'linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
        'accent-gradient': 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}

