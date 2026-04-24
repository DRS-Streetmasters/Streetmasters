<script setup>
import { RouterLink } from 'vue-router'
import AppLinkButton from '../ui/AppLinkButton.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['close-menu'])
</script>

<template>
  <div
    class="fixed inset-0 z-[110] bg-surface lg:hidden"
    :class="isOpen ? 'visible-menu' : 'hidden-menu'"
    id="mobile-menu-overlay"
  >
    <div class="flex h-full flex-col px-8 py-6">
      <div class="mb-12 flex items-center justify-between">
        <RouterLink to="/" class="font-headline text-2xl font-bold tracking-tighter text-white">Streetmasters</RouterLink>
        <button class="p-2 text-white" @click="$emit('close-menu')">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>
      <div class="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <RouterLink class="font-headline text-2xl font-bold tracking-[0.2em] text-white uppercase" to="/" @click="$emit('close-menu')">Home</RouterLink>
        <RouterLink class="font-headline text-2xl font-bold tracking-[0.2em] text-primary uppercase" to="/diensten" @click="$emit('close-menu')">Diensten</RouterLink>
        <a class="font-headline text-2xl font-bold tracking-[0.2em] text-white uppercase" href="#wrapping" @click="$emit('close-menu')">Portfolio</a>
        <a class="font-headline text-2xl font-bold tracking-[0.2em] text-white uppercase" href="#" @click="$emit('close-menu')">Over Ons</a>
      </div>
      <div class="mt-auto pb-12">
        <AppLinkButton class="rounded-2xl text-sm shadow-xl shadow-primary/30" full-width size="lg" to="/offerte" @click="$emit('close-menu')">
          Offerte Aanvragen
        </AppLinkButton>
      </div>
    </div>
  </div>
</template>
