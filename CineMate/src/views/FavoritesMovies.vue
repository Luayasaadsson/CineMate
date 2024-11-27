<script lang="ts" setup>
import { useFavoriteMoviesStore } from '../store/favoriteMoviesStore'
import { computed } from 'vue'

const favoriteStore = useFavoriteMoviesStore()
const favorites = computed(() => favoriteStore.favorites)

const removeFavorite = (imdbID: string) => {
  favoriteStore.removeFavorite(imdbID)
}
</script>

<template>
  <div>
    <h1>Your Favorite Movies</h1>
    <div v-if="favorites.length === 0">
      <p>No favorites added yet.</p>
    </div>
    <div v-else class="movie-list">
      <div v-for="movie in favorites" :key="movie.imdbID" class="movie-card">
        <img :src="movie.poster" :alt="movie.title" />
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.year }}</p>
        <button @click="removeFavorite(movie.imdbID)">Remove</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

h1 {
  color: var(--vt-c-white-soft);
  margin-bottom: 10px;
  text-align: center;
}

.movie-card {
  padding: 1rem;
  color: white;
  border-radius: 8px;
  text-align: center;
}

.movie-card img {
  width: 60%;
  border-radius: 8px;
}

.movie-card button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #d9534f;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.movie-card button:hover {
  background: #95342f;
}
</style>
