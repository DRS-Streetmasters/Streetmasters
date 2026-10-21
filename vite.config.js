import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const previewBranch = ['staging', 'dev'].includes(process.env.CF_PAGES_BRANCH)
  const launchGate = env.VITE_LAUNCH_GATE ?? (previewBranch || mode !== 'production' ? 'false' : 'true')
  return {
    base: env.VITE_BASE_PATH || '/',
    define: { 'import.meta.env.VITE_LAUNCH_GATE': JSON.stringify(launchGate) },
    plugins: [vue(), tailwindcss(), ...(command === 'serve' ? [vueDevTools()] : [])],
  }
})
