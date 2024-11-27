import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const api = axios.create({
  baseURL: 'http://localhost:6008',
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.token) {
    config.headers['Authorization'] = `Bearer ${authStore.token}`
  }

  return config
})

export default api
