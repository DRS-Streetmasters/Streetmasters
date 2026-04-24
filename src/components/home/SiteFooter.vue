<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="w-full border-t border-neutral-800/15 bg-zinc-950 pb-24 lg:pb-0">
    <div class="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-8 px-8 py-10 md:flex-row md:px-12 md:py-12">
      <div class="text-center md:text-left">
        <div class="mb-2 font-headline text-xl font-bold tracking-tighter text-white uppercase">STREETMASTERS</div>
        <p class="font-body text-[9px] tracking-widest text-neutral-500 uppercase md:text-[10px]">COPYRIGHT 2024 STREETMASTERS PERFORMANCE.</p>
        <p class="mt-1 font-body text-[9px] tracking-widest text-neutral-500 uppercase md:text-[10px]">BTW: BE0753461752</p>
      </div>
      <div class="flex flex-wrap justify-center gap-6 md:gap-8">
        <RouterLink class="text-[9px] tracking-widest text-neutral-500 transition-colors hover:text-primary uppercase md:text-[10px]" to="/about">Privacy</RouterLink>
        <RouterLink class="text-[9px] tracking-widest text-neutral-500 transition-colors hover:text-primary uppercase md:text-[10px]" to="/diensten">Wagenpark</RouterLink>
        <RouterLink class="text-[9px] tracking-widest text-neutral-500 transition-colors hover:text-primary uppercase md:text-[10px]" to="/offerte">Locatie</RouterLink>
      </div>
      <div class="flex gap-6">
        <span class="material-symbols-outlined cursor-pointer text-white transition-colors hover:text-primary">share</span>
      </div>
    </div>
  </footer>
</template>
