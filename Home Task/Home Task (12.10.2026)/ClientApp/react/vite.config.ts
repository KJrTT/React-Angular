import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Все запросы к /api идут на ASP.NET Core
      '/api': {
        target: 'https://localhost:7127', // Порт вашего ASP.NET Core
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: '/', // React живет в корне
})