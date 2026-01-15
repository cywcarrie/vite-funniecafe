<template>
  <div
    v-if="isVisible"
    ref="modalElement"
    class="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white max-w-4xl w-full rounded-lg shadow-lg overflow-y-auto max-h-screen p-6">
      <div class="flex justify-between items-center mb-4 border-b border-gray-300 pb-4">
        <h2 class="text-2xl font-bold">Product Details</h2>
        <button
          @click="hideModal"
          class="text-gray-500 hover:text-red-600 text-xl cursor-pointer transition-colors duration-300 ease-in-out"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div class="mb-4">
            <label class="block mb-1 font-medium">Enter Image URL</label>
            <input
              type="text"
              class="w-full border px-3 py-2 rounded"
              v-model="tempProduct.imageUrl"
              placeholder="Enter Image URL"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-medium">or Upload Image</label>
            <input
              type="file"
              class="w-full border px-3 py-2 rounded"
              ref="fileInput"
              @change="uploadFile"
            />
          </div>
          <img
            class="w-full rounded"
            :src="tempProduct.imageUrl"
            :alt="`${tempProduct.title} 圖片`"
          />
          <div class="mt-6" v-if="tempProduct.images">
            <div
              v-for="(image, key) in tempProduct.images"
              :key="key"
              class="flex items-center gap-2 mb-3"
            >
              <input
                type="url"
                class="flex-1 border px-3 py-2 rounded"
                v-model="tempProduct.images[key]"
                placeholder="Enter URL"
              />
              <img class="w-16 h-16 object-cover rounded" :src="image" />
              <button type="button" class="text-red-500" @click="tempProduct.images.splice(key, 1)">
                Remove
              </button>
            </div>

            <div
              v-if="tempProduct.images[tempProduct.images.length - 1] || !tempProduct.images.length"
            >
              <button
                class="w-full border border-blue-500 text-blue-500 px-3 py-2 rounded hover:bg-blue-50"
                type="button"
                @click="tempProduct.images.push('')"
              >
                Add Image
              </button>
            </div>
          </div>
        </div>
        <div class="md:col-span-2">
          <div class="mb-4">
            <label class="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              class="w-full border px-3 py-2 rounded"
              id="title"
              v-model="tempProduct.title"
              placeholder="Enter Product Name"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block mb-1 font-medium">Category</label>
              <input
                type="text"
                id="category"
                class="w-full border px-3 py-2 rounded"
                v-model="tempProduct.category"
                placeholder="Enter Category"
              />
            </div>
            <div>
              <label class="block mb-1 font-medium">Unit</label>
              <input
                type="text"
                id="unit"
                class="w-full border px-3 py-2 rounded"
                v-model="tempProduct.unit"
                placeholder="Enter Unit"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block mb-1 font-medium">Original Price</label>
              <input
                type="number"
                id="origin_price"
                class="w-full border px-3 py-2 rounded"
                v-model.number="tempProduct.origin_price"
                placeholder="Enter Original Price"
              />
            </div>
            <div>
              <label class="block mb-1 font-medium">Sale Price</label>
              <input
                type="number"
                id="price"
                class="w-full border px-3 py-2 rounded"
                v-model.number="tempProduct.price"
                placeholder="Enter Sale Price"
              />
            </div>
          </div>

          <div class="mb-4">
            <label class="block mb-1 font-medium">Product Description</label>
            <textarea
              id="description"
              class="w-full border px-3 py-2 rounded"
              v-model="tempProduct.description"
              placeholder="Enter Product Description"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block mb-1 font-medium">Details</label>
            <textarea
              id="content"
              class="w-full border px-3 py-2 rounded"
              v-model="tempProduct.content"
              placeholder="Enter product details"
            ></textarea>
          </div>

          <div class="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              class="w-4 h-4 text-green-600 accent-green-600 focus:ring-green-500"
              v-model="tempProduct.is_enabled"
              :true-value="1"
              :false-value="0"
              id="is_enabled"
            />
            <label for="is_enabled">Available Now ?</label>
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-end gap-2">
        <button @click="hideModal" class="px-4 py-2 btn-outline-secondary rounded mr-2">
          Cancel
        </button>
        <button @click="pushProduct" class="px-4 py-2 btn-primary rounded">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import useModal from '@/shared/useModal'
import { XMarkIcon } from '@heroicons/vue/24/solid'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update-product'])

const { isVisible, modalElement, showModal, hideModal } = useModal()

defineExpose({
  showModal,
  hideModal
})
const axios = inject('$axios')
const tempProduct = ref({})
const fileInput = ref(null)

watch(
  () => props.product,
  (newProduct) => {
    tempProduct.value = newProduct
    if (!tempProduct.value.images) {
      tempProduct.value.images = []
    }
  }
)

function uploadFile() {
  const uploadedFile = fileInput.value.files[0]
  const formData = new FormData()
  formData.append('file-to-upload', uploadedFile)
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/upload`
  axios.post(url, formData).then((response) => {
    if (response.data.success) {
      tempProduct.value.imageUrl = response.data.imageUrl
    }
  })
}
function pushProduct() {
  emit('update-product', tempProduct.value)
}
</script>
