import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// Public Google Tag Manager containers per environment (IDs are visible to visitors anyway).
const GTM_IDS = { main: 'GTM-N4CNBVMS', staging: 'GTM-PCFGCMD3' }

// Replaces <!--GTM--> in index.html with the container for this build, or nothing (dev, local).
function gtmPlugin(id) {
  const snippet = id ? `<!-- Google Tag Manager -->
    <script async src="https://www.googletagmanager.com/gtm.js?id=${id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    </script>` : ''
  return { name: 'gtm', transformIndexHtml: html => html.replace('<!--GTM-->', snippet) }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  // Cloudflare injects CF_PAGES_BRANCH; a local production build without it counts as production.
  const branch = process.env.CF_PAGES_BRANCH || (command === 'build' && mode === 'production' ? 'main' : '')
  const gtmId = env.VITE_GTM_ID ?? GTM_IDS[branch] ?? ''
  const previewBranch = ['staging', 'dev'].includes(process.env.CF_PAGES_BRANCH)
  const launchGate = env.VITE_LAUNCH_GATE ?? (previewBranch || mode !== 'production' ? 'false' : 'true')
  return {
    base: env.VITE_BASE_PATH || '/',
    define: { 'import.meta.env.VITE_LAUNCH_GATE': JSON.stringify(launchGate) },
    plugins: [gtmPlugin(gtmId), vue(),tailwindcss(), ...(command === 'serve' ? [vueDevTools()] : [])],
  }
})
