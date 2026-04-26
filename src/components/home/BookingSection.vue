<script setup>
import { useI18n } from 'vue-i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'

defineProps({
  serviceTypes: {
    type: Array,
    required: true,
  },
})

const { t } = useI18n()
</script>

<template>
  <section id="booking-section" class="bg-surface-container-low py-16 md:py-24">
    <div class="mx-auto max-w-[1920px] px-6 md:px-24">
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 md:gap-24">
        <div id="about">
          <h2 class="mb-6 font-headline text-4xl font-black tracking-tighter text-white italic uppercase md:mb-8 md:text-5xl">
            {{ t('home.booking.title') }}
          </h2>
          <p class="mb-8 text-base leading-relaxed text-on-surface-variant md:mb-12 md:text-lg">
            {{ t('home.booking.subtitle') }}
          </p>
          <div class="space-y-4 md:space-y-6">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-primary">location_on</span>
              <p class="font-headline text-xs font-bold text-white md:text-sm">{{ t('home.booking.location') }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-primary">contact_support</span>
              <p class="font-headline text-xs font-bold text-white md:text-sm">{{ t('home.booking.phone') }}</p>
            </div>
          </div>
        </div>
        <div class="ghost-border relative rounded-xl bg-surface p-6 md:p-10">
          <form class="space-y-6 md:space-y-8">
            <div>
              <label class="mb-2 block font-label text-[9px] font-bold tracking-widest text-on-surface-variant uppercase md:text-[10px]">
                {{ t('home.booking.model') }}
              </label>
              <input
                class="w-full border-b border-outline-variant/30 bg-transparent pb-2 font-headline text-base text-white outline-none focus:border-primary md:pb-1 md:text-lg"
                :placeholder="t('home.booking.modelPlaceholder')"
                type="text"
              />
            </div>
            <div>
              <label class="mb-2 block font-label text-[9px] font-bold tracking-widest text-on-surface-variant uppercase md:text-[10px]">
                {{ t('home.booking.serviceType') }}
              </label>
              <select
                class="w-full appearance-none border-b border-outline-variant/30 bg-transparent pb-2 font-headline text-base text-white outline-none focus:border-primary md:pb-1 md:text-lg"
              >
                <option
                  v-for="serviceType in serviceTypes"
                  :key="serviceType"
                  class="bg-surface"
                >
                  {{ serviceType }}
                </option>
              </select>
            </div>
            <AppLinkButton class="text-base md:text-lg" full-width size="lg" to="/offerte">
              {{ t('home.booking.submit') }}
            </AppLinkButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
