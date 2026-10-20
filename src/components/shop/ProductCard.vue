<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { money } from '../../lib/shopify'
import { useCartStore } from '../../stores/cart'
const props = defineProps({ product: { type: Object, required: true } })
const { t, locale } = useI18n()
const cart = useCartStore()
const pending = ref(false)
const added = ref(false)
const error = ref('')
const variant = computed(() => props.product.quickVariants?.nodes.length === 1 ? props.product.quickVariants.nodes[0] : null)
const onSale = computed(() => Number(props.product.compareAtPriceRange.minVariantPrice.amount) > Number(props.product.priceRange.minVariantPrice.amount))
async function add() {
  if (pending.value || cart.busy || !variant.value?.availableForSale) return
  pending.value = true
  added.value = false
  error.value = ''
  added.value = await cart.add(variant.value.id, 1)
  if (!added.value) error.value = cart.error || 'shop.errors.cart'
  pending.value = false
}
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-container transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 motion-reduce:transform-none">
    <RouterLink data-analytics-click="Product Card: Open Product" :data-analytics-item="product.handle" :to="`/shop/${product.handle}`" class="block">
      <div class="relative aspect-square overflow-hidden bg-surface-container-lowest">
        <img v-if="product.featuredImage" :src="product.featuredImage.url" :alt="product.featuredImage.altText || product.title" class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" loading="lazy" />
        <div v-else class="flex h-full items-center justify-center text-outline"><span aria-hidden="true" class="material-symbols-outlined text-6xl">shopping_bag</span></div>
        <span v-if="!product.availableForSale" class="absolute top-3 left-3 rounded-md bg-surface/90 px-3 py-1 text-xs text-white">{{ t('shop.soldOut') }}</span>
        <span v-else-if="onSale" class="absolute top-3 left-3 rounded-md bg-primary px-3 py-1 text-xs font-bold text-on-primary">{{ t('shop.sale') }}</span>
      </div>
      <div class="px-5 pt-5">
        <p v-if="product.category?.name || product.vendor" class="mb-2 text-[10px] font-bold tracking-widest text-primary uppercase">{{ product.category?.name || product.vendor }}</p>
        <h2 class="font-headline text-base font-bold text-white transition-colors group-hover:text-primary">{{ product.title }}</h2>
        <p v-if="product.description" class="mt-2 line-clamp-2 text-xs leading-relaxed text-on-surface-variant">{{ product.description }}</p>
      </div>
    </RouterLink>
    <div class="mt-auto p-5">
      <div class="flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-4">
        <div>
          <p v-if="product.availableForSale" class="mb-1 flex items-center gap-1.5 text-[10px] text-emerald-400"><span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>{{ t('shop.design.inStock') }}</p>
          <p class="font-headline text-lg font-bold text-white"><span v-if="!variant" class="text-xs font-normal text-on-surface-variant">{{ t('shop.from') }} </span>{{ money(variant?.price || product.priceRange.minVariantPrice, locale) }}</p>
          <del v-if="onSale" class="text-xs text-outline"><span class="sr-only">{{ t('shop.originalPrice') }} </span>{{ money(product.compareAtPriceRange.minVariantPrice, locale) }}</del>
        </div>
        <button v-if="variant || !product.availableForSale" type="button" data-analytics-click="Product Card: Add To Cart" :data-analytics-item="product.handle" :disabled="pending || cart.busy || !variant?.availableForSale || !product.availableForSale" :aria-label="`${t('shop.add')}: ${product.title}`" class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-on-primary transition-colors hover:bg-primary-fixed" @click="add">
          <span class="material-symbols-outlined" aria-hidden="true">{{ pending ? 'hourglass_empty' : 'shopping_cart' }}</span>{{ t('shop.order') }}
        </button>
        <RouterLink v-else :to="`/shop/${product.handle}`" class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-on-primary hover:bg-primary-fixed"><span class="material-symbols-outlined" aria-hidden="true">shopping_cart</span>{{ t('shop.chooseVariant') }}</RouterLink>
      </div>
      <p v-if="added" role="status" class="mt-3 text-xs text-primary">{{ t('shop.added') }} <RouterLink to="/winkelmand" class="underline">{{ t('shop.viewCart') }}</RouterLink></p>
      <p v-if="error" role="alert" class="mt-3 text-xs text-error">{{ t(error) }}</p>
    </div>
  </article>
</template>
