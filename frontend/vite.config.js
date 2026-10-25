import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/storageunit': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

