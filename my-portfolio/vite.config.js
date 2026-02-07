import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Use esbuild for faster builds
    minify: 'esbuild',
    // Target modern browsers
    target: 'es2020',
    // Optimize CSS
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Simple, reliable manual chunks - avoid complex functions that can break imports
        manualChunks: {
          // Core React bundle
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Animation library
          'framer': ['framer-motion'],
          // i18n bundle
          'i18n': ['i18next', 'react-i18next', 'i18next-http-backend', 'i18next-browser-languagedetector'],
          // UI libraries
          'ui-libs': ['phosphor-react', 'react-countup'],
        },
      },
    },
    // Standard chunk warning
    chunkSizeWarningLimit: 500,
  },
  // Pre-bundle dependencies for faster dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'i18next', 'react-i18next'],
  },
})

