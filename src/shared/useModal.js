import { ref } from 'vue'

export default function useModal() {
  const isVisible = ref(false)
  const modalElement = ref(null)

  const showModal = () => {
    isVisible.value = true
  }

  const hideModal = () => {
    isVisible.value = false
  }

  const toggleModal = () => {
    isVisible.value = !isVisible.value
  }

  return {
    isVisible,
    modalElement,
    showModal,
    hideModal,
    toggleModal
  }
}
