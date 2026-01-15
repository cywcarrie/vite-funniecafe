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
        <div class="flex flex-col items-center pay-header active">
          <span class="mb-1">STEP 1</span>
          <span>Information</span>
        </div>
        <ChevronRightIcon class="w-5 h-5 text-secondary dark:text-primary" />
        <div class="flex flex-col items-center pay-header">
          <span class="mb-1">STEP 2</span>
          <span>Payment</span>
        </div>
        <ChevronRightIcon class="w-5 h-5 text-secondary dark:text-primary" />
        <div class="flex flex-col items-center pay-header">
          <span class="mb-1">STEP 3</span>
          <span>Complete</span>
        </div>
      </div>
      <div class="my-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-6 bg-white dark:bg-gray-900">
          <div class="lg:col-span-7">
            <h3
              class="text-center font-bold text-black mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl dark:text-white"
            >
              Order Details
            </h3>
            <div class="space-y-2 mb-6 lg:mb-0">
              <div
                class="hidden lg:flex text-center bg-[#f5efe7] dark:bg-gray-600 dark:text-gray-100 text-gray-800 font-semibold px-4 py-2"
              >
                <div class="w-1/2 text-left">Product</div>
                <div class="w-1/4 text-center">Qty</div>
                <div class="w-1/4 text-right">Price</div>
              </div>
              <div
                v-for="item in cart.carts"
                :key="item.id"
                class="px-4 py-3 shadow lg:shadow-none dark:border-2 dark:border-gray-500 dark:rounded dark:lg:border-none dark:lg:rounded-none"
              >
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div
                    class="w-full md:w-1/2 font-bold text-espresso hidden lg:block sm:whitespace-nowrap dark:text-gray-200"
                  >
                    {{ item.product.title
                    }}<span
                      class="ml-2 inline-block bg-yellow-200 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-full select-none"
                      >( {{ item.product.category }} )</span
                    >
                  </div>
                  <div
                    class="w-full md:w-1/4 text-left md:text-center hidden lg:block dark:text-gray-200"
                  >
                    {{ item.qty }}
                  </div>
                  <div class="flex justify-between w-full lg:w-3/4 lg:hidden sm:whitespace-nowrap">
                    <div class="w-1/2 font-bold text-espresso dark:text-gray-200">
                      {{ item.product.title
                      }}<span
                        class="ml-2 inline-block bg-yellow-200 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-full select-none"
                        >( {{ item.product.category }} )</span
                      >
                    </div>
                    <div class="w-1/2 text-right dark:text-gray-200">
                      <span class="pr-1">Qty : </span>{{ item.qty }}
                    </div>
                  </div>
                  <div class="w-full lg:w-1/4 text-right mt-2 lg:mt-0">
                    <small
                      v-if="cart.final_total !== cart.total"
                      class="text-green-600 dark:text-green-400"
                      >Special：</small
                    >
                    <span class="font-bold text-primary dark:text-gray-200">{{
                      $format.currency(item.final_total)
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-between px-4 pt-4 dark:text-gray-200">
                <div class="text-right w-3/4 text-lg">Total</div>
                <div class="text-right w-1/4 font-bold text-xl">
                  {{ $format.currency(cart.total) }}
                </div>
              </div>
              <div
                v-if="cart.final_total !== cart.total"
                class="flex justify-between px-4 text-green-600 dark:text-green-400 font-semibold"
              >
                <div class="text-right w-3/4 text-lg">Special：</div>
                <div class="text-right w-1/4 font-bold text-xl">
                  {{ $format.currency(cart.final_total) }}
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-5 mt-6 lg:mt-0">
            <h3
              class="text-center font-bold text-black mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl dark:text-white"
            >
              Customer Details
            </h3>
            <FormVue v-slot="{ errors }" @submit="createOrder">
              <div class="mb-3">
                <label for="name" class="block font-medium text-gray-700 dark:text-gray-200 mb-1"
                  >Name<small class="ps-1 text-red-600 dark:text-red-400 font-bold">*</small></label
                >
                <FieldVue
                  id="name"
                  name="name"
                  type="text"
                  class="form-control rounded text-sm md:text-base"
                  :class="[
                    'block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    errors['name'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Please enter your name"
                  rules="required"
                  v-model="form.user.name"
                />
                <ErrorMessage name="name" class="text-sm text-red-600 dark:text-red-400 mt-1" />
              </div>
              <div class="mb-3">
                <label for="email" class="block font-medium text-gray-700 dark:text-gray-200 mb-1"
                  >Email<small class="pl-1 text-red-600 font-bold">*</small></label
                >
                <FieldVue
                  id="email"
                  name="email"
                  type="email"
                  class="form-control rounded text-sm md:text-base"
                  :class="[
                    'block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    errors['email'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Please enter your email"
                  rules="email|required"
                  v-model="form.user.email"
                />
                <ErrorMessage name="email" class="text-sm text-red-600 dark:text-red-400 mt-1" />
              </div>
              <div class="mb-3">
                <label for="tel" class="block font-medium text-gray-700 dark:text-gray-200 mb-1"
                  >Phone<small class="pl-1 text-red-600 dark:text-red-400 font-bold"
                    >*</small
                  ></label
                >
                <FieldVue
                  id="tel"
                  name="phone number"
                  type="tel"
                  class="form-control rounded text-sm md:text-base"
                  :class="[
                    'block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    errors['phone number'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Please enter your phone number"
                  rules="required|numeric|min:7|max:11"
                  v-model="form.user.tel"
                />
                <ErrorMessage
                  name="phone number"
                  class="text-sm text-red-600 dark:text-red-400 mt-1"
                />
              </div>
              <div class="mb-3">
                <label for="address" class="block font-medium text-gray-700 dark:text-gray-200 mb-1"
                  >Delivery Address<small class="pl-1 text-red-600 dark:text-red-400 font-bold"
                    >*</small
                  ></label
                >
                <FieldVue
                  id="address"
                  name="address"
                  type="text"
                  class="form-control rounded text-sm md:text-base"
                  :class="[
                    'block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    errors['address'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Please enter your address"
                  rules="required"
                  v-model="form.user.address"
                />
                <ErrorMessage name="address" class="text-sm text-red-600 dark:text-red-400 mt-1" />
              </div>
              <div class="mb-3">
                <fieldset class="w-full flex flex-col">
                  <legend class="block font-medium text-gray-700 dark:text-gray-200 mb-1 w-auto">
                    Payment Method<small class="pl-1 text-red-600 dark:text-red-400 font-bold"
                      >*</small
                    >
                  </legend>
                  <div class="normal-input">
                    <div class="flex">
                      <div class="flex items-center mr-4">
                        <FieldVue
                          type="radio"
                          name="Payment Method"
                          rules="required"
                          id="creditCard"
                          value="creditCard"
                          v-model="form.user.pay"
                          :class="{ error: errors['Payment Method'] }"
                          class="h-4 w-4 text-primary focus:ring-espresso border-gray-300 cursor-pointer"
                        >
                        </FieldVue>
                        <label class="ml-2 text-gray-700 dark:text-gray-200" for="creditCard"
                          >Credit Card</label
                        >
                      </div>
                      <div class="flex items-center">
                        <FieldVue
                          type="radio"
                          name="Payment Method"
                          rules="required"
                          id="cash"
                          value="cash"
                          v-model="form.user.pay"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                        >
                        </FieldVue>
                        <label class="ml-2 text-gray-700 dark:text-gray-200" for="cash">Cash</label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="Payment Method"
                      class="error-text absolute text-sm text-red-600 dark:text-red-400"
                    />
                  </div>
                </fieldset>
              </div>
              <div class="mb-3" v-if="form.user.pay === 'creditCard'">
                <label for="cardNum" class="form-label dark:text-gray-200"
                  >Card Number<small class="pl-1 text-red-600 dark:text-red-400 font-bold"
                    >*</small
                  ></label
                >
                <div class="flex flex-wrap">
                  <div class="w-full">
                    <FieldVue
                      id="cardNum"
                      name="Credit Card Number"
                      type="tel"
                      class="form-control rounded text-sm md:text-base"
                      maxlength="19"
                      :class="[
                        'block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                        errors['Credit Card Number']
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      ]"
                      placeholder="**** **** **** ****"
                      rules="required"
                      v-model="cardNumber"
                    />
                    <ErrorMessage
                      name="Credit Card Number"
                      class="text-sm text-red-600 dark:text-red-400 mt-1"
                    />
                    <div class="my-4 w-full md:w-1/2">
                      <label for="period" class="form-label required dark:text-gray-200"
                        >Expiration Date<small class="pl-1 text-red-600 dark:text-red-400 font-bold"
                          >*</small
                        ></label
                      >
                      <FieldVue
                        id="period"
                        name="Expiration Date"
                        type="tel"
                        class="form-control rounded text-sm md:text-base"
                        placeholder="MM/YY"
                        maxlength="5"
                        v-model="expiryDate"
                        :class="[
                          'block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                          errors['Expiration Date']
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300'
                        ]"
                        rules="required"
                      />
                      <ErrorMessage
                        name="Expiration Date"
                        class="text-sm text-red-600 dark:text-red-400 mt-1"
                      />
                    </div>
                    <div class="mb-4 w-full md:w-1/2">
                      <label for="checkCode" class="form-label required dark:text-gray-200"
                        >CVV<small class="pl-1 text-red-600 dark:text-red-400 font-bold"
                          >*</small
                        ></label
                      >
                      <FieldVue
                        id="checkCode"
                        name="CVV"
                        type="text"
                        class="form-control rounded text-sm md:text-base"
                        maxlength="3"
                        :class="[
                          'block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                          errors['CVV'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        ]"
                        placeholder="CVV"
                        rules="required|length:3|numeric:true"
                      />
                      <ErrorMessage
                        name="CVV"
                        class="text-sm text-red-600 dark:text-red-400 mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3 mt-6">
                <label for="message" class="block font-medium text-gray-700 mb-1 dark:text-gray-200"
                  >Comment</label
                >
                <textarea
                  name=""
                  id="message"
                  class="form-control rounded"
                  cols="30"
                  rows="10"
                  v-model="form.message"
                ></textarea>
              </div>
              <div class="flex justify-between items-center">
                <RouterLink
                  class="btn-outline-primary rounded flex items-center font-bold px-4 py-2"
                  to="/cart"
                  ><ChevronLeftIcon class="w-5 h-5 mr-1" />Back</RouterLink
                >
                <button
                  type="submit"
                  class="btn-secondary rounded flex items-center font-bold px-4 py-2"
                >
                  Next<ChevronRightIcon class="w-5 h-5 ml-1" />
                </button>
              </div>
            </FormVue>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FooterComponent />
