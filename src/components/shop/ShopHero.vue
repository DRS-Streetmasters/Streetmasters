<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../layout/PageHero.vue'
import AppLinkButton from '../ui/AppLinkButton.vue'
const { t } = useI18n()
</script>

<template>
  <PageHero :label="t('shop.label')" :title="t('shop.title')" :description="t('shop.design.intro')" target="#shop-products">
    <AppLinkButton href="#shop-products" data-analytics-click="Shop Hero: Discover Products">
      {{ t('shop.discoverProducts') }}
      <span class="material-symbols-outlined ml-2" aria-hidden="true">arrow_downward</span>
    </AppLinkButton>
  </PageHero>
</template>
