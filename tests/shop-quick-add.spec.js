import { test, expect } from '@playwright/test'

test('catalog quick add updates the real cart without leaving the shop', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-01T12:00:00+01:00'))
  await page.goto('/shop?stock=1')
  const card = page.locator('#shop-products article').filter({ has: page.getByRole('button', { name: /^In winkelmand:/ }) }).first()
  await expect(card).toBeVisible()
  const title = await card.locator('h2').innerText()
  await card.getByRole('button', { name: /^In winkelmand:/ }).click()
  await expect(card.getByRole('status')).toContainText('Toegevoegd')
  await expect(page).toHaveURL(/\/shop\?stock=1$/)
  await expect(page.locator('nav a[href="/winkelmand"]')).toHaveAttribute('aria-label', 'Winkelmand (1)')
  await card.getByRole('link', { name: 'Naar winkelmand' }).click()
  await expect(page).toHaveURL(/\/winkelmand$/)
  await expect(page.locator('main article')).toContainText(title)
  await page.locator('article').getByRole('button', { name: 'Verwijderen' }).click()
  await expect(page.getByText('Je winkelmand staat nog in de garage.')).toBeVisible()
})

test('multiple variants require a choice and sold-out products cannot be added', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-01T12:00:00+01:00'))
  const price = { amount: '20', currencyCode: 'EUR' }
  const product = { id: 'multi', handle: 'multi', title: 'Two sizes', availableForSale: true, priceRange: { minVariantPrice: price }, compareAtPriceRange: { minVariantPrice: price }, quickVariants: { nodes: [{ id: 'small', availableForSale: true, price }, { id: 'large', availableForSale: true, price }] } }
  await page.route('**/api/2026-07/graphql.json', route => route.fulfill({ json: { data: { collections: { nodes: [] }, products: { nodes: [product, { ...product, id: 'sold', handle: 'sold', title: 'Sold out', availableForSale: false }], pageInfo: {} } } } }))
  await page.goto('/shop')
  const cards = page.locator('#shop-products article')
  await expect(cards.first().getByRole('link', { name: /Kies uitvoering/ })).toHaveAttribute('href', '/shop/multi')
  await expect(cards.first().getByRole('button')).toHaveCount(0)
  await expect(cards.last().getByRole('button')).toBeDisabled()
})
