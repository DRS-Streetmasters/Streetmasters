<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
const props = defineProps({ collections: { type: Array, default: () => [] } })
const { t } = useI18n()
const definitions = [
  { handle: 'aanbiedingen', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0gZdPDWm5myQv-0qMRqhksNZeAZNmqsDO_SFOWLZV-QyL56lQ2KP2ar8AljMuCxk50AaN8tbvey9qfQCYGstiN_aXnW8NJhgUUnP_Uggn-yE-7YufBcQpBmhMvbmPsEZUQU_3CDbnOmzSgWqp9UDqoh58hF-P_Fd4gBwvnSi_31P9cmhXAC_oSzhxWvETNqMbDJSsrL5QUGXXg5cXPHKjBhoYGZ9wMQW2xTWO4xWR27MG4k53dWeH_itqbNHrsxvv8DBIxfDKwIc', icon: 'sell' },
  { handle: 'detailing-tools', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl-mJZny6zxPGUTTIl0Mrdz4-fv4T_M1vXlJS-OwO-RwTm_AAd_HRd0mquN6ChZGg4UWTgYQjv8eY777gkfKnKMW1MgISd84yFQLc_bVhOyQ48jAnnF8dACHF5NFBAWaVl276dzotkIfzSVjvdtIc141KJaUhwfbYDST3U8rp-Jm_kFcjYq3qIpaEz8bl5SCEbPmRS43Tt2DO96wnDN9VIVRWO0o1jcIeoNU485f8', icon: 'auto_awesome' },
  { handle: 'wrapping-tools', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDjk2JzNW8OYT86C0f06Zx42i4wjgd3Zvhr5JqeAHlT8mS_y8WfTGd5WFeQmjYXvammHywR-AJgOOiqttBjYIWsSuxOVN8Z_dYdmGv0Qr-YjJ53eC3PQO7Pp780F6w9OgZNsgbAIiZKmIwa7KT0GGlJXGyQyAIQZVyPIbNxrjDMJRSA3eyolFqQ5VfCMLCxi7iLL4L87D2Jj8juEwJcIBQ3SKT0vKWuy11Bg-asMgvprRGCRRA2ABW-odM9JEZTpykSIsnRFlk6rY', icon: 'palette' },
  { handle: 'autogeurtjes', image: 'https://images.unsplash.com/photo-1778530207938-ab559649165a?auto=format&fit=crop&w=1200&q=80', icon: 'air' },
  { handle: 'accessoires', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqReSEe_A20hI2nxmJbnrkU_9gc8yDQ3BXAnAuK737nd2pwlRYJaB2jxKV_A_AuE9TfnWpVtjqVcasdJQr27crIn6j7_kcD_v7qVAb00QBJUwCM713-8cfMkL4mx6tDfJ15rsnxWfrRifXUzCrYockPR-cozzTanmdXS8r8PAlsCu6AtQif-uGe7T8WXSVbnc1AvQWkcsXWa5vcoPiEaxRdIosjKIcuzjA8It6_fcKB7G-At1oKGQxTap636o84vgNkjEqGtlVlTE', icon: 'build' },
]
const categories = computed(() => definitions.map(category => {
  const collection = props.collections.find(item => item.handle === category.handle || (category.handle === 'accessoires' && item.handle === 'accesoires'))
  // Prefer a curated image, then the collection's own image, then its first product photo.
  const image = category.image || collection?.image?.url || collection?.products?.nodes?.[0]?.featuredImage?.url
  return { ...category, collection, image }
}))
</script>
<template>
  <section class="bg-surface-container-low px-5 py-10 md:px-12 md:py-12" aria-labelledby="shop-categories-title">
    <div class="mx-auto max-w-[1720px]">
      <p class="mb-3 flex items-center gap-2 text-xs font-bold tracking-[.2em] text-primary uppercase"><span class="h-px w-6 bg-primary"></span>{{ t('shop.design.choose') }}</p>
      <div class="mb-6 flex items-end justify-between gap-4"><div><h2 id="shop-categories-title" class="font-headline text-lg font-black tracking-tight text-white uppercase md:text-2xl">{{ t('shop.design.categories') }}</h2><p class="mt-3 text-sm text-neutral-400 md:text-base">{{ t('shop.design.categoriesIntro') }}</p></div><span class="hidden shrink-0 text-xs tracking-widest text-neutral-400 uppercase lg:block">{{ String(categories.length).padStart(2, '0') }} {{ t('shop.design.segments') }}</span></div>
      <div class="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 lg:grid-rows-[210px_210px_190px]">
        <component :is="category.collection ? RouterLink : 'article'" v-for="(category, index) in categories" :key="category.handle" :to="category.collection ? { path: '/shop', query: { collection: category.collection.handle }, hash: '#shop-products' } : undefined" :class="index === 0 ? 'col-span-2 lg:row-span-2 lg:p-8' : index === 1 ? 'lg:row-span-2' : ''" class="category-tile group relative flex min-h-60 min-w-0 flex-col justify-end overflow-hidden rounded-2xl bg-surface-container p-4 md:min-h-60 md:p-5 lg:min-h-0">
          <img v-if="category.image" :src="category.image" alt="" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
          <span v-else class="category-icon material-symbols-outlined absolute top-8 right-8 text-primary/20" aria-hidden="true">{{ category.icon }}</span>
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div class="relative"><span class="mb-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-[10px] font-bold tracking-widest text-primary uppercase">{{ category.collection ? t('shop.design.discover') : t('shop.design.comingSoon') }}</span><h3 :class="{ 'lg:text-4xl': index === 0 }" class="font-headline text-lg font-black tracking-tight text-white uppercase md:text-2xl">{{ t(`shop.design.categoriesList.${category.handle}.title`) }}</h3><p class="mt-2 max-w-lg text-xs leading-relaxed text-neutral-300">{{ t(`shop.design.categoriesList.${category.handle}.text`) }}</p><span v-if="category.collection" class="mt-4 flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">{{ t('shop.design.viewCategory') }}<span class="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span></span></div>
        </component>
      </div>
    </div>
  </section>
</template>
<style scoped>
.category-icon { font-size: 100px; }
.category-tile { background-image: radial-gradient(ellipse at top right, color-mix(in srgb, var(--color-primary-container) 30%, transparent), transparent 70%); }
a.category-tile:hover { box-shadow: 0 0 35px color-mix(in srgb, var(--color-primary-container) 18%, transparent); }
</style>
