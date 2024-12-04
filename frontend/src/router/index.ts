import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoritesMovies from '../views/FavoritesMovies.vue'
import MovieDetails from '../views/MovieDetails.vue'
import AuthForm from '@/components/AuthForm.vue'
import NotFound from '../views/NotFound.vue'
import WelcomeView from '../views/WelcomeView.vue'
import { useAuthStore } from '../store/authStore'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthForm,
  },
  {
    path: '/home',
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
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
