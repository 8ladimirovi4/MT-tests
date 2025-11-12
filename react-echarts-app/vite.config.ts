import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // Заменяем /api на пустую строку, так как сервер ожидает /api/health
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
