<script setup>
import { useI18n } from 'vue-i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="overflow-hidden px-6 py-20 md:px-8 md:py-32">
    <div class="relative mx-auto max-w-screen-2xl overflow-hidden rounded-3xl bg-stone-900 p-10 sm:p-16 md:p-24">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 z-10 bg-gradient-to-b from-stone-900 via-stone-900/80 to-transparent md:bg-gradient-to-r"></div>
        <img
          alt="Workshop Background"
          class="h-full w-full object-cover opacity-30 md:opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLwiPctXpMUgVzcd7UIfMdGRhw8oZVMwtp9ZqJC4Teqat0HZx6Atsu75FzEMNGBVIx2S9AszjMdrCPzc1s1PIDs0jUJHUOPzu_oy3hRn_FMeygzFwXvZoq6N1NLMN4gTM71Y-nSAfHDoP38OZ1ijWbc6BLqW44vtN42rdC3EJd8lrm1jd9WjJjLUnf8cMfn_Mrnnx0J-WGGZIkrRIXlhvqIlS8qokH6K2d_H2rRWvHdfvdkSVB0p5bpP6vzqJfAxNfBh7LnxmgCnM"
        />
      </div>

      <div class="relative z-10 max-w-2xl text-center md:text-left">
        <h2 class="mb-6 font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:mb-8 md:text-7xl">{{ t('servicesPage.cta.title') }}</h2>
        <p class="mb-10 text-base text-on-surface-variant md:mb-12 md:text-xl">{{ t('servicesPage.cta.text') }}</p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row md:justify-start md:gap-6">
          <AppLinkButton class="shadow-xl shadow-primary/30" size="md" to="/offerte">
            {{ t('servicesPage.cta.askAdvice') }}
          </AppLinkButton>
          <AppLinkButton size="md" to="/portfolio" variant="glass">
            {{ t('servicesPage.cta.viewPortfolio') }}
          </AppLinkButton>
        </div>
      </div>
    </div>
  </section>
</template>
