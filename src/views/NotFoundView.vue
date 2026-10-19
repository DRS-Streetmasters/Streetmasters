<script setup>
import { useI18n } from 'vue-i18n'
import MainHeader from '../components/layout/MainHeader.vue'
import MainFooter from '../components/layout/MainFooter.vue'
import AppLinkButton from '../components/ui/AppLinkButton.vue'

const { t } = useI18n()
const publicBase = import.meta.env.BASE_URL
</script>

<template>
  <div class="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
    <MainHeader />

    <main class="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div class="absolute inset-0" aria-hidden="true">
        <img class="h-full w-full object-cover brightness-50" :src="`${publicBase}image00001.jpeg`" alt="" />
        <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
      </div>

      <div class="relative z-10 mx-auto w-full max-w-4xl px-6 pt-32 pb-20 text-center md:pt-40 md:pb-24">
        <h1 class="font-headline text-[clamp(2.75rem,8vw,6rem)] leading-[1.05] text-balance font-black tracking-tighter text-purple-400 italic drop-shadow-[0_0_40px_rgba(192,132,252,0.3)]">
          {{ t('notFound.heading') }}
          <span class="sr-only">— {{ t('notFound.title') }}</span>
        </h1>
        <div class="mx-auto mt-4 flex items-center justify-center gap-3 text-purple-300" aria-hidden="true">
          <span class="h-px w-12 bg-gradient-to-r from-transparent to-purple-400/70"></span>
          <span class="material-symbols-outlined text-4xl">directions_car</span>
          <span class="h-px w-12 bg-gradient-to-l from-transparent to-purple-400/70"></span>
        </div>
        <p class="mt-6 font-headline text-2xl font-bold text-white md:text-4xl">{{ t('notFound.title') }}</p>
        <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-stone-300 md:text-lg">{{ t('notFound.description') }}</p>
        <AppLinkButton data-analytics-click="Not Found: Back Home" class="mt-8 w-full sm:w-auto" size="md" to="/">
          {{ t('notFound.backHome') }}
        </AppLinkButton>
      </div>
    </main>

    <MainFooter />
  </div>
</template>
