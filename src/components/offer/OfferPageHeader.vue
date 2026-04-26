<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="mb-10 md:mb-16">
    <h1 class="mb-4 font-headline text-4xl leading-tight font-bold tracking-tighter uppercase md:text-7xl">
      <span class="text-primary">{{ t('offerPage.header.title') }}</span>
    </h1>
    <p class="max-w-2xl font-body text-base leading-relaxed text-on-surface-variant md:text-lg">
      {{ t('offerPage.header.subtitle') }}
    </p>
  </div>
</template>
