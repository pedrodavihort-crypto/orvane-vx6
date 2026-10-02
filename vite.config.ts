import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // GSAP + Lenis em um chunk próprio: cache longo, independente do código da página
        manualChunks: { motion: ['gsap', 'gsap/ScrollTrigger', 'lenis'] },
      },
    },
  },
});