</template>

<script setup>
import { inject, ref, reactive, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import VueLoading from '@/components/VueLoading.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ShowNotification from '@/shared/swal'
import { useRouter } from 'vue-router'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

const axios = inject('$axios')
const router = useRouter()
const store = useCartStore()
const { cart } = storeToRefs(store)
const isLoading = ref(false)
const expiryDate = ref('')
const cardNumber = ref('')

const form = reactive({
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
    pay: ''
  },
  message: ''
})

watch(cardNumber, (newCardNumber, oldCardNumber) => {
  if (
    newCardNumber.length < oldCardNumber.length &&
    newCardNumber.charAt(newCardNumber.length - 1) === ' '
  ) {
    cardNumber.value = oldCardNumber.slice(0, -2)
  }
  if (
    newCardNumber.length > oldCardNumber.length &&
    (newCardNumber.length + 1) % 5 === 0 &&
    cardNumber.value.length !== 0 &&
    cardNumber.value.length < 19
  ) {
    cardNumber.value = newCardNumber + ' '
  }
})

watch(expiryDate, (newExpiryDate, oldExpiryDate) => {
  if (newExpiryDate.length === 2 && newExpiryDate.length > oldExpiryDate.length) {
    expiryDate.value += '/'
  } else if (
    newExpiryDate.length < oldExpiryDate.length &&
    oldExpiryDate.charAt(2) === '/' &&
    oldExpiryDate.length === 3
  ) {
    expiryDate.value = oldExpiryDate.slice(0, 1)
  }
})

function createOrder() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/order`
  const order = form
  isLoading.value = true
  axios
    .post(url, { data: order })
    .then((response) => {
      router.push(`/checkorder/${response.data.orderId}`)
      store.getCart()
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
  store.getCart()
})
</script>
