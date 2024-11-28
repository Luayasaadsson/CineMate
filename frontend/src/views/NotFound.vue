<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <RouterLink to="/" class="back-link">Back to Home</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 5rem;
}

.not-found h1 {
  font-size: 3rem;
  color: #d9534f;
}

.not-found p {
  font-size: 1.5rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-link:hover {
  background-color: #1a242f;
}
</style>
