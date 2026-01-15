<template>
  <VueLoading :active="isLoading" />
  <section class="mb-5">
    <div class="container mx-auto px-6 py-6">
      <div
        class="banner banner1 h-[35vh] min-h-40 max-h-150 md:h-[50vh] md:min-h-50 flex justify-center items-center my-10 relative"
      >
        <h2 class="banner-title text-white font-extrabold text-3xl text-center absolute">
          Shopping Cart
        </h2>
      </div>
      <div class="my-12">
        <RouterLink
          to="/products"
          class="text-black flex items-center hover:underline dark:text-white"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Back to All Products
        </RouterLink>
        <template v-if="cart.total !== 0">
          <div class="py-10 md:py-12">
            <div class="d-flex justify-content-center">
              <h2
                class="font-bold text-black mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl dark:text-white"
              >
                Your Cart
              </h2>
            </div>
            <div class="flex flex-col lg:flex-row gap-6 mt-4 mb-10">
              <div class="w-full lg:w-2/3">
                <div class="flex justify-end mb-4">
                  <button
                    type="button"
                    class="flex items-center border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 px-4 py-2 rounded hover:bg-red-100 transition cursor-pointer text-sm md:text-base"
                    @click="deleteAllCart"
                  >
                    <TrashIcon class="w-5 h-5 mr-1" /> Clear Cart
                  </button>
                </div>
                <div
                  v-for="item in cart.carts"
                  :key="item.id"
                  class="flex flex-col lg:flex-row items-center gap-4 bg-white dark:bg-gray-900 dark:border-2 dark:border-gray-500 p-4 rounded shadow mb-4"
                >
                  <div
                    class="text-primary font-semibold cursor-pointer dark:text-white hover:text-secondary flex-1 min-w-0 text-left"
                    @click="getProduct(item.product_id)"
                  >
                    {{ item.product.title
                    }}<span
                      class="ml-2 inline-block bg-yellow-200 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-full select-none"
                      >( {{ item.product.category }} )</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-2 justify-center shrink-0 w-40 text-center"
                  >
                    <button
                      type="button"
                      class="border border-primary text-primary dark:text-secondary dark:border-secondary px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer rounded"
                      aria-label="Minus Quantity"
                      :disabled="item.qty === 1"
                      @click="item.qty--, updateCart(item)"
                    >
                      <MinusIcon class="w-4 h-4 mx-auto" />
                    </button>
                    <input
                      type="form"
                      class="w-16 text-center border border-gray-300 rounded dark:text-gray-200"
                      min="1"
                      max="99"
                      v-model.number="item.qty"
                    />

                    <button
                      type="button"
                      class="border border-primary text-primary dark:text-secondary dark:border-secondary px-2 py-1 rounded disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                      aria-label="Plus Quantity"
                      :disabled="item.qty === 99"
                      @click="item.qty++, updateCart(item)"
                    >
                      <PlusIcon class="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                  <div
                    class="font-semibold shrink-0 w-24 text-right ml-auto hidden dark:text-gray-200 lg:block"
                  >
                    {{ $format.currency(item.total) }}
                  </div>
                  <div class="ml-4 shrink-0 hidden lg:block">
                    <button
                      @click="removeCartItem(item.id)"
                      aria-label="Delete Item"
                      class="text-red-600 text-xl hover:text-red-700 dark:text-red-400 cursor-pointer"
                    >
                      <TrashIcon class="w-5 h-5" />
                    </button>
                  </div>
                  <div class="flex items-center lg:hidden w-full">
                    <div class="w-1/3"></div>
                    <div class="font-semibold text-center dark:text-gray-200 w-1/3">
                      {{ $format.currency(item.total) }}
                    </div>
                    <div class="w-1/3 flex justify-end">
                      <button
                        @click="removeCartItem(item.id)"
                        aria-label="Delete Item"
                        class="text-red-600 dark:text-red-400 text-xl hover:text-red-700 cursor-pointer"
                      >
                        <TrashIcon class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-1/3 mt-6 lg:mt-0">
                <div class="border border-primary dark:border-gray-500 shadow rounded">
                  <div
                    class="bg-[#f5efe7] py-4 px-6 text-center border-b border-gray-400 dark:bg-gray-600 rounded-t"
                  >
                    <h3 class="text-lg font-bold text-black dark:text-white">Order Total</h3>
                  </div>
                  <div class="p-6 bg-white dark:bg-gray-800 dark:text-white rounded-b">
                    <ul class="mb-4 space-y-4 text-base border-b pb-4">
                      <li class="flex justify-between">
                        <span>Total</span>
                        <span>NT$ {{ $format.currency(cart.total) }}</span>
                      </li>
                      <li
                        v-if="cart.final_total !== cart.total"
                        class="flex justify-between text-green-700 font-semibold bg-green-100 px-2 py-1"
                      >
                        <span>Special：</span>
                        <span>NT$ {{ $format.currency(cart.final_total) }}</span>
                      </li>
                    </ul>
                    <div class="flex items-center mb-4 gap-2">
                      <span class="font-bold whitespace-nowrap dark:text-gray-100">
                        GET
                        <span class="text-2xl font-extrabold text-[#a86612] dark:text-[#e49b3d]"
                          >20%</span
                        >
                        OFF
                      </span>
                      <button
                        @click="copyCouponCode(coupon_code)"
                        class="btn-outline-primary px-4 py-2 text-sm md:text-base rounded dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        Copy Code
                      </button>
                    </div>

                    <div class="flex items-center mb-4">
                      <div class="w-full flex mb-4" v-if="cart.total !== 0">
                        <input
                          type="text"
                          class="flex-1 border border-primary dark:border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                          v-model="coupon_code"
                          placeholder="Enter coupon code"
                        />
                        <button
                          class="btn-outline-primary rounded px-4 py-2 text-sm md:text-base ml-2 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-600"
                          type="button"
                          @click="addCouponCode(coupon_code)"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    <h4 class="text-2xl font-bold text-center py-5">
                      NT$ {{ $format.currency(cart.final_total) }}
                    </h4>

                    <RouterLink
                      v-if="cart.total !== 0"
                      class="block text-center btn-primary py-2 text-base font-bold uppercase tracking-wide rounded"
                      to="/checkout"
                    >
                      Checkout
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="cart.total === 0">
          <div class="py-20 md:py-24">
            <div class="text-center pt-4 max-w-xl mx-auto">
              <p class="font-bold text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 dark:text-white">
                There are no items in your cart.
              </p>
              <RouterLink
                class="btn-primary text-base font-bold md:text-lg px-4 py-2 rounded"
                to="/products"
                >Shop Now !</RouterLink
              >
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
  <FooterComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import VueLoading from '@/components/VueLoading.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

const coupon_code = ref('')
const userCart = useCartStore()
const { cart, isLoading } = storeToRefs(userCart)
const {
  getCart,
  updateCart,
  removeCartItem,
  deleteAllCart,
  getProduct,
  addCouponCode,
  copyCouponCode
} = userCart

onMounted(() => {
  getCart()
})
</script>
