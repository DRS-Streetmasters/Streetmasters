<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="w-full border-t border-white/5 bg-stone-950 px-6 py-12 md:px-8">
    <div class="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-10 md:flex-row md:gap-6">
      <div class="flex flex-col items-center gap-2 md:items-start">
        <span class="font-headline text-xl font-bold text-white">{{ t('common.brand') }}</span>
        <p class="text-center font-body text-xs leading-relaxed text-stone-500 md:text-left md:text-sm">{{ t('common.footer.tagline') }}</p>
        <p class="text-center font-body text-[10px] leading-relaxed tracking-wide text-stone-500 md:text-left md:text-xs">{{ t('common.footer.vat') }}</p>
        <p class="text-center font-body text-[10px] leading-relaxed tracking-wide text-stone-500 md:text-left md:text-xs">
          Designed and developed by
          <a class="text-primary transition-colors hover:text-white" href="https://driesbielen.be" target="_blank" rel="noopener noreferrer">
            Dries Bielen
          </a>
        </p>
      </div>

      <div class="text-center font-body text-[10px] text-stone-500 md:text-sm">{{ t('common.footer.copyright') }}</div>
    </div>
  </footer>
</template>
