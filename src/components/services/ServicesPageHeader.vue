<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../layout/PageHero.vue'
import AppLinkButton from '../ui/AppLinkButton.vue'

const { t } = useI18n()
</script>

<template>
  <PageHero class="mb-12 md:mb-16" :label="t('servicesPage.header.label')" :title="t('servicesPage.header.title')" :description="t('servicesPage.header.subtitle')" target="#exterior">
    <AppLinkButton class="w-full text-base hover:scale-105 sm:w-auto md:text-lg" href="#exterior" size="lg">{{ t('servicesPage.header.exterior') }}</AppLinkButton>
    <AppLinkButton class="w-full text-base sm:w-auto md:text-lg" href="#interior" size="lg" variant="glass">{{ t('servicesPage.header.interior') }}</AppLinkButton>
    <AppLinkButton class="w-full text-base sm:w-auto md:text-lg" href="#wrapping" size="lg" variant="glass">{{ t('servicesPage.header.wrapping') }}</AppLinkButton>
  </PageHero>
</template>
