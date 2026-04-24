<script setup>
defineProps({
  benefits: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <aside class="space-y-6 md:space-y-8 lg:col-span-4">
    <div class="rounded-[1.5rem] border border-white/10 bg-surface-container-highest/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm md:rounded-[2rem] md:p-8">
      <h3 class="mb-6 font-headline text-lg font-bold tracking-tight uppercase md:mb-8 md:text-xl">Waarom Streetmasters?</h3>
      <ul class="space-y-4 md:space-y-6">
        <li v-for="benefit in benefits" :key="benefit.title" class="flex gap-4">
          <span class="material-symbols-outlined text-xl text-primary shrink-0 md:text-2xl">verified</span>
          <div>
            <p class="font-headline text-[11px] font-bold uppercase md:text-sm">{{ benefit.title }}</p>
            <p class="text-xs leading-relaxed text-on-surface-variant md:text-sm">{{ benefit.description }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface-container/85 p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm md:rounded-[2rem] md:p-8">
      <div class="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
      <p class="relative mb-3 font-label text-xs tracking-[0.2em] text-on-surface-variant uppercase md:mb-4 md:text-sm">Heeft u direct vragen?</p>
      <a class="relative block font-headline text-xl font-bold text-primary transition-transform hover:scale-105 md:text-2xl" href="tel:+32469438702">
        +32 469 43 87 02
      </a>
      <p class="relative mt-3 text-xs text-stone-500 md:mt-4 md:text-sm">Bereikbaar: Ma - Za 09:00 - 18:00</p>
    </div>
  </aside>
</template>
