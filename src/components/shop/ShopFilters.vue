<script setup>
import { useI18n } from 'vue-i18n'
import AppSelect from '../ui/AppSelect.vue'
defineProps({ prefix: { type: String, required: true }, collection: String, sort: String, available: Boolean, collectionOptions: Array, sortOptions: Array, inline: Boolean })
const emit = defineEmits(['collection', 'sort', 'available', 'reset'])
const { t } = useI18n()
</script>
<template>
  <div class="space-y-7">
    <AppSelect :id="`${prefix}-collection`" :model-value="collection" :label="t('shop.collection')" :options="collectionOptions" :inline="inline" @update:model-value="emit('collection', $event)" />
    <AppSelect :id="`${prefix}-sort`" :model-value="sort" :label="t('shop.sort')" :options="sortOptions" :inline="inline" @update:model-value="emit('sort', $event)" />
    <div class="border-t border-white/10 pt-6">
      <label class="flex! cursor-pointer items-center justify-between gap-3 text-sm text-on-surface-variant">
        <span>{{ t('shop.availableOnly') }}</span>
        <span class="relative inline-flex shrink-0">
          <input data-analytics-change="Filters: Available Only Changed" :checked="available" type="checkbox" role="switch" class="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" @change="emit('available', $event.target.checked)" />
          <span class="h-6 w-11 rounded-full bg-white/15 transition-colors peer-checked:bg-primary-container peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-primary"></span>
          <span class="pointer-events-none absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
        </span>
      </label>
    </div>
    <button data-analytics-click="Filters: Reset" type="button" class="text-xs text-on-surface-variant underline decoration-outline underline-offset-4 transition-colors hover:text-primary" @click="emit('reset')">{{ t('shop.resetFilters') }}</button>
  </div>
</template>
