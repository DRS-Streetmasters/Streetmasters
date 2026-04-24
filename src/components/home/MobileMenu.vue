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
    class="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-2xl transition-all duration-300"
    :class="isOpen ? 'flex flex-col' : 'hidden'"
  >
    <div class="flex items-center justify-between px-4 py-4 md:py-5">
      <div class="font-headline text-xl font-black tracking-[-0.04em] text-white uppercase md:text-2xl">
        STREETMASTERS
      </div>
      <button class="p-2 text-white" @click="$emit('close-menu')">
        <span class="material-symbols-outlined text-3xl">close</span>
      </button>
    </div>
    <div class="flex flex-1 flex-col items-center justify-center gap-8 px-6">
      <RouterLink
        class="font-headline text-4xl font-black tracking-tighter text-white italic transition-colors hover:text-primary uppercase"
        to="/"
        @click="$emit('close-menu')"
      >
        Home
      </RouterLink>
      <RouterLink
        class="font-headline text-4xl font-black tracking-tighter text-white italic transition-colors hover:text-primary uppercase"
        to="/diensten"
        @click="$emit('close-menu')"
      >
        Diensten
      </RouterLink>
      <a
        class="font-headline text-4xl font-black tracking-tighter text-white italic transition-colors hover:text-primary uppercase"
        href="#showcase"
        @click="$emit('close-menu')"
      >
        Portfolio
      </a>
      <a
        class="font-headline text-4xl font-black tracking-tighter text-white italic transition-colors hover:text-primary uppercase"
        href="#about"
        @click="$emit('close-menu')"
      >
        Over Ons
      </a>
      <div class="my-4 h-px w-full bg-white/10"></div>
      <AppLinkButton class="text-lg shadow-[0_10px_40px_rgba(255,179,178,0.2)]" full-width size="lg" to="/offerte" @click="$emit('close-menu')">
        OFFERTE AANVRAGEN
      </AppLinkButton>
    </div>
    <div class="p-8 text-center">
      <p class="font-headline text-[10px] tracking-widest text-neutral-500 uppercase">Premium Detailing Solutions</p>
    </div>
  </div>
</template>
