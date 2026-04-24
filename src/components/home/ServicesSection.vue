<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  services: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section id="services" class="bg-surface py-16 md:py-24">
    <div class="mx-auto max-w-[1920px] px-6 md:px-24">
      <div class="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end md:gap-8">
        <div class="max-w-2xl">
          <h2 class="mb-4 font-headline text-3xl leading-none font-bold tracking-tighter text-white italic uppercase md:text-6xl">
            Onze Expertise
          </h2>
          <p class="max-w-xl text-sm text-on-surface-variant md:text-base">
            Van microscopische lakcorrectie tot premium wrapping. Ontdek onze gespecialiseerde diensten voor uw voertuig.
          </p>
        </div>
        <RouterLink class="group mb-0 flex items-center gap-2 font-headline text-xs font-bold tracking-widest text-primary uppercase md:mb-2" to="/diensten">
          BEKIJK ALLE DIENSTEN
          <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-5">
        <article
          v-for="service in services"
          :key="service.title"
          class="group relative aspect-[4/5] overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-low sm:aspect-[3/4] md:aspect-[4/5]"
        >
          <img
            :src="service.image"
            :alt="service.title"
            class="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-70"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
          <div class="absolute right-6 bottom-6 left-6">
            <h3 class="mb-1 font-headline text-lg font-bold text-white md:mb-2 md:text-xl">{{ service.title }}</h3>
            <div class="hidden h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100 md:block">
              <p class="mb-4 text-xs text-on-surface-variant">{{ service.description }}</p>
            </div>
          </div>
        </article>

        <article
          class="group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-surface-container p-6 text-center sm:aspect-[3/4] md:aspect-[4/5] md:p-8"
        >
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <span class="material-symbols-outlined mb-3 text-3xl text-primary md:mb-4 md:text-4xl">add_circle</span>
          <h3 class="mb-3 font-headline text-lg font-bold text-white italic uppercase md:mb-4 md:text-xl">Maatwerk nodig?</h3>
          <p class="mb-5 text-xs text-on-surface-variant md:mb-6 md:text-sm">
            Staat uw gewenste service er niet tussen? Geen probleem.
          </p>
          <RouterLink
            class="border-b border-primary pb-1 font-headline text-[10px] font-black tracking-widest text-primary transition-all hover:border-white hover:text-white md:text-xs uppercase"
            to="/offerte"
          >
            CONTACT OPNEMEN
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>
