<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ErrorBanner from '../components/ErrorBanner.vue'
import { fetchMovieDetails } from '../services/moviesService'
import type { MovieDetails } from '../types/Movie'

const route = useRoute()
const movie = ref<MovieDetails | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadMovieDetails = async () => {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchMovieDetails(route.params.id as string)
    movie.value = data
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'An unknown error occurred.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadMovieDetails()
})
</script>

<template>
  <ErrorBanner v-if="error" :message="error" />

  <div v-if="isLoading">Loading movie details...</div>

  <div v-else-if="movie">
    <h1>{{ movie.Title }}</h1>
    <img :src="movie.Poster" :alt="movie.Title" />
    <p><strong>Year:</strong> {{ movie.Year }}</p>
    <p><strong>Genre:</strong> {{ movie.Genre }}</p>
    <p><strong>Plot:</strong> {{ movie.Plot }}</p>
  </div>

  <button @click="$router.push('/')" class="home-button">Show All Movies</button>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}

img {
  display: block;
  margin: 1rem auto;
  max-width: 300px;
}

p {
  text-align: center;
  font-size: 1rem;
  margin: 0.5rem 0;
}

.home-button {
  display: block;
  margin: 2rem auto;
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.home-button:hover {
  background-color: #1a242f;
}

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
