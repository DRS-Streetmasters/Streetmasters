<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getHomeCollections } from '../../lib/shopify'

defineProps({ embedded: Boolean })

const { t, locale } = useI18n()
const categories = ref([])
const loading = ref(true)
const error = ref(false)
const failedImages = ref(new Set())
let request = 0
async function load() {
  const current = ++request
  loading.value = true
  error.value = false
  try {
    const result = await getHomeCollections(locale.value.toUpperCase())
    if (current === request) categories.value = result
  } catch {
    if (current === request) error.value = true
  } finally {
    if (current === request) loading.value = false
  }
}
const categoryImage = category => category.image?.url || category.products.nodes[0]?.featuredImage?.url
watch(locale, load, { immediate: true })
</script>

<template>
  <section class="categories-compact" :class="embedded ? 'mb-8 border-b border-white/5 pb-8' : 'border-b border-white/5 py-12 md:py-16'" aria-labelledby="popular-categories-title">
    <div :class="embedded ? '' : 'mx-auto max-w-[1920px] px-6 md:px-24'">
      <div class="categories-heading mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 id="popular-categories-title" class="font-headline text-2xl font-bold tracking-tight text-white md:text-3xl">{{ t('shop.popularCategories') }}</h2>
          <p class="mt-2 text-sm text-on-surface-variant">{{ t('shop.categoriesIntro') }}</p>
        </div>
        <RouterLink v-if="!embedded" to="/shop" class="flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          {{ t('shop.viewShop') }}<span class="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
        </RouterLink>
      </div>
      <p v-if="loading" class="sr-only" role="status">{{ t('shop.loading') }}</p>
      <div v-if="error" role="status" class="flex flex-wrap items-center gap-4 rounded-2xl bg-surface-container-low p-6 text-sm text-on-surface-variant">
        {{ t('shop.categoriesError') }}
        <button class="min-h-11 font-bold text-primary underline" @click="load">{{ t('shop.retry') }}</button>
      </div>
      <div v-else class="category-grid" :aria-busy="loading">
        <template v-if="loading && !categories.length">
          <div v-for="index in 4" :key="index" class="aspect-[1/1.12] rounded-3xl bg-surface-container-low" aria-hidden="true"></div>
        </template>
        <RouterLink v-for="category in categories" :key="category.id" :to="{ path: '/shop', query: { collection: category.handle }, hash: '#shop-products' }" class="category-card group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-surface-container-low p-4 transition-colors hover:border-primary/60 hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:p-5">
          <div class="category-image flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#f3f3f3] p-4 md:p-6">
            <img v-if="categoryImage(category) && !failedImages.has(category.id)" :src="categoryImage(category)" alt="" loading="lazy" width="320" height="320" class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" @error="failedImages.add(category.id)" />
            <span v-else class="material-symbols-outlined text-5xl text-[#7104d8]" aria-hidden="true">shopping_bag</span>
          </div>
          <div class="category-label flex flex-1 items-center justify-between gap-3 px-1 pt-5 pb-1">
            <span class="text-sm font-semibold md:text-base">{{ category.title }}</span>
            <span class="material-symbols-outlined shrink-0 text-xl text-primary" aria-hidden="true">north_east</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
@media (min-width: 768px) { .category-grid { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1.25rem; } }
.categories-compact .categories-heading { margin-bottom: 1rem; }
.categories-compact .category-grid {
  grid-template-columns: repeat(auto-fill, minmax(150px, 180px));
  gap: .75rem;
}
.categories-compact .category-card { padding: .75rem; border-radius: 1rem; }
.categories-compact .category-image { padding: .75rem; border-radius: .625rem; }
.categories-compact .category-label { padding: .75rem 0 0; gap: .375rem; }
.categories-compact .category-label > span:first-child { font-size: .8125rem; }
@media (max-width: 639px) {
  .categories-compact .category-grid {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 144px;
    overflow-x: auto;
    padding: .25rem .25rem .75rem;
    scroll-snap-type: x proximity;
  }
  .categories-compact .category-card { scroll-snap-align: start; }
}
</style>
