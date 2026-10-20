<script setup>
import ScrollCue from '../ui/ScrollCue.vue'
defineProps({ label: String, title: { type: String, required: true }, description: String, target: { type: String, required: true } })
const imageUrl = `${import.meta.env.BASE_URL}image00001.jpeg`
</script>

<template>
  <section data-page-hero class="relative flex min-h-[100dvh] items-center overflow-hidden">
    <div class="absolute inset-0 z-0" aria-hidden="true">
      <img class="h-full w-full object-cover brightness-50" :src="imageUrl" alt="" fetchpriority="high" />
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
    </div>
    <div class="relative z-10 mx-auto w-full max-w-[1920px] px-6 pt-32 pb-32 md:px-24 md:pt-40 md:pb-40">
      <div class="max-w-4xl space-y-6 md:space-y-8">
        <span v-if="label" class="inline-block font-label text-xs font-bold tracking-[0.2em] text-primary uppercase md:tracking-[0.3em]">{{ label }}</span>
        <h1 class="font-headline text-4xl leading-[1.1] font-black tracking-tighter text-white italic uppercase sm:text-5xl md:text-8xl md:leading-[0.9]">{{ title }}</h1>
        <p v-if="description" class="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{{ description }}</p>
        <div v-if="$slots.default" class="flex flex-col gap-4 pt-4 sm:flex-row md:gap-6"><slot /></div>
      </div>
      <div v-if="$slots.badges" class="mt-10 md:mt-12"><slot name="badges" /></div>
    </div>
    <ScrollCue class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-8" :target="target" />
  </section>
</template>
