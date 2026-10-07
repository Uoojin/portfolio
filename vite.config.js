import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // ASCII output names avoid macOS/Git Unicode normalization mismatches.
        assetFileNames: 'assets/[hash][extname]',
      },
    },
  },
})
