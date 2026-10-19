import { test, expect } from '@playwright/test'

const before = new Date('2026-10-24T11:59:50+02:00')
const after = new Date('2026-10-24T12:00:00+02:00')

test('public deep links show the countdown without navigation, also on mobile', async ({ page }) => {
  await page.clock.setFixedTime(before)
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/shop/example?collection=zena')
  await expect(page.getByRole('heading', { name: 'Klaar voor de start?' })).toBeVisible()
  await expect(page.locator('nav')).toHaveCount(0)
  await expect(page.locator('dd')).toHaveText(['00', '00', '00', '10'])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: 'test-results/launch-mobile.png', fullPage: true })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.screenshot({ path: 'test-results/launch-desktop.png', fullPage: true })
})

test('preview links, refresh, history and unknown routes stay under the prefix', async ({ page }) => {
  await page.clock.setFixedTime(before)
  await page.goto('/dikkeseppe/diensten')
  await expect(page.locator('nav a[href="/dikkeseppe/about"]')).toBeVisible()
  await page.locator('nav a[href="/dikkeseppe/about"]').click()
  await expect(page).toHaveURL(/\/dikkeseppe\/about$/)
  await page.reload()
  await expect(page.locator('nav')).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(/\/dikkeseppe\/diensten$/)
  await page.goto('/dikkeseppe/unknown')
  await expect(page.locator('main a[href="/dikkeseppe/"]')).toBeVisible()
  await page.goto('/dikkeseppe-other')
  await expect(page.getByRole('heading', { name: 'Klaar voor de start?' })).toBeVisible()
})

test('at launch normal routes work and old preview URLs preserve query and hash', async ({ page }) => {
  await page.clock.setFixedTime(after)
  await page.goto('/dikkeseppe/about?source=preview#team')
  await expect(page).toHaveURL('/about?source=preview#team')
  await expect(page.locator('nav a[href="/diensten"]')).toBeVisible()
  await page.goto('/diensten')
  await expect(page.locator('nav')).toBeVisible()
})

for (const path of ['/about', '/dikkeseppe/about']) {
  test(`an open ${path} switches automatically at launch`, async ({ page }) => {
    await page.clock.install({ time: before })
    await page.goto(path)
    await page.clock.fastForward(11000)
    await expect(page).toHaveURL('/about')
    await expect(page.locator('nav a[href="/diensten"]')).toBeVisible()
  })
}
