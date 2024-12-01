<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggleButton from './ThemeToggleButton.vue'

type ThemeType = 'dark' | 'light'

const isMenuOpen = ref(false)
const theme = inject<ThemeType>('theme', 'dark')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = (event: MouseEvent) => {
  const menu = document.querySelector('.mobile-nav')
  const button = document.querySelector('.hamburger')
  if (
    isMenuOpen.value &&
    menu &&
    button &&
    !menu.contains(event.target as Node) &&
    !button.contains(event.target as Node)
  ) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div class="hamburger-menu">
    <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
    </button>

    <nav
      :class="['mobile-nav', { open: isMenuOpen }]"
      :style="{
        background:
          theme === 'light'
            ? 'linear-gradient(45deg, #ffffff, #e0e0e0)'
            : 'linear-gradient(45deg, #3a6186, #89253e)',
      }"
    >
      <RouterLink @click="toggleMenu" to="/favorites">Favorites</RouterLink>
      <button class="logout-btn" @click="toggleMenu">Logout</button>
      <ThemeToggleButton />
    </nav>
  </div>
</template>

<style scoped>
.hamburger-menu {
  position: relative;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 101;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background: white;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.hamburger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-nav {
  position: fixed;
  top: 3.3rem;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #3a6186, #89253e);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  z-index: 100;
  padding: 2rem;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.mobile-nav.open {
  transform: translateX(0);
}

.mobile-nav a,
.mobile-nav button {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
}

.logout-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.logout-btn:hover {
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .hamburger-menu {
    display: none;
  }

  .mobile-nav {
    display: none;
  }
}
</style>
