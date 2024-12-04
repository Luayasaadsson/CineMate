<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './store/authStore'
import { computed, ref, provide, onMounted } from 'vue'
import ThemeToggleButton from './components/ThemeToggleButton.vue'
import HamburgerMenu from './components/HamburgerMenu.vue'
import router from './router'

const theme = ref(localStorage.getItem('theme') || 'dark')
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.body.className = `theme-${theme.value}`
  localStorage.setItem('theme', theme.value)
}

provide('theme', theme)
provide('toggleTheme', toggleTheme)

const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}

provide('handleLogout', handleLogout)

onMounted(() => {
  document.body.classList.add(`theme-${theme.value}`)
})
</script>

<template>
  <div :class="`theme-${theme}`" id="app">
    <header v-if="isLoggedIn">
      <nav class="nav">
        <RouterLink to="/home" class="brand">
          <span class="cine">Cine</span>
          <span class="mate">Mate</span>
        </RouterLink>

        <span class="spacer"></span>

        <div class="desktop-nav">
          <RouterLink to="/favorites">Favorites</RouterLink>
          <button @click="handleLogout" class="logout-btn">Logout</button>
          <ThemeToggleButton />
        </div>
        <HamburgerMenu />
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
  background: linear-gradient(45deg, #3a6186, #89253e);
  z-index: 50;
  color: white;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spacer {
  flex-grow: 1;
}

nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

nav a:hover {
  transform: scale(1.1);
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.cine {
  color: #fff;
}

.mate {
  color: #7df479;
}

.logout-btn {
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  transform: scale(1.1);
}

main {
  padding: 2rem;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
}
</style>
