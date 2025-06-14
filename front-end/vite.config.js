// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://probable-space-lamp-4j79g7rpg946h57ww-5173.app.github.dev',
        changeOrigin: true,
      }
    },
  }
});
