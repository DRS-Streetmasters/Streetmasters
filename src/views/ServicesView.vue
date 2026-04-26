<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MainHeader from '../components/layout/MainHeader.vue'
import CustomProjectSection from '../components/services/CustomProjectSection.vue'
import ExteriorSection from '../components/services/ExteriorSection.vue'
import InteriorSection from '../components/services/InteriorSection.vue'
import ServicesCtaSection from '../components/services/ServicesCtaSection.vue'
import MainFooter from '../components/layout/MainFooter.vue'
import ServicesPageHeader from '../components/services/ServicesPageHeader.vue'
import WrappingSection from '../components/services/WrappingSection.vue'
import { getExteriorServices, getInteriorFeatures, getWrappingServices } from '../data/servicesCatalog'

const { locale } = useI18n()

const exteriorServices = computed(() => getExteriorServices(locale.value))
const wrappingServices = computed(() => getWrappingServices(locale.value))
const interiorFeatures = computed(() => getInteriorFeatures(locale.value))
</script>

<template>
  <div class="overflow-x-hidden bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
    <MainHeader />

    <main class="pt-24 md:pt-32">
      <ServicesPageHeader />
      <ExteriorSection :services="exteriorServices" />
      <InteriorSection :features="interiorFeatures" />
      <WrappingSection :services="wrappingServices" />
      <CustomProjectSection />
      <ServicesCtaSection />
    </main>

    <MainFooter />
  </div>
</template>
