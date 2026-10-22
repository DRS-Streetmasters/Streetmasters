import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

// Replay the audited URL inventory with the same Lighthouse version and mobile settings.
// Usage: node scripts/audit-lighthouse.mjs after http://127.0.0.1:4173
const [phase = 'before', base = 'https://streetmasters.be'] = process.argv.slice(2)
if (!/^[a-z-]+$/.test(phase)) throw new Error('Use a simple report directory name')
const directory = `docs/lighthouse/${phase}`
mkdirSync(directory, { recursive: true })
const paths = JSON.parse(readFileSync('docs/lighthouse/urls.json', 'utf8'))
for (const path of paths) {
  const name = path === '/' ? 'launch' : path === '/dikkeseppe/' ? 'home' : path.replace('/dikkeseppe/', '').replaceAll('/', '--')
  const output = `${directory}/${name}`
  if (existsSync(`${output}.report.json`)) continue
  const result = spawnSync('npx', ['--yes', 'lighthouse@13.5.0', new URL(path, base).href,
    '--chrome-flags=--headless', '--only-categories=performance,accessibility,best-practices,seo',
    '--output=json', '--output=html', `--output-path=${output}`, '--quiet'], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`Lighthouse failed: ${path}`)
  console.log(`${phase}: ${path}`)
}
