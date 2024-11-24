<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ErrorBanner from '../components/ErrorBanner.vue'
import ChatLoader from '../components/ChatLoader.vue'
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

  <ChatLoader v-if="isLoading" />

  <div v-else-if="movie" class="movie-details">
    <div class="movie-poster">
      <img :src="movie.Poster" :alt="movie.Title" />
    </div>
    <div class="movie-info">
      <h1>{{ movie.Title }}</h1>
      <p><strong>Year:</strong> {{ movie.Year }}</p>
      <p><strong>Genre:</strong> {{ movie.Genre }}</p>
      <p><strong>Plot:</strong> {{ movie.Plot }}</p>
    </div>
  </div>

  <button @click="$router.push('/')" class="home-button">Show All Movies</button>
</template>

<style scoped>
.movie-details {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem;
  padding-left: 10%;
}

.movie-poster img {
  max-width: 500px;
  border-radius: 8px;
}

.movie-info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.movie-info p {
  font-size: 1.8rem;
  margin: 0.5rem 0;
  max-width: 60rem;
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

@media (max-width: 980px) {
  .movie-details {
    flex-direction: column;
    align-items: center;
    padding: 0%;
  }

  .movie-poster img {
    max-width: 300px;
  }

  .movie-info h1 {
    text-align: center;
    font-size: 1.5rem;
  }

  .movie-info p {
    text-align: center;
    font-size: 1rem;
  }
}
</style>
