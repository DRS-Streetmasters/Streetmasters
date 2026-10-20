import { test, expect } from '@playwright/test'

test('discount link survives an empty cart, navigation and reload, and can be removed', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-01T12:00:00+01:00'))
  const price = { amount: '20.00', currencyCode: 'EUR' }
  const product = { id: 'product', handle: 'test', title: 'Test product', availableForSale: true, priceRange: { minVariantPrice: price }, compareAtPriceRange: { minVariantPrice: price }, quickVariants: { nodes: [{ id: 'variant', availableForSale: true, price }] } }
  const cart = { id: 'test-cart', checkoutUrl: 'https://shop.streetmasters.be/checkouts/test', totalQuantity: 0, note: '', discountCodes: [], lines: { nodes: [] }, cost: { subtotalAmount: price, totalAmount: price } }
  const codesReceived = []
  await page.route('**/api/2026-07/graphql.json', route => {
    const { query, variables } = route.request().postDataJSON()
    let data
    if (query.includes('mutation CartMutation')) {
      const name = ['cartCreate', 'cartLinesAdd', 'cartDiscountCodesUpdate'].find(name => query.includes(name))
      if (name === 'cartCreate' || name === 'cartDiscountCodesUpdate') {
        const codes = variables.input?.discountCodes || variables.codes
        codesReceived.push(codes)
        cart.discountCodes = codes.map(code => ({ code, applicable: code !== 'INVALID' }))
      }
      if (name === 'cartLinesAdd') {
        cart.totalQuantity = 1
        cart.lines.nodes = [{ id: 'line', quantity: 1, cost: { totalAmount: price }, merchandise: { id: 'variant', title: 'Default Title', availableForSale: true, price, product: { title: product.title, handle: product.handle } } }]
      }
      data = { [name]: { cart, userErrors: [] } }
    } else if (query.includes('query Cart(')) data = { cart }
    else data = { collections: { nodes: [] }, products: { nodes: [product], pageInfo: {} } }
    return route.fulfill({ json: { data } })
  })
  await page.goto('/shop?discount=Order10&stock=1#shop-products')
  await expect(page).toHaveURL(/\/shop\?stock=1#shop-products$/)
  expect(codesReceived).toEqual([['Order10']])
  await page.reload()
  await page.getByRole('button', { name: 'In winkelmand: Test product' }).click()
  await expect(page.getByRole('status')).toContainText('Toegevoegd')
  expect(cart.discountCodes).toEqual([{ code: 'Order10', applicable: true }])
  await page.getByRole('link', { name: 'Naar winkelmand', exact: true }).click()
  await expect(page).toHaveURL(/\/winkelmand$/)
  await expect(page.getByLabel('Kortingscode', { exact: true })).toHaveValue('Order10')
  await page.goto('/winkelmand?discount=INVALID')
  await expect(page).toHaveURL(/\/winkelmand$/)
  await expect(page.getByRole('status')).toContainText('niet geldig')
  await page.getByRole('status').getByRole('button', { name: 'Verwijderen' }).click()
  await page.reload()
  await expect(page.getByLabel('Kortingscode', { exact: true })).toHaveValue('')
  expect(codesReceived).toEqual([['Order10'], ['INVALID'], []])
})

test('failed discount link remains retryable', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-01T12:00:00+01:00'))
  await page.route('**/api/2026-07/graphql.json', route => route.fulfill({ status: 503, json: {} }))
  await page.goto('/shop?discount=Order10')
  await expect(page).toHaveURL(/discount=Order10/)
  await expect(page.getByText('De kortingscode kon niet worden toegepast.', { exact: false })).toBeVisible()
})
