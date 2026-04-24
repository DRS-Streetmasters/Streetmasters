<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppLinkButton from '../ui/AppLinkButton.vue'

const route = useRoute()
const mobileMenuOpen = ref(false)

watch(mobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const isHome = computed(() => route.path === '/')
const isServices = computed(() => route.path === '/diensten')

const navLinkClass = (active) => {
  if (active) {
    return 'border-b-2 border-red-600 pb-1 font-headline text-sm tracking-widest text-white uppercase'
  }

  return 'font-headline text-sm tracking-widest text-stone-400 transition-colors hover:text-white uppercase'
}

const mobileNavClass = (active) => {
  if (active) {
    return 'font-headline text-2xl font-bold tracking-[0.2em] text-primary uppercase'
  }

  return 'font-headline text-2xl font-bold tracking-[0.2em] text-white uppercase'
}
</script>

<template>
  <nav class="fixed top-0 z-[100] w-full border-b border-white/5 bg-stone-950/60 backdrop-blur-xl">
      <div class="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 md:px-8 md:py-6">
        <RouterLink to="/" class="font-headline text-xl font-bold tracking-tighter text-white md:text-2xl">Streetmasters</RouterLink>

        <div class="hidden items-center gap-8 lg:flex">
          <RouterLink :class="navLinkClass(isHome)" to="/">Home</RouterLink>
          <RouterLink :class="navLinkClass(isServices)" to="/diensten">Diensten</RouterLink>
          <RouterLink class="font-headline text-sm tracking-widest text-stone-400 transition-colors hover:text-white uppercase" :to="{ path: '/diensten', hash: '#wrapping' }">
            Portfolio
          </RouterLink>
          <RouterLink class="font-headline text-sm tracking-widest text-stone-400 transition-colors hover:text-white uppercase" :to="{ path: '/', hash: '#about' }">
            Over Ons
          </RouterLink>
        </div>

        <div class="hidden lg:block">
          <AppLinkButton class="scale-95 active:scale-90" size="xs" to="/offerte">
            Offerte
          </AppLinkButton>
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
    <div class="flex h-full flex-col px-8 py-6">
      <div class="mb-12 flex items-center justify-between">
        <RouterLink to="/" class="font-headline text-2xl font-bold tracking-tighter text-white" @click="mobileMenuOpen = false">
          Streetmasters
        </RouterLink>
        <button class="p-2 text-white" @click="mobileMenuOpen = false">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      <div class="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <RouterLink :class="mobileNavClass(isHome)" to="/" @click="mobileMenuOpen = false">Home</RouterLink>
        <RouterLink :class="mobileNavClass(isServices)" to="/diensten" @click="mobileMenuOpen = false">Diensten</RouterLink>
        <RouterLink :class="mobileNavClass(false)" :to="{ path: '/diensten', hash: '#wrapping' }" @click="mobileMenuOpen = false">
          Portfolio
        </RouterLink>
        <RouterLink :class="mobileNavClass(false)" :to="{ path: '/', hash: '#about' }" @click="mobileMenuOpen = false">
          Over Ons
        </RouterLink>
      </div>

      <div class="mt-auto pb-12">
        <AppLinkButton class="rounded-2xl text-sm shadow-xl shadow-primary/30" full-width size="lg" to="/offerte" @click="mobileMenuOpen = false">
          Offerte Aanvragen
        </AppLinkButton>
      </div>
    </div>
  </div>
</template>
