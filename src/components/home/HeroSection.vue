<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../layout/PageHero.vue'
import AppLinkButton from '../ui/AppLinkButton.vue'

const { t } = useI18n()
</script>

<template>
  <PageHero :label="t('home.hero.label')" :title="t('home.hero.title')" target="#home-services">
    <AppLinkButton class="w-full text-base hover:scale-105 sm:w-auto md:text-lg" size="lg" to="/offerte">
      {{ t('home.hero.quote') }}
    </AppLinkButton>
    <AppLinkButton class="w-full text-base sm:w-auto md:text-lg" variant="glass" size="lg" to="/diensten">
      {{ t('home.hero.services') }}
    </AppLinkButton>
  </PageHero>
</template>
