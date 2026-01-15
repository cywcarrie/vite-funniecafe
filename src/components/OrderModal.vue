<template>
  <div
    v-if="isVisible"
    id="productModal"
    ref="modalElement"
    class="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white w-full max-w-6xl rounded shadow-lg overflow-y-auto max-h-screen p-6">
      <div class="flex items-center justify-between mb-4 border-b border-gray-300 pb-4">
        <h5 class="text-2xl font-bold">Order Summary</h5>
        <button
          type="button"
          class="text-gray-900 hover:text-red-600 text-xl transition-colors duration-300 ease-in-out cursor-pointer"
          @click="hideModal"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-4">User Information</h3>
            <div v-if="tempOrder.user" class="space-y-3">
              <div class="flex justify-between pb-2">
                <span class="text-gray-500">Name</span>
                <span>{{ tempOrder.user.name }}</span>
              </div>
              <div class="flex justify-between pb-2">
                <span class="text-gray-500">Email</span>
                <span>{{ tempOrder.user.email }}</span>
              </div>
              <div class="flex justify-between pb-2">
                <span class="text-gray-500">Phone</span>
                <span>{{ tempOrder.user.tel }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-400 pb-2">
                <span class="text-gray-500">Address</span>
                <span class="text-right">{{ tempOrder.user.address }}</span>
              </div>
            </div>
          </div>
          <div class="md:col-span-2">
            <h3 class="text-lg font-semibold mb-4">Order Details</h3>
            <div class="space-y-3">
              <div class="flex justify-between pb-2">
                <span class="text-gray-500">Order Number</span>
                <span>{{ tempOrder.id }}</span>
              </div>
              <div class="flex justify-between pb-2">
                <span class="text-gray-500">Order Time</span>
                <span>{{ $format.date(tempOrder.create_at) }}</span>
              </div>
              <div class="flex justify-between pb-2">
                <span class="text-gray-500">Payment Time</span>
                <span>
                  <span v-if="tempOrder.paid_date">{{ $format.date(tempOrder.paid_date) }}</span>
                  <span v-else class="text-gray-400">Invalid Time</span>
                </span>
              </div>
              <div class="flex justify-between pb-2">
                <span class="text-gray-500">Payment Status</span>
                <span>
                  <strong v-if="tempOrder.is_paid" class="text-green-600">Paid</strong>
                  <span v-else class="text-gray-400">Unpaid</span>
                </span>
              </div>
              <div class="flex justify-between border-b border-gray-400 pb-2">
                <span class="text-gray-500">Total</span>
                <span>{{ $format.currency(tempOrder.total) }}</span>
              </div>
            </div>
            <h3 class="text-lg font-semibold mt-6 mb-4">Purchased Items</h3>
            <div class="space-y-3">
              <div
                v-for="item in tempOrder.products"
                :key="item.id"
                class="flex flex-col md:flex-row justify-between border-b border-gray-400 pb-2"
              >
                <div class="font-medium text-gray-800">{{ item.product.title }}</div>
                <div class="text-sm text-gray-600">{{ item.qty }} / {{ item.product.unit }}</div>
                <div class="text-sm text-right text-gray-800">
                  {{ $format.currency(item.final_total) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2 py-6">
        <button type="button" class="btn-outline-secondary rounded px-4 py-2" @click="hideModal">
          Cancel
        </button>
        <button type="button" class="btn-primary rounded px-4 py-2" @click="pushOrderModal">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import useModal from '@/shared/useModal'
import { XMarkIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  order: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update-product', 'update-order'])

const { isVisible, modalElement, showModal, hideModal } = useModal()

defineExpose({
  showModal,
  hideModal
})

const tempOrder = ref({})
const isPaid = ref(false)

watch(
  () => props.order,
  (newOrder) => {
    tempOrder.value = newOrder
    isPaid.value = tempOrder.value.is_paid
  }
)

function pushOrderModal() {
  emit('update-order', tempOrder.value)
}
</script>
