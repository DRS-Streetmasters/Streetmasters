<template>
  <section class="relative overflow-hidden bg-surface py-16 md:py-24">
    <div class="mx-auto max-w-[1920px] px-6 md:px-24">
      <h2 class="mb-12 text-center font-headline text-3xl font-bold text-white italic md:mb-16 md:text-4xl">
        Elite Tevredenheid
      </h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        <article
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="rounded-xl border p-6 md:p-8"
          :class="testimonial.featured
            ? 'border-primary/20 bg-surface-container shadow-[0_0_30px_rgba(255,179,178,0.05)]'
            : 'border-outline-variant/10 bg-surface-container-low'"
        >
          <div class="mb-4 flex gap-1 text-primary">
            <span v-for="star in 5" :key="star" class="material-symbols-outlined text-[10px] md:text-xs fill-star">star</span>
          </div>
          <p class="mb-5 text-base font-medium text-white italic md:mb-6 md:text-lg">"{{ testimonial.quote }}"</p>
          <p class="font-headline text-[10px] font-bold tracking-wider text-white uppercase md:text-xs">{{ testimonial.name }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
})
</script>
