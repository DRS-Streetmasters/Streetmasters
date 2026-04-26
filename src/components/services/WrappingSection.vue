<script setup>
import { useI18n } from 'vue-i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'

defineProps({
  services: {
    type: Array,
    required: true,
  },
})

const { t } = useI18n()
</script>

<template>
  <section id="wrapping" class="scroll-mt-section px-6 py-20 md:px-8 md:py-32">
    <div class="mx-auto max-w-screen-2xl">
      <div class="mb-12 flex items-center gap-4 md:mb-16 md:gap-6">
        <h2 class="font-headline text-2xl font-bold tracking-tight whitespace-nowrap md:text-4xl">{{ t('servicesPage.sections.wrapping') }}</h2>
        <div class="h-px flex-1 bg-white/10"></div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          class="group relative overflow-hidden rounded-3xl border border-white/5 aspect-[4/5] sm:aspect-[3/4]"
          :class="index === 2 ? 'sm:col-span-2 md:col-span-1' : ''"
        >
          <img
            :alt="service.title"
            :src="service.image"
            class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-6 md:p-10">
            <h3 class="mb-2 font-headline text-2xl font-bold md:text-3xl">{{ service.title }}</h3>
            <p class="mb-6 max-w-xs text-xs text-stone-300 md:text-sm">{{ service.description }}</p>
            <AppLinkButton size="sm" to="/offerte" variant="white">
              {{ t('common.cta.requestQuote') }}
            </AppLinkButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
