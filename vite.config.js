// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/mix-fibra/', // este caminho é FUNDAMENTAL
  plugins: [react()],
})
