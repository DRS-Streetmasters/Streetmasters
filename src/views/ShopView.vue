<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import ShopLayout from '../components/shop/ShopLayout.vue'
import ProductCard from '../components/shop/ProductCard.vue'
import PageHero from '../components/layout/PageHero.vue'
import ShopFilters from '../components/shop/ShopFilters.vue'
import AppButton from '../components/ui/AppButton.vue'
import { getCatalog, getCollections } from '../lib/shopify'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const search = ref(String(route.query.q || ''))
const collection = ref(String(route.query.collection || ''))
const sort = ref(String(route.query.sort || 'featured'))
const available = ref(route.query.stock === '1')
const collectionOptions = computed(() => [{ value: '', label: t('shop.all') }, ...collections.value.map(item => ({ value: item.handle, label: item.title }))])
const sortOptions = computed(() => ['featured', 'newest', 'priceAsc', 'priceDesc', 'title'].map(value => ({ value, label: t(`shop.${value === 'title' ? 'titleSort' : value}`) })))
const products = ref([])
const collections = ref([])
const pageInfo = ref({})
const loading = ref(true)
const error = ref(false)
const filterDialog = ref(null)
const filtersOpen = ref(false)
const activeFilters = computed(() => Number(!!collection.value) + Number(available.value) + Number(sort.value !== 'featured'))
let previousOverflow = ''
let desktopMedia
function openFilters() {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  filtersOpen.value = true
  filterDialog.value.showModal()
}
function closeFilters() { filterDialog.value?.close() }
function onFiltersClosed() { filtersOpen.value = false; document.body.style.overflow = previousOverflow }
function onBreakpoint(event) { if (event.matches && filtersOpen.value) closeFilters() }
function resetFilters() { collection.value = ''; sort.value = 'featured'; available.value = false; filter() }
function setCollection(value) { collection.value = value; search.value = ''; filter() }
function setSort(value) { sort.value = value; filter() }
function setAvailable(value) { available.value = value; filter() }
let request = 0

async function load(more = false) {
  const current = ++request
  loading.value = true
  error.value = false
  try {
    const result = await getCatalog({ search: search.value, collection: collection.value, sort: sort.value, available: available.value, language: locale.value.toUpperCase(), after: more ? pageInfo.value.endCursor : null })
    if (current !== request) return
    products.value = more ? [...products.value, ...result.nodes] : result.nodes
    pageInfo.value = result.pageInfo
  } catch { if (current === request) error.value = true }
  finally { if (current === request) loading.value = false }
}

function filter() {
  router.replace({ query: { ...(search.value.trim() ? { q: search.value.trim() } : {}), ...(collection.value ? { collection: collection.value } : {}), ...(sort.value !== 'featured' ? { sort: sort.value } : {}), ...(available.value ? { stock: '1' } : {}) } })
}
function searchProducts() { collection.value = ''; filter() }
watch(() => route.query, () => {
  search.value = String(route.query.q || '')
  collection.value = String(route.query.collection || '')
  sort.value = String(route.query.sort || 'featured')
  available.value = route.query.stock === '1'
  load()
})
async function loadCollections() { try { collections.value = await getCollections(locale.value.toUpperCase()) } catch { collections.value = [] } }
watch(locale, () => { load(); loadCollections() })
onMounted(() => {
  load(); loadCollections()
  desktopMedia = window.matchMedia('(min-width: 1024px)')
  desktopMedia.addEventListener('change', onBreakpoint)
})
onUnmounted(() => {
  if (filtersOpen.value) document.body.style.overflow = previousOverflow
  desktopMedia?.removeEventListener('change', onBreakpoint)
})
</script>

