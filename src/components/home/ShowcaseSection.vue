<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const position = ref(50)

function moveSlider(event) {
  if (event.type === 'pointermove' && !event.currentTarget.hasPointerCapture(event.pointerId)) return
  if (event.type === 'pointerdown') {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus()
  }
  const bounds = event.currentTarget.getBoundingClientRect()
  position.value = Math.round(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)))
}
const publicBase = import.meta.env.BASE_URL
</script>

<template>
  <section id="showcase" class="bg-surface-container-low py-10 md:py-12">
    <div class="mx-auto max-w-[1920px] px-6 md:px-24">
      <div class="mb-6 text-center md:mb-8">
        <span class="mb-3 block font-label text-[10px] font-bold tracking-[0.3em] text-secondary italic uppercase md:mb-4 md:text-xs md:tracking-[0.4em]">
          {{ t('home.showcase.label') }}
        </span>
        <h2 class="font-headline text-3xl leading-tight font-black tracking-tighter text-white italic uppercase sm:text-4xl md:text-5xl">
          {{ t('home.showcase.title') }}
        </h2>
      </div>
      <div class="comparison relative mx-auto aspect-[4/3] overflow-hidden rounded-xl bg-surface-container shadow-2xl">
        <img
          :alt="t('images.interiorAfter')"
          class="absolute inset-0 h-full w-full object-cover"
          :src="`${publicBase}image00013.jpeg`"
          loading="lazy"
          draggable="false"
        />
        <div class="absolute inset-0" :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }">
          <img
            :alt="t('images.interiorBefore')"
            class="h-full w-full object-cover"
            :src="`${publicBase}image00011.jpeg`"
            loading="lazy"
            draggable="false"
          />
        </div>
        <div class="pointer-events-none absolute top-4 left-4 rounded-lg bg-black/75 px-4 py-2 font-headline text-xs font-bold tracking-widest text-white">
          {{ t('home.showcase.before') }}
        </div>
        <div class="pointer-events-none absolute top-4 right-4 rounded-lg bg-primary-container px-4 py-2 font-headline text-xs font-bold tracking-widest text-white">
          {{ t('home.showcase.after') }}
        </div>
        <div class="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-lg" :style="{ left: `${position}%` }">
          <div class="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary-container text-white shadow-xl">
            <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
            <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          </div>
        </div>
        <input
          v-model.number="position"
          type="range"
          min="0"
          max="100"
          :aria-label="t('home.showcase.sliderLabel')"
          class="absolute inset-0 z-30 m-0 h-full w-full cursor-ew-resize opacity-0"
          style="touch-action: pan-y"
          @pointerdown.prevent="moveSlider"
          @pointermove="moveSlider"
        />
      </div>
      <p class="mt-4 text-center text-sm text-on-surface-variant">{{ t('home.showcase.sliderHint') }}</p>
    </div>
  </section>
</template>

<style scoped>
/* Preserve the comparison framing while fitting shorter laptop screens. */
.comparison {
  width: min(100%, 64rem, 73.333svh);
}

.comparison:focus-within {
  outline: 3px solid var(--color-primary);
  outline-offset: 4px;
}
</style>
