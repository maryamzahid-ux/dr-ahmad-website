import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        trading: resolve(__dirname, 'trading-services.html'),
        advertising: resolve(__dirname, 'advertising-services.html'),
        signs: resolve(__dirname, 'signs-services.html'),
        publishing: resolve(__dirname, 'publishing-services.html'),
      },
    },
  },
})
