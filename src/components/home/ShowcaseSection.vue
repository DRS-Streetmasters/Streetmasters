<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="showcase" class="bg-surface-container-low py-16 md:py-24">
    <div class="mx-auto max-w-[1920px] px-6 md:px-24">
      <div class="mb-10 text-center md:mb-16">
        <span class="mb-3 block font-label text-[10px] font-bold tracking-[0.3em] text-secondary italic uppercase md:mb-4 md:text-xs md:tracking-[0.4em]">
          {{ t('home.showcase.label') }}
        </span>
        <h2 class="font-headline text-3xl leading-tight font-black tracking-tighter text-white italic uppercase sm:text-4xl md:text-7xl">
          {{ t('home.showcase.title') }}
        </h2>
      </div>
      <div class="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 shadow-2xl md:aspect-[21/9]">
        <div class="grid h-full w-full grid-cols-1 gap-2 md:grid-cols-2">
          <div class="relative h-full w-full overflow-hidden">
            <img
              alt="Interieur Voor"
              class="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-WLMboQH4byxLxyKcl8AVxXFPseG3I8VWNO19fr6rv4JNV_KGNeCtVtlakju5xDFo9dsUZzmj7ckfaFMjDg2S1YyesSbRuaG_WlHW2OBQoQPP3ge1_GsWLQFWrmsyiya3YU_t3RmpIdz5eLolrxrqbLk42rRQg2eTStFUuE4Eyfnob74wxcxl0BLQLTS8ihUBeOMlCk01UcRyEMB3kUssv_piG3Pg1ueavU9chaK4xgEdfPWC_aVxLjOqm8nnmP4rkZmUZElzt7I"
            />
            <div class="absolute top-4 left-4 z-10 border border-white/10 bg-black/80 px-4 py-1.5 font-headline text-[10px] font-black tracking-widest text-white shadow-lg uppercase">
              {{ t('home.showcase.before') }}
            </div>
            <div class="pointer-events-none absolute bottom-6 left-6 z-20">
              <p class="font-label text-[10px] tracking-widest text-white/60 uppercase">{{ t('home.showcase.beforeCaption') }}</p>
            </div>
          </div>
          <div class="relative h-full w-full overflow-hidden">
            <img
              alt="Interieur Na"
              class="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6qYo5W-Ndus4pay4YZZL8K_OoO0RoC1eXjZ79xpx6S7ZDJceDBIR1_CtNraUzc6pjt4KFtKylz2s1VBFm-jtCCFLKKmC57XnwbcPYgpV41lv-ZnPAwQKwQA7DQ32ZQvM7TK5AcKT7fgZ60mtA3egrjBO2OmYpMC5o9Fq55xuQoFH9NpukJReipWMfVnUAjKNYd0yjgbAEz9ZbADHi7KRGdJEue-AMxxUakCwkHqiAdogzruUUR47LPNLAcZTPQJqxJddgJOXIhiw"
            />
            <div class="absolute top-4 right-4 z-10 bg-primary/90 px-4 py-1.5 font-headline text-[10px] font-black tracking-widest text-on-primary-fixed shadow-lg uppercase">
              {{ t('home.showcase.after') }}
            </div>
            <div class="pointer-events-none absolute bottom-6 left-6 z-20">
              <h4 class="font-headline text-lg font-black text-white italic drop-shadow-lg uppercase md:text-2xl">EXECUTIVE DETAIL</h4>
              <p class="font-label text-[10px] tracking-widest text-primary drop-shadow-md uppercase">Deep clean & restoration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
