<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
    id="delModal"
    ref="modalElement"
  >
    <div class="bg-gray-50 text-black p-6 max-w-lg w-full rounded-lg shadow-lg">
      <h5 class="text-xl font-bold mb-4">Delete Confirmation</h5>
      <div class="mb-4 text-black">Deletion is irreversible. Are you sure you want to proceed?</div>
      <div class="flex justify-end gap-2 text-sm">
        <button type="button" class="btn-outline-secondary rounded px-4 py-2" @click="hideModal">
          Cancel
        </button>
        <button
          type="button"
          class="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-100 transition-colors duration-300 ease-in-out cursor-pointer"
          @click="$emit('del-item')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useModal from '@/shared/useModal'
defineProps({
  item: {
    type: Object,
    required: true
  }
})

const { isVisible, modalElement, showModal, hideModal } = useModal()

defineExpose({
  showModal,
  hideModal
})
</script>
