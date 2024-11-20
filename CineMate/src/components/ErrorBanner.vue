<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{ message: string }>()
</script>

<template>
  <div class="error-banner">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.error-banner {
  background-color: #ffdddd;
  color: #d8000c;
  border: 1px solid #d8000c;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  border-radius: 4px;
  font-weight: bold;
}
</style>
