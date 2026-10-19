<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const logoUrl = `${import.meta.env.BASE_URL}logo.png`
</script>

<template>
  <footer class="w-full border-t border-white/5 bg-stone-950 px-6 py-12 md:px-8">
    <div class="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-10 md:flex-row md:gap-6">
      <div class="flex flex-col items-center gap-2 md:items-start">
        <RouterLink to="/" class="relative block h-12 w-48 overflow-hidden md:h-14 md:w-60">
          <img :src="logoUrl" :alt="t('images.logoHome')" width="1920" height="1080" loading="lazy" class="absolute top-1/2 left-0 h-auto w-full -translate-y-1/2" />
        </RouterLink>
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
