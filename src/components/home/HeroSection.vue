<script setup>
import AppLinkButton from '../ui/AppLinkButton.vue'
</script>

<template>
  <section class="relative flex min-h-[85vh] items-center overflow-hidden md:h-[90vh]">
    <div class="absolute inset-0 z-0">
      <img
        class="h-full w-full object-cover brightness-50"
        src="https://lh3.googleusercontent.com/aida/ADBb0uh8J56UWrxlPA6uwCnlwRFEMva0jUKcWIn4yz6TVsvtZL2dAvnToI-apLm887Eanf9QIRi3zOUeoQW2qZAdByDCTL4lqoDpWrlT0kuqaSbm1Wwb6si3_I3rmrbBmdfZw3SR2HbCeft0fxohk7mX8Oq_BJ7ISQ_LS_KEaka3XuKGrB2mC_A9td4wUwcX3Z_iOTLzf_e2UpkYRq3tipFxgyCYTnSJNCcFAM4bPdkZyaakFBy4UNDkrkoZ-Q63M3Tjh023NG6RQIT6"
        alt="Luxury sports car close-up"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
    </div>
    <div class="relative z-10 mx-auto w-full max-w-[1920px] px-6 pt-28 pb-20 md:px-24 md:py-0">
      <div class="max-w-4xl space-y-6 md:space-y-8">
        <span class="inline-block font-label text-xs font-bold tracking-[0.2em] text-primary uppercase md:tracking-[0.3em]">
          Automotive Perfectie
        </span>
        <h1
          class="font-headline text-4xl leading-[1.1] font-black tracking-tighter text-white italic uppercase sm:text-5xl md:text-8xl md:leading-[0.9]"
        >
          Exclusieve Car <br class="hidden md:block" /> Detailing &
          <br class="hidden md:block" />
          Wrapping
        </h1>
        <div class="flex flex-col gap-4 pt-4 sm:flex-row md:gap-6">
          <AppLinkButton class="w-full text-base hover:scale-105 sm:w-auto md:text-lg" size="lg" to="/offerte">
            OFFERTE AANVRAGEN
          </AppLinkButton>
          <AppLinkButton class="w-full text-base sm:w-auto md:text-lg" variant="glass" size="lg" to="/diensten">
            DIENSTEN
          </AppLinkButton>
        </div>
      </div>
    </div>
  </section>
</template>
