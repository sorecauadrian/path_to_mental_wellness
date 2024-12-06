import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import environmet from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    react(), 
    environmet('all', {prefix: 'VITE_'})
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
