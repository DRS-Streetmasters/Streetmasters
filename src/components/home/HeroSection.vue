<script setup>
import { useI18n } from 'vue-i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="relative flex min-h-[85vh] items-center overflow-hidden md:h-[90vh]">
    <div class="absolute inset-0 z-0">
      <img
        class="h-full w-full object-cover brightness-50"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtm2fVavx9cG5ys_2VtqbtX-jIs9v51ElBYY01dHR2kz7LhL4fOgVdxTyhApJc3w59CmfQ28iq7G9sfj04OluPgrOYtpXWqhZk--ClEjax44coMvuYZKa6xW7Q45DkkJ9KjDYQe4FNPJQ_ufGb_5OsnHgIBMcfd3bIpHRUeii84YCedNfJ7at4ijHdhL6ImrPgz9QOrHdtnM7UWSFzRAYwUJNzpn3ULz6jvBAqrqqmahs6IXOmmy1DGbhH-EcpjFno45tvyTqOtuU"
        alt="Streetmasters hero foto"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
    </div>
    <div class="relative z-10 mx-auto w-full max-w-[1920px] px-6 pt-28 pb-20 md:px-24 md:py-0">
      <div class="max-w-4xl space-y-6 md:space-y-8">
        <span class="inline-block font-label text-xs font-bold tracking-[0.2em] text-primary uppercase md:tracking-[0.3em]">
          {{ t('home.hero.label') }}
        </span>
        <h1
          class="font-headline text-4xl leading-[1.1] font-black tracking-tighter text-white italic uppercase sm:text-5xl md:text-8xl md:leading-[0.9]"
        >
          {{ t('home.hero.title') }}
        </h1>
        <div class="flex flex-col gap-4 pt-4 sm:flex-row md:gap-6">
          <AppLinkButton class="w-full text-base hover:scale-105 sm:w-auto md:text-lg" size="lg" to="/offerte">
            {{ t('home.hero.quote') }}
          </AppLinkButton>
          <AppLinkButton class="w-full text-base sm:w-auto md:text-lg" variant="glass" size="lg" to="/diensten">
            {{ t('home.hero.services') }}
          </AppLinkButton>
        </div>
      </div>
    </div>
  </section>
</template>
