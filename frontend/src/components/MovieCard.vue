<script lang="ts" setup>
defineProps<{
  poster: string
  title: string
  year: string
  imdbID: string
  currentPage: number
}>()
</script>

<template>
  <router-link :to="`/movie/${imdbID}?page=${currentPage}`" class="movie-card">
    <img :src="poster" :alt="title" loading="lazy"/>
    <h2>{{ title }}</h2>
    <p>{{ year }}</p>
  </router-link>
</template>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: transform 0.3s ease;
  text-align: center;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  border-radius: 8px;
  margin: auto;
  width: 60%;
}

.movie-card h2 {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: var(--color-text); 
}

.movie-card p {
  font-size: 0.9rem;
  color: var(--color-text); 
}

@media (max-width: 768px) {
  .movie-card h2 {
    font-size: 0.8rem;
  }
  .movie-card p {
    font-size: 0.7rem;
  }
}
</style>
