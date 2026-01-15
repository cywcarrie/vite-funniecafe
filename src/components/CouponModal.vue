<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 shadow-md"
    id="couponModal"
    ref="modalElement"
  >
    <div class="bg-white w-full max-w-lg rounded shadow-lg overflow-y-auto p-6">
      <div class="flex justify-between items-center border-b border-gray-300 mb-4 pb-4">
        <h5 class="text-2xl font-bold">Coupon</h5>
        <button
          type="button"
          class="text-gray-500 hover:text-red-600 text-xl cursor-pointer transition-colors duration-300 ease-in-out"
          @click="hideModal"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            id="title"
            v-model="tempCoupon.title"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label for="coupon_code" class="block text-sm font-medium text-gray-700"
            >Coupon Code</label
          >
          <input
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            id="coupon_code"
            v-model="tempCoupon.code"
            placeholder="Enter coupon code"
          />
        </div>
        <div>
          <label for="due_date" class="block text-sm font-medium text-gray-700"
            >Expiration Date</label
          >
          <input
            type="date"
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            id="due_date"
            v-model="due_date"
          />
        </div>
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            id="price"
            v-model.number="tempCoupon.percent"
            placeholder="Enter discount (%)"
          />
        </div>
        <div class="flex items-center space-x-2">
          <input
            class="h-4 w-4 text-green-600 accent-green-600 focus:ring-green-500 cursor-pointer"
            type="checkbox"
            :true-value="1"
            :false-value="0"
            v-model="tempCoupon.is_enabled"
            id="is_enabled"
          />
          <label class="text-sm text-gray-700" for="is_enabled"> Is Enabled? </label>
        </div>
        <div class="flex justify-end space-x-2 py-6 border-t border-gray-400">
          <button type="button" class="px-4 py-2 btn-outline-secondary rounded" @click="hideModal">
            Cancel
          </button>
          <button type="button" class="btn-primary rounded px-4 py-2" @click="pushCoupon">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import useModal from '@/shared/useModal'
import { XMarkIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  coupon: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update-coupon'])

const { isVisible, modalElement, showModal, hideModal } = useModal()

defineExpose({
  showModal,
  hideModal
})

const tempCoupon = ref({})
const due_date = ref('')

watch(
  () => props.coupon,
  (newCoupon) => {
    tempCoupon.value = { ...newCoupon }
    const dueDateTime = new Date(tempCoupon.value.due_date * 1000)
    due_date.value = dueDateTime.toISOString().split('T')[0]
  }
)

watch(due_date, (newDueDate) => {
  tempCoupon.value.due_date = Math.floor(new Date(newDueDate) / 1000)
})

function pushCoupon() {
  emit('update-coupon', tempCoupon.value)
  hideModal()
}
</script>
