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
  <section id="exterior" class="scroll-mt-section px-6 pb-20 md:px-8 md:pb-32">
    <div class="mx-auto max-w-screen-2xl">
      <div class="mb-8 flex items-center gap-4 md:mb-12 md:gap-6">
        <h2 class="font-headline text-2xl font-bold tracking-tight whitespace-nowrap md:text-4xl">{{ t('servicesPage.sections.exterior') }}</h2>
        <div class="h-px flex-1 bg-white/10"></div>
      </div>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
        <article
          v-for="service in services"
          :key="service.title"
          class="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface-container-low transition-colors hover:border-primary/30"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :alt="service.title"
              :src="service.image"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div class="flex flex-1 flex-col p-6 md:p-8">
            <h3 class="mb-3 font-headline text-xl font-bold md:text-2xl">{{ service.title }}</h3>
            <p class="mb-6 flex-1 text-sm leading-relaxed text-on-surface-variant md:mb-8">{{ service.description }}</p>
            <AppLinkButton full-width size="sm" to="/offerte" variant="surface">
              {{ t('common.cta.requestQuote') }}
            </AppLinkButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
