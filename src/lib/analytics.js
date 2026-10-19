// Explicit labels only: never collect DOM text, field values, search terms or account URLs.
export function trackEvent(name, props = {}) {
  try {
    window.plausible?.(name, {
      url: `${window.location.origin}${window.location.pathname}`,
      props: { language: document.documentElement.lang, ...props },
    })
  } catch { /* Analytics must never interrupt navigation or form actions. */ }
}

export function installAnalytics() {
  const controller = new AbortController()
  function record(event, kind) {
    if (!(event.target instanceof Element)) return
    const element = event.target.closest(`[data-analytics-${kind}]${kind === 'click' ? ', a, button, summary' : ''}`)
    if (!element || element.closest(':disabled, [aria-disabled="true"], [inert]')) return
    if (kind === 'click' && event.type === 'auxclick' && event.button !== 1) return
    const name = element.getAttribute(`data-analytics-${kind}`) || `Content: ${element.tagName === 'A' ? 'Link' : 'Button'}`
    const props = { location: element.closest('#mobile-menu-overlay') ? 'mobile menu' : element.closest('nav') ? 'navigation' : element.closest('footer') ? 'footer' : element.closest('section[id]')?.id || 'page' }
    if (element.dataset.analyticsItem) props.item = element.dataset.analyticsItem
    if (kind === 'change' && ['checkbox', 'radio'].includes(element.type)) props.checked = element.checked
    trackEvent(name, props)
  }
  for (const [event, kind] of [['click', 'click'], ['auxclick', 'click'], ['submit', 'submit'], ['change', 'change'], ['focusin', 'focus']]) {
    document.addEventListener(event, event => record(event, kind), { capture: true, signal: controller.signal })
  }
  return () => controller.abort()
}
