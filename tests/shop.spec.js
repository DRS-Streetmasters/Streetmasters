import { test, expect } from '@playwright/test'

// Existing site behavior is tested once the public launch gate has opened.
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-01T12:00:00+01:00'))
})

// Public catalog reads and temporary carts only. These tests never place orders.
test('live catalog, product, persistent cart, quantities, discounts and checkout handoff', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/shop?stock=1')
  await expect(page.locator('main a[href^="/shop/"] h2').first()).toBeVisible()
  await page.locator('main a[href^="/shop/"]').first().click()
  await expect(page.getByRole('button', { name: 'In winkelmand', exact: true })).toBeEnabled()
  await page.getByRole('button', { name: 'In winkelmand', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Toegevoegd')
  await expect(page.locator('nav a[href="/winkelmand"]')).toHaveAttribute('aria-label', 'Winkelmand (1)')
  await page.getByRole('link', { name: 'Naar winkelmand', exact: true }).click()
  await expect(page.locator('main article')).toHaveCount(1)
  await page.reload()
  await expect(page.locator('main article')).toHaveCount(1)
  await page.getByRole('button', { name: /Aantal \+/ }).click()
  await expect(page.locator('main h1')).toContainText('(2)')
  await page.getByLabel('Kortingscode').fill('STREETMASTERS-INTEGRATION-TEST-INVALID')
  await page.getByRole('button', { name: 'Toepassen' }).click()
  await expect(page.getByRole('status')).toContainText('niet geldig')
  await page.getByLabel('Opmerking bij je bestelling').fill('Integration test cart — no order')
  await page.getByRole('button', { name: 'Opmerking opslaan' }).click()
  await expect(page.getByText('Opgeslagen.', { exact: true })).toBeVisible()
  let checkoutUrl
  await page.route('https://shop.streetmasters.be/**', route => { checkoutUrl = route.request().url(); route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Checkout intercepted</title>' }) })
  await page.getByRole('button', { name: 'Veilig afrekenen', exact: true }).click()
  await expect.poll(() => checkoutUrl).toBeTruthy()
  expect(new URL(checkoutUrl).protocol).toBe('https:')
  // Wait for the intercepted navigation to commit before returning to the app.
  await expect(page).toHaveTitle('Checkout intercepted')
  // Return to the app and empty the test cart.
  await page.goto('/winkelmand')
  await page.locator('article').getByRole('button', { name: 'Verwijderen' }).click()
  await expect(page.getByText('Je winkelmand staat nog in de garage.')).toBeVisible()
  expect(errors).toEqual([])
})

test('search, collection and sorting use real Shopify results', async ({ page }) => {
  await page.goto('/shop')
  await page.getByLabel('Zoek een product').fill('Nos')
  await page.getByRole('button', { name: 'Zoeken', exact: true }).click()
  await expect(page).toHaveURL(/q=Nos/)
  await expect(page.locator('main a[href^="/shop/"] h2').first()).toContainText(/Nos/i)
  await page.getByRole('combobox', { name: /Collectie/ }).click()
  await page.getByRole('option', { name: 'Zena', exact: true }).click()
  await expect(page.locator('main a[href^="/shop/"] h2').first()).toContainText(/Zena/i)
  await page.getByRole('combobox', { name: /Sorteren/ }).click()
  await page.getByRole('option', { name: 'Prijs: laag naar hoog', exact: true }).click()
  await expect(page).toHaveURL(/sort=priceAsc/)
  await expect(page.getByRole('alert')).toHaveCount(0)
  await page.getByLabel('Zoek een product').fill('no-such-product-streetmasters-999999')
  await page.getByRole('button', { name: 'Zoeken', exact: true }).click()
  await expect(page.getByText('Geen producten gevonden.', { exact: true })).toBeVisible()
})

test('mobile navigation and all public screens fit the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  for (const path of ['/', '/shop', '/winkelmand', '/account', '/account/callback', '/not-found-test']) {
    await page.goto(path)
    await expect(page.locator('a[href*="/account"]')).toHaveCount(0)
    await expect(page.locator('nav a[href="/winkelmand"]')).toBeVisible()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
  await page.getByRole('button', { name: 'Home menu' }).click()
  await expect(page.locator('#mobile-menu-overlay a[href="/shop"]')).toBeVisible()
  await page.locator('#mobile-menu-overlay a[href="/shop"]').click()
  await expect(page).toHaveURL(/\/shop$/)
})

test('connection failures show recoverable errors', async ({ page }) => {
  await page.route('**/api/2026-07/graphql.json', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }))
  await page.goto('/shop')
  await expect(page.getByRole('alert')).toContainText('verbinding')
  await expect(page.locator('#shop-products').getByRole('button', { name: 'Opnieuw proberen' })).toBeVisible()

})


test('shared heroes have working scroll cues and dropdown keyboard controls', async ({ page }) => {
  for (const path of ['/', '/shop', '/diensten', '/portfolio', '/about', '/offerte']) {
    await page.goto(path)
    const cue = page.getByRole('link', { name: 'Scroll en ontdek meer' })
    await expect(cue).toBeVisible()
    const href = await cue.getAttribute('href')
    await expect(page.locator(href)).toHaveCount(1)
    await cue.click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100)
  }
  await page.goto('/shop')
  const select = page.getByRole('combobox', { name: /Sorteren/ })
  await select.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('End')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/sort=title/)
  await expect(select).toHaveAttribute('aria-expanded', 'false')
  await select.click()
  await page.keyboard.press('Escape')
  await expect(select).toHaveAttribute('aria-expanded', 'false')
})

test('heroes fill the viewport and mobile filter sheet preserves catalog position', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 375, height: 812 }]) {
    await page.setViewportSize(viewport)
    for (const path of ['/', '/shop', '/diensten', '/portfolio', '/about', '/offerte']) {
      await page.goto(path)
      const hero = page.locator('[data-page-hero]')
      await expect(hero).toBeVisible()
      const bounds = await hero.boundingBox()
      expect(bounds.y).toBe(0)
      expect(bounds.height).toBeGreaterThanOrEqual(viewport.height)
    }
  }
  await page.goto('/shop')
  await page.locator('#shop-products').scrollIntoViewIfNeeded()
  const trigger = page.getByRole('button', { name: 'Filters', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Filters', exact: true })
  await expect(dialog).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden')
  await dialog.getByRole('combobox', { name: /Collectie/ }).click()
  await dialog.getByRole('option', { name: 'Zena', exact: true }).click()
  await dialog.getByRole('switch', { name: 'Alleen op voorraad' }).check()
  await dialog.getByRole('button', { name: 'Toon producten' }).click()
  await expect(dialog).not.toBeVisible()
  await expect(page).toHaveURL(/collection=zena.*stock=1/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)
  await expect(page.locator('main a[href^="/shop/"] h2').first()).toContainText(/Zena/i)
  await expect(page.getByRole('button', { name: /Filters/ })).toBeFocused()
  await page.getByRole('button', { name: /Filters/ }).click()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('')
  await page.getByRole('button', { name: /Filters/ }).click()
  await page.setViewportSize({ width: 1440, height: 1000 })
  await expect(dialog).not.toBeVisible()
  await expect(page.getByRole('complementary', { name: 'Filters' })).toBeVisible()
})
