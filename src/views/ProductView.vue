<script setup>
import { setPageMeta } from '../lib/seo'
import { trackEvent } from '../lib/analytics'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import DOMPurify from 'dompurify'
import ShopLayout from '../components/shop/ShopLayout.vue'
import ProductCard from '../components/shop/ProductCard.vue'
import AppSelect from '../components/ui/AppSelect.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppLinkButton from '../components/ui/AppLinkButton.vue'
import { getProduct, getRecommendations, money } from '../lib/shopify'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const { t, locale } = useI18n()
const cart = useCartStore()
const product = ref(null)
const recommendations = ref([])
const loading = ref(true)
const error = ref(false)
const variantId = ref('')
const imageIndex = ref(0)
const quantity = ref(1)
const added = ref(false)
let request = 0
const variant = computed(() => product.value?.variants.nodes.find(item => item.id === variantId.value))
const variantOptions = computed(() => (product.value?.variants.nodes || []).map(item => ({ value: item.id, label: `${item.title}${item.availableForSale ? '' : ` — ${t('shop.soldOut')}`}` })))
const description = computed(() => DOMPurify.sanitize(product.value?.descriptionHtml || '', { USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'form', 'input', 'button'], FORBID_ATTR: ['style'] }))
const currentImage = computed(() => product.value?.images.nodes[imageIndex.value] || product.value?.featuredImage)

async function load() {
  const current = ++request
  loading.value = true
  error.value = false
  added.value = false
  product.value = null
  recommendations.value = []
  imageIndex.value = 0
  quantity.value = 1
  try {
    const result = await getProduct(route.params.handle, locale.value.toUpperCase())
    if (current !== request) return
    product.value = result
    if (result) setPageMeta(result.title, result.description || `${result.title} — ${t('shop.design.intro')}`)
    variantId.value = result?.variants.nodes.find(item => item.availableForSale)?.id || result?.variants.nodes[0]?.id || ''
    if (result) getRecommendations(result.id, locale.value.toUpperCase()).then(items => { if (current === request) recommendations.value = items.slice(0, 4) }).catch(() => {})
  } catch { if (current === request) error.value = true }
  finally { if (current === request) loading.value = false }
}
function changeVariant() {
  added.value = false
  const index = product.value.images.nodes.findIndex(item => item.url === variant.value?.image?.url)
  if (index >= 0) imageIndex.value = index
}
async function add() {
  added.value = false
  if (!variant.value?.availableForSale || !Number.isInteger(quantity.value) || quantity.value < 1 || quantity.value > 99) return
  added.value = await cart.add(variant.value.id, quantity.value)
  if (added.value) trackEvent('Product: Added To Cart', { item: product.value.handle, quantity: quantity.value })
}
watch([() => route.params.handle, locale], load, { immediate: true })
</script>

<template>
  <ShopLayout>
    <RouterLink data-analytics-click="Product: Back Shop" class="mb-8 inline-flex items-center gap-2 text-sm text-primary" to="/shop"><span aria-hidden="true">←</span>{{ t('shop.backShop') }}</RouterLink>
    <p v-if="loading" class="min-h-screen" role="status">{{ t('shop.loading') }}</p>
    <div v-else-if="error" role="alert"><p>{{ t('shop.errors.connection') }}</p><AppButton data-analytics-click="Product: Retry" class="mt-4" @click="load">{{ t('shop.retry') }}</AppButton></div>
    <h1 v-else-if="!product" class="text-3xl font-bold">{{ t('shop.productMissing') }}</h1>
    <template v-else>
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div class="aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img v-if="currentImage" :src="currentImage.url" fetchpriority="high" :alt="currentImage.altText || product.title" class="h-full w-full object-contain" />
          </div>
          <div v-if="product.images.nodes.length > 1" class="mt-4 flex gap-3 overflow-x-auto p-1">
            <button data-analytics-click="Product: Select Image" v-for="(item, index) in product.images.nodes" :key="item.url" class="h-20 w-20 shrink-0 overflow-hidden rounded-xl border" :class="index === imageIndex ? 'border-primary' : 'border-white/10'" :aria-label="t('images.productImage', { product: product.title, number: index + 1 })" :aria-pressed="index === imageIndex" @click="imageIndex = index"><img :src="item.url" alt="" class="h-full w-full object-contain" loading="lazy" /></button>
          </div>
        </div>
        <div>
          <p class="text-xs font-bold tracking-widest text-primary uppercase">{{ product.vendor }}</p>
          <h1 class="mt-4 font-headline text-4xl leading-tight font-bold text-white md:text-5xl">{{ product.title }}</h1>
          <div class="mt-6 flex items-center gap-4"><p class="text-3xl font-bold text-white">{{ money(variant?.price, locale) }}</p><del v-if="Number(variant?.compareAtPrice?.amount) > Number(variant?.price?.amount)" class="text-lg text-outline"><span class="sr-only">{{ t('shop.originalPrice') }} </span>{{ money(variant.compareAtPrice, locale) }}</del></div>
          <form data-analytics-submit="Product: Add To Cart Submitted" class="mt-8 space-y-5 border-t border-white/10 pt-7" @submit.prevent="add">
            <AppSelect v-if="product.variants.nodes.length > 1" id="product-variant" v-model="variantId" :label="t('shop.variant')" :options="variantOptions" @change="changeVariant" />
            <div class="max-w-28"><label class="mb-2" for="product-quantity">{{ t('shop.quantity') }}</label><input data-analytics-focus="Product: Product Quantity Focused" id="product-quantity" v-model.number="quantity" type="number" min="1" max="99" step="1" required /></div>
            <AppButton data-analytics-click="Product: Add To Cart" type="submit" full-width :disabled="cart.busy || !variant?.availableForSale">{{ !variant?.availableForSale ? t('shop.soldOut') : cart.busy ? t('shop.loading') : t('shop.add') }}</AppButton>
            <p v-if="cart.error" role="alert" class="text-error">{{ t(cart.error) }} {{ cart.details }}</p>
            <div v-if="added" role="status" class="rounded-xl border border-primary/30 bg-primary/5 p-4"><p>{{ t('shop.added') }}</p><AppLinkButton data-analytics-click="Product: View Cart" class="mt-3" to="/winkelmand" size="xs">{{ t('shop.viewCart') }}</AppLinkButton></div>
            <p class="text-xs leading-relaxed text-on-surface-variant">{{ t('shop.checkoutHint') }}</p>
          </form>
          <section class="mt-10 border-t border-white/10 pt-7"><h2 class="mb-4 font-headline text-xl font-bold">{{ t('shop.details') }}</h2><div class="shop-product-description" v-html="description"></div></section>
        </div>
      </div>
      <section v-if="recommendations.length" class="mt-20"><h2 class="mb-6 font-headline text-2xl font-bold">{{ t('shop.recommendations') }}</h2><div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><ProductCard v-for="item in recommendations" :key="item.id" :product="item" /></div></section>
    </template>
  </ShopLayout>
</template>
