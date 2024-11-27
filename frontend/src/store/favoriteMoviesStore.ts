import { defineStore } from 'pinia'
import api from '../services/api'
import type { Movie } from '../types/Movie'

export const useFavoriteMoviesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as Movie[],
  }),

  actions: {
    async fetchFavorites() {
      try {
        const response = await api.get<Movie[]>('/favorites')
        this.favorites = response.data
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch favorites'
        throw errorMessage
      }
    },

    async addFavorite(movie: Movie) {
      try {
        const response = await api.post<{ message: string }>('/favorites/add', movie)
        this.favorites.push(movie)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
        return response.data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add favorite'
        throw errorMessage
      }
    },

    async removeFavorite(imdbID: string) {
      try {
        await api.delete(`/favorites/${imdbID}`)
        this.favorites = this.favorites.filter((movie) => movie.imdbID !== imdbID)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to remove favorite'
        console.error(errorMessage)
      }
    },
  },
})
