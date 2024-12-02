<script lang="ts" setup>
defineProps<{ message: string }>()
</script>

<template>
  <div class="error-banner">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.error-banner {
  color: var(--color-text-dark);
  text-align: center;
}

.error-banner:has(p) {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .error-banner {
    font-size: 1rem;
  }
}
</style>
