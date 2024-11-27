import { defineStore } from 'pinia'
import api from '../services/api'
import { useFavoriteMoviesStore } from './favoriteMoviesStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: (sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')!) : null) as {
      name: string
      email: string
    } | null,
    token: sessionStorage.getItem('token') || null,
  }),

  actions: {
    async register(name: string, email: string, password: string) {
      try {
        await api.post('/auth/register', { name, email, password })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Registration failed'
        throw errorMessage
      }
    },

    async login(email: string, password: string) {
      try {
        const response = await api.post('/auth/login', { email, password })
        this.token = response.data.token
        this.user = { name: response.data.name, email }

        if (this.token && typeof this.token === 'string') {
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        }

        if (this.token) {
          sessionStorage.setItem('token', this.token)
        }
        if (this.user) {
          sessionStorage.setItem('user', JSON.stringify(this.user))
        }

        const favoriteStore = useFavoriteMoviesStore()
        await favoriteStore.fetchFavorites()

        return response.data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed'
        throw errorMessage
      }
    },

    logout() {
      this.token = null
      this.user = null
      delete api.defaults.headers.common['Authorization']
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
  },
})
