// Belgium is still on summer time (UTC+2) on 24 October 2026.
export const launchAt = Date.parse('2026-10-24T12:00:00+02:00')
const base = import.meta.env.BASE_URL
const previewBase = `${base}dikkeseppe`
const path = window.location.pathname
export const isPreview = path === previewBase || path.startsWith(`${previewBase}/`)
export const beforeLaunch = Date.now() < launchAt
export const routerBase = beforeLaunch && isPreview ? `${previewBase}/` : base

export function openLaunchedSite() {
  const path = isPreview ? window.location.pathname.slice(previewBase.length).replace(/^\//, '') : window.location.pathname.slice(base.length)
  window.location.replace(`${base}${path}${window.location.search}${window.location.hash}`)
}

// Keep existing preview bookmarks useful, but retire the prefix at launch.
if (!beforeLaunch && isPreview) {
  window.history.replaceState(window.history.state, '', `${base}${path.slice(previewBase.length).replace(/^\//, '')}${window.location.search}${window.location.hash}`)
}

// Shopify returns to its registered callback URL, outside the preview base.
if (beforeLaunch && path === `${base}account/callback` && sessionStorage.getItem('streetmasters-customer-login')) {
  window.location.replace(`${previewBase}/account/callback${window.location.search}${window.location.hash}`)
}
