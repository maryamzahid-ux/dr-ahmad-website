import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        trading: resolve(__dirname, 'trading-services.html'),
        hygiene: resolve(__dirname, 'hygiene-services.html'),
        engineering: resolve(__dirname, 'engineering-services.html'),
      },
    },
  },
})
