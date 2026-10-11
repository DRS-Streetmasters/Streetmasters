<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({ inline: Boolean, modelValue: { type: String, default: '' }, options: { type: Array, required: true }, id: { type: String, required: true }, label: { type: String, required: true } })
const emit = defineEmits(['update:modelValue', 'change'])
const root = ref(null)
const button = ref(null)
const open = ref(false)
const active = ref(0)
const selected = computed(() => props.options.find(option => option.value === props.modelValue))
const listId = computed(() => `${props.id}-options`)
let typed = ''
let lastTyped = 0
function show() { open.value = true; active.value = Math.max(0, props.options.findIndex(option => option.value === props.modelValue)); scrollToActive() }
function scrollToActive() { nextTick(() => document.getElementById(`${props.id}-option-${active.value}`)?.scrollIntoView({ block: 'nearest' })) }
function choose(index) { const option = props.options[index]; if (!option) return; emit('update:modelValue', option.value); emit('change', option.value); open.value = false; button.value?.focus({ preventScroll: true }) }
function keydown(event) {
  if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) {
    event.preventDefault()
    if (!open.value) { show(); return }
    if (event.key === 'Enter' || event.key === ' ') { choose(active.value); return }
    if (event.key === 'Home') active.value = 0
    else if (event.key === 'End') active.value = props.options.length - 1
    else active.value = (active.value + (event.key === 'ArrowDown' ? 1 : -1) + props.options.length) % props.options.length
    scrollToActive()
  } else if (event.key === 'Escape') { event.preventDefault(); open.value = false }
  else if (event.key === 'Tab') open.value = false
  else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
    if (!open.value) show()
    typed = (Date.now() - lastTyped < 600 ? typed : '') + event.key.toLowerCase()
    lastTyped = Date.now()
    const index = props.options.findIndex(option => option.label.toLowerCase().startsWith(typed))
    if (index >= 0) { active.value = index; scrollToActive() }
  }
}
function outside(event) { if (!root.value?.contains(event.target)) open.value = false }
onMounted(() => document.addEventListener('pointerdown', outside))
onUnmounted(() => document.removeEventListener('pointerdown', outside))
</script>
<template>
  <div ref="root" class="relative min-w-0" @focusout="event => { if (!root.contains(event.relatedTarget)) open = false }">
    <label :id="`${id}-label`" :for="id" class="mb-2 block text-sm text-on-surface-variant">{{ label }}</label>
    <button :id="id" ref="button" type="button" role="combobox" aria-haspopup="listbox" :aria-expanded="open" :aria-controls="listId" :aria-labelledby="`${id}-label ${id}-value`" :aria-activedescendant="open ? `${id}-option-${active}` : undefined" class="flex min-h-12 w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-sm text-white transition-colors" :class="open ? 'border-primary bg-surface-container-high shadow-[0_0_0_3px_rgba(213,179,255,0.1)]' : 'border-outline-variant bg-surface-container-low hover:border-primary/60'" @click="open ? open = false : show()" @keydown="keydown">
      <span :id="`${id}-value`" class="truncate">{{ selected?.label || '—' }}</span><span class="material-symbols-outlined shrink-0 text-xl text-primary transition-transform" :class="{ 'rotate-180': open }" aria-hidden="true">expand_more</span>
    </button>
    <ul v-if="open" :id="listId" role="listbox" :aria-labelledby="`${id}-label`" :class="inline ? 'relative' : 'absolute top-full right-0 left-0'" class="z-40 mt-2 max-h-64 overflow-y-auto rounded-xl border border-outline-variant bg-surface-container p-1.5 shadow-2xl shadow-black/50">
      <li v-for="(option, index) in options" :id="`${id}-option-${index}`" :key="option.value" role="option" :aria-selected="modelValue === option.value" class="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm" :class="active === index ? 'bg-primary/15 text-primary' : 'text-on-surface hover:bg-white/5'" @pointermove="active = index" @pointerdown.prevent @click="choose(index)">{{ option.label }}<span v-if="modelValue === option.value" class="material-symbols-outlined text-lg" aria-hidden="true">check</span></li>
    </ul>
  </div>
</template>
