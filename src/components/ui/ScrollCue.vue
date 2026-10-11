<script setup>
import { useI18n } from 'vue-i18n'
defineProps({ target: { type: String, required: true } })
const { locale } = useI18n()
</script>

<template>
  <a :href="target" :aria-label="locale === 'nl' ? 'Scroll en ontdek meer' : 'Scroll to explore'" class="group flex min-h-12 flex-col items-center justify-center gap-2 px-5 text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
    <span class="text-[9px] font-semibold tracking-[.25em] uppercase">Scroll</span>
    <svg class="scroll-cue-arrow h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
  </a>
</template>

<style scoped>
.scroll-cue-arrow { animation: scroll-hint 2s ease-in-out infinite; }
@keyframes scroll-hint { 0%, 100% { transform: translateY(-2px); } 50% { transform: translateY(3px); } }
@media (prefers-reduced-motion: reduce) { .scroll-cue-arrow { animation: none; } }
</style>
