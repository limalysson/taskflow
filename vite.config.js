import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Expõe na rede local para facilitar acesso pelo celular
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
});
