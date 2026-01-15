<template>
  <Navbar />
  <div class="container mx-auto px-6 py-6">
    <RouterView />
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/AdminNavbar.vue'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API } = import.meta.env

const axios = inject('$axios')
const user = ref(null)
const router = useRouter()

function checkUser() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  axios.defaults.headers.common.Authorization = token
  const api = `${VITE_APP_API}api/user/check`
  axios
    .post(api, user.value)
    .then((response) => {
      if (!response.data.success) {
        router.push('/login')
      }
    })
    .catch((error) => {
      const message = error.response?.data?.message || 'An error occurred. Please try again later.'
      ShowNotification('error', message)
    })
}
onMounted(() => {
  checkUser()
})
</script>
