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
    <input type="text" v-model="localQuery" placeholder="Enter movie title..." />
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
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.search-bar button {
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #1a242f;
}
</style>
