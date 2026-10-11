<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MainHeader from '../components/layout/MainHeader.vue'
import MainFooter from '../components/layout/MainFooter.vue'
import PageHero from '../components/layout/PageHero.vue'
import OfferRequestForm from '../components/offer/OfferRequestForm.vue'
import OfferSidebar from '../components/offer/OfferSidebar.vue'
import { getOfferServiceCategories } from '../data/servicesCatalog'
import { getOfferBenefits } from '../data/offerContent'

const { t, locale } = useI18n()

const offerServiceCategories = computed(() => getOfferServiceCategories(locale.value))
const offerBenefits = computed(() => getOfferBenefits(locale.value))
</script>

<template>
  <div class="relative overflow-hidden bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-32 -left-32 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[140px]"></div>
      <div class="absolute top-1/3 -right-28 h-[26rem] w-[26rem] rounded-full bg-secondary/10 blur-[140px]"></div>
      <div class="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-primary-container/15 blur-[120px]"></div>
    </div>

    <MainHeader />

    <main class="relative">
      <PageHero :label="t('common.brand')" :title="t('offerPage.header.title')" :description="t('offerPage.header.subtitle')" target="#offer-form" />
      <div id="offer-form" class="mx-auto max-w-screen-2xl scroll-mt-28 px-4 pt-10 pb-16 md:px-12 md:pt-16 md:pb-24">

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div class="space-y-8 md:space-y-12 lg:col-span-8">
          <OfferRequestForm :categories="offerServiceCategories" />
        </div>

        <OfferSidebar :benefits="offerBenefits" />
      </div>
      </div>
    </main>

    <MainFooter />
  </div>
</template>
