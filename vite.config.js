import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escucha en todas las interfaces
    port: 5173, // Asegúrate que coincide con tu puerto local
    strictPort: true,
    allowedHosts: [
      '9142-2800-484-8c80-6000-4439-fae7-9321-46bc.ngrok-free.app',
      'localhost' // Mantén acceso local
    ],
    proxy: {
      '/api': {
        target: 'https://chateapro.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});