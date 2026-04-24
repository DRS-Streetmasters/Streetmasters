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
    class="fixed inset-0 z-[60] bg-surface/95 p-8 backdrop-blur-2xl transition-all duration-300"
    :class="isOpen ? 'flex flex-col' : 'hidden'"
  >
    <div class="mb-16 flex items-center justify-between">
      <RouterLink class="font-headline text-2xl font-bold tracking-tighter text-white" to="/">Streetmasters</RouterLink>
      <button class="-mr-2 p-2" @click="$emit('close-menu')">
        <span class="material-symbols-outlined text-3xl">close</span>
      </button>
    </div>

    <nav class="flex flex-col gap-8 font-headline text-xl tracking-[0.2em] uppercase">
      <RouterLink class="border-b border-white/10 pb-4 transition-colors hover:text-primary" to="/" @click="$emit('close-menu')">Home</RouterLink>
      <RouterLink class="border-b border-white/10 pb-4 transition-colors hover:text-primary" to="/diensten" @click="$emit('close-menu')">Diensten</RouterLink>
      <a class="border-b border-white/10 pb-4 transition-colors hover:text-primary" href="#" @click="$emit('close-menu')">Portfolio</a>
      <a class="border-b border-white/10 pb-4 transition-colors hover:text-primary" href="#" @click="$emit('close-menu')">Over Ons</a>
    </nav>

    <div class="mt-auto">
      <AppLinkButton full-width to="/offerte" @click="$emit('close-menu')">Offerte aanvragen</AppLinkButton>
    </div>
  </div>
</template>
