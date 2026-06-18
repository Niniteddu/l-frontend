var _a;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
var apiProxyTarget = (_a = process.env.VITE_API_PROXY_TARGET) !== null && _a !== void 0 ? _a : 'http://localhost:8080';
function getBasePath() {
    var _a;
    return (_a = process.env.VITE_BASE_PATH) !== null && _a !== void 0 ? _a : '/';
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
