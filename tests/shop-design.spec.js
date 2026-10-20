import { test, expect } from '@playwright/test'

test('new category tiles stay informational until their Shopify collections exist', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-01T12:00:00+01:00'))
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  let published = false
  await page.route('**/api/2026-07/graphql.json', async route => {
    const { query } = route.request().postDataJSON()
    if (query.includes('query Collections(')) return route.fulfill({ json: { data: { collections: { nodes: published ? [{ id: 'detailing-tools', handle: 'detailing-tools', title: 'Detailing tools' }] : [] } } } })
    if (query.includes('query Catalog(')) return route.fulfill({ json: { data: { products: { nodes: [], pageInfo: {} }, collection: { products: { nodes: [], pageInfo: {} } } } } })
    return route.fulfill({ json: { data: { collections: { nodes: [] } } } })
  })
  await page.goto('/shop')
  const categories = page.getByRole('region', { name: 'Ontdek onze categorieën' })
  await expect(categories.getByRole('article')).toHaveCount(5)
  for (const title of ['Aanbiedingen', 'Detailing tools', 'Wrapping tools', 'Autogeurtjes', 'Accessoires']) await expect(categories.getByRole('heading', { name: title, exact: true })).toBeVisible()
  await expect(categories.getByText('Binnenkort', { exact: true })).toHaveCount(5)
  await expect(categories.getByRole('link')).toHaveCount(0)
  await page.screenshot({ path: '/tmp/streetmasters-shop-desktop.png', fullPage: true })
  await page.setViewportSize({ width: 375, height: 812 })
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: '/tmp/streetmasters-shop-mobile.png', fullPage: true })
  published = true
  await page.reload()
  await categories.getByRole('link', { name: /Detailing/ }).click()
  await expect(page).toHaveURL(/collection=detailing-tools#shop-products/)
  await expect(categories.getByText('Binnenkort', { exact: true })).toHaveCount(4)
  expect(errors).toEqual([])
})
