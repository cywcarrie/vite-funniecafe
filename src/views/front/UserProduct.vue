<template>
  <VueLoading :active="isLoading" />
  <section class="mb-5">
    <div class="container mx-auto px-6 py-6">
      <div
        class="banner banner1 h-[35vh] min-h-40 max-h-150 md:h-[50vh] md:min-h-50 flex justify-center items-center my-10 relative"
      >
        <h2 class="banner-title text-white font-extrabold text-3xl text-center absolute">
          {{ product.category }}
        </h2>
      </div>
      <div class="mt-12">
        <RouterLink
          to="/products"
          class="text-black hover:underline flex items-center dark:text-white"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Back to All Products
        </RouterLink>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 md:py-12">
          <article class="col-span-12 lg:col-span-6">
            <img
              :src="product.imageUrl"
              alt="productImage"
              class="w-full h-auto mb-3 object-cover object-center rounded"
            />
          </article>
          <div class="col-span-12 lg:col-span-6 flex flex-col">
            <div class="flex justify-start text-secondary font-bold mt-4 md:mt-0">
              <p class="mb-4 text-lg sm:text-xl flex items-center">
                <HomeModernIcon class="w-5 h-5 text-secondary mr-1" />{{ product.category }}
              </p>
            </div>
            <div class="flex justify-start">
              <h2
                class="font-bold text-2xl sm:text-3xl md:text-4xl text-black dark:text-white wrap-break-word leading-tight"
              >
                {{ product.title }}
              </h2>
            </div>
            <div class="mt-4 text-black dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              {{ product.description }}
            </div>
            <div class="mt-4 text-primary sm:text-base text-sm dark:text-gray-200">
              <p class="flex items-center font-bold">
                <CheckCircleIcon class="w-5 h-5 mr-2" />Free Delivery on all orders
              </p>
            </div>
            <div class="mt-auto">
              <div class="flex justify-end items-center mt-4 pt-5">
                <div
                  class="text-lg sm:text-xl font-semibold text-gray-500 dark:text-gray-300"
                  v-if="!product.price"
                >
                  NT${{ $format.currency(product.origin_price) }}
                </div>
                <div
                  class="text-lg sm:text-xl font-semibold text-gray-500 dark:text-gray-300 line-through"
                  v-if="product.price"
                >
                  NT${{ $format.currency(product.origin_price) }}
                </div>
              </div>
              <div class="flex justify-end items-center mb-3">
                <div
                  class="text-xl sm:text-2xl font-bold text-espresso dark:text-white"
                  v-if="product.price"
                >
                  <span class="text-red-600 dark:text-red-400 text-xl sm:text-2xl font-bold"
                    >Now Sales:</span
                  >
                  NT${{ $format.currency(product.price) }}
                </div>
              </div>
              <div class="flex justify-end items-center">
                <div
                  class="flex items-center mr-2"
                  :style="{ cursor: qty === 1 ? 'not-allowed' : 'pointer' }"
                >
                  <button
                    type="button"
                    aria-label="Minus Quantity"
                    class="btn-primary w-8 h-8 md:w-10 md:h-10 rounded text-sm md:text-base text-white disabled:opacity-50"
                    :disabled="qty === 1"
                    @click="qty--"
                  >
                    <MinusIcon class="w-4 h-4 mx-auto" />
                  </button>
                  <label for="product-qty" class="sr-only">Qty</label>
                  <input
                    id="product-qty"
                    type="form"
                    class="w-14 h-8 md:w-16 md:h-10 text-center border border-gray-300 py-2 px-1 mx-1 rounded text-sm md:text-base dark:text-white dark:bg-gray-700"
                    min="1"
                    max="99"
                    v-model.number="qty"
                  />
                  <button
                    type="button"
                    aria-label="Plus Quantity"
                    class="btn-primary w-8 h-8 md:w-10 md:h-10 text-sm md:text-base text-white rounded disabled:opacity-50"
                    @click="qty++"
                    :disabled="qty === 99"
                  >
                    <PlusIcon class="w-4 h-4 mx-auto" />
                  </button>
                </div>
                <button
                  type="button"
                  class="btn-primary ml-1 rounded text-sm md:text-base text-white whitespace-nowrap font-bold py-2 px-3 flex items-center h-8 md:h-10"
                  @click="addCart(product.id, qty)"
                >
                  <ShoppingCartIcon class="w-5 h-5 text-white mr-1" />Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 py-10 md:py-12 dark:bg-gray-800">
      <div class="container mx-auto px-6">
        <h2
          class="text-center font-bold mb-6 md:mb-8 lg:mb-10 text-2xl md:text-3xl text-black dark:text-white whitespace-nowrap"
        >
          FAQs
        </h2>
        <FAQs />
      </div>
    </div>
    <div class="bg-white py-10 mb-12 md:py-12 dark:bg-gray-900">
      <div class="container mx-auto px-6">
        <h2
          class="text-center font-bold mb-6 md:mb-8 lg:mb-10 text-2xl md:text-3xl text-black whitespace-nowrap dark:text-white"
        >
          Hot Products
        </h2>
        <SwiperComponent />
      </div>
    </div>
  </section>
  <FooterComponent />
</template>

<script setup>
import { inject, ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import VueLoading from '@/components/VueLoading.vue'
import FAQs from '@/components/UserFAQs.vue'
import SwiperComponent from '@/components/SwiperComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ShowNotification from '@/shared/swal'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon, MinusIcon, PlusIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'
import { HomeModernIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

const axios = inject('$axios')
const route = useRoute()
const router = useRouter()
const store = useCartStore()
const { addCart } = store
const product = ref({})
const qty = ref(1)
const id = ref('')
const isLoading = ref(false)

watch(qty, (newQty) => {
  if (typeof newQty !== 'number' || isNaN(newQty)) {
    qty.value = 1
  } else if (newQty < 1) {
    qty.value = 1
  } else if (newQty > 99) {
    qty.value = 99
  }
})

watch(
  () => route.params.productId,
  (newProductId) => {
    if (newProductId !== undefined) {
      id.value = newProductId
      getProduct()
    } else {
      ShowNotification('error', 'Invalid product ID')
    }
  }
)
function getProduct() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/product/${id.value}`
  isLoading.value = true
  axios
    .get(url)
    .then((response) => {
      if (response.data.success) {
        product.value = response.data.product
      } else {
        ShowNotification('error', 'Product not found')
        router.push('/not-found')
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

onMounted(() => {
  id.value = route.params.productId
  getProduct()
})
</script>
