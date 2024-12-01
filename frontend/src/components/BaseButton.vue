<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  to: {
    type: String,
    default: '/',
  },
})

const handleClick = () => {
  router.push({
    path: props.to,
    query: { ...route.query, page: route.query.page || 1 },
  })
}
</script>

<template>
  <button @click="handleClick" class="back-btn">
    <slot>Go back</slot>
  </button>
</template>

<style scoped>
.back-btn {
  display: block;
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, #3a6186, #89253e);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #1a242f;
}
</style>
