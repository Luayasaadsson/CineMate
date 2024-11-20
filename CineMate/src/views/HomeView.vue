<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import MovieCard from '../components/MovieCard.vue'
import ErrorBanner from '../components/ErrorBanner.vue'
import { fetchMovies } from '../services/moviesService'
import type { Movie } from '../types/Movie'

const searchQuery = ref('')
const movies = ref<Movie[]>([])
const movieCache = ref(new Map<string, Movie[]>())
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadMovies = async (query: string | null = null) => {
  try {
    isLoading.value = true
    error.value = null

    if (movieCache.value.has(query || 'popular')) {
      movies.value = movieCache.value.get(query || 'popular')!
      return
    }

    const data = await fetchMovies(query)
    movies.value = data

    movieCache.value.set(query || 'popular', data)
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
  loadMovies()
})
</script>

<template>
  <h1>Search Movies</h1>

  <SearchBar v-model:searchQuery="searchQuery" @search="loadMovies" />

  <ErrorBanner v-if="error" :message="error" />

  <div v-if="isLoading">Loading movies...</div>

  <div v-else class="movie-list">
    <MovieCard
      v-for="movie in movies"
      :key="movie.imdbID"
      :poster="movie.Poster"
      :title="movie.Title"
      :year="movie.Year"
      :imdbID="movie.imdbID"
    />
  </div>
</template>

<style scoped>
.movie-list {
  display: grid;
  gap: 1.5rem;
  padding: 1rem;
}

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

.search-bar {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.search-bar input {
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.search-bar button {
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
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
