<template>
  <VueLoading :active="isLoading" />
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false
    }"
    :space-between="20"
    :pagination="{ clickable: true }"
    :breakpoints="{
      '480': {
        slidesPerView: 1.5
      },
      '576': {
        slidesPerView: 1.5
      },
      '768': {
        slidesPerView: 2
      },
      '992': {
        slidesPerView: 3
      },
      '1200': {
        slidesPerView: 4
      }
    }"
  >
    <swiper-slide v-for="item in products" :key="item.id">
      <div
        class="flex flex-col group bg-white w-full h-full rounded border dark:bg-gray-700 dark:border-gray-500 border-gray-200 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-gray-300"
      >
        <RouterLink :to="`/product/${item.id}`">
          <div class="flex flex-col grow">
            <img :src="item.imageUrl" class="w-full object-cover rounded-t-sm" alt="swiperImage" />
            <div class="flex flex-col grow p-3">
              <div class="flex items-center text-primary dark:text-gray-300 font-bold mb-2">
                <HomeModernIcon class="w-5 h-5 text-primary dark:text-gray-300 mr-1" />{{
                  item.category
                }}
              </div>
              <h5 class="font-extrabold text-xl mb-4 text-black dark:text-white">
                {{ item.title }}
              </h5>
              <div class="flex justify-end items-center mb-3">
                <del class="text-base text-gray-500 dark:text-gray-300" v-if="item.price">
                  NT${{ $format.currency(item.origin_price) }}</del
                >
                <div
                  class="text-xl text-red-600 dark:text-red-400 font-bold pl-2"
                  v-if="item.price"
                >
                  NT${{ $format.currency(item.price) }}
                </div>
                <div class="text-xl text-gray-500 dark:text-gray-300" v-else>
                  NT${{ $format.currency(item.origin_price) }}
                </div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import VueLoading from './VueLoading.vue'
import { Pagination, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { HomeModernIcon } from '@heroicons/vue/24/solid'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

const axios = inject('$axios')
const isLoading = ref(false)
const products = ref([])
const modules = [Pagination, A11y, Autoplay]

function getProducts() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/products/all`
  isLoading.value = true
  axios
    .get(url)
    .then((response) => {
      isLoading.value = false
      products.value = response.data.products
      getSwiper()
    })
    .finally(() => {
      isLoading.value = false
    })
}
function getSwiper() {
  const sourceProducts = [...products.value]
  const randomSwiper = []

  for (let i = 0; i < 6 && sourceProducts.length > 0; i++) {
    const num = Math.floor(Math.random() * sourceProducts.length)
    randomSwiper.push(sourceProducts[num])
    sourceProducts.splice(num, 1)
  }

  products.value = randomSwiper
}
onMounted(() => {
  getProducts()
})
</script>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background-color: #e5e7eb;
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #6c584c;
}

:deep(.swiper-pagination) {
  bottom: 8px;
  right: 0;
  left: 0;
  text-align: center;
}
</style>
