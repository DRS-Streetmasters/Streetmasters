<script setup>
import AppLinkButton from '../ui/AppLinkButton.vue'
</script>

<template>
  <section class="mb-16 px-6 md:mb-24 md:px-8">
    <div class="mx-auto max-w-screen-2xl">
      <div class="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div class="max-w-3xl">
          <span class="mb-3 block font-label text-[10px] tracking-[0.3em] text-primary uppercase md:mb-4 md:text-xs">Precision Services</span>
          <h1 class="mb-6 font-headline text-4xl leading-tight font-bold tracking-tighter sm:text-5xl md:mb-8 md:text-8xl md:leading-none">Diensten Overzicht</h1>
          <p class="text-base leading-relaxed text-on-surface-variant md:text-xl">
            Van moleculaire bescherming tot esthetische transformaties. Ontdek onze gecategoriseerde diensten voor de ultieme automotive ervaring.
          </p>
        </div>
        <div class="no-scrollbar flex gap-2 overflow-x-auto pb-2 md:gap-4 md:pb-0">
          <AppLinkButton class="rounded-full bg-surface-container-high px-4 py-2 whitespace-nowrap md:px-6 md:py-3" href="#exterior" size="sm" variant="surface">Exterieur</AppLinkButton>
          <AppLinkButton class="rounded-full bg-surface-container-high px-4 py-2 whitespace-nowrap md:px-6 md:py-3" href="#interior" size="sm" variant="surface">Interieur</AppLinkButton>
          <AppLinkButton class="rounded-full bg-surface-container-high px-4 py-2 whitespace-nowrap md:px-6 md:py-3" href="#wrapping" size="sm" variant="surface">Wrapping</AppLinkButton>
        </div>
      </div>
    </div>
  </section>
</template>
