import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoritesMovies from '../views/FavoritesMovies.vue'
import MovieDetails from '../views/MovieDetails.vue'
import AuthForm from '@/components/AuthForm.vue'
import { useAuthStore } from '../store/authStore'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthForm,
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesMovies,
    meta: { requiresAuth: true },
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/auth')
  } else {
    next()
  }
})

export default router
