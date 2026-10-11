import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: loadEnv(mode, process.cwd()).VITE_BASE_PATH || '/',
  plugins: [vue(), tailwindcss(), ...(command === 'serve' ? [vueDevTools()] : [])],
}))
