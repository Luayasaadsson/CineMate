<script lang="ts" setup>
import { inject } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

type Theme = 'light' | 'dark'
const theme = inject<Theme>('theme', 'light')
const toggleTheme = inject('toggleTheme') as () => void
</script>

<template>
  <button
    @click="toggleTheme"
    class="theme-toggle-btn"
    :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <SunIcon v-if="theme === 'light'" class="icon" />
    <MoonIcon v-if="theme === 'dark'" class="icon" />
  </button>
</template>

<style scoped>
.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: var(--btn-text-dark);
  cursor: pointer;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
