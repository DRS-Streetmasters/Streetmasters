<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ShopLayout from '../components/shop/ShopLayout.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppLinkButton from '../components/ui/AppLinkButton.vue'
import { useCartStore } from '../stores/cart'
import { money, safeShopifyUrl } from '../lib/shopify'

const cart = useCartStore()
const { t, locale } = useI18n()
const discount = ref('')
const note = ref('')
const saved = ref(false)
const checkoutBusy = ref(false)
watch(() => cart.cart?.id, () => { note.value = cart.cart?.note || ''; discount.value = cart.cart?.discountCodes[0]?.code || '' })
onMounted(() => cart.refresh())
async function saveNote() { saved.value = await cart.setNote(note.value) }
async function checkout() {
  checkoutBusy.value = true
  try {
    if (note.value !== (cart.cart?.note || '') && !await cart.setNote(note.value)) return
    if (await cart.refresh() && cart.count > 0) {
      const url = safeShopifyUrl(cart.cart.checkoutUrl)
      if (url !== '#') window.location.assign(url)
    }
  } finally { checkoutBusy.value = false }
}
</script>

<template>
  <ShopLayout>
    <h1 class="mb-8 font-headline text-4xl font-bold md:text-5xl">{{ t('shop.cart') }} <span class="text-primary">({{ cart.count }})</span></h1>
    <div v-if="cart.error" role="alert" class="mb-6 rounded-xl border border-error/30 p-4 text-error">{{ t(cart.error) }} {{ cart.details }} <button class="ml-3 underline" :disabled="cart.busy" @click="cart.refresh">{{ t('shop.retry') }}</button></div>
    <p v-if="!cart.initialized || (cart.busy && !cart.cart)" role="status">{{ t('shop.loading') }}</p>
    <div v-else-if="!cart.lines.length" class="rounded-3xl border border-white/10 bg-surface-container-low px-6 py-16 text-center"><span class="material-symbols-outlined text-6xl text-primary" aria-hidden="true">shopping_cart</span><h2 class="mt-5 font-headline text-2xl font-bold">{{ t('shop.emptyCart') }}</h2><p class="mt-3 text-on-surface-variant">{{ t('shop.emptyCartHint') }}</p><AppLinkButton to="/shop" class="mt-7">{{ t('shop.backShop') }}</AppLinkButton></div>
    <div v-else class="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
      <div class="space-y-5">
        <article v-for="line in cart.lines" :key="line.id" class="flex gap-4 rounded-2xl border border-white/10 bg-surface-container-low p-4 md:gap-6 md:p-6">
          <RouterLink :to="`/shop/${line.merchandise.product.handle}`" class="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5 sm:h-28 sm:w-28"><img v-if="line.merchandise.image" :src="line.merchandise.image.url" :alt="line.merchandise.image.altText || line.merchandise.product.title" class="h-full w-full object-contain" /></RouterLink>
          <div class="min-w-0 flex-1"><RouterLink :to="`/shop/${line.merchandise.product.handle}`" class="font-headline font-bold text-white">{{ line.merchandise.product.title }}</RouterLink><p v-if="line.merchandise.title !== 'Default Title'" class="mt-1 text-sm text-on-surface-variant">{{ line.merchandise.title }}</p><p class="mt-2 font-semibold text-primary">{{ money(line.cost.totalAmount, locale) }}</p>
            <div class="mt-4 flex flex-wrap items-center gap-4"><div class="inline-flex items-center overflow-hidden rounded-lg border border-outline-variant"><button class="h-9 w-9" :disabled="cart.busy || checkoutBusy" :aria-label="`${t('shop.quantity')} −: ${line.merchandise.product.title}`" @click="cart.updateLine(line.id, line.quantity - 1)">−</button><span class="min-w-8 text-center" :aria-label="t('shop.quantity')">{{ line.quantity }}</span><button class="h-9 w-9" :disabled="cart.busy || checkoutBusy || line.quantity >= 99" :aria-label="`${t('shop.quantity')} +: ${line.merchandise.product.title}`" @click="cart.updateLine(line.id, line.quantity + 1)">+</button></div><button class="text-xs text-on-surface-variant underline" :disabled="cart.busy || checkoutBusy" @click="cart.updateLine(line.id, 0)">{{ t('shop.remove') }}</button></div>
          </div>
        </article>
        <form class="rounded-2xl border border-white/10 p-5" @submit.prevent="saveNote"><label for="order-note" class="mb-3">{{ t('shop.note') }}</label><textarea id="order-note" v-model="note" rows="3" maxlength="1000" @input="saved = false"></textarea><AppButton size="xs" class="mt-3" variant="glass" type="submit" :disabled="cart.busy || checkoutBusy">{{ t('shop.saveNote') }}</AppButton><p v-if="saved" role="status" class="mt-3 text-sm text-primary">{{ t('shop.saved') }}</p></form>
        <AppLinkButton to="/shop" variant="glass">{{ t('shop.backShop') }}</AppLinkButton>
      </div>
      <aside class="rounded-2xl border border-primary/20 bg-surface-container-low p-6 lg:sticky lg:top-32">
        <form class="mb-6" @submit.prevent="cart.setDiscount(discount)"><label for="discount-code" class="mb-2">{{ t('shop.discount') }}</label><div class="flex gap-2"><input id="discount-code" v-model="discount" type="text" /><AppButton size="xs" type="submit" :disabled="cart.busy || checkoutBusy">{{ t('shop.apply') }}</AppButton></div></form>
        <div v-for="code in cart.cart.discountCodes" :key="code.code" class="mb-4 text-sm" :class="code.applicable ? 'text-primary' : 'text-error'" role="status"><p>{{ code.code }}{{ code.applicable ? ' ✓' : ` — ${t('shop.invalidDiscount')}` }}</p><button class="mt-1 underline" :disabled="cart.busy || checkoutBusy" @click="discount = ''; cart.setDiscount('')">{{ t('shop.remove') }}</button></div>
        <div class="flex justify-between gap-3 text-sm text-on-surface-variant"><span>{{ t('shop.subtotal') }}</span><span>{{ money(cart.cart.cost.subtotalAmount, locale) }}</span></div>
        <div class="mt-4 flex justify-between gap-3 border-t border-white/10 pt-4 text-xl font-bold"><span>{{ t('shop.total') }}</span><span>{{ money(cart.cart.cost.totalAmount, locale) }}</span></div>
        <p class="mt-4 text-xs leading-relaxed text-on-surface-variant">{{ t('shop.checkoutHint') }}</p>
        <AppButton class="mt-6" full-width :disabled="cart.busy || checkoutBusy" @click="checkout">{{ checkoutBusy ? t('shop.loading') : t('shop.checkout') }}</AppButton>
        <p class="mt-4 text-center text-xs leading-relaxed text-on-surface-variant">{{ t('shop.checkoutCaption') }}</p>
      </aside>
    </div>
  </ShopLayout>
</template>
