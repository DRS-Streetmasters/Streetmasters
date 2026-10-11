<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { money } from '../../lib/shopify'
defineProps({ product: { type: Object, required: true } })
const { t, locale } = useI18n()
</script>

<template>
  <RouterLink :to="`/shop/${product.handle}`" class="group block overflow-hidden rounded-2xl border border-white/10 bg-surface-container-low transition-colors hover:border-primary/50">
    <div class="relative aspect-square overflow-hidden bg-white/5">
      <img v-if="product.featuredImage" :src="product.featuredImage.url" :alt="product.featuredImage.altText || product.title" class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <div v-else class="flex h-full items-center justify-center text-outline"><span aria-hidden="true" class="material-symbols-outlined text-6xl">shopping_bag</span></div>
      <span v-if="!product.availableForSale" class="absolute top-3 left-3 rounded-full bg-stone-950/85 px-3 py-1 text-xs text-white">{{ t('shop.soldOut') }}</span>
      <span v-else-if="Number(product.compareAtPriceRange.minVariantPrice.amount) > Number(product.priceRange.minVariantPrice.amount)" class="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs text-on-primary">{{ t('shop.sale') }}</span>
    </div>
    <div class="p-4 md:p-6">
      <p v-if="product.vendor" class="mb-2 text-[10px] tracking-widest text-primary uppercase">{{ product.vendor }}</p>
      <h2 class="font-headline text-lg font-bold text-white">{{ product.title }}</h2>
      <p class="mt-3 text-sm text-on-surface-variant">{{ t('shop.from') }} <span class="font-semibold text-white">{{ money(product.priceRange.minVariantPrice, locale) }}</span></p>
    </div>
  </RouterLink>
</template>
