<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
})

const variantClasses = {
  primary:
    'bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed shadow-lg shadow-primary/20 hover:opacity-95 active:scale-95',
  surface:
    'bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary active:scale-95',
  glass:
    'border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 active:scale-95',
  white: 'bg-white text-black hover:bg-primary active:scale-95',
  outline: 'ghost-border text-white hover:bg-white/5 active:scale-95',
}

const sizeClasses = {
  xs: 'px-5 py-2.5 text-[10px] md:px-8 md:py-3 md:text-sm',
  sm: 'py-3.5 text-[10px] md:py-4 md:text-xs',
  md: 'px-8 py-4 text-[10px] md:px-10 md:py-5 md:text-sm',
  lg: 'px-8 py-4 text-base md:px-10 md:py-5 md:text-lg',
}

const classes = computed(() => [
  'rounded-xl font-headline font-bold tracking-widest uppercase transition-all',
  variantClasses[props.variant] ?? variantClasses.primary,
  sizeClasses[props.size] ?? sizeClasses.md,
  props.fullWidth ? 'w-full' : '',
])
</script>

<template>
  <button :type="type" :class="classes">
    <slot />
  </button>
</template>
