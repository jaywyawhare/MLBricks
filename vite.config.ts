import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable compression and minification
    minify: 'esbuild',
    cssMinify: true,
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-select', '@radix-ui/react-switch'],
          flow: ['reactflow', '@reactflow/core', '@reactflow/background', '@reactflow/controls', '@reactflow/minimap'],
        }
      }
    },
    // Enable source maps for debugging but exclude from production
    sourcemap: false,
    // Optimize assets
    assetsInlineLimit: 4096,
  },
  // Enable compression in preview mode
  preview: {
    headers: {
      'Content-Encoding': 'gzip',
      'Cache-Control': 'public, max-age=31536000',
    }
  }
})
