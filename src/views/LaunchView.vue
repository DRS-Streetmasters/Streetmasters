<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { launchAt } from '../lib/launch'

const { t } = useI18n()
const publicBase = import.meta.env.BASE_URL
const now = ref(Date.now())
const countdown = computed(() => {
  const seconds = Math.max(0, Math.ceil((launchAt - now.value) / 1000))
  return [
    { label: 'days', value: Math.floor(seconds / 86400) },
    { label: 'hours', value: Math.floor(seconds / 3600) % 24 },
    { label: 'minutes', value: Math.floor(seconds / 60) % 60 },
    { label: 'seconds', value: seconds % 60 },
  ]
})
let timer
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <main class="launch-screen relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-surface px-5 py-10 text-center font-body text-on-surface selection:bg-primary-container sm:px-8">
    <div class="absolute inset-0 -z-10" aria-hidden="true">
      <img class="h-full w-full object-cover brightness-[.35]" :src="`${publicBase}image00001.jpeg`" alt="" />
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-surface/60"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(113,4,216,0.16),transparent_70%)]"></div>
    </div>

    <div class="launch-logo relative mb-12 h-16 w-64 shrink-0 sm:mb-16 sm:w-72">
      <img :src="`${publicBase}logo.png`" :alt="t('common.brand')" width="1920" height="1080" class="absolute top-1/2 left-0 w-full -translate-y-1/2" />
    </div>
    <div class="w-full max-w-3xl">
      <p class="launch-eyebrow mb-5 text-xs font-semibold tracking-[.3em] text-purple-200 uppercase">{{ t('launch.eyebrow') }}</p>
      <h1 class="font-headline text-[clamp(3rem,9vw,6.5rem)] leading-[.95] whitespace-pre-line font-black tracking-tighter text-purple-400 italic drop-shadow-[0_0_40px_rgba(192,132,252,0.3)]">{{ t('launch.heading') }}</h1>
      <p class="launch-description mx-auto mt-6 max-w-md text-base leading-relaxed text-stone-300 sm:text-lg">{{ t('launch.description') }}</p>
      <div class="launch-divider mx-auto mt-9 flex items-center justify-center gap-3 text-purple-300" aria-hidden="true">
        <span class="h-px w-12 bg-gradient-to-r from-transparent to-purple-400/70"></span>
        <span class="material-symbols-outlined text-3xl">directions_car</span>
        <span class="h-px w-12 bg-gradient-to-l from-transparent to-purple-400/70"></span>
      </div>
      <dl class="mx-auto mt-6 grid max-w-xl grid-cols-4 gap-2 sm:gap-4" :aria-label="t('launch.countdownLabel')">
        <div v-for="unit in countdown" :key="unit.label" class="flex flex-col-reverse rounded-2xl border border-purple-300/15 bg-surface/55 px-1 py-5 backdrop-blur-md sm:py-6">
          <dt class="mt-2 text-[9px] font-medium tracking-[.12em] text-stone-400 uppercase sm:text-xs sm:tracking-[.2em]">{{ t(`launch.${unit.label}`) }}</dt>
          <dd class="font-headline text-4xl leading-none font-bold tracking-tight text-white tabular-nums sm:text-6xl">{{ String(unit.value).padStart(2, '0') }}</dd>
        </div>
      </dl>
      <p class="launch-date mt-7 text-sm font-medium text-purple-200"><time datetime="2026-10-24T12:00:00+02:00">{{ t('launch.date') }}</time></p>
    </div>
    <div class="launch-footer mt-12 sm:mt-16">
    <p class="text-[10px] tracking-[.24em] text-stone-500 uppercase">{{ t('launch.tagline') }}</p>
    <p class="mt-3 text-[10px] leading-relaxed tracking-wide text-stone-500">
      Designed and developed by
      <a data-analytics-click="Launch: Developer Website" class="text-primary transition-colors hover:text-white" href="https://driesbielen.be" target="_blank" rel="noopener noreferrer">
        Dries Bielen
      </a>
    </p>
    </div>
  </main>
</template>

<style scoped>
/* Scale desktop spacing with the available height, including laptop screens. */
@media (min-width: 1024px) {
  .launch-screen { padding-block: 3dvh; justify-content: space-evenly; }
  .launch-logo { height: clamp(2rem, 6dvh, 4rem); margin-bottom: 3dvh; flex-shrink: 0; }
  .launch-eyebrow { margin-bottom: 1.5dvh; }
  h1 { font-size: clamp(2.5rem, 9dvh, 6.5rem); }
  .launch-description { max-width: 40rem; margin-top: 2dvh; font-size: clamp(.875rem, 1.8dvh, 1.125rem); }
  .launch-divider { margin-top: 2dvh; }
  .launch-divider .material-symbols-outlined { font-size: 1.5rem; }
  dl { margin-top: 2dvh; }
  dl > div { padding-block: 2dvh; }
  dd { font-size: clamp(2rem, 6dvh, 3.75rem); }
  .launch-date { margin-top: 2dvh; }
  .launch-footer { margin-top: 3dvh; }
}
</style>
