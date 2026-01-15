<template>
  <VueLoading :active="isLoading" />
  <div class="container mx-auto px-6 mt-24 mb-10 py-10">
    <form class="flex justify-center py-10" @submit.prevent="signIn">
      <div
        class="w-full max-w-md bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-600 p-6 md:p-8 rounded shadow-md"
      >
        <h2
          class="flex items-center text-xl md:text-2xl mb-4 justify-center text-primary dark:text-secondary whitespace-nowrap font-bold"
        >
          <UserCircleIcon
            class="w-6 h-6 md:w-8 md:h-8 text-primary dark:text-secondary mr-2"
          />Admin Login
        </h2>
        <div class="mb-4">
          <label
            for="inputEmail"
            class="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
            >Email</label
          >
          <input
            type="email"
            id="inputEmail"
            class="form-control text-sm"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-4">
          <label
            for="inputPassword"
            class="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
            >Password</label
          >
          <input
            type="password"
            id="inputPassword"
            class="form-control text-sm"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>
        <div class="text-center mt-6">
          <button
            class="btn-primary w-full px-4 py-2 font-semibold rounded text-sm md:text-base"
            type="submit"
            :disabled="isLoading"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { inject, ref, reactive } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import ShowNotification from '@/shared/swal'
import { useRouter } from 'vue-router'
import { UserCircleIcon } from '@heroicons/vue/24/solid'

const { VITE_APP_API } = import.meta.env

const axios = inject('$axios')
const router = useRouter()
const user = reactive({
  username: '',
  password: ''
})
const isLoading = ref(false)
function signIn() {
  isLoading.value = true
  const api = `${VITE_APP_API}admin/signin`
  axios
    .post(api, user)
    .then((response) => {
      if (response.data.success) {
        const { token, expired } = response.data
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`
        axios.defaults.headers.common.Authorization = token
        ShowNotification('success', 'Login Successful')
        router.push('/admin/products')
      } else {
        ShowNotification('error', 'Login Failed')
      }
    })
    .catch((error) => {
      const message = error.response?.data?.message || 'An error occurred. Please try again later.'
      ShowNotification('error', message)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>
