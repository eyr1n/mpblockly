import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';

export default {
  base: './',
  build: {
    outDir: 'dist-vite',
  },
  plugins: [react(), tailwindcss()],
} satisfies UserConfig;
