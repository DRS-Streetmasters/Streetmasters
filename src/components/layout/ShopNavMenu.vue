<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getHomeCollections } from '../../lib/shopify'

const props = defineProps({ active: Boolean, mobile: Boolean })
const emit = defineEmits(['navigate'])
const { t, locale } = useI18n()
const route = useRoute()
const open = ref(false)
const root = ref(null)
const toggle = ref(null)
const categories = ref([])
let request = 0
watch(locale, async () => {
  const current = ++request
  try {
    const result = await getHomeCollections(locale.value.toUpperCase())
    if (current === request) categories.value = result
  } catch { if (current === request) categories.value = [] }
}, { immediate: true })
watch(() => route.fullPath, () => { open.value = false })
function navigate() { open.value = false; emit('navigate') }
function dismiss(event) { if (!root.value?.contains(event.target)) open.value = false }
function escape() { open.value = false; toggle.value?.focus() }
onMounted(() => document.addEventListener('click', dismiss))
onUnmounted(() => document.removeEventListener('click', dismiss))
</script>

<template>
  <div ref="root" class="relative shrink-0" @mouseenter="!mobile && (open = true)" @mouseleave="!mobile && (open = false)" @focusout="event => { if (!event.currentTarget.contains(event.relatedTarget)) open = false }" @keydown.esc.stop.prevent="escape">
    <div class="flex items-center justify-center gap-1">
      <RouterLink to="/shop" class="font-headline uppercase transition-colors hover:text-primary" :class="[mobile ? 'text-xl font-bold tracking-[0.16em] md:text-2xl' : 'text-sm tracking-widest', active ? 'text-primary' : 'text-stone-400']" @click="navigate">{{ t('shop.shop') }}</RouterLink>
      <button ref="toggle" type="button" class="flex h-9 w-7 items-center justify-center rounded-lg text-primary hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-primary" :aria-label="t('shop.popularCategories')" :aria-expanded="open" :aria-controls="mobile ? 'mobile-shop-categories' : 'desktop-shop-categories'" @click="open = !open" @keydown.down.prevent="open = true">
        <span class="material-symbols-outlined text-lg" aria-hidden="true">{{ open ? 'expand_less' : 'expand_more' }}</span>
      </button>
    </div>
    <div v-if="open" :id="mobile ? 'mobile-shop-categories' : 'desktop-shop-categories'" :class="mobile ? 'mt-2 w-64' : 'absolute left-0 top-full w-72 pt-3'">
      <div class="rounded-2xl border border-white/10 bg-surface-container-low p-3 text-left shadow-2xl">
        <p class="px-3 py-2 text-xs font-bold tracking-wide text-primary">{{ t('shop.popularCategories') }}</p>
        <RouterLink v-for="category in categories" :key="category.id" :to="{ path: '/shop', query: { collection: category.handle }, hash: '#shop-products' }" class="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-on-surface hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-2 focus-visible:outline-primary" @click="navigate">
          {{ category.title }}<span class="material-symbols-outlined text-base text-primary" aria-hidden="true">north_east</span>
        </RouterLink>
        <RouterLink to="/shop" class="mt-2 flex min-h-11 items-center rounded-xl border-t border-white/10 px-3 py-2 text-sm font-bold text-primary hover:bg-white/5" @click="navigate">{{ t('shop.all') }}</RouterLink>
      </div>
    </div>
  </div>
</template>
