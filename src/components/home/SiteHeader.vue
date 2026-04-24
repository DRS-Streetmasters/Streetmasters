<script setup>
import { RouterLink } from 'vue-router'
import AppButton from '../ui/AppButton.vue'
import AppLinkButton from '../ui/AppLinkButton.vue'

defineEmits(['open-menu'])
</script>

<template>
  <header class="fixed top-0 z-50 w-full bg-zinc-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md">
    <nav class="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-4 md:px-6 md:py-5">
      <div class="font-headline text-xl font-black tracking-[-0.04em] text-white uppercase md:text-2xl">
        eSTREETMASTERS
      </div>

      <div class="hidden items-center gap-8 font-headline text-sm font-bold tracking-tighter lg:flex">
        <a class="border-b-2 border-[#FF003C] pb-1 text-[#FF003C]" href="#">Home</a>
        <RouterLink class="text-neutral-400 transition-colors duration-300 hover:text-white" to="/diensten">Diensten</RouterLink>
        <a class="text-neutral-400 transition-colors duration-300 hover:text-white" href="#showcase">Portfolio</a>
        <a class="text-neutral-400 transition-colors duration-300 hover:text-white" href="#about">Over Ons</a>
      </div>

      <div class="flex items-center gap-3 md:gap-4">
        <div class="hidden items-center gap-4 lg:flex">
          <AppButton class="rounded-full px-6 py-2 text-xs" variant="outline" size="sm">
            BEKIJK DIENSTEN
          </AppButton>
          <AppLinkButton class="hover:shadow-[0_0_20px_rgba(255,179,178,0.3)]" size="xs" to="/offerte">
            OFFERTE
          </AppLinkButton>
        </div>
        <button class="p-2 text-white lg:hidden" @click="$emit('open-menu')">
          <span class="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </nav>
  </header>
</template>
