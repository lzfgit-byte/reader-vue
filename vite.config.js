import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import vue, { log } from '@vitejs/plugin-vue';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '~@': resolve(__dirname, './src'),
        },
    },
    plugins: [vue()],
    server: {
        host: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080/',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
