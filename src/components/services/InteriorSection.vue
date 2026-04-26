<script setup>
import { useI18n } from 'vue-i18n'
import AppLinkButton from '../ui/AppLinkButton.vue'

defineProps({
  features: {
    type: Array,
    required: true,
  },
})

const { t } = useI18n()
</script>

<template>
  <section id="interior" class="scroll-mt-section bg-surface-container-low px-6 py-20 md:px-8 md:py-32">
    <div class="mx-auto max-w-screen-2xl">
      <div class="mb-12 flex items-center gap-4 md:mb-16 md:gap-6">
        <h2 class="font-headline text-2xl font-bold tracking-tight whitespace-nowrap md:text-4xl">{{ t('servicesPage.sections.interior') }}</h2>
        <div class="h-px flex-1 bg-white/10"></div>
      </div>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 md:gap-12">
        <div class="relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-video lg:aspect-auto">
          <img
            alt="Luxury Interior"
            class="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent"></div>
        </div>

        <div class="flex flex-col justify-center space-y-10 md:space-y-12">
          <div>
            <h3 class="mb-4 font-headline text-2xl font-bold md:mb-6 md:text-4xl">{{ t('servicesPage.interior.title') }}</h3>
            <p class="mb-6 text-base leading-relaxed text-on-surface-variant md:mb-8 md:text-lg">
              {{ t('servicesPage.interior.text') }}
            </p>
            <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              <li v-for="feature in features" :key="feature" class="flex items-center gap-3 text-sm">
                <span class="material-symbols-outlined text-xl text-primary">check_circle</span>{{ feature }}
              </li>
            </ul>
          </div>

          <div class="rounded-2xl border border-white/5 bg-surface-container p-6 md:p-8">
            <h3 class="mb-3 font-headline text-xl font-bold md:mb-4 md:text-2xl">{{ t('servicesPage.interior.cardTitle') }}</h3>
            <p class="mb-6 text-sm text-on-surface-variant">
              {{ t('servicesPage.interior.cardText') }}
            </p>
            <div class="flex flex-col gap-3 sm:flex-row md:gap-4">
              <AppLinkButton class="flex-1 active:scale-[0.98]" size="sm" to="/offerte">
                {{ t('common.cta.requestQuote') }}
              </AppLinkButton>
              <AppLinkButton class="flex-1 active:scale-[0.98]" size="sm" to="/offerte" variant="glass">
                {{ t('servicesPage.interior.viewPackages') }}
              </AppLinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
