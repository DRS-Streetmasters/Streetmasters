// Launch: 1 November 2026 at noon in Belgium (CET, UTC+1).
export const launchAt = Date.parse('2026-11-01T12:00:00+01:00')
const base = import.meta.env.BASE_URL
const previewBase = `${base}dikkeseppe`
const path = window.location.pathname
export const isPreview = path === previewBase || path.startsWith(`${previewBase}/`)
// Preview builds are also optimized builds: PROD alone cannot identify staging.
export const launchGateEnabled = import.meta.env.VITE_LAUNCH_GATE === 'true'
export const beforeLaunch = launchGateEnabled && Date.now() < launchAt
export const routerBase = beforeLaunch && isPreview ? `${previewBase}/` : base

export function openLaunchedSite() {
  const path = isPreview ? window.location.pathname.slice(previewBase.length).replace(/^\//, '') : window.location.pathname.slice(base.length)
  window.location.replace(`${base}${path}${window.location.search}${window.location.hash}`)
}

// Keep existing preview bookmarks useful, but retire the prefix at launch.
if (!beforeLaunch && isPreview) {
  window.history.replaceState(window.history.state, '', `${base}${path.slice(previewBase.length).replace(/^\//, '')}${window.location.search}${window.location.hash}`)
}
