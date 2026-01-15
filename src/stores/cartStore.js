import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export const useCartStore = defineStore('cartStore', () => {
  const isLoading = ref(false)
  const carts = ref([])
  const total = ref(0)
  const final_total = ref(0)
  const cart = ref({})
  const isDone = ref('')

  function getCart() {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart`
    isLoading.value = true
    axios
      .get(url)
      .then((response) => {
        cart.value = response.data.data
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || 'An error occurred. Please try again later.'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function addCart(id, qty = 1) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart`
    isDone.value = id
    const cart = {
      product_id: id,
      qty
    }
    isLoading.value = true
    axios
      .post(url, { data: cart })
      .then((response) => {
        if (response.data.success) {
          getCart()
          isDone.value = ''
          ShowNotification('success', 'Successfully added to cart')
        } else {
          ShowNotification('error', 'Failed to add to cart')
        }
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || 'An error occurred. Please try again later.'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function updateCart(item) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart/${item.id}`
    const data = {
      product_id: item.product_id,
      qty: item.qty
    }
    isLoading.value = true
    axios
      .put(url, { data })
      .then((response) => {
        if (response.data.success) {
          getCart()
        }
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || 'An error occurred. Please try again later.'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function removeCartItem(id) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart/${id}`
    isLoading.value = true
    axios
      .delete(url)
      .then((response) => {
        if (response.data.success) {
          getCart()
          ShowNotification('success', 'Removed from cart')
        } else {
          ShowNotification('error', 'Failed to remove from cart')
        }
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || 'An error occurred. Please try again later.'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function deleteAllCart() {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/carts`
    isLoading.value = true
    axios
      .delete(url)
      .then((response) => {
        if (response.data.success) {
          getCart()
          ShowNotification('success', 'Removed all items')
        } else {
          ShowNotification('error', 'Failed to remove all items')
        }
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || 'An error occurred. Please try again later.'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function getProduct(id) {
    router.push(`/product/${id}`)
  }
  function addCouponCode(coupon_code) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/coupon`
    const coupon = {
      code: coupon_code
    }
    isLoading.value = true
    axios
      .post(url, { data: coupon })
      .then((response) => {
        if (response.data.success) {
          getCart()
          ShowNotification('success', 'Successfully applied')
        } else {
          ShowNotification('error', 'Failed to apply')
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Failed to apply'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function copyCouponCode() {
    const text = 'funniecafe'
    navigator.clipboard
      .writeText(text)
      .then(() => {
        ShowNotification('success', 'Successfully copied')
      })
      .catch(() => {
        ShowNotification('error', 'Copy failed')
      })
  }

  return {
    isLoading,
    carts,
    total,
    final_total,
    cart,
    isDone,
    getCart,
    addCart,
    updateCart,
    removeCartItem,
    deleteAllCart,
    getProduct,
    addCouponCode,
    copyCouponCode
  }
})
