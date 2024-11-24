<script lang="ts" setup>
import { onMounted } from 'vue'
import { helix } from 'ldrs'

onMounted(() => {
  helix.register()
})
</script>

<template>
  <div class="loader-container">
    <l-helix size="250" speed="4" color="hsl(180, 75%, 60%)"></l-helix>
  </div>
</template>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
}

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
