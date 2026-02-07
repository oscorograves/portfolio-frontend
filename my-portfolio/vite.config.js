import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Use esbuild for faster builds with good minification
    minify: 'esbuild',
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Optimize CSS
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Smart chunk splitting based on usage patterns
        manualChunks(id) {
          // Node modules handling
          if (id.includes('node_modules')) {
            // Critical path: React core (needed immediately)
            if (id.includes('react-dom') || id.includes('/react/')) {
              return 'react-core';
            }
            // Router: Only needed for navigation
            if (id.includes('react-router')) {
              return 'router';
            }
            // Animations: Can be deferred slightly
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            // i18n: Load with initial bundle (needed for text)
            if (id.includes('i18next')) {
              return 'i18n';
            }
            // Icons: Split separately (large)
            if (id.includes('phosphor-react')) {
              return 'icons';
            }
            // Counter animations
            if (id.includes('react-countup')) {
              return 'counter';
            }
            // Remotion: Only load on Creative Lab page
            if (id.includes('remotion') || id.includes('@remotion')) {
              return 'remotion';
            }
            // Other vendor libs
            return 'vendor';
          }
          // Split page components by route
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1]?.split('.')[0]?.split('/')[0];
            if (pageName && pageName !== 'Home') {
              return `page-${pageName.toLowerCase()}`;
            }
          }
          // Split animation components (can defer after FCP)
          if (id.includes('/animations/')) {
            return 'app-animations';
          }
        },
        // Optimize chunk file names for better caching
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk';
          return `assets/${name}-[hash].js`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      // Tree-shake more aggressively
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
      },
    },
    // Smaller chunk warning limit
    chunkSizeWarningLimit: 100,
    // Enable better compression for Render
    reportCompressedSize: true,
  },
  // Optimize dependencies for faster dev and better bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'i18next', 'react-i18next'],
    exclude: ['remotion', '@remotion/player', '@remotion/cli'], // Lazy loaded
  },
  // Enable faster startup
  esbuild: {
    // Remove legal comments to reduce size
    legalComments: 'none',
  },
})
