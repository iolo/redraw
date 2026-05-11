import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: 'tsconfig.app.json',
      include: ['src/demo.tsx'],
    })
  ],
  base: './', // relative path for github pages-
  build: {
    outDir: 'dist/app',
    assetsDir: 'assets', // relative path for github pages
  }
});
