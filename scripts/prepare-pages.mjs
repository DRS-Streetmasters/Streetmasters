import { copyFile, writeFile } from 'node:fs/promises'

// GitHub Pages has no SPA rewrites. Its custom 404 still boots Vue on deep links.
await copyFile('dist/index.html', 'dist/404.html')
await writeFile('dist/.nojekyll', '')
