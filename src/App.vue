<script setup>
import { onMounted, onUnmounted } from 'vue'
import { beforeLaunch, launchAt, openLaunchedSite } from './lib/launch'

let timer
function checkLaunch() {
  if (Date.now() >= launchAt) openLaunchedSite()
}
onMounted(() => {
  if (!beforeLaunch) return
  timer = setInterval(checkLaunch, 1000)
  document.addEventListener('visibilitychange', checkLaunch)
})
onUnmounted(() => {
  clearInterval(timer)
  document.removeEventListener('visibilitychange', checkLaunch)
})
</script>

<template>
  <RouterView />
</template>
