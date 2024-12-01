<script lang="ts" setup>
import { ref, watch } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'search', query: string): void
}>()

const localQuery = ref('')

watch(
  () => localQuery.value,
  (newVal) => {
    emit('update:searchQuery', newVal)
  },
)

const handleSearch = () => {
  emit('search', localQuery.value)
  localQuery.value = ''
}
</script>

<template>
  <div class="search-bar">
    <div class="input-container">
      <input
        type="text"
        v-model="localQuery"
        placeholder="Let's find some movies!"
        @keydown.enter="handleSearch"
      />
      <MagnifyingGlassIcon
        class="search-icon"
        @click="handleSearch"
        aria-label="Search"
      />
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.input-container {
  position: relative;
  width: 800px;
}

.input-container input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  border-bottom-right-radius: 17px;
  border-top-right-radius: 17px;
}

.input-container input:focus {
  outline: none;
  border-color: var(--btn-bg-dark);
  box-shadow: 0 0 3px rgba(58, 97, 134, 0.5);
}

.search-icon {
  position: absolute;
  top: 49%;
  right: 1px;
  transform: translateY(-50%);
  width: 1.9rem;
  height: 1.9rem;
  color: #fff;
  background: linear-gradient(45deg, #3a6186, #89253e);
  border-radius: 50%;
  cursor: pointer;
}
</style>
