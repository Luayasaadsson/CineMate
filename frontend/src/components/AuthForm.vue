<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import ErrorBanner from './ErrorBanner.vue'
import ChatLoader from '../components/ChatLoader.vue'
import BaseButton from '../components/BaseButton.vue'

const isLoginMode = ref(true)
const isLoading = ref(false)
const email = ref('')
const password = ref('')
const name = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    if (isLoginMode.value) {
      await authStore.login(email.value, password.value)
    } else {
      await authStore.register(name.value, email.value, password.value)
      await authStore.login(email.value, password.value)
    }
    router.push('/home')
  } catch (error) {
    console.error(error)
    errorMessage.value = isLoginMode.value
      ? 'Invalid email or password. Please try again.'
      : 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <BaseButton to="/">Go back</BaseButton>
  <ChatLoader v-if="isLoading" />
  <div class="form-container">
    <div>
      <h1 class="form-title">{{ isLoginMode ? 'Login' : 'Register' }}</h1>

      <form @submit.prevent="handleSubmit">
        <input v-if="!isLoginMode" type="text" v-model="name" placeholder="Name" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <ErrorBanner v-if="errorMessage" :message="errorMessage" />
        <button type="submit">{{ isLoginMode ? 'Login' : 'Register' }}</button>
      </form>
      <p class="toggle-link">
        {{ isLoginMode ? "Don't have an account?" : 'Already have an account?' }}
        <span @click="isLoginMode = !isLoginMode">
          {{ isLoginMode ? 'Register' : 'Login' }}
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 380px;
  background: var(--vt-c-white-soft);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vt-c-white);
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem;
  background: linear-gradient(45deg, #89253e, #3a6186);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1a242f;
}

.toggle-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--color-text-dark);
  cursor: pointer;
}

.toggle-link span {
  font-weight: bold;
  text-decoration: underline;
}
</style>
