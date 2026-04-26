<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BookingSection from '../components/home/BookingSection.vue'
import HeroSection from '../components/home/HeroSection.vue'
import ServicesSection from '../components/home/ServicesSection.vue'
import ShowcaseSection from '../components/home/ShowcaseSection.vue'
import MainFooter from '../components/layout/MainFooter.vue'
import MainHeader from '../components/layout/MainHeader.vue'
import { getAllServicesWithMockImages, getHomeServiceTypes } from '../data/servicesCatalog'
import { getOfferBenefits } from '../data/offerContent'

const { locale } = useI18n()

const services = computed(() => getAllServicesWithMockImages(locale.value))
const serviceTypes = computed(() => getHomeServiceTypes(locale.value))
const offerBenefits = computed(() => getOfferBenefits(locale.value))
</script>

<template>
  <div class="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
    <MainHeader />

    <main>
      <HeroSection />
      <ServicesSection :services="services" :offer-benefits="offerBenefits" />
      <ShowcaseSection />
      <BookingSection :service-types="serviceTypes" />
    </main>

    <MainFooter />
  </div>
</template>
