import { defineConfig } from 'vite';

export default defineConfig({
  base: '/taskflow/',
  server: {
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
});
