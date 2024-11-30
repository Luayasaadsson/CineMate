<script lang="ts" setup>
import { ref, watch } from 'vue'

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
    <input
      type="text"
      v-model="localQuery"
      placeholder="Let's find some movies!"
      @keydown.enter="handleSearch"
    />
    <button @click="handleSearch">Search</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.search-bar input {
  width: 800px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 6px 0 0 4px;
}

.search-bar button {
  padding: 0.5rem 1.5rem;
  background: linear-gradient(45deg, #3a6186, #89253e);
  color: white;
  border: none;
  border-left: none;
  border-radius: 0 6px 4px 0;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #1a242f;
}
</style>
