import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react', 'react', 'react-dom', '@supabase/supabase-js']
  },
  build: {
    chunkSizeWarningLimit: 1600,
    commonjsOptions: {
      include: [/lucide-react/, /node_modules/]
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
