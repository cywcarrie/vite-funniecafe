<template>
  <nav class="py-5 bg-white shadow-sm">
    <div class="md:container mx-auto px-6">
      <div class="text-primary flex justify-between items-center">
        <RouterLink to="/" class="flex items-center"
          ><h1
            class="text-primary font-extrabold flex items-center align-middle text-3xl md:text-4xl"
          >
            <HomeModernIcon class="w-10 h-10 text-primary pr-2" />Fun<span class="text-secondary"
              >nie</span
            >
          </h1></RouterLink
        >
        <button
          @click="isOpen = !isOpen"
          class="md:hidden text-primary focus:outline-none cursor-pointer"
        >
          <XMarkIcon v-if="isOpen" class="w-6 h-6" />
          <Bars3Icon v-else class="w-6 h-6" />
        </button>
        <div class="hidden md:flex space-x-6 items-center">
          <RouterLink
            to="/admin/products"
            :class="['nav-link', $route.path === '/admin/products' ? 'nav-link-active' : '']"
          >
            Products
          </RouterLink>
          <RouterLink
            to="/admin/orders"
            :class="['nav-link', $route.path === '/admin/orders' ? 'nav-link-active' : '']"
          >
            Orders
          </RouterLink>
          <RouterLink
            to="/admin/coupons"
            :class="['nav-link', $route.path === '/admin/coupons' ? 'nav-link-active' : '']"
          >
            Coupons
          </RouterLink>
          <a
            href="#"
            @click.prevent="logout"
            class="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Logout
          </a>
        </div>
        <div
          v-if="isOpen"
          class="fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 z-40 md:hidden"
        >
          <button @click="isOpen = false" class="absolute top-4 right-6 text-gray-500">
            <XMarkIcon class="w-6 h-6" />
          </button>
          <RouterLink
            to="/admin/products"
            :class="['mobile-nav-link', $route.path === '/admin/products' ? 'nav-link-active' : '']"
            @click="isOpen = false"
            class="text-lg font-semibold"
          >
            Products
          </RouterLink>
          <RouterLink
            to="/admin/orders"
            :class="['mobile-nav-link', $route.path === '/admin/orders' ? 'nav-link-active' : '']"
            @click="isOpen = false"
            class="text-lg font-semibold"
          >
            Orders
          </RouterLink>
          <RouterLink
            to="/admin/coupons"
            :class="['mobile-nav-link', $route.path === '/admin/coupons' ? 'nav-link-active' : '']"
            @click="isOpen = false"
            class="text-lg font-semibold"
          >
            Coupons
          </RouterLink>
          <a
            href="#"
            @click.prevent="logout"
            class="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { inject, ref } from 'vue'
import ShowNotification from '@/shared/swal'
import { useRouter } from 'vue-router'
import { Bars3Icon, XMarkIcon, HomeModernIcon } from '@heroicons/vue/24/solid'
const { VITE_APP_API } = import.meta.env

const axios = inject('$axios')
const user = ref({})
const router = useRouter()
const isOpen = ref(false)

function logout() {
  const api = `${VITE_APP_API}logout`
  axios
    .post(api, user.value)
    .then((response) => {
      if (response.data.success) {
        ShowNotification('success', 'Logout Successful')
        router.push('/login')
      } else {
        ShowNotification('error', 'Logout Failed')
      }
    })
    .catch((error) => {
      const message = error.response?.data?.message || 'An error occurred. Please try again later.'
      ShowNotification('error', message)
    })
}
</script>