<template>
  <ShopLayout>
    <template #hero><PageHero :label="t('shop.label')" :title="t('shop.title')" :description="t('shop.intro')" target="#shop-products" /></template>
    <section id="shop-products" class="scroll-mt-28">
      <div class="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <div><p class="text-xs font-bold tracking-[.2em] text-primary uppercase">{{ t('shop.shop') }}</p><h2 class="mt-2 font-headline text-2xl font-bold md:text-3xl">{{ t('shop.browse') }}</h2></div>
        <form class="shop-search flex w-full items-center gap-2 rounded-2xl border border-white/15 bg-surface-container-low p-2 transition-colors focus-within:border-primary/70 focus-within:shadow-[0_0_0_3px_rgba(213,179,255,0.08)] xl:max-w-xl" role="search" @submit.prevent="searchProducts">
          <span class="material-symbols-outlined ml-2 hidden text-primary sm:block" aria-hidden="true">search</span>
          <label for="shop-search" class="sr-only">{{ t('shop.search') }}</label>
          <input id="shop-search" v-model="search" type="search" :placeholder="t('shop.search')" />
          <button type="submit" class="flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-primary-container px-4 text-xs font-bold tracking-wide text-white transition-colors hover:bg-inverse-primary/80 sm:px-5"><span class="material-symbols-outlined text-lg sm:hidden" aria-hidden="true">search</span><span>{{ t('shop.searchAction') }}</span></button>
        </form>
      </div>
      <button type="button" class="mb-6 flex min-h-12 w-full items-center justify-between rounded-2xl border border-white/15 bg-surface-container-low px-5 text-sm font-semibold lg:hidden" aria-haspopup="dialog" :aria-expanded="filtersOpen" aria-controls="shop-filter-sheet" @click="openFilters"><span class="flex items-center gap-3"><span class="material-symbols-outlined text-primary" aria-hidden="true">tune</span>{{ t('shop.filters') }}</span><span v-if="activeFilters" class="rounded-full bg-primary-container px-2 py-0.5 text-xs text-white">{{ activeFilters }}</span><span v-else class="material-symbols-outlined text-lg text-on-surface-variant" aria-hidden="true">expand_more</span></button>
      <div class="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-10">
        <aside class="sticky top-32 hidden rounded-2xl border border-white/10 bg-surface-container-low/60 p-5 lg:block" :aria-label="t('shop.filters')">
          <div class="mb-7 flex items-center gap-3"><span class="material-symbols-outlined text-primary" aria-hidden="true">tune</span><h3 class="font-headline text-lg font-bold">{{ t('shop.filters') }}</h3><span v-if="activeFilters" class="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{{ activeFilters }}</span></div>
          <ShopFilters prefix="desktop" :collection="collection" :sort="sort" :available="available" :collection-options="collectionOptions" :sort-options="sortOptions" @collection="setCollection" @sort="setSort" @available="setAvailable" @reset="resetFilters" />
        </aside>
        <div class="min-w-0">
          <div v-if="error" role="alert" class="rounded-2xl border border-error/30 p-8 text-center"><p>{{ t('shop.errors.connection') }}</p><AppButton class="mt-4" @click="load()">{{ t('shop.retry') }}</AppButton></div>
          <p v-if="loading" role="status" class="mb-5 text-primary">{{ t('shop.loading') }}</p>
          <div v-if="!error" class="grid grid-cols-1 gap-5 min-[400px]:grid-cols-2 xl:grid-cols-3" :aria-busy="loading">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>
          <div v-if="!loading && !error && !products.length" class="py-16 text-center"><h3 class="text-2xl font-bold">{{ t('shop.empty') }}</h3><p class="mt-3 text-on-surface-variant">{{ t('shop.emptyHint') }}</p></div>
          <div v-if="pageInfo.hasNextPage && !error" class="mt-10 text-center"><AppButton :disabled="loading" variant="glass" @click="load(true)">{{ t('shop.more') }}</AppButton></div>
        </div>
      </div>
    </section>
    <dialog id="shop-filter-sheet" ref="filterDialog" aria-labelledby="filter-sheet-title" class="shop-filter-sheet" @close="onFiltersClosed" @click="event => { if (event.target === filterDialog) closeFilters() }">
      <div class="filter-sheet-card">
        <div class="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-white/20" aria-hidden="true"></div>
        <header class="flex shrink-0 items-center justify-between px-6 py-5"><h2 id="filter-sheet-title" class="font-headline text-xl font-bold">{{ t('shop.filters') }}</h2><button type="button" autofocus class="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-on-surface-variant" :aria-label="t('shop.closeFilters')" @click="closeFilters"><span class="material-symbols-outlined" aria-hidden="true">close</span></button></header>
        <div class="min-h-0 overflow-y-auto overscroll-contain px-6 pb-8">
          <ShopFilters v-if="filtersOpen" prefix="mobile" inline :collection="collection" :sort="sort" :available="available" :collection-options="collectionOptions" :sort-options="sortOptions" @collection="setCollection" @sort="setSort" @available="setAvailable" @reset="resetFilters" />
        </div>
        <footer class="shrink-0 border-t border-white/10 p-5"><AppButton full-width @click="closeFilters">{{ t('shop.showProducts') }}</AppButton></footer>
      </div>
    </dialog>
  </ShopLayout>
</template>

<style scoped>
.shop-search input {
  min-width: 0; flex: 1; border: 0; border-radius: 0; background: transparent;
  padding: .65rem .5rem; font-size: .875rem; outline: none; box-shadow: none;
}
.shop-search input:focus-visible { outline: none; }
.shop-filter-sheet { position: fixed; inset: auto 0 0; margin: 0 auto; width: 100%; max-width: 560px; max-height: none; padding: 12px; padding-bottom: max(12px, env(safe-area-inset-bottom)); border: 0; background: transparent; color: var(--color-on-surface); overflow: visible; }
.shop-filter-sheet::backdrop { background: rgb(0 0 0 / 65%); backdrop-filter: blur(5px); }
.filter-sheet-card { display: flex; flex-direction: column; max-height: calc(90dvh - 24px); border: 1px solid rgb(255 255 255 / 12%); border-radius: 28px; background: var(--color-surface-container-low); box-shadow: 0 -20px 80px rgb(0 0 0 / 40%); overflow: hidden; }
.shop-filter-sheet[open] .filter-sheet-card { animation: sheet-in .25s ease-out; }
@keyframes sheet-in { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .shop-filter-sheet[open] .filter-sheet-card { animation: none; } }
</style>
