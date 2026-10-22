import { test, expect } from '@playwright/test'

test('built environment has the intended launch and routing behavior', async ({ page }, testInfo) => {
  await page.clock.setFixedTime(new Date('2026-10-21T12:00:00+02:00'))
  await page.goto('/about?source=test#team')
  if (testInfo.project.name === 'production') {
    await expect(page.getByRole('heading', { name: 'Klaar voor de start?' })).toBeVisible()
    await expect(page.locator('nav')).toHaveCount(0)
    await page.goto('/dikkeseppe/about')
    await expect(page.locator('nav a[href="/dikkeseppe/diensten"]')).toBeVisible()
    return
  }
  await expect(page.locator('nav a[href="/diensten"]')).toBeVisible()
  await expect(page.locator('.launch-screen')).toHaveCount(0)
  await page.reload()
  await expect(page.locator('nav')).toBeVisible()
  await page.goto('/dikkeseppe/about?source=test#team')
  await expect(page).toHaveURL('/about?source=test#team')
  await page.locator('nav a[href="/diensten"]').click()
  await expect(page).toHaveURL('/diensten')
  await page.goBack()
  await expect(page).toHaveURL('/about?source=test#team')
  await page.goto('/unknown')
  await expect(page.locator('main a[href="/"]')).toBeVisible()
  await page.goto('/account/callback')
  await expect(page.getByRole('heading', { name: 'Pagina niet gevonden.' })).toBeVisible()
  await expect(page.locator('.launch-screen')).toHaveCount(0)
})
