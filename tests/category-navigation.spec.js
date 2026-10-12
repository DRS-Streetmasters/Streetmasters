import { test, expect } from '@playwright/test'

for (const origin of ['/', '/diensten']) {
  test(`category navigation from ${origin} scrolls below the fixed header`, async ({ page }) => {
    await page.goto(origin)
    await page.locator('nav a[href="/shop"]').hover()
    await page.locator('#desktop-shop-categories').getByRole('link', { name: 'Zena', exact: false }).click()
    await expect(page).toHaveURL(/\/shop\?collection=zena#shop-products$/)
    await expect.poll(() => page.locator('#shop-products').evaluate(element => {
      const top = element.getBoundingClientRect().top
      const headerBottom = document.querySelector('nav').getBoundingClientRect().bottom
      return top >= headerBottom && top < headerBottom + 100
    })).toBe(true)
    await expect(page.locator('#shop-products a[href^="/shop/"] h2').first()).toContainText(/Zena/i)
  })
}
