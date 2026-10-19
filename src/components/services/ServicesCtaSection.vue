<script setup>
import { servicePhotos } from '../../data/servicePhotos'
import { useI18n } from 'vue-i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="overflow-hidden px-6 py-20 md:px-8 md:py-32">
    <div class="relative mx-auto max-w-screen-2xl overflow-hidden rounded-3xl bg-stone-900 p-10 sm:p-16 md:p-24">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 z-10 bg-gradient-to-b from-stone-900 via-stone-900/80 to-transparent md:bg-gradient-to-r"></div>
        <img
          :alt="t('images.workshop')"
          class="h-full w-full object-cover opacity-30 md:opacity-20"
          :src="servicePhotos['workshop']"
          loading="lazy"
        />
      </div>

      <div class="relative z-10 max-w-2xl text-center md:text-left">
        <h2 class="mb-6 font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:mb-8 md:text-7xl">{{ t('servicesPage.cta.title') }}</h2>
        <p class="mb-10 text-base text-on-surface-variant md:mb-12 md:text-xl">{{ t('servicesPage.cta.text') }}</p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row md:justify-start md:gap-6">
          <AppLinkButton class="shadow-xl shadow-primary/30" size="md" to="/offerte">
            {{ t('servicesPage.cta.askAdvice') }}
          </AppLinkButton>
          <AppLinkButton size="md" to="/portfolio" variant="glass">
            {{ t('servicesPage.cta.viewPortfolio') }}
          </AppLinkButton>
        </div>
      </div>
    </div>
  </section>
</template>
