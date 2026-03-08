import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bitwars-dashboard/', // Add this line (replace with your exact repo name)
})