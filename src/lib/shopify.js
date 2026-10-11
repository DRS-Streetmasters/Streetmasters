// Public storefront configuration only. Never put Admin API credentials here.
export const shopifyConfig = {
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'gamerzone-5174.myshopify.com',
  token: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'a4a75b5119e9be166b46cdbe623a7446',
  version: '2026-07',
  customerClientId: import.meta.env.VITE_SHOPIFY_CUSTOMER_CLIENT_ID || 'fb377542-94bd-4f07-bf58-590b11075cbd',
}

export async function storefront(query, variables = {}, signal) {
  const response = await fetch(`https://${shopifyConfig.domain}/api/${shopifyConfig.version}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': shopifyConfig.token },
    body: JSON.stringify({ query, variables }),
    signal: signal || AbortSignal.timeout(20000),
  })
  const result = await response.json()
  if (!response.ok || result.errors?.length || !result.data) throw new Error('shop.errors.connection')
  return result.data
}

export function money(value, locale = 'nl') {
  if (!value) return ''
  return new Intl.NumberFormat(locale === 'nl' ? 'nl-BE' : 'en-BE', { style: 'currency', currency: value.currencyCode }).format(Number(value.amount))
}

export function safeShopifyUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : '#'
  } catch { return '#' }
}

export const productCardFields = `
  id handle title vendor availableForSale
  featuredImage { url altText width height }
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
`

export async function getCatalog({ search = '', sort = 'featured', collection = '', after = null, language = 'NL', available = false }, signal) {
  const sorting = { featured: ['RELEVANCE', false], newest: ['CREATED_AT', true], priceAsc: ['PRICE', false], priceDesc: ['PRICE', true], title: ['TITLE', false] }
  const [sortKey, reverse] = sorting[sort] || sorting.featured
  // Quote user input so Shopify search operators aren't interpreted as filters.
  const query = [search.trim() ? `title:${JSON.stringify(`*${search.trim()}*`)}` : '', available ? 'available_for_sale:true' : ''].filter(Boolean).join(' AND ')
  if (collection) {
    const data = await storefront(`query Catalog($handle: String!, $after: String, $sort: ProductCollectionSortKeys!, $reverse: Boolean!, $filters: [ProductFilter!], $language: LanguageCode!) @inContext(language: $language, country: BE) {
      collection(handle: $handle) { products(first: 24, after: $after, sortKey: $sort, reverse: $reverse, filters: $filters) {
        nodes { ${productCardFields} } pageInfo { hasNextPage endCursor }
      } }
    }`, { handle: collection, after, sort: sort === 'featured' ? 'MANUAL' : sort === 'newest' ? 'CREATED' : sortKey, reverse, filters: available ? [{ available: true }] : [], language }, signal)
    return data.collection?.products || { nodes: [], pageInfo: { hasNextPage: false } }
  }
  const data = await storefront(`query Catalog($query: String, $after: String, $sort: ProductSortKeys!, $reverse: Boolean!, $language: LanguageCode!) @inContext(language: $language, country: BE) {
    products(first: 24, after: $after, query: $query, sortKey: $sort, reverse: $reverse) {
      nodes { ${productCardFields} } pageInfo { hasNextPage endCursor }
    }
  }`, { query, after, sort: sortKey, reverse, language }, signal)
  return data.products
}

export async function getCollections(language = 'NL') {
  const data = await storefront(`query Collections($language: LanguageCode!) @inContext(language: $language) {
    collections(first: 100) { nodes { id handle title } }
  }`, { language })
  return data.collections.nodes
}

export async function getProduct(handle, language = 'NL') {
  const data = await storefront(`query Product($handle: String!, $language: LanguageCode!) @inContext(language: $language, country: BE) {
    product(handle: $handle) {
      ${productCardFields} description descriptionHtml
      images(first: 30) { nodes { url altText width height } }
      variants(first: 250) { nodes { id title availableForSale selectedOptions { name value } price { amount currencyCode } compareAtPrice { amount currencyCode } image { url altText } } pageInfo { hasNextPage endCursor } }
    }
  }`, { handle, language })
  const product = data.product
  // Products can have more than 250 variants. Don't silently omit purchasable options.
  while (product?.variants.pageInfo.hasNextPage) {
    const next = await storefront(`query Variants($handle: String!, $after: String!, $language: LanguageCode!) @inContext(language: $language, country: BE) {
      product(handle: $handle) { variants(first: 250, after: $after) { nodes { id title availableForSale selectedOptions { name value } price { amount currencyCode } compareAtPrice { amount currencyCode } image { url altText } } pageInfo { hasNextPage endCursor } } }
    }`, { handle, after: product.variants.pageInfo.endCursor, language })
    product.variants.nodes.push(...next.product.variants.nodes)
    product.variants.pageInfo = next.product.variants.pageInfo
  }
  return product
}

export async function getRecommendations(productId, language = 'NL') {
  const data = await storefront(`query Recommendations($id: ID!, $language: LanguageCode!) @inContext(language: $language, country: BE) {
    productRecommendations(productId: $id) { ${productCardFields} }
  }`, { id: productId, language })
  return data.productRecommendations || []
}

export const cartFields = `
  id checkoutUrl totalQuantity note
  cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
  discountCodes { code applicable }
  lines(first: 250) { nodes { id quantity cost { totalAmount { amount currencyCode } }
    merchandise { ... on ProductVariant { id title availableForSale image { url altText } product { title handle } price { amount currencyCode } } }
  } }
`

export async function getCart(id) {
  return (await storefront(`query Cart($id: ID!) { cart(id: $id) { ${cartFields} } }`, { id })).cart
}

export async function cartMutation(name, declarations, argumentsText, variables) {
  const data = await storefront(`mutation CartMutation(${declarations}) { ${name}(${argumentsText}) {
    cart { ${cartFields} } userErrors { field message code }
  } }`, variables)
  const payload = data[name]
  if (payload.userErrors?.length) {
    const error = new Error('shop.errors.cart')
    error.details = payload.userErrors.map(item => item.message).join(' ')
    throw error
  }
  if (!payload.cart) throw new Error('shop.errors.expiredCart')
  return payload.cart
}
