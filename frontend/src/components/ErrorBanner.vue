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
  font-size: 1.2rem;
  margin: 10px;
  text-align: center;
  font-weight: bold;
}

@media (max-width: 768px) {
  .error-banner {
    font-size: 1rem;
  }
}
</style>
