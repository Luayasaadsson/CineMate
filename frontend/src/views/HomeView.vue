<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import MovieCard from '../components/MovieCard.vue'
import ErrorBanner from '../components/ErrorBanner.vue'
import ChatLoader from '../components/ChatLoader.vue'
import { fetchMovies } from '../services/moviesService'
import type { Movie } from '../types/Movie'

const searchQuery = ref('')
const movies = ref<Movie[]>([])
const movieCache = ref(new Map<string, Movie[]>())
const currentPage = ref(1)
const totalPages = ref(1)

const isLoading = ref(true)
const error = ref<string | null>(null)

const filteredMovies = computed(() => {
  if (!searchQuery.value) {
    return movies.value
  }
  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const loadMovies = async (query: string | null = null, page: number = 1) => {
  try {
    isLoading.value = true
    error.value = null

    const cacheKey = `${query || ''}-page-${page}`
    if (movieCache.value.has(cacheKey)) {
      movies.value = movieCache.value.get(cacheKey)!
      currentPage.value = page
      return
    }

    const data = await fetchMovies(query, page)
    movies.value = data.movies
    totalPages.value = data.totalPages

    movieCache.value.set(cacheKey, data.movies)

    currentPage.value = page
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
  <SearchBar v-model:searchQuery="searchQuery" @search="loadMovies" />

  <ErrorBanner v-if="error" :message="error" />

  <ChatLoader v-if="isLoading" />

  <div v-else class="movie-list">
    <div v-for="movie in filteredMovies" :key="movie.imdbID">
      <RouterLink :to="`/movie/${movie.imdbID}`">
        <MovieCard
          :poster="movie.poster"
          :title="movie.title"
          :year="movie.year"
          :imdbID="movie.imdbID"
        />
      </RouterLink>
    </div>
  </div>
  <div v-if="!isLoading" class="pagination">
    <button :disabled="currentPage === 1" @click="loadMovies(searchQuery, currentPage - 1)">
      Previous
    </button>

    <span class="page">Page {{ currentPage }} of {{ totalPages }}</span>

    <button
      :disabled="currentPage === totalPages"
      @click="loadMovies(searchQuery, currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pagination button {
  font-size: 1rem ;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  width: 100px;
  background: linear-gradient(45deg, #3a6186, #89253e);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover {
  transform: scale(1.05);
}

.pagination span {
  margin: 0 1rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .movie-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .pagination button {
    font-size: 0.8rem;
  }

  .page {
    font-size: 0.7rem;
    width: 200px;
  }
}

@media (max-width: 480px) {
  .movie-list {
    grid-template-columns: 1fr;
  }
}
</style>
