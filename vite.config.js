import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core (react + react-dom + scheduler)
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) {
            return 'vendor-react'
          }
          // R3F ecosystem (drei, fiber, postprocessing, and all their transitive deps)
          if (
            id.includes('node_modules/@react-three') ||
            id.includes('node_modules/postprocessing') ||
            id.includes('node_modules/three-stdlib') ||
            id.includes('node_modules/troika') ||
            id.includes('node_modules/maath') ||
            id.includes('node_modules/meshline') ||
            id.includes('node_modules/camera-controls') ||
            id.includes('node_modules/detect-gpu') ||
            id.includes('node_modules/three-mesh-bvh') ||
            id.includes('node_modules/suspend-react') ||
            id.includes('node_modules/its-fine') ||
            id.includes('node_modules/tunnel-rat') ||
            id.includes('node_modules/stats-gl') ||
            id.includes('node_modules/stats.js') ||
            id.includes('node_modules/@monogrid') ||
            id.includes('node_modules/n8ao') ||
            id.includes('node_modules/zustand') ||
            id.includes('node_modules/@use-gesture') ||
            id.includes('node_modules/react-use-measure') ||
            id.includes('node_modules/use-sync-external-store')
          ) {
            return 'vendor-r3f'
          }
          // Three.js core
          if (id.includes('node_modules/three/')) {
            return 'vendor-three'
          }
          // GSAP + all plugins
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
            return 'vendor-gsap'
          }
        },
      },
    },
  },
})
