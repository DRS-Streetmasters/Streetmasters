import { defineConfig } from '@playwright/test'

const modes = ['development', 'staging', 'production', 'cloudflare-preview', 'cloudflare-staging', 'cloudflare-dev']
export default defineConfig({
  testDir: './tests',
  testMatch: 'environments.spec.js',
  use: { locale: 'nl-BE' },
  projects: modes.map((name, index) => ({ name, use: { baseURL: `http://127.0.0.1:${4180 + index}` } })),
  webServer: modes.map((mode, index) => ({
    command: `npx vite build --mode ${mode.startsWith('cloudflare-') ? 'production' : mode} --outDir dist-${mode} && npx vite preview --outDir dist-${mode} --host 127.0.0.1 --port ${4180 + index} --strictPort`,
    env: mode === 'cloudflare-preview' ? { VITE_LAUNCH_GATE: 'false' } :
      mode.startsWith('cloudflare-') ? { CF_PAGES_BRANCH: mode.slice('cloudflare-'.length) } : {},
    url: `http://127.0.0.1:${4180 + index}`,
    reuseExistingServer: false,
    timeout: 120000,
  })),
})
