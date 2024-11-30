<template>
  <button @click="handleClick" class="back-btn">
    <slot>Go back</slot>
  </button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const router = useRouter()

const props = defineProps({
  to: {
    type: String,
    default: '/',
  },
})

const handleClick = () => {
  router.push(props.to)
}
</script>

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
