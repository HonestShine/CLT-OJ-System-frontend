/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0B0F19',
        'bg-secondary': '#111827',
        'bg-tertiary': '#1F2937',
        'accent-primary': '#00D9FF',
        'accent-secondary': '#00B4D8',
        'text-primary': '#F9FAFB',
        'text-secondary': '#9CA3AF',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.2)',
      },
      spacing: {
        'space-xs': '0.5rem',
        'space-sm': '1rem',
        'space-md': '1.5rem',
        'space-lg': '2rem',
        'space-xl': '3rem',
      },
      borderRadius: {
        'radius-sm': '6px',
        'radius-md': '12px',
        'radius-lg': '16px',
        'radius-full': '9999px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}