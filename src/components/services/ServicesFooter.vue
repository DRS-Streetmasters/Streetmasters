<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="w-full border-t border-white/5 bg-stone-950 px-6 py-12 md:px-8">
    <div class="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-10 md:flex-row md:gap-6">
      <div class="flex flex-col items-center gap-2 md:items-start">
        <span class="font-headline text-xl font-bold text-white">Streetmasters</span>
        <p class="text-center font-body text-xs leading-relaxed text-stone-500 md:text-left md:text-sm">Performance Detailing Excellence.</p>
        <p class="text-center font-body text-[10px] leading-relaxed tracking-wide text-stone-500 md:text-left md:text-xs">BTW: BE0753461752</p>
      </div>
      <div class="flex flex-wrap justify-center gap-6 md:gap-8">
        <RouterLink class="font-body text-xs text-stone-500 decoration-red-600 underline-offset-4 transition-colors hover:text-red-500 hover:underline md:text-sm" to="/about">Privacy Policy</RouterLink>
        <RouterLink class="font-body text-xs text-stone-500 decoration-red-600 underline-offset-4 transition-colors hover:text-red-500 hover:underline md:text-sm" to="/about">Algemene Voorwaarden</RouterLink>
        <RouterLink class="font-body text-xs text-stone-500 decoration-red-600 underline-offset-4 transition-colors hover:text-red-500 hover:underline md:text-sm" to="/offerte">Contact</RouterLink>
      </div>
      <div class="text-center font-body text-[10px] text-stone-500 md:text-sm">© 2024 Streetmasters Performance Detailing. All Rights Reserved.</div>
    </div>
  </footer>
</template>
