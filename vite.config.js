import { defineConfig } from 'vite'
import path from 'path'
import checker from 'vite-plugin-checker'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,vue}"',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
