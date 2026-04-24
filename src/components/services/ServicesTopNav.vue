<script setup>
import { RouterLink } from 'vue-router'
import AppLinkButton from '../ui/AppLinkButton.vue'

defineEmits(['open-menu'])
</script>

<template>
  <nav class="fixed top-0 z-[100] w-full border-b border-white/5 bg-stone-950/60 backdrop-blur-xl">
    <div class="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 md:px-8 md:py-6">
      <RouterLink to="/" class="font-headline text-xl font-bold tracking-tighter text-white md:text-2xl">Streetmasters</RouterLink>

      <div class="hidden items-center gap-8 lg:flex">
        <RouterLink class="font-headline text-sm tracking-widest text-stone-400 transition-colors hover:text-white uppercase" to="/">Home</RouterLink>
        <RouterLink class="border-b-2 border-red-600 pb-1 font-headline text-sm tracking-widest text-white uppercase" to="/diensten">Diensten</RouterLink>
        <a class="font-headline text-sm tracking-widest text-stone-400 transition-colors hover:text-white uppercase" href="#wrapping">Portfolio</a>
        <a class="font-headline text-sm tracking-widest text-stone-400 transition-colors hover:text-white uppercase" href="#">Over Ons</a>
      </div>

      <div class="hidden lg:block">
        <AppLinkButton class="scale-95 active:scale-90" size="xs" to="/offerte">
          Offerte
        </AppLinkButton>
      </div>

      <button class="flex items-center justify-center p-2 text-white lg:hidden" @click="$emit('open-menu')">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
    </div>
  </nav>
</template>
