<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { syncLocale } from '../../i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'

const route = useRoute()
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
})

const isHome = computed(() => route.path === '/')
const isServices = computed(() => route.path === '/diensten')
const isPortfolio = computed(() => route.path === '/portfolio')
const isAbout = computed(() => route.path === '/about')

const navLinkClass = (active) => {
  if (active) {
    return 'border-b-2 border-red-600 pb-1 font-headline text-sm tracking-widest text-white uppercase'
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
    <div class="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 md:px-8 md:py-6">
      <RouterLink to="/" class="font-headline text-xl font-bold tracking-tighter text-white md:text-2xl">{{ t('common.brand') }}</RouterLink>

      <div class="hidden items-center gap-8 lg:flex">
        <RouterLink :class="navLinkClass(isHome)" to="/">{{ t('common.nav.home') }}</RouterLink>
        <RouterLink :class="navLinkClass(isServices)" to="/diensten">{{ t('common.nav.services') }}</RouterLink>
        <RouterLink :class="navLinkClass(isPortfolio)" to="/portfolio">
          {{ t('common.nav.portfolio') }}
        </RouterLink>
        <RouterLink :class="navLinkClass(isAbout)" to="/about">
          {{ t('common.nav.about') }}
        </RouterLink>
      </div>

      <div class="hidden items-center gap-3 lg:flex">
        <AppLinkButton class="scale-95 active:scale-90" size="xs" to="/offerte">
          {{ t('common.nav.quote') }}
        </AppLinkButton>
        <div ref="desktopLanguageMenuRef" class="relative">
          <button
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
            <button
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

      <button class="flex items-center justify-center p-2 text-white lg:hidden" @click="mobileMenuOpen = true">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
    </div>
  </nav>

  <div
    id="mobile-menu-overlay"
    class="fixed inset-0 z-[110] bg-surface lg:hidden"
    :class="mobileMenuOpen ? 'visible-menu' : 'hidden-menu'"
  >
    <div class="flex h-full flex-col px-6 py-6 md:px-8">
      <div class="mb-8 flex items-center justify-between md:mb-12">
        <RouterLink to="/" class="font-headline text-xl font-bold tracking-tighter text-white md:text-2xl" @click="mobileMenuOpen = false">
          {{ t('common.brand') }}
        </RouterLink>
        <button class="p-2 text-white" @click="mobileMenuOpen = false">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      <div ref="mobileLanguageMenuRef" class="relative mb-6 flex items-center justify-center gap-2">
        <button
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
          <button
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

      <div class="flex flex-1 flex-col items-center justify-center gap-6 text-center md:gap-8">
        <RouterLink :class="mobileNavClass(isHome)" to="/" @click="mobileMenuOpen = false">{{ t('common.nav.home') }}</RouterLink>
        <RouterLink :class="mobileNavClass(isServices)" to="/diensten" @click="mobileMenuOpen = false">{{ t('common.nav.services') }}</RouterLink>
        <RouterLink :class="mobileNavClass(isPortfolio)" to="/portfolio" @click="mobileMenuOpen = false">
          {{ t('common.nav.portfolio') }}
        </RouterLink>
        <RouterLink :class="mobileNavClass(isAbout)" to="/about" @click="mobileMenuOpen = false">
          {{ t('common.nav.about') }}
        </RouterLink>
      </div>

      <div class="mt-auto pb-8 md:pb-12">
        <AppLinkButton class="rounded-2xl text-sm shadow-xl shadow-primary/30" full-width size="lg" to="/offerte" @click="mobileMenuOpen = false">
          {{ t('common.nav.quoteRequest') }}
        </AppLinkButton>
      </div>
    </div>
  </div>
</template>
