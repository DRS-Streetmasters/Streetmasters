<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/layout/PageHero.vue'
import MainHeader from '../components/layout/MainHeader.vue'
import MainFooter from '../components/layout/MainFooter.vue'
import AppLinkButton from '../components/ui/AppLinkButton.vue'

const { t, locale } = useI18n()

const valuesByLocale = {
  nl: [
    {
      title: 'Passie Gedreven',
      text: 'Streetmasters is gebouwd door autoliefhebbers met oog voor detail en afwerking.',
    },
    {
      title: 'Premium Aanpak',
      text: 'Van intake tot oplevering: alles verloopt volgens een strak en transparant proces.',
    },
    {
      title: 'Resultaat Eerst',
      text: 'Wij focussen op duurzame bescherming, esthetiek en tevreden klanten op lange termijn.',
    },
  ],
  en: [
    {
      title: 'Driven by Passion',
      text: 'Streetmasters is built by car enthusiasts with a sharp eye for detail and finish.',
    },
    {
      title: 'Premium Approach',
      text: 'From intake to delivery: everything follows a tight and transparent process.',
    },
    {
      title: 'Results First',
      text: 'We focus on lasting protection, aesthetics and long-term customer satisfaction.',
    },
  ],
}

const values = computed(() => valuesByLocale[locale.value] ?? valuesByLocale.nl)
</script>

<template>
  <div class="overflow-x-hidden bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
    <MainHeader />

    <main>
      <PageHero :label="t('aboutPage.label')" :title="t('aboutPage.title')" :description="t('aboutPage.subtitle')" target="#about-values" />
      <div class="px-6 pt-10 pb-20 md:px-8 md:pt-14 md:pb-32">
      <section id="about-values" class="mx-auto max-w-screen-2xl scroll-mt-28">
        <div class="mb-10 flex items-center gap-4 md:mb-12 md:gap-6">
          <h2 class="font-headline text-2xl font-bold tracking-tight whitespace-nowrap md:text-4xl">{{ t('aboutPage.valuesTitle') }}</h2>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <article
            v-for="value in values"
            :key="value.title"
            class="rounded-2xl border border-white/10 bg-surface-container-low p-6 md:p-8"
          >
            <h3 class="mb-3 font-headline text-xl font-bold uppercase md:text-2xl">{{ value.title }}</h3>
            <p class="text-sm leading-relaxed text-on-surface-variant md:text-base">{{ value.text }}</p>
          </article>
        </div>
      </section>

      <section class="mx-auto mt-16 max-w-screen-2xl md:mt-24">
        <div class="rounded-3xl border border-primary/20 bg-surface-container-low p-8 md:p-12">
          <h3 class="mb-4 font-headline text-3xl font-bold uppercase md:text-5xl">{{ t('aboutPage.ctaTitle') }}</h3>
          <p class="mb-8 max-w-2xl text-base text-on-surface-variant md:text-lg">
            {{ t('aboutPage.ctaText') }}
          </p>
          <AppLinkButton data-analytics-click="About: Request Quote" size="md" to="/offerte">{{ t('common.cta.requestQuote') }}</AppLinkButton>
        </div>
      </section>
      </div>
    </main>

    <MainFooter />
  </div>
</template>
