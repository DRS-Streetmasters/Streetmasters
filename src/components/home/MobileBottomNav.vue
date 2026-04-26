<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[1.5rem] bg-zinc-900/95 px-4 pt-3 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:hidden">
    <RouterLink class="flex flex-col items-center justify-center px-4 py-2 text-primary transition-transform active:scale-90" to="/">
      <span class="material-symbols-outlined fill-star">home</span>
      <span class="mt-1 text-[9px] font-bold uppercase">Home</span>
    </RouterLink>
    <RouterLink class="flex flex-col items-center justify-center px-4 py-2 text-neutral-400 transition-transform active:scale-90" to="/portfolio">
      <span class="material-symbols-outlined">photo_library</span>
      <span class="mt-1 text-[9px] font-bold uppercase">Portfolio</span>
    </RouterLink>
    <RouterLink class="flex flex-col items-center justify-center px-4 py-2 text-neutral-400 transition-transform active:scale-90" to="/offerte">
      <span class="material-symbols-outlined">event_available</span>
      <span class="mt-1 text-[9px] font-bold uppercase">Offerte</span>
    </RouterLink>
  </nav>
</template>
