<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { beforeLaunch, isPreview, launchAt, openLaunchedSite } from './lib/launch'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setPageMeta } from './lib/seo'
import LaunchView from './views/LaunchView.vue'

const waitingForLaunch = ref(beforeLaunch && !isPreview)
const route = useRoute()
const { t } = useI18n()
const pageCopy = {
  home: ['home.hero.title', 'home.services.subtitle'],
  diensten: ['servicesPage.header.title', 'servicesPage.header.subtitle'],
  portfolio: ['portfolioPage.title', 'portfolioPage.subtitle'],
  offerte: ['offerPage.header.title', 'offerPage.header.subtitle'],
  about: ['aboutPage.title', 'aboutPage.subtitle'],
  shop: ['shop.title', 'shop.design.intro'],
  product: ['shop.label', 'shop.design.intro'],
  cart: ['shop.cart', 'shop.emptyCartHint'],
  'not-found': ['notFound.title', 'notFound.description'],
}
watchEffect(() => {
  const keys = waitingForLaunch.value ? ['launch.heading', 'launch.description'] : pageCopy[route.name] || pageCopy.home
  setPageMeta(t(keys[0]), t(keys[1]))
  document.querySelector('link[rel="canonical"]').href = `https://streetmasters.be${waitingForLaunch.value ? '/' : route.path}`
  document.querySelector('meta[name="robots"]').content = (isPreview && beforeLaunch) || ['cart', 'not-found'].includes(route.name) ? 'noindex,follow' : 'index,follow'
})
let timer
function checkLaunch() {
  if (Date.now() < launchAt) return
  clearInterval(timer)
  document.removeEventListener('visibilitychange', checkLaunch)
  // Preview URLs need a fresh router base; public visitors stay on the same page.
  if (isPreview) openLaunchedSite()
  else waitingForLaunch.value = false
}
onMounted(() => {
  if (!beforeLaunch) return
  timer = setInterval(checkLaunch, 1000)
  document.addEventListener('visibilitychange', checkLaunch)
})
onUnmounted(() => {
  clearInterval(timer)
  document.removeEventListener('visibilitychange', checkLaunch)
})
</script>

<template>
  <Transition name="launch" mode="out-in">
    <LaunchView v-if="waitingForLaunch" />
    <div v-else><RouterView /></div>
  </Transition>
</template>

<style>
.launch-leave-active { transition: opacity 800ms ease-in, filter 800ms ease-in; }
.launch-enter-active { transition: opacity 1000ms ease-out, filter 1000ms ease-out; }
.launch-leave-to, .launch-enter-from { opacity: 0; filter: blur(6px); }
@media (prefers-reduced-motion: reduce) {
  .launch-leave-active, .launch-enter-active { transition: opacity 150ms linear; }
  .launch-leave-to, .launch-enter-from { filter: none; }
}
</style>
