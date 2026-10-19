<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ShopLayout from '../components/shop/ShopLayout.vue'
import AppLinkButton from '../components/ui/AppLinkButton.vue'
import { finishLogin } from '../lib/customerAccount'
const { t } = useI18n()
const router = useRouter()
const failed = ref(false)
onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  // Remove the one-time code immediately so it isn't retained in history or referrers.
  window.history.replaceState({}, '', window.location.pathname)
  try { await finishLogin(params); await router.replace('/account') }
  catch { failed.value = true }
})
</script>
<template>
  <ShopLayout><div class="py-16 text-center"><h1 class="font-headline text-3xl font-bold" :role="failed ? 'alert' : 'status'">{{ t(failed ? 'shop.errors.login' : 'shop.loginProgress') }}</h1><AppLinkButton data-analytics-click="Account Callback: Retry" v-if="failed" class="mt-8" to="/account">{{ t('shop.retry') }}</AppLinkButton></div></ShopLayout>
</template>
