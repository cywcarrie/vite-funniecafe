<template>
  <VueLoading :active="isLoading" />
  <section class="mb-5">
    <div class="container mx-auto px-6 py-6">
      <div
        class="banner banner1 h-[35vh] min-h-40 max-h-150 md:h-[50vh] md:min-h-50 flex justify-center items-center my-10 relative"
      >
        <h2 class="banner-title text-white font-extrabold text-3xl text-center absolute">
          Our Products
        </h2>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 my-12">
        <div class="lg:col-span-3 mb-4 lg:mb-0">
          <div class="hidden md:block">
            <h3
              class="text-left text-primary pb-3 font-bold text-xl border-b-2 border-primary dark:text-white dark:border-gray-200"
            >
              Products
            </h3>
            <div class="text-left divide-y divide-gray-200">
              <button
                type="button"
                class="w-full text-left px-4 py-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 text-espresso dark:text-gray-200 transition-colors ease-in-out duration-300 flex items-center cursor-pointer"
                @click="selectCategory = ''"
                :class="
                  selectCategory === ''
                    ? 'bg-primary/20 text-primary dark:bg-secondary/20 dark:text-gray-200'
                    : ''
                "
                :aria-current="selectCategory === '' ? 'true' : null"
              >
                <HomeModernIcon class="w-5 h-5 text-primary dark:text-gray-200 mr-2" />
                All
              </button>
              <button
                v-for="item in categories"
                :key="`category-${item}`"
                type="button"
                class="w-full text-left px-4 py-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 duration-300 transition-colors ease-in-out flex items-center cursor-pointer"
                :class="
                  item === selectCategory
                    ? 'bg-primary/20 text-primary dark:bg-secondary/20 dark:text-gray-200'
                    : ''
                "
                @click="selectCategory = item"
              >
                <HomeModernIcon class="w-5 h-5 text-primary dark:text-gray-200 mr-2" />
                {{ item }}
              </button>
            </div>
          </div>
          <div class="block md:hidden w-full relative">
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="w-full py-2 px-4 bg-secondary text-white font-bold rounded flex justify-center items-center cursor-pointer"
            >
              <span class="flex items-center">
                Products
                <ChevronDownIcon v-if="!dropdownOpen" class="w-5 h-5 ml-2 text-white" />
                <ChevronUpIcon v-else class="w-5 h-5 ml-2 text-white" />
              </span>
            </button>
            <div
              v-if="dropdownOpen"
              class="mt-2 bg-white dark:bg-gray-700 rounded-md shadow w-full z-50 absolute"
            >
              <button
                @click="selectAndClose('')"
                :class="[
                  'w-full text-left px-4 py-2 font-bold flex items-center cursor-pointer duration-300 transition-colors ease-in-out',
                  selectCategory === ''
                    ? 'bg-primary/20 text-primary dark:bg-secondary/20 dark:text-white'
                    : 'text-espresso hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <HomeModernIcon class="w-5 h-5 text-primary dark:text-white mr-2" />All
              </button>
              <button
                v-for="item in categories"
                :key="item"
                @click="selectAndClose(item)"
                :class="[
                  'w-full text-left px-4 py-2 font-bold flex items-center cursor-pointer duration-300 ease-in-out transition-colors',
                  selectCategory === item
                    ? 'bg-primary/20 text-primary dark:bg-secondary/20 dark:text-white'
                    : 'text-espresso hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <HomeModernIcon class="w-5 h-5 text-primary dark:text-white mr-2" /> {{ item }}
              </button>
            </div>
          </div>
          <div class="mt-4 mb-3">
            <input
              type="text"
              v-model="search"
              placeholder="Keywords..."
              class="form-control border-primary rounded border-2 border-solid"
            />
          </div>
        </div>
        <div class="lg:col-span-9">
          <template v-if="search">
            <div class="mb-5">
              <div class="flex items-center">
                <div class="text-base sm:text-lg md:text-xl dark:text-gray-200">
                  The following shows the results of
                  <span
                    class="text-base sm:text-lg md:text-xl text-primary font-bold ml-1 dark:text-white"
                    >{{ search }}</span
                  >
                </div>
                <button
                  type="button"
                  @click="cancelSearch()"
                  class="inline-flex items-center ml-2 border border-red-500 text-red-500 dark:text-red-400 dark:border-red-400 px-2 sm:px-3 py-1 uppercase rounded hover:bg-red-100 transition-colors duration-300 ease-in-out text-xs sm:text-sm cursor-pointer"
                >
                  <XCircleIcon class="w-5 h-5 hidden sm:block" />
                  <XMarkIcon class="w-5 h-5 block sm:hidden" />
                  <span class="hidden sm:inline ml-1">Cancel</span>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div v-for="item in searchProducts" :key="item.id" class="max-w-sm mx-auto w-full">
                <ProductCard
                  :item="item"
                  :isDone="isDone"
                  @get-product="getProduct"
                  @add-cart="addCart"
                />
              </div>
            </div>
            <div v-if="searchProducts.length === 0" class="w-full text-center mt-20">
              <p class="font-extrabold text-2xl dark:text-white">No products found</p>
              <ExclamationCircleIcon class="w-16 h-16 text-gray-400 mx-auto mt-4 dark:text-white" />
            </div>
          </template>
          <template v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div v-for="item in filterProducts" :key="item.id" class="max-w-sm mx-auto w-full">
                <ProductCard
                  :item="item"
                  :isDone="isDone"
                  @get-product="getProduct"
                  @add-cart="addCart"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
  <FooterComponent />
</template>

<script setup>
import { inject, ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import VueLoading from '@/components/VueLoading.vue'
import ProductCard from '@/components/ProductCard.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ShowNotification from '@/shared/swal'
import { useRoute, useRouter } from 'vue-router'
import { HomeModernIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import { XCircleIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

const axios = inject('$axios')
const store = useCartStore()
const { isDone } = storeToRefs(store)
const { addCart } = store
const route = useRoute()
const router = useRouter()
const products = ref([])
const search = ref('')
const categories = ref(['Coffee', 'Cheesecake', 'Macaron'])
const selectCategory = ref('')
const isLoading = ref(false)
const dropdownOpen = ref(false)

function getProducts() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/products/all`
  search.value = ''
  isLoading.value = true
  axios
    .get(url)
    .then((response) => {
      if (response.data.success) {
        products.value = response.data.products
        const { productCategory } = route.params
        if (productCategory) {
          selectCategory.value = productCategory
        }
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
function cancelSearch() {
  search.value = ''
  selectCategory.value = ''
  getProducts()
}
function selectAndClose(category) {
  selectCategory.value = category
  dropdownOpen.value = false
}
function getProduct(id) {
  router.push(`/product/${id}`)
}

const filterProducts = computed(() => {
  return products.value.filter((item) => item.category.match(selectCategory.value))
})
const searchProducts = computed(() => {
  return products.value.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.value.toLowerCase()) ||
      item.category.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})
onMounted(() => {
  getProducts()
})
</script>
