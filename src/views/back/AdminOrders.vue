<template>
  <VueLoading :active="isLoading" />
  <section class="mb-5">
    <div class="my-10">
      <div class="mb-6 w-full overflow-x-auto">
        <div
          class="hidden lg:grid grid-cols-6 bg-[#f5efe7] font-semibold text-sm py-3 px-4 rounded-t"
        >
          <div class="whitespace-nowrap">Purchase Time</div>
          <div>Email</div>
          <div class="whitespace-nowrap">Purchase Items</div>
          <div class="whitespace-nowrap text-center">Total</div>
          <div class="whitespace-nowrap w-25">Payment Status</div>
          <div></div>
        </div>

        <template v-for="item in orders" :key="`orders ${item.id}`">
          <div
            v-if="orders.length"
            :class="{ 'text-secondary': !item.is_paid }"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 items-start border-b text-sm py-4 px-4 hover:bg-gray-50 transition"
          >
            <div class="whitespace-nowrap">
              <span class="inline-block text-gray-500 font-medium lg:hidden mr-2"
                >Purchase Time：</span
              >{{ $format.date(item.create_at) }}
            </div>
            <div class="wrap-break-word">
              <span class="inline-block text-gray-500 font-medium lg:hidden mr-2">Email：</span
              ><span v-text="item.user.email" v-if="item.user"></span>
            </div>
            <div class="flex items-start space-x-2 lg:hidden">
              <span class="inline-block text-gray-500 font-medium">Purchase Items：</span>
              <ul class="space-y-1">
                <li v-for="(product, i) in item.products" :key="i" class="flex space-x-2">
                  <span>{{ product.product.title }}</span>
                  <span>Unit：{{ product.qty }} {{ product.product.unit }}</span>
                </li>
              </ul>
            </div>
            <div class="hidden lg:block">
              <ul class="space-y-1 whitespace-nowrap">
                <li v-for="(product, i) in item.products" :key="i" class="flex flex-col">
                  <span class="mb-1">{{ product.product.title }}</span>
                  <span>
                    Unit：{{ product.qty }}
                    {{ product.product.unit }}
                  </span>
                </li>
              </ul>
            </div>
            <div class="text-left lg:text-center whitespace-nowrap">
              <span class="inline-block text-gray-500 font-medium lg:hidden text-left mr-2"
                >Total：</span
              >{{ item.total }}
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-block text-gray-500 font-medium lg:hidden">Payment Status：</span>
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                  class="form-checkbox h-4 w-4 text-green-600 rounded hidden"
                />
                <span class="whitespace-nowrap">
                  <span v-if="item.is_paid" class="text-green-600">Paid</span>
                  <span v-else class="text-gray-400">Unpaid</span>
                </span>
              </label>
            </div>
            <div class="flex gap-2 flex-wrap lg:justify-center lg:items-center">
              <button
                class="btn-outline-primary text-xs px-2 py-1 rounded"
                type="button"
                @click="openModal(item)"
              >
                View Details
              </button>
              <button
                class="text-red-500 border border-red-500 hover:bg-red-100 text-xs px-2 py-1 rounded transition-colors duration-300 ease-in-out cursor-pointer"
                type="button"
                @click="openDelOrderModal(item)"
              >
                Delete
              </button>
            </div>
          </div>
        </template>
      </div>
      <Pagination :pages="pagination" @emit-pages="getOrders" />
    </div>
  </section>
  <OrderModal :order="tempOrder" ref="orderModal" @update-order="checkOrderInfo" />
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder" />
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import Pagination from '@/components/PaginationComponent.vue'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

const axios = inject('$axios')
const orders = ref([])
const pagination = ref({})
const isLoading = ref(false)
const tempOrder = ref({})
const currentPage = ref(1)

const orderModal = ref(null)
const delModal = ref(null)

function getOrders(currentPageParam = 1) {
  currentPage.value = currentPageParam
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/orders?page=${currentPageParam}`
  isLoading.value = true
  axios
    .get(url)
    .then((response) => {
      orders.value = response.data.orders
      pagination.value = response.data.pagination
    })
    .catch((error) => {
      const message = error.response?.data?.message || 'An error occurred. Please try again later.'
      ShowNotification('error', message)
    })
    .finally(() => {
      isLoading.value = false
    })
}
function openModal(item) {
  tempOrder.value = { ...item }
  const orderComponent = orderModal.value
  orderComponent.showModal()
}
function openDelOrderModal(item) {
  tempOrder.value = { ...item }
  const delComponent = delModal.value
  delComponent.showModal()
}
function updatePaid(item) {
  const api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/order/${item.id}`
  const paid = { is_paid: item.is_paid }
  isLoading.value = true
  axios
    .put(api, { data: paid })
    .then((response) => {
      if (response.data.success) {
        getOrders(currentPage.value)
        ShowNotification('success', 'Update payment status successfully')
      } else {
        ShowNotification('error', 'Failed to update payment status')
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
function checkOrderInfo(item) {
  const api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/order/${item.id}`
  const paid = { is_paid: item.is_paid }
  isLoading.value = true
  const orderComponent = orderModal.value
  axios.put(api, { data: paid }).then((response) => {
    isLoading.value = false
    orderComponent.hideModal()
    if (response.data.success) {
      getOrders(currentPage.value)
      ShowNotification('success', 'Confimed successfully')
    } else {
      isLoading.value = false
      ShowNotification('error', 'Failed to confirm order')
    }
  })
}
function delOrder() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/order/${tempOrder.value.id}`
  isLoading.value = true
  axios
    .delete(url)
    .then((response) => {
      const delComponent = delModal.value
      delComponent.hideModal()
      if (response.data.success) {
        ShowNotification('success', 'Deleted order successfully')
        getOrders(currentPage.value)
      } else {
        ShowNotification('error', 'Failed to delete order')
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
  getOrders()
})
</script>
