import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'app.app1.test',
    port: 8080,
    watch: {
      usePolling: true
    }
  },
  lintOnSave: false,
  base: './'
})
