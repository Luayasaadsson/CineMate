<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  poster: string
  title: string
  year: string
  imdbID: string
}>()
</script>

<template>
  <router-link :to="`/movie/${imdbID}`" class="movie-card">
    <img :src="poster" :alt="title" />
    <h2>{{ title }}</h2>
    <p>{{ year }}</p>
  </router-link>
</template>

<style scoped>
.movie-card {
  text-align: center;
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  max-width: 100%;
  border-radius: 4px;
}

.movie-card h2 {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #333;
}

.movie-card p {
  color: #555;
}
</style>
