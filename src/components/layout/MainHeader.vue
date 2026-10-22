<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { syncLocale } from '../../i18n'
import { useCartStore } from '../../stores/cart'
import ShopNavMenu from './ShopNavMenu.vue'
import AppLinkButton from '../ui/AppLinkButton.vue'

const logoUrl = `${import.meta.env.BASE_URL}logo.webp`
const route = useRoute()
const cart = useCartStore()
const mobileMenuOpen = ref(false)
const { t, locale } = useI18n()
const desktopLanguageMenuRef = ref(null)
const mobileLanguageMenuRef = ref(null)
const desktopLanguageMenuOpen = ref(false)
const mobileLanguageMenuOpen = ref(false)
const availableLocales = ['nl', 'en']

watch(mobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''

  if (!isOpen) {
    mobileLanguageMenuOpen.value = false
  }
})

watch(locale, (nextLocale) => {
  syncLocale(nextLocale)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('click', handleDocumentClick)
})

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  cart.initialize()
})

const isHome = computed(() => route.path === '/')
const isServices = computed(() => route.path === '/diensten')
const isPortfolio = computed(() => route.path === '/portfolio')
const isShop = computed(() => route.path.startsWith('/shop'))
const isAbout = computed(() => route.path === '/about')

const navLinkClass = (active) => {
  if (active) {
    return 'border-b-2 border-purple-600 pb-1 font-headline text-sm tracking-widest text-white uppercase'
  }

  return 'font-headline text-sm tracking-widest text-stone-400 transition-colors hover:text-white uppercase'
}

const mobileNavClass = (active) => {
  if (active) {
    return 'font-headline text-xl font-bold tracking-[0.16em] text-primary uppercase md:text-2xl md:tracking-[0.2em]'
  }

  return 'font-headline text-xl font-bold tracking-[0.16em] text-white uppercase md:text-2xl md:tracking-[0.2em]'
}

const setLocale = (nextLocale) => {
  locale.value = nextLocale
}

const toggleLanguageMenu = (menuType) => {
  if (menuType === 'desktop') {
    desktopLanguageMenuOpen.value = !desktopLanguageMenuOpen.value
    mobileLanguageMenuOpen.value = false
    return
  }

  mobileLanguageMenuOpen.value = !mobileLanguageMenuOpen.value
  desktopLanguageMenuOpen.value = false
}

const closeLanguageMenus = () => {
  desktopLanguageMenuOpen.value = false
  mobileLanguageMenuOpen.value = false
}

const selectLocale = (nextLocale) => {
  setLocale(nextLocale)
  closeLanguageMenus()
}

const handleDocumentClick = (event) => {
  const desktopContainsClick = desktopLanguageMenuRef.value?.contains(event.target)
  const mobileContainsClick = mobileLanguageMenuRef.value?.contains(event.target)

  if (!desktopContainsClick) {
    desktopLanguageMenuOpen.value = false
  }

  if (!mobileContainsClick) {
    mobileLanguageMenuOpen.value = false
  }
}
</script>

