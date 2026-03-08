/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core UI Colors (Hardcoded to fix "unknown utility" errors)
        background: "#020617", // slate-950
        foreground: "#f8fafc", // slate-50
        border: "#1e293b",     // slate-800
        card: "#0f172a",       // slate-900
        
        // BitWars Brand Palette
        bitwars: {
          primary: "#3b82f6",   // Electric Blue
          secondary: "#a855f7", // Cyber Purple
          accent: "#10b981",    // Matrix Emerald
          danger: "#ef4444",
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { 'border-color': 'rgba(59, 130, 246, 0.2)' },
          '100%': { 
            'border-color': 'rgba(59, 130, 246, 0.6)', 
            'box-shadow': '0 0 15px rgba(59, 130, 246, 0.2)' 
          },
        }
      }
    },
  },
  plugins: [],
}