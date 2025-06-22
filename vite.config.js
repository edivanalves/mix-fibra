// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mix-fibra/', // Caminho base necessário para deploy (ex: GitHub Pages)
  plugins: [react()],
})
