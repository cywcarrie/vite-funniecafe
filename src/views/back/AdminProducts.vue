<template>
  <VueLoading :active="isLoading" />
  <section class="mb-5">
    <div class="my-10">
      <div class="flex justify-end items-center mt-6">
        <button
          class="btn-primary rounded px-4 py-2 flex items-center"
          type="button"
          @click="openModal(true)"
        >
          <PlusIcon class="w-6 h-6 pr-1 text-white" />
          Add Product
        </button>
      </div>
      <div class="my-6 w-full overflow-x-auto">
        <div class="hidden lg:block">
          <div class="grid grid-cols-6 bg-[#f5efe7] font-semibold text-sm py-3 px-4 rounded-t">
            <div class="w-30 whitespace-nowrap">Category</div>
            <div class="whitespace-nowrap">Product Name</div>
            <div class="w-30 whitespace-nowrap">Original price</div>
            <div class="w-30 whitespace-nowrap">Sale Price</div>
            <div class="w-25 whitespace-nowrap"></div>
            <div></div>
          </div>
        </div>
        <div
          v-for="item in products"
          :key="item.id"
          class="grid lg:grid-cols-6 gap-y-2 items-center border-b text-sm py-4 px-4 hover:bg-gray-50 transition flex-col md:flex-row"
        >
          <div class="w-full lg:w-30 whitespace-nowrap">
            <span class="inline-block lg:hidden text-gray-500 mr-2">Category ：</span
            >{{ item.category }}
          </div>
          <div class="w-full whitespace-nowrap">
            <span class="inline-block md:hidden text-gray-500 mr-2">Name ：</span>{{ item.title }}
          </div>
          <div class="w-full lg:w-30 text-left whitespace-nowrap">
            <span class="inline-block lg:hidden text-gray-500 mr-2">Original Price ：</span
            >{{ $format.currency(item.origin_price) }}
          </div>
          <div class="w-full lg:w-30 text-left whitespace-nowrap">
            <span class="inline-block lg:hidden text-gray-500 mr-2">Sale Price：</span
            >{{ $format.currency(item.price) }}
          </div>
          <div class="w-full lg:w-25">
            <span class="inline-block lg:hidden text-gray-500 mr-2">Status：</span>
            <span class="text-green-600" v-if="item.is_enabled">Available</span>
            <span class="text-gray-400" v-else>Not available</span>
          </div>
          <div class="w-full lg:w-50 flex gap-2 mt-2 lg:mt-0">
            <button
              class="btn-outline-primary text-xs px-3 py-1 rounded w-full lg:w-auto"
              type="button"
              @click="openModal(false, item)"
            >
              Edit
            </button>
            <button
              class="border border-red-500 text-red-500 hover:bg-red-100 text-xs px-3 py-1 rounded transition-colors duration-300 ease-in-out w-full lg:w-auto cursor-pointer"
              type="button"
              @click="openDelProductModal(item)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Pagination :pages="pagination" @emit-pages="getProducts" />
    </div>
  </section>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import ProductModal from '@/components/ProductModal.vue'
import Pagination from '@/components/PaginationComponent.vue'
import DelModal from '@/components/DelModal.vue'
import ShowNotification from '@/shared/swal'
import { PlusIcon } from '@heroicons/vue/20/solid'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

const axios = inject('$axios')
const products = ref([])
const pagination = ref({})
const tempProduct = ref({})
const isNew = ref(false)
const isLoading = ref(false)

const productModal = ref(null)
const delModal = ref(null)

function getProducts(page = 1) {
  const api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/products/?page=${page}`
  isLoading.value = true
  axios
    .get(api)
    .then((response) => {
      if (response.data.success) {
        products.value = response.data.products
        pagination.value = response.data.pagination
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
function openModal(isNewModal, item) {
  if (isNewModal) {
    tempProduct.value = {}
  } else {
    tempProduct.value = { ...item }
  }
  isNew.value = isNewModal
  const productComponent = productModal.value
  productComponent.showModal()
}
function updateProduct(item) {
  tempProduct.value = { ...item }
  let api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product`
  let httpMethod = 'post'
  isLoading.value = true
  if (!isNew.value) {
    api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product/${item.id}`
    httpMethod = 'put'
  }
  const productComponent = productModal.value
  axios[httpMethod](api, { data: tempProduct.value })
    .then((response) => {
      isLoading.value = false
      productComponent.hideModal()
      if (response.data.success) {
        getProducts()
        ShowNotification('success', 'Updeted successfully')
      } else {
        ShowNotification('error', 'Failed to update')
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
function openDelProductModal(item) {
  tempProduct.value = { ...item }
  const delComponent = delModal.value
  delComponent.showModal()
}
function delProduct() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product/${tempProduct.value.id}`
  const delComponent = delModal.value
  isLoading.value = true
  axios
    .delete(url)
    .then((response) => {
      delComponent.hideModal()
      if (response.data.success) {
        getProducts()
        ShowNotification('success', 'Deleted successfully')
      } else {
        ShowNotification('error', 'Failed to delete')
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
  getProducts()
})
</script>
