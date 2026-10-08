import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Streetmasters/' : '/',
  plugins: [vue(), tailwindcss(), ...(command === 'serve' ? [vueDevTools()] : [])],
}))
