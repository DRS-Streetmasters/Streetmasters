<script setup>
import { trackEvent } from '../lib/analytics'
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ShopLayout from '../components/shop/ShopLayout.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppLinkButton from '../components/ui/AppLinkButton.vue'
import { getCustomer, hostedAccountUrl, login, logout, readSession, updateCustomer } from '../lib/customerAccount'
import { money, safeShopifyUrl } from '../lib/shopify'

const { t, locale, te } = useI18n()
const session = ref(readSession())
const customer = ref(null)
const busy = ref(false)
const error = ref('')
const details = ref('')
const saved = ref(false)
const form = reactive({ firstName: '', lastName: '' })
const orders = computed(() => customer.value?.orders.nodes || [])
const status = value => te(`shop.statuses.${value}`) ? t(`shop.statuses.${value}`) : (value || '').replaceAll('_', ' ')
async function run(action) {
  if (busy.value) return
  busy.value = true; error.value = ''; details.value = ''
  try { await action() } catch (cause) { error.value = cause.message?.startsWith('shop.') ? cause.message : 'shop.errors.account'; details.value = cause.details || ''; session.value = readSession() }
  finally { busy.value = false }
}
async function load(more = false) {
  await run(async () => {
    const next = await getCustomer(more ? customer.value.orders.pageInfo.endCursor : null)
    if (more) next.orders.nodes = [...orders.value, ...next.orders.nodes]
    customer.value = next
    form.firstName = next.firstName || ''; form.lastName = next.lastName || ''
  })
}
async function save() { saved.value = false; await run(async () => { await updateCustomer({ ...form }); saved.value = true; trackEvent('Account: Profile Saved') }) }
async function signOut() { customer.value = null; session.value = null; await run(logout) }
onMounted(() => { if (session.value) load() })
</script>

<template>
  <ShopLayout>
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4"><h1 class="font-headline text-4xl font-bold md:text-5xl">{{ t('shop.account') }}</h1><AppButton data-analytics-click="Account: Logout" v-if="session" variant="glass" size="xs" :disabled="busy" @click="signOut">{{ t('shop.logout') }}</AppButton></div>
    <p v-if="error" role="alert" class="mb-6 rounded-xl border border-error/30 p-4 text-error">{{ t(error) }} {{ details }}</p>
    <p v-if="busy" role="status" class="mb-5 text-primary">{{ t('shop.loading') }}</p>
    <section v-if="!session" class="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-container/15 to-surface-container-low px-6 py-14 text-center md:px-12">
      <span class="material-symbols-outlined text-6xl text-primary" aria-hidden="true">garage</span><h2 class="mt-5 font-headline text-3xl font-bold">{{ t('shop.loginTitle') }}</h2><p class="mt-5 leading-relaxed text-on-surface-variant">{{ t('shop.loginText') }}</p><AppButton data-analytics-click="Account: Login" class="mt-8" :disabled="busy" @click="run(() => login(locale))">{{ t('shop.login') }}</AppButton>
    </section>
    <AppButton data-analytics-click="Account: Retry" v-else-if="!customer && !busy" @click="load()">{{ t('shop.retry') }}</AppButton>
    <div v-if="session && customer" class="grid gap-8 lg:grid-cols-[360px_1fr]">
      <section class="self-start rounded-2xl border border-white/10 bg-surface-container-low p-6"><h2 class="mb-6 text-xl font-bold">{{ t('shop.profile') }}</h2><form data-analytics-submit="Account: Save Submitted" class="space-y-4" @submit.prevent="save"><div><label class="mb-2" for="first-name">{{ t('shop.firstName') }}</label><input data-analytics-focus="Account: First Name Focused" id="first-name" v-model="form.firstName" autocomplete="given-name" maxlength="100" /></div><div><label class="mb-2" for="last-name">{{ t('shop.lastName') }}</label><input data-analytics-focus="Account: Last Name Focused" id="last-name" v-model="form.lastName" autocomplete="family-name" maxlength="100" /></div><div><p class="text-sm text-on-surface-variant">{{ t('shop.email') }}</p><p class="mt-2 break-all">{{ customer.emailAddress?.emailAddress }}</p></div><AppButton data-analytics-click="Account: Save" size="xs" type="submit" :disabled="busy">{{ t('shop.save') }}</AppButton><p v-if="saved" role="status" class="text-primary">{{ t('shop.saved') }}</p></form><div class="mt-7 border-t border-white/10 pt-6"><a data-analytics-click="Account: Manage Account" :href="hostedAccountUrl" class="text-sm text-primary underline">{{ t('shop.manageAccount') }}</a><p class="mt-3 text-xs leading-relaxed text-on-surface-variant">{{ t('shop.accountExternal') }}</p></div></section>
      <section><h2 class="mb-5 text-2xl font-bold">{{ t('shop.orders') }}</h2><p v-if="!orders.length" class="text-on-surface-variant">{{ t('shop.noOrders') }}</p><article v-for="order in orders" :key="order.id" class="mb-4 rounded-2xl border border-white/10 bg-surface-container-low p-6"><div class="flex flex-wrap justify-between gap-4"><div><h3 class="font-headline text-lg font-bold">{{ order.name }}</h3><p class="mt-1 text-sm text-on-surface-variant">{{ new Date(order.processedAt).toLocaleDateString(locale === 'nl' ? 'nl-BE' : 'en-GB') }}</p></div><p class="font-bold text-primary">{{ money(order.totalPrice, locale) }}</p></div><div class="mt-4 flex flex-wrap gap-3 text-xs"><span class="rounded-full bg-white/5 px-3 py-2">{{ status(order.financialStatus) }}</span><span class="rounded-full bg-white/5 px-3 py-2">{{ status(order.fulfillmentStatus) }}</span></div><a data-analytics-click="Account: Order Details" v-if="order.statusPageUrl" :href="safeShopifyUrl(order.statusPageUrl)" class="mt-5 inline-block text-sm text-primary underline">{{ t('shop.orderDetails') }}</a></article><AppButton data-analytics-click="Account: More" v-if="customer.orders.pageInfo.hasNextPage" variant="glass" :disabled="busy" @click="load(true)">{{ t('shop.more') }}</AppButton></section>
    </div>
    <AppLinkButton data-analytics-click="Account: Back Shop" class="mt-8" to="/shop" variant="glass">{{ t('shop.backShop') }}</AppLinkButton>
  </ShopLayout>
</template>
