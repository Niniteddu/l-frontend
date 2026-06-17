import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiProxyTarget = process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:8080';

function getBasePath(): string {
  return process.env.VITE_BASE_PATH ?? '/';
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 120,
    },
    hmr: {
      host: 'localhost',
      port: 5173,
    },
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
});
