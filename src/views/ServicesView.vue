<script setup>
import MainHeader from '../components/layout/MainHeader.vue'
import CustomProjectSection from '../components/services/CustomProjectSection.vue'
import ExteriorSection from '../components/services/ExteriorSection.vue'
import InteriorSection from '../components/services/InteriorSection.vue'
import ServicesCtaSection from '../components/services/ServicesCtaSection.vue'
import ServicesFooter from '../components/services/ServicesFooter.vue'
import ServicesPageHeader from '../components/services/ServicesPageHeader.vue'
import WrappingSection from '../components/services/WrappingSection.vue'
import { exteriorServices, interiorFeatures, wrappingServices } from '../data/servicesCatalog'
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

    <ServicesFooter />
  </div>
</template>
