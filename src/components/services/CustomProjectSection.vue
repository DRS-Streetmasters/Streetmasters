<script setup>
import { useI18n } from 'vue-i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="px-6 pb-20 md:px-8 md:pb-32">
    <div class="mx-auto max-w-screen-2xl">
      <div class="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-primary/20 bg-surface-container-low p-8 md:flex-row md:items-center md:p-12">
        <div class="absolute top-0 right-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-primary/5 blur-[100px]"></div>
        <div class="relative z-10 max-w-2xl">
          <h2 class="mb-4 font-headline text-2xl font-bold tracking-tight text-white md:text-4xl">{{ t('servicesPage.customProject.title') }}</h2>
          <p class="text-base leading-relaxed text-on-surface-variant md:text-lg">
            {{ t('servicesPage.customProject.text') }}
          </p>
        </div>
        <div class="relative z-10 w-full shrink-0 md:w-auto">
          <AppLinkButton class="w-full hover:scale-105 md:w-auto" size="md" to="/offerte">
            {{ t('common.cta.requestQuote') }}
          </AppLinkButton>
        </div>
      </div>
    </div>
  </section>
</template>
