<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'
</script>

<template>
  <div class="welcome-container">
    <h1>
      Welcome to
      <span class="cine">Cine</span>
      <span class="mate">Mate</span>
    </h1>
    <p>This is a simple movie app that allows you to search for movies and view their details.</p>
    <BaseButton to="/auth" class="continue-button">Continue</BaseButton>
  </div>
</template>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

p {
  margin: 10px;
  font-size: 1rem;
}

.continue-button {
  padding: 10px 50px;
  border-radius: 50px;
  margin-top: 20px;
}

.mate {
  color: #7df479;
}
</style>
