<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ErrorBanner from '../components/ErrorBanner.vue'
import ChatLoader from '../components/ChatLoader.vue'
import { fetchMovieDetails } from '../services/moviesService'
import type { MovieDetails } from '../types/Movie'
import BaseButton from '../components/BaseButton.vue'
import { useFavoriteMoviesStore } from '../store/favoriteMoviesStore'
import type { Movie } from '../types/Movie'

const props = defineProps<{
  id: string
}>()

const movie = ref<MovieDetails | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const favoriteStore = useFavoriteMoviesStore()

const loadMovieDetails = async () => {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchMovieDetails(props.id)
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

const addFavorite = (movie: Movie) => {
  favoriteStore.addFavorite(movie)
}

onMounted(() => {
  loadMovieDetails()
})
</script>

<template>
  <BaseButton to="/home">Go back</BaseButton>

  <ErrorBanner v-if="error" :message="error" />

  <ChatLoader v-if="isLoading" />

  <div v-else-if="movie" class="movie-details">
    <div class="movie-poster">
      <img :src="movie.poster" :alt="movie.title" loading="lazy" />
    </div>
    <div class="movie-info">
      <h1>{{ movie.title }}</h1>
      <p><strong>Year:</strong> {{ movie.year }}</p>
      <p><strong>Genre:</strong> {{ movie.genre }}</p>
      <p><strong>Plot:</strong> {{ movie.plot }}</p>
      <button class="add-btn" @click="addFavorite(movie)">Add to Favorites</button>
    </div>
  </div>
</template>

<style scoped>
.movie-details {
  display: flex;
  text-align: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem;
  padding-left: 10%;
}

.movie-poster img {
  max-width: 500px;
  border-radius: 8px;
}

.add-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, #3a6186, #89253e);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #1a242f;
  text-decoration: underline;
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
