import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Ensures relative paths for assets, compatible with GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
