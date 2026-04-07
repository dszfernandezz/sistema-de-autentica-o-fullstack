import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err) => console.error('❌ Proxy error:', err.message));
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`🔄 Proxying ${req.method} ${req.url} → ${proxyReq.path}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`✅ Proxy response ${proxyRes.statusCode} for ${req.url}`);
          });
        }
      }
    }
  }
})