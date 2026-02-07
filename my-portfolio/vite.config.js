import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React (changes rarely)
          'vendor-react': ['react', 'react-dom'],
          // Router (changes rarely)
          'vendor-router': ['react-router-dom'],
          // Animations (large bundle)
          'vendor-animations': ['framer-motion'],
          // i18n (internationalization)
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-http-backend', 'i18next-browser-languagedetector'],
          // Icons and counters
          'vendor-ui': ['phosphor-react', 'react-countup'],
          // Remotion (very large, rarely changes)
          'vendor-remotion': ['remotion', '@remotion/player', '@remotion/cli'],
        },
      },
    },
    // Increase chunk warning limit for lazy-loaded pages
    chunkSizeWarningLimit: 600,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})
