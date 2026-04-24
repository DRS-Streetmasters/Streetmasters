<script setup>
import { RouterLink } from 'vue-router'
import AppLinkButton from '../ui/AppLinkButton.vue'

defineEmits(['open-menu'])
</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-stone-950/80 shadow-2xl shadow-red-950/20 backdrop-blur-xl">
    <div class="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 md:px-8 md:py-6">
      <RouterLink class="font-headline text-xl font-bold tracking-tighter text-white md:text-2xl" to="/">Streetmasters</RouterLink>

      <div class="hidden items-center gap-8 font-headline text-sm tracking-widest lg:flex uppercase">
        <RouterLink class="text-stone-400 transition-colors hover:text-white" to="/">Home</RouterLink>
        <RouterLink class="text-stone-400 transition-colors hover:text-white" to="/diensten">Diensten</RouterLink>
        <a class="text-stone-400 transition-colors hover:text-white" href="#">Portfolio</a>
        <a class="text-stone-400 transition-colors hover:text-white" href="#">Over Ons</a>
        <AppLinkButton class="scale-95 hover:shadow-[0_0_20px_rgba(255,179,178,0.2)] active:scale-90" size="xs" to="/offerte">
          Offerte aanvragen
        </AppLinkButton>
      </div>

      <button class="flex items-center justify-center p-2 text-white lg:hidden" @click="$emit('open-menu')">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
    </div>
  </nav>
</template>
