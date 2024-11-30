<script lang="ts" setup>
import { computed } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { useFavoriteMoviesStore } from '../store/favoriteMoviesStore'
import BaseButton from '../components/BaseButton.vue'

const favoriteStore = useFavoriteMoviesStore()
const favorites = computed(() => favoriteStore.favorites)

const removeFavorite = (imdbID: string) => {
  favoriteStore.removeFavorite(imdbID)
}
</script>

<template>
  <BaseButton to="/">Go back</BaseButton>
  <div>
    <h1>Your Favorite Movies</h1>
    <div v-if="favorites.length === 0">
      <p>No favorites added yet.</p>
    </div>
    <div v-else class="movie-list">
      <div v-for="movie in favorites" :key="movie.imdbID" class="movie-card">
        <img :src="movie.poster" :alt="movie.title" loading="lazy" />
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.year }}</p>
        <button
          class="remove-button"
          @click="removeFavorite(movie.imdbID)"
          aria-label="Remove {{ movie.title }} from favorites"
        >
          <TrashIcon class="icon" />
        </button>
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

h1,
p {
  color: var(--vt-c-white-soft);
  margin-bottom: 10px;
  text-align: center;
}

.movie-card {
  position: relative;
  padding: 1rem;
  color: white;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 60%;
  border-radius: 8px;
}

.remove-button {
  position: absolute;
  top: 30px;
  right: 120px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .remove-button {
  opacity: 1;
}

.icon {
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
}

.remove-button:hover .icon {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .movie-card h2 {
    font-size: 0.8rem;
  }
  .movie-card p {
    font-size: 0.7rem;
  }
  .remove-button {
    top: 30px;
    right: 80px;
  }
}
</style>