<template>
  <nav class="fixed top-0 z-[100] w-full border-b border-white/5 bg-stone-950/60 backdrop-blur-xl">
    <div class="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-2 md:px-8 md:py-3">
      <RouterLink data-analytics-click="Navigation: Logo Home" to="/" class="relative block h-12 w-48 shrink-0 overflow-hidden md:h-14 md:w-60">
        <img :src="logoUrl" :alt="t('images.logoHome')" width="1920" height="1080" class="absolute top-1/2 left-0 h-auto w-full -translate-y-1/2" />
      </RouterLink>

      <div class="hidden items-center gap-5 xl:gap-8 lg:flex">

        <RouterLink data-analytics-click="Navigation: Home" :class="navLinkClass(isHome)" to="/">{{ t('common.nav.home') }}</RouterLink>
        <ShopNavMenu :active="isShop" />
        <RouterLink data-analytics-click="Navigation: Services" :class="navLinkClass(isServices)" to="/diensten">{{ t('common.nav.services') }}</RouterLink>
        <RouterLink data-analytics-click="Navigation: Portfolio" :class="navLinkClass(isPortfolio)" to="/portfolio">
          {{ t('common.nav.portfolio') }}
        </RouterLink>
        <RouterLink data-analytics-click="Navigation: About" :class="navLinkClass(isAbout)" to="/about">
          {{ t('common.nav.about') }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-2 md:gap-3">
        <RouterLink data-analytics-click="Navigation: Cart" to="/winkelmand" class="relative flex h-11 w-11 items-center justify-center text-white/85 transition-colors hover:text-primary" :aria-label="`${t('shop.cart')} (${cart.count})`" :title="t('shop.cart')">
          <span class="material-symbols-outlined" aria-hidden="true">shopping_cart</span>
          <span v-if="cart.count" class="absolute -top-1 -right-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary-container px-1 text-[10px] font-bold text-white" aria-live="polite">{{ cart.count }}</span>
        </RouterLink>
        <div class="hidden items-center gap-3 lg:flex">
        <AppLinkButton data-analytics-click="Navigation: Quote" class="scale-95 active:scale-90" size="xs" to="/offerte">
          {{ t('common.nav.quote') }}
        </AppLinkButton>
        <div ref="desktopLanguageMenuRef" class="relative">
          <button data-analytics-click="Navigation: Language Menu"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-colors hover:text-white"
            aria-label="Open language menu"
            title="Open language menu"
            @click.stop="toggleLanguageMenu('desktop')"
          >
            <span class="material-symbols-outlined text-xl">translate</span>
          </button>
          <div
            v-if="desktopLanguageMenuOpen"
            class="absolute top-12 right-0 z-[120] min-w-28 rounded-xl border border-white/10 bg-stone-950/95 p-1.5 shadow-2xl backdrop-blur-xl"
          >
            <button data-analytics-click="Navigation: Change Language" :data-analytics-item="nextLocale"
              v-for="nextLocale in availableLocales"
              :key="`desktop-${nextLocale}`"
              class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-bold tracking-widest transition-colors"
              :class="locale === nextLocale ? 'bg-primary text-on-primary' : 'text-white/85 hover:bg-white/5 hover:text-white'"
              @click="selectLocale(nextLocale)"
            >
              {{ t(`common.language.${nextLocale}`) }}
            </button>
          </div>
        </div>
      </div>

      <button data-analytics-click="Navigation: Open Mobile Menu" :aria-label="t('common.nav.home') + ' menu'" class="flex items-center justify-center p-2 text-white lg:hidden" @click="mobileMenuOpen = true">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
      </div>
    </div>
  </nav>

  <div
    id="mobile-menu-overlay"
    class="fixed inset-0 z-[110] bg-surface lg:hidden"
    :class="mobileMenuOpen ? 'visible-menu' : 'hidden-menu'"
  >
    <div class="flex h-full flex-col px-6 py-6 md:px-8">
      <div class="mb-8 flex items-center justify-between md:mb-12">
        <RouterLink data-analytics-click="Navigation: Logo Home" to="/" class="relative block h-12 w-48 shrink-0 overflow-hidden md:h-14 md:w-60" @click="mobileMenuOpen = false">
          <img :src="logoUrl" :alt="t('images.logoHome')" width="1920" height="1080" class="absolute top-1/2 left-0 h-auto w-full -translate-y-1/2" />
        </RouterLink>
        <button data-analytics-click="Navigation: Close Mobile Menu" class="p-2 text-white" @click="mobileMenuOpen = false">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      <div ref="mobileLanguageMenuRef" class="relative mb-6 flex items-center justify-center gap-2">
        <button data-analytics-click="Navigation: Language Menu"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-colors hover:text-white"
          aria-label="Open language menu"
          title="Open language menu"
          @click.stop="toggleLanguageMenu('mobile')"
        >
          <span class="material-symbols-outlined text-xl">translate</span>
        </button>
        <div
          v-if="mobileLanguageMenuOpen"
          class="absolute top-12 left-1/2 z-[120] min-w-28 -translate-x-1/2 rounded-xl border border-white/10 bg-stone-950/95 p-1.5 shadow-2xl backdrop-blur-xl"
        >
          <button data-analytics-click="Navigation: Change Language" :data-analytics-item="nextLocale"
            v-for="nextLocale in availableLocales"
            :key="`mobile-${nextLocale}`"
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-bold tracking-widest transition-colors"
            :class="locale === nextLocale ? 'bg-primary text-on-primary' : 'text-white/85 hover:bg-white/5 hover:text-white'"
            @click="selectLocale(nextLocale)"
          >
            {{ t(`common.language.${nextLocale}`) }}
          </button>
        </div>
      </div>

      <div class="flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto py-4 text-center md:gap-6">
        <RouterLink data-analytics-click="Navigation: Home" :class="mobileNavClass(isHome)" to="/" @click="mobileMenuOpen = false">{{ t('common.nav.home') }}</RouterLink>
        <ShopNavMenu mobile :active="isShop" @navigate="mobileMenuOpen = false" />
        <RouterLink data-analytics-click="Navigation: Services" :class="mobileNavClass(isServices)" to="/diensten" @click="mobileMenuOpen = false">{{ t('common.nav.services') }}</RouterLink>
        <RouterLink data-analytics-click="Navigation: Portfolio" :class="mobileNavClass(isPortfolio)" to="/portfolio" @click="mobileMenuOpen = false">
          {{ t('common.nav.portfolio') }}
        </RouterLink>
        <RouterLink data-analytics-click="Navigation: About" :class="mobileNavClass(isAbout)" to="/about" @click="mobileMenuOpen = false">
          {{ t('common.nav.about') }}
        </RouterLink>
      </div>

      <div class="mt-auto pb-8 md:pb-12">
        <AppLinkButton data-analytics-click="Navigation: Quote Request" class="rounded-2xl text-sm shadow-xl shadow-primary/30" full-width size="lg" to="/offerte" @click="mobileMenuOpen = false">
          {{ t('common.nav.quoteRequest') }}
        </AppLinkButton>
      </div>
    </div>
  </div>
</template>
