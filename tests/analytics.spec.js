import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-01T12:00:00+01:00'))
  // Never send test events to the production analytics endpoint.
  await page.route('https://plausible.driesbielen.be/**', route => route.fulfill({ contentType: 'application/javascript', body: '' }))
  await page.addInitScript(() => {
    window.analyticsEvents = []
    window.plausible = (name, options) => window.analyticsEvents.push({ name, ...options })
  })
})

const events = page => page.evaluate(() => window.analyticsEvents)

test('navigation and stopped-propagation language buttons emit once, without private URL parameters', async ({ page }) => {
  await page.goto('/about?email=private@example.com#private-token')
  await page.locator('[data-analytics-click="Navigation: Language Menu"]').first().click()
  await expect.poll(async () => (await events(page)).filter(e => e.name === 'Navigation: Language Menu').length).toBe(1)
  await page.locator('[data-analytics-click="Navigation: Change Language"][data-analytics-item="en"]').first().click()
  await page.locator('nav [data-analytics-click="Navigation: Services"]').click()
  await expect(page).toHaveURL('/diensten')
  const recorded = await events(page)
  expect(recorded.filter(e => e.name === 'Navigation: Change Language')).toHaveLength(1)
  expect(recorded.find(e => e.name === 'Navigation: Change Language').props.item).toBe('en')
  expect(recorded.find(e => e.name === 'Navigation: Services').props.language).toBe('en')
  expect(JSON.stringify(recorded)).not.toMatch(/private@example|private-token/)
})

test('forms track focus, selections and submission without collecting entered values', async ({ page }) => {
  await page.route('**/*', route => route.request().method() === 'POST' ? route.fulfill({ json: {} }) : route.fallback())
  await page.goto('/offerte')
  await page.locator('input[name="name"]').fill('PRIVATE CUSTOMER NAME')
  await page.locator('input[name="email"]').fill('private@example.com')
  await page.locator('input[name="brand_model"]').fill('PRIVATE VEHICLE')
  const service = page.locator('input[name="services"]').first()
  await service.evaluate(element => element.click())
  await page.locator('form[data-analytics-submit]').evaluate(form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })))
  const recorded = await events(page)
  expect(recorded.some(e => e.name === 'Quote: Name Focused')).toBe(true)
  expect(recorded.filter(e => e.name === 'Quote: Services Changed')).toHaveLength(1)
  expect(recorded.filter(e => e.name === 'Quote: Form Submitted')).toHaveLength(1)
  expect(JSON.stringify(recorded)).not.toMatch(/PRIVATE|private@example/)
})

test('select changes via keyboard are recorded once, analytics failures never block navigation', async ({ page }) => {
  await page.goto('/shop')
  const sort = page.getByRole('combobox', { name: /Sorteren/ })
  await sort.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('End')
  await page.keyboard.press('Enter')
  await expect.poll(async () => (await events(page)).filter(e => e.name === 'Select: Changed').length).toBe(1)
  expect((await events(page)).find(e => e.name === 'Select: Changed').props.field).toContain('sort')
  await page.evaluate(() => { window.plausible = () => { throw new Error('Blocked analytics') } })
  await page.locator('nav [data-analytics-click="Navigation: About"]').click()
  await expect(page).toHaveURL('/about')
})

test('Plausible configuration disables duplicate automatic events and strips sensitive URLs', async ({ page }) => {
  await page.goto('/about')
  const config = await page.evaluate(() => {
    const options = window.plausible.o
    return {
      outbound: options.outboundLinks,
      forms: options.formSubmissions,
      downloads: options.fileDownloads,
      payload: options.transformRequest({ n: 'pageview', u: 'https://streetmasters.be/account/callback?code=secret#token', r: 'https://example.com/?email=private@example.com' }),
    }
  })
  expect(config).toEqual({ outbound: false, forms: false, downloads: false, payload: { n: 'pageview', u: 'https://streetmasters.be/account/callback', r: 'https://example.com/' } })
  await expect(page.locator(`script[src="https://plausible.driesbielen.be/js/pa-9vfdncuI4xvmXvTOW7q8_.js"]`)).toHaveCount(1)
})
