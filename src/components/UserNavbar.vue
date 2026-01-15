<template>
  <div class="fixed top-0 left-0 w-full z-50">
    <div class="bg-primary py-1 text-white text-center">
      <div class="container mx-auto px-6">
        <span class="font-bold underline">Get 20% OFF </span>
        &nbsp;Code : <span>funniecafe</span>
      </div>
    </div>
    <nav class="bg-white/90 dark:bg-gray-200/90 shadow-sm py-5">
      <div class="container mx-auto px-6 flex items-center justify-between text-3xl md:text-4xl">
        <RouterLink to="/" class="flex items-center"
          ><h1 class="text-primary font-extrabold flex items-center align-middle">
            <HomeModernIcon class="w-10 h-10 text-primary align-middle mr-2" />Fun<span
              class="text-secondary"
              >nie</span
            >
          </h1></RouterLink
        >
        <div class="flex items-center gap-2">
          <div class="flex lg:hidden relative">
            <RouterLink
              to="/cart"
              class="text-primary relative transition-all duration-300 ease-in-out hover:text-secondary"
            >
              <ShoppingCartIcon class="w-8 h-8 text-primary pl-1" />
              <span
                class="absolute -top-2.75 -right-2.5 lg:-top-2 lg:-right-1 bg-red-600 dark:bg-red-700 text-white text-xs lg:text-sm px-2 py-0.5 rounded-sm"
                v-if="cart.final_total > 0"
                >${{ $format.currency(cart.final_total) }}</span
              >
            </RouterLink>
          </div>
          <div class="hidden lg:block">
            <div class="cart-list relative">
              <RouterLink
                to="/cart"
                class="text-primary text-xl font-extrabold rounded-0 px-3 py-2 flex items-center relative"
                >Cart<ShoppingCartIcon class="w-8 h-8 text-primary pl-1" />
                <span
                  class="text-white bg-red-600 dark:bg-red-700 absolute -top-2.75 lg:-top-2 -right-2.5 lg:-right-1 text-xs lg:text-sm px-2 py-0.5 rounded-sm"
                  v-if="cart.final_total > 0"
                  >${{ $format.currency(cart.final_total) }}</span
                >
              </RouterLink>
              <ul
                class="cart-list-content text-base absolute m-0 p-0 right-0 top-10 w-[30vw] bg-white dark:bg-gray-700 z-50 shadow-lg rounded dark:border dark:border-gray-500"
              >
                <div class="p-4 max-h-125">
                  <div v-if="cart.final_total > 0">
                    <p
                      v-if="cart.carts.length > 1"
                      class="py-4 text-center border-b border-primary dark:border-gray-200 dark:text-gray-300"
                    >
                      <span class="fw-bold dark:text-gray-100">{{ cart.carts.length }}</span>
                      items
                    </p>
                    <p
                      v-else
                      class="py-4 px-2 text-center border-b dark:border-gray-200 dark:text-gray-300"
                    >
                      <span class="fw-bold dark:text-gray-100">{{ cart.carts.length }}</span>
                      item
                    </p>
                    <ul class="list-none p-0 m-0 overflow-y-auto max-h-50 px-2">
                      <li
                        v-for="item in cart.carts"
                        :key="item.product_id"
                        class="py-4 border-b border-gray-300"
                      >
                        <div class="flex items-start gap-4">
                          <div class="w-1/3">
                            <img
                              :src="item.product.imageUrl"
                              :alt="item.product.title"
                              class="w-full h-full object-contain"
                            />
                          </div>
                          <div class="flex-1 flex flex-col justify-between">
                            <div>
                              <p class="font-bold line-clamp-1 dark:text-gray-100">
                                {{ item.product.title }}
                              </p>
                            </div>
                            <div class="flex justify-between mt-2 dark:text-gray-300">
                              <p>NT${{ item.product.price }}</p>
                              <p>Qty：{{ item.qty }}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div class="flex justify-between py-4 px-2 font-bold dark:text-gray-100">
                      <p>Total</p>
                      <p>NT${{ $format.currency(cart.final_total) }}</p>
                    </div>
                    <div class="flex flex-col gap-2">
                      <RouterLink
                        to="/cart"
                        class="py-2 btn-primary text-center rounded w-full font-bold"
                        >Go to Cart</RouterLink
                      >
                    </div>
                  </div>
                  <div v-else class="px-2 dark:text-gray-100">
                    <p class="py-4 text-center">There are no items in your cart.</p>
                    <div class="flex flex-col gap-2">
                      <RouterLink
                        to="/products"
                        class="py-2 btn-primary text-center rounded w-full font-bold capitalize"
                        >Shop Now</RouterLink
                      >
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <button
            @click="toggleTheme"
            class="ml-4 md:ml-2 p-2 rounded-full border border-yellow-500 bg-white/70 dark:border-white dark:bg-gray-800/70 shadow-sm transition-colors duration-300 ease-in-out text-yellow-600 dark:text-white hover:bg-secondary/80 hover:text-white hover:border-white cursor-pointer"
            title="Switch Theme"
          >
            <SunIcon v-if="!isDark" class="w-6 h-6" />
            <MoonIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

import { ShoppingCartIcon, HomeModernIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const userCart = useCartStore()
const { cart } = storeToRefs(userCart)
const { getCart } = userCart
const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
  getCart()
})
</script>
