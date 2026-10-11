<script setup>
import MainHeader from '../layout/MainHeader.vue'
import MainFooter from '../layout/MainFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-surface font-body text-on-surface">
    <MainHeader />
    <main class="shop-content min-h-[80svh]">
      <slot name="hero" />
      <div :class="$slots.hero ? 'pt-8 md:pt-12' : 'pt-28 md:pt-40'" class="mx-auto max-w-screen-2xl px-5 pb-20 md:px-12">
        <slot />
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<style>
.shop-content input:not([type='checkbox']), .shop-content select, .shop-content textarea {
  width: 100%; border: 1px solid var(--color-outline-variant); border-radius: .75rem;
  background: var(--color-surface-container-low); padding: .8rem 1rem; color: white;
}
.shop-content label { display: block; font-size: .875rem; color: var(--color-on-surface-variant); }
.shop-content button:not(:disabled), .shop-content select { cursor: pointer; }
.shop-content button:disabled { opacity: .45; cursor: not-allowed; }
.shop-content :focus-visible { outline: 2px solid var(--color-primary); outline-offset: 4px; }
.shop-product-description { color: var(--color-on-surface-variant); line-height: 1.8; overflow-wrap: anywhere; }
.shop-product-description > * + * { margin-top: 1rem; }
.shop-product-description ul { list-style: disc; padding-left: 1.5rem; }
.shop-product-description ol { list-style: decimal; padding-left: 1.5rem; }
.shop-product-description h2, .shop-product-description h3 { color: white; font-weight: bold; }
.shop-product-description a { color: var(--color-primary); text-decoration: underline; }
</style>
