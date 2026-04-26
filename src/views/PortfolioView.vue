<script setup>
import { useI18n } from 'vue-i18n'
import MainHeader from '../components/layout/MainHeader.vue'
import MainFooter from '../components/layout/MainFooter.vue'
import AppLinkButton from '../components/ui/AppLinkButton.vue'

const { t } = useI18n()

const placeholderSlots = [
  { id: 'slot-1' },
  { id: 'slot-2' },
  { id: 'slot-3' },
]
</script>

<template>
  <div class="overflow-x-hidden bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
    <MainHeader />

    <main class="px-6 pt-24 pb-20 md:px-8 md:pt-32 md:pb-32">
      <section class="mx-auto mb-14 max-w-screen-2xl md:mb-20">
        <p class="mb-3 font-label text-[10px] tracking-[0.3em] text-primary uppercase md:mb-4 md:text-xs">{{ t('portfolioPage.label') }}</p>
        <h1 class="mb-6 font-headline text-4xl font-bold tracking-tighter text-white uppercase md:mb-8 md:text-8xl">{{ t('portfolioPage.title') }}</h1>
        <p class="max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-xl">
          {{ t('portfolioPage.subtitle') }}
        </p>
      </section>

      <section class="mx-auto max-w-screen-2xl">
        <div class="mb-10 flex items-center gap-4 md:mb-12 md:gap-6">
          <h2 class="font-headline text-2xl font-bold tracking-tight whitespace-nowrap md:text-4xl">{{ t('portfolioPage.featured') }}</h2>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          <article
            v-for="slot in placeholderSlots"
            :key="slot.id"
            class="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface-container-low"
          >
            <div class="aspect-[4/5] bg-gradient-to-br from-surface-container-high to-surface-container-low"></div>
            <div class="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 md:p-8">
              <div>
                <p class="mb-2 font-headline text-xl font-bold uppercase md:text-2xl">{{ t('portfolioPage.yourCarHere') }}</p>
                <p class="text-xs text-on-surface-variant md:text-sm">{{ t('portfolioPage.comingSoon') }}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="mx-auto mt-16 max-w-screen-2xl md:mt-24">
        <div class="relative overflow-hidden rounded-3xl border border-primary/20 bg-surface-container-low p-8 md:p-12">
          <div class="absolute top-0 right-0 -mr-24 -mt-24 h-56 w-56 rounded-full bg-primary/10 blur-[90px]"></div>
          <div class="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div class="max-w-2xl">
              <h3 class="mb-3 font-headline text-3xl font-bold tracking-tight text-white uppercase md:text-5xl">
                {{ t('portfolioPage.ctaTitle') }}
              </h3>
              <p class="text-base leading-relaxed text-on-surface-variant md:text-lg">
                {{ t('portfolioPage.ctaText') }}
              </p>
            </div>
            <AppLinkButton class="w-full md:w-auto" size="md" to="/offerte">{{ t('common.cta.contactUs') }}</AppLinkButton>
          </div>
        </div>
      </section>
    </main>

    <MainFooter />
  </div>
</template>
