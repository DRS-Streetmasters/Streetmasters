<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineProps({
  services: {
    type: Array,
    required: true,
  },
  offerBenefits: {
    type: Array,
    required: true,
  },
})

const { t } = useI18n()
const customMockImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw'
const fallbackMockImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOhSHdpASyPJUptoQg53mOGzluhW-91r7cupBl63yEoC0D3k6egngAw3cxwyehGyE37KcBGISO47a3vCMEkB78WOtTGrTk1KOxZFyi7P7HpSoT0TeD5IguhqxgNzBzTN-j4PA6gpEhUCjBKQRtyBtaKzrrA4r2IfqQ0fRcOMZH-Mm5VPWy9oBxp3gJZtxz_2lo-dmVKL41SjAnzoHmMmUyNX-PtcTtZq0XoR2sNvhvwHHtX2YIPBEe3nMneIHTv3yGuzqQ_XBPKE'

const onImageError = (event) => {
  if (event?.target?.src !== fallbackMockImage) {
    event.target.src = fallbackMockImage
  }
}
</script>

<template>
  <section id="services" class="bg-surface py-16 md:py-24">
    <div class="mx-auto max-w-[1920px] px-6 md:px-24">
      <div class="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end md:gap-8">
        <div class="max-w-4xl">
          <h2 class="mb-4 font-headline text-3xl leading-none font-bold tracking-tighter text-white italic uppercase md:text-6xl">
            {{ t('home.services.title') }}
          </h2>
          <p class="max-w-3xl text-sm leading-relaxed text-on-surface-variant md:text-base">
            {{ t('home.services.subtitle') }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="benefit in offerBenefits"
              :key="benefit.title"
              class="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase md:text-xs"
            >
              {{ benefit.title }}
            </span>
          </div>
        </div>
        <RouterLink class="group mb-0 flex items-center gap-2 font-headline text-xs font-bold tracking-widest text-primary uppercase md:mb-2" to="/diensten">
          {{ t('home.services.viewAll') }}
          <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </RouterLink>
      </div>

      <div class="overflow-x-auto pb-2 custom-scrollbar">
        <div class="flex w-max gap-4 md:gap-6">
        <article
          v-for="service in services"
          :key="service.id"
          class="group relative h-[22rem] w-[16rem] shrink-0 overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-low md:h-[24rem] md:w-[18rem]"
        >
          <img
            :src="service.image"
            :alt="service.title"
            class="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-70"
            @error="onImageError"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
          <div class="absolute right-6 bottom-6 left-6">
            <h3 class="mb-1 font-headline text-lg font-bold text-white md:mb-2 md:text-xl">{{ service.title }}</h3>
            <div class="hidden h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100 md:block">
              <p class="mb-4 text-xs text-on-surface-variant">{{ service.description }}</p>
            </div>
          </div>
        </article>

        <article
          class="group relative flex h-[22rem] w-[16rem] shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-surface-container p-6 text-center md:h-[24rem] md:w-[18rem] md:p-8"
        >
          <img
            :src="customMockImage"
            alt="Maatwerk service mock foto"
            class="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
            @error="onImageError"
          />
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div class="relative z-10">
            <span class="material-symbols-outlined mb-3 text-3xl text-primary md:mb-4 md:text-4xl">add_circle</span>
            <h3 class="mb-3 font-headline text-lg font-bold text-white italic uppercase md:mb-4 md:text-xl">{{ t('home.services.customTitle') }}</h3>
            <p class="mb-5 text-xs text-on-surface-variant md:mb-6 md:text-sm">
              {{ t('home.services.customText') }}
            </p>
            <RouterLink
              class="border-b border-primary pb-1 font-headline text-[10px] font-black tracking-widest text-primary transition-all hover:border-white hover:text-white md:text-xs uppercase"
              to="/offerte"
            >
              {{ t('home.services.customLink') }}
            </RouterLink>
          </div>
        </article>
        </div>
      </div>
    </div>
  </section>
</template>
