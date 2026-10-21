# Launch configuration and Cloudflare Pages

`src/lib/launch.js` controls the launch screen, router base, launch timer,
legacy preview bookmarks and Shopify callback redirect together.

| Environment | Command | Default launch gate |
| --- | --- | --- |
| Local development | `npm run dev` | Off |
| Development build | `npm run build:development` | Off |
| Staging build | `npm run build:staging` | Off |
| Production build | `npm run build` | On |
| Existing GitHub Pages build | `npm run build:pages` | On (unchanged) |

`VITE_LAUNCH_GATE=true` explicitly enables the gate; `false` disables it.
When unset, Cloudflare branches `dev` and `staging` automatically disable it
using the build-time `CF_PAGES_BRANCH` variable, even with `npm run build`.
Otherwise only Vite mode `production` enables it. These are strings,
and the value is baked into the build, so changes require a new deployment.
An optimized preview build still has `import.meta.env.PROD=true`; do not
use that value to distinguish staging from production.

When enabled, production retains the countdown until 1 November 2026,
12:00 Europe/Brussels, the `/dikkeseppe` bypass and the automatic switch
at launch. When disabled, the full site uses ordinary routes immediately,
no launch interval is registered, and Shopify callbacks stay at
`/account/callback`. Old `/dikkeseppe` bookmarks normalize to ordinary
URLs, preserving query strings and fragments.

## Cloudflare Pages Git integration settings

Connect `DRS-Streetmasters/Streetmasters`, with the repository root as root
directory, `main` as production branch, build command `npm run build`, and
output directory `dist`. Use Node.js 24 (`NODE_VERSION=24`). Enable preview
deployments for `staging` (and `dev` if desired).

Set these build environment variables separately in the Pages dashboard:

| Variable | Production | Preview |
| --- | --- | --- |
| `VITE_LAUNCH_GATE` | `true` | `false` |
| `VITE_BASE_PATH` | `/` | `/` |
| `NODE_VERSION` | `24` | `24` |

This lets both scopes use `npm run build`; Preview explicitly overrides the
production-mode default. The `dev` and `staging` branches also work without
this explicit override, using Cloudflare's injected branch name. An explicit
`VITE_LAUNCH_GATE=true` still takes priority; remove it from Preview or set it
to `false`. For a separate staging Pages project, also set
`VITE_LAUNCH_GATE=false` in that project's **Production** scope, or use
`npm run build:staging` if its branch has a different name.

Copy the required public Formspree/Shopify settings from `.env.example` to
both scopes as appropriate. Never put private Shopify credentials or
Cloudflare tokens into `VITE_*`: these variables are visible to visitors.
OAuth functionality also requires the staging callback URL to be registered
with the identity provider; disabling the launch gate does not register it.

`public/_redirects` already rewrites deep links to `/index.html` with status
200. Vite copies it to `dist`; do not run the GitHub Pages preparation script
for Cloudflare. No new deploy workflow is necessary with Pages Git integration.
The existing `deploy`, `predeploy`, `build:pages`, DNS and GitHub Pages settings
are unchanged. Do not merge or deploy this change to production just to test staging.

## Verification

Run `npm ci`, `npm run test:environments` and `npm test -- tests/launch.spec.js`.
The environment suite builds development, staging and production artifacts,
plus a production-mode build with `VITE_LAUNCH_GATE=false` for Cloudflare Preview,
and production-mode builds with `CF_PAGES_BRANCH=staging` and `dev`,
and serves each with Vite preview. It checks ordinary deep links, refresh,
navigation/history, legacy bookmarks, not-found routes and the callback path.
The existing launch suite runs against production mode and checks countdown,
mobile layout, bypass routing and automatic launch transitions.

The default existing test server deliberately uses production mode because
the existing regression suites exercise `/dikkeseppe` and launch behavior.
Stop any previously running server on port 4173 before running that suite.

Sources: [Vite environment variables and modes](https://vite.dev/guide/env-and-mode),
[Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).
