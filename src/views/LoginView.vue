<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md mx-8">
      <h2 class="text-2xl font-bold mb-6 text-center text-red-500">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="username">Username</label>
          <input
            v-model="username"
            id="username"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2" for="password">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Login
        </button>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mt-4 flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative"
        >
          <div>{{ errorMessage }}</div>
          <div>
            <button
              type="button"
              class="ml-2 text-red-700 hover:text-red-900 font-bold cursor-pointer"
              @click="errorMessage = ''"
            >
              ✕
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()
const errorMessage = ref('')

async function handleLogin() {
  try {
    await auth.login(username.value, password.value)
    router.push('/tasks')
  } catch (error) {
    if (error instanceof Error)
      errorMessage.value = `Login failed: ${error.message || 'Unknown error'}`
    else errorMessage.value = 'Login failed: Unknown error'
  }
}
</script>
