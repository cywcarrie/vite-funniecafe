<template>
  <VueLoading :active="isLoading" />
  <section class="mb-5">
    <div class="container mx-auto px-6 py-6">
      <div
        class="banner banner2 h-[35vh] min-h-40 max-h-150 md:h-[50vh] md:min-h-50 flex justify-center items-center my-10 relative"
      >
        <h2 class="banner-title text-white font-extrabold text-3xl text-center absolute">
          Checkout Process
        </h2>
      </div>
      <div class="flex justify-center items-center my-5 mt-3 space-x-2 md:space-x-4">
        <div class="flex flex-col items-center pay-header">
          <span class="mb-1">STEP 1</span>
          <span>Information</span>
        </div>
        <ChevronRightIcon class="w-5 h-5 text-secondary dark:text-primary" />
        <div
          class="flex flex-col items-center pay-header"
          :class="{ active: order.is_paid === false }"
        >
          <span class="mb-1">STEP 2</span>
          <span>Payment</span>
        </div>
        <ChevronRightIcon class="w-5 h-5 text-secondary dark:text-primary" />
        <div
          class="flex flex-col items-center pay-header"
          :class="{ active: order.is_paid === true }"
        >
          <span class="mb-1">STEP 3</span>
          <span>Complete</span>
        </div>
      </div>
      <div class="my-12">
        <div class="flex justify-center items-center">
          <div class="w-full md:w-10/12">
            <div class="mb-12" v-if="order.is_paid === true">
              <div class="flex justify-center items-center">
                <CheckCircleIcon class="w-6 h-6 text-green-600 dark:text-green-300 me-2" />
                <p
                  class="font-bold text-green-600 dark:text-green-300 text-lg sm:text-xl md:text-2xl"
                >
                  Success !
                </p>
              </div>
              <p
                class="font-semibold mt-4 text-center text-sm sm:text-base md:text-lg dark:text-white"
              >
                A confirmation has been sent to your email !
              </p>
            </div>
            <div class="flex flex-col items-center">
              <h3
                class="text-center font-bold mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl dark:text-white"
              >
                Order Details
              </h3>
              <form class="w-full max-w-full lg:max-w-2xl" @submit.prevent="payOrder">
                <div
                  class="bg-[#f5efe7] dark:bg-[#f5efe7]/10 dark:text-gray-100 rounded shadow-sm p-4 mb-6 space-y-4 border border-gray-200 dark:border-gray-500"
                >
                  <div
                    class="grid grid-cols-3 font-semibold text-center border-b dark:border-gray-300 pb-3 text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap"
                  >
                    <div>Product</div>
                    <div>Qty</div>
                    <div>Price</div>
                  </div>
                  <div
                    v-for="item in order.products"
                    :key="item.id"
                    class="grid grid-cols-3 text-center text-sm md:text-base py-3"
                  >
                    <div class="font-semibold text-espresso dark:text-gray-100">
                      {{ item.product.title }}
                    </div>
                    <div class="whitespace-nowrap">{{ item.qty }}</div>
                    <div class="whitespace-nowrap">
                      {{ $format.currency(item.final_total) }}
                    </div>
                  </div>
                  <div class="grid grid-cols-3 pt-4 font-bold text-center whitespace-nowrap">
                    <div class="col-span-2 text-right dark:text-gray-100">Total</div>
                    <div class="text-espresso text-xl dark:text-gray-100">
                      {{ $format.currency(order.total) }}
                    </div>
                  </div>
                </div>
                <h3
                  class="text-center font-bold mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl mt-12 dark:text-white"
                >
                  Customer Details
                </h3>
                <div
                  class="bg-gray-100 dark:bg-gray-700 rounded shadow p-6 mb-12 space-y-6 text-sm md:text-base border border-gray-300 dark:border-gray-500"
                >
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div class="whitespace-nowrap">
                      <p class="text-gray-700 text-sm font-semibold dark:text-gray-100">Name</p>
                      <p class="text-gray-900 dark:text-gray-300">{{ order.user.name }}</p>
                    </div>
                    <div>
                      <p class="text-gray-700 text-sm font-semibold dark:text-gray-100">Email</p>
                      <p class="text-gray-900 wrap-break-word dark:text-gray-300">
                        {{ order.user.email }}
                      </p>
                    </div>
                    <div class="whitespace-nowrap">
                      <p class="text-gray-700 text-sm font-semibold dark:text-gray-100">Phone</p>
                      <p class="text-gray-900 dark:text-gray-300">{{ order.user.tel }}</p>
                    </div>
                    <div>
                      <p class="text-gray-700 text-sm font-semibold dark:text-gray-100">Address</p>
                      <p class="text-gray-900 wrap-break-word dark:text-gray-300">
                        {{ order.user.address }}
                      </p>
                    </div>
                  </div>
                  <div class="pt-4 border-t dark:border-gray-300 mt-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 items-center">
                      <p class="text-gray-700 text-sm font-semibold dark:text-gray-100">
                        Payment Status
                      </p>
                      <p>
                        <span
                          v-if="!order.is_paid"
                          class="inline-block px-3 py-1 rounded-full bg-red-300 text-red-900 font-semibold text-xs"
                        >
                          Not Yet Paid
                        </span>
                        <span
                          v-else
                          class="inline-block px-3 py-1 rounded-full bg-green-300 text-green-900 dark:text-green-700 dark:bg-green-100 font-semibold text-xs"
                        >
                          Payment Completed
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="text-end" v-if="order.is_paid === false">
                  <button
                    class="btn-primary px-4 py-2 rounded inline-flex items-center text-sm md:text-base"
                    type="submit"
                  >
                    Confirm Payment<ChevronRightIcon class="w-5 h-5 text-white" />
                  </button>
                </div>
                <div class="text-end" v-if="order.is_paid === true">
                  <RouterLink
                    to="/products"
                    class="btn-primary px-4 py-2 rounded inline-flex items-center text-sm md:text-base"
                    ><ShoppingCartIcon class="w-5 h-5 pr-1 text-white" />Continue
                    Shopping</RouterLink
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FooterComponent />
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import VueLoading from '@/components/VueLoading.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ShowNotification from '@/shared/swal'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { CheckCircleIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

const axios = inject('$axios')
const route = useRoute()
const router = useRouter()
const order = ref({
  user: {}
})
const orderId = ref('')
const isLoading = ref(false)

function getOrder() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/order/${orderId.value}`
  isLoading.value = true
  axios
    .get(url)
    .then((response) => {
      if (response.data.success) {
        order.value = response.data.order
      }
    })
    .catch((error) => {
      const status = error.response?.status
      if (status === 404) {
        router.push('/not-found')
      } else {
        const message =
          error.response?.data?.message || 'An error occurred. Please try again later.'
        ShowNotification('error', message)
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}
function payOrder() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/pay/${orderId.value}`
  isLoading.value = true
  axios
    .post(url)
    .then((response) => {
      if (response.data.success) {
        ShowNotification('success', 'Payment Successful')
        getOrder()
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
  orderId.value = route.params.orderId
  if (!orderId.value) {
    router.push('/not-found')
    return
  }
  getOrder()
})
</script>
