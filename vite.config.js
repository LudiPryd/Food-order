import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      // Dev-only proxy: the API does not send CORS headers, so requests to
      // /api are forwarded by the Vite dev server instead of the browser.
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://food-test-api.vercel.app',
          changeOrigin: true,
        },
      },
    },
  }
})
