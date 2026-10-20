<script setup>
import { useI18n } from 'vue-i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'
const { t } = useI18n()
</script>
<template>
  <section class="mt-20 rounded-3xl border border-primary/15 bg-gradient-to-br from-surface-container-high to-surface-container-low p-7 md:p-12">
    <div class="flex flex-col items-start justify-between gap-8 xl:flex-row xl:items-center">
      <div class="max-w-2xl"><p class="mb-3 text-xs font-bold tracking-[.2em] text-primary uppercase">{{ t('shop.design.adviceLabel') }}</p><h2 class="font-headline text-3xl font-black tracking-tight text-white uppercase">{{ t('shop.design.adviceTitle') }}</h2><p class="mt-4 leading-relaxed text-neutral-400">{{ t('shop.design.adviceText') }}</p></div>
      <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><AppLinkButton to="/diensten" variant="glass">{{ t('shop.design.services') }}</AppLinkButton><AppLinkButton to="/offerte">{{ t('shop.design.quote') }}</AppLinkButton></div>
    </div>
  </section>
</template>
