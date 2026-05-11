import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: 'tsconfig.app.json',
      include: ['src'],
      exclude: ['src/demo.tsx']
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SonGrim',
      fileName: (format) => (format === 'es' ? 'songrim.js' : 'songrim.cjs'),
      formats: ['es', 'cjs']
    },
    sourcemap: true,
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React',
        },
      },
    }
  }
});
