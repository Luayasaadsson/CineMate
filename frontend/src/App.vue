<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './store/authStore'
import { computed } from 'vue'
import router from './router'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}
</script>

<template>
  <div id="app">
    <header v-if="isLoggedIn">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
        <button @click="handleLogout">Logout</button>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  background-color: #2c3e50;
  color: white;
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}

button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

main {
  padding: 2rem;
}
</style>
