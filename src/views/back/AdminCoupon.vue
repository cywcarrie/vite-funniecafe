<template>
  <VueLoading :active="isLoading" />
  <section class="mb-5">
    <div class="my-10">
      <div class="flex justify-end items-center mt-6">
        <button
          class="btn-primary rounded px-4 py-2 flex items-center"
          type="button"
          @click="openCouponModal(true)"
        >
          <PlusIcon class="w-6 h-6 pr-1 text-white" />Add Coupon
        </button>
      </div>
      <div class="mt-6 w-full overflow-x-auto">
        <div>
          <div class="hidden lg:block">
            <div class="grid grid-cols-5 bg-[#f5efe7] font-semibold text-sm py-3 px-4 rounded-t">
              <div>Title</div>
              <div class="whitespace-nowrap">Discount (%)</div>
              <div>Expiration Date</div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div
            v-for="item in coupons"
            :key="`coupon ${item.id}`"
            class="grid lg:grid-cols-5 gap-y-2 items-center border-b text-sm py-4 px-4 hover:bg-gray-50 transition flex-col md:flex-row"
          >
            <div class="whitespace-nowrap">
              <span class="inline-block text-gray-500 font-medium lg:hidden mr-2">Title：</span
              >{{ item.title }}
            </div>
            <div>
              <span class="inline-block text-gray-500 font-medium lg:hidden mr-2"
                >Discount (%)：</span
              >{{ item.percent }}%
            </div>
            <div class="whitespace-nowrap">
              <span class="inline-block text-gray-500 font-medium lg:hidden mr-2"
                >Expiration Date：</span
              >{{ $format.date(item.due_date) }}
            </div>
            <div>
              <span class="inline-block text-gray-500 font-medium lg:hidden mr-2">Is Enabled?</span>
              <span v-if="item.is_enabled === 1" class="text-green-600">Enabled</span>
              <span v-else class="text-gray-400">Not enabled</span>
            </div>
            <div class="flex gap-2">
              <button
                class="btn-outline-primary text-xs px-2 py-1 rounded"
                type="button"
                @click="openCouponModal(false, item)"
              >
                Edit
              </button>
              <button
                class="text-red-500 border border-red-500 hover:bg-red-100 text-xs px-2 py-1 rounded transition-colors duration-300 ease-in-out cursor-pointer"
                type="button"
                @click="openDelCouponModal(item)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <CouponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
  <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import ShowNotification from '@/shared/swal'
import { PlusIcon } from '@heroicons/vue/20/solid'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

defineProps({
  config: Object
})

const axios = inject('$axios')
const coupons = ref({})
const tempCoupon = ref({
  title: '',
  is_enabled: 0,
  percent: 100,
  code: ''
})
const isLoading = ref(false)
const isNew = ref(false)
const couponModal = ref(null)
const delModal = ref(null)

function openCouponModal(isNewFlag, item) {
  isNew.value = isNewFlag
  if (isNew.value) {
    tempCoupon.value.due_date = new Date().getTime() / 1000
  } else {
    tempCoupon.value = { ...item }
  }
  couponModal.value.showModal()
}
function openDelCouponModal(item) {
  tempCoupon.value = { ...item }
  const delComponent = delModal.value
  delComponent.showModal()
}
function getCoupons() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupons`
  isLoading.value = true
  axios
    .get(url, tempCoupon.value)
    .then((response) => {
      coupons.value = response.data.coupons
    })
    .catch((error) => {
      const message = error.response?.data?.message || 'An error occurred. Please try again later.'
      ShowNotification('error', message)
    })
    .finally(() => {
      isLoading.value = false
    })
}
function updateCoupon(tempCoupon) {
  if (isNew.value) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon`
    isLoading.value = true
    axios.post(url, { data: tempCoupon }).then((response) => {
      isLoading.value = false
      if (response.data.success) {
        ShowNotification('success', 'Added new coupon successfully')
        getCoupons()
        couponModal.value.hideModal()
      } else {
        ShowNotification('error', 'Failed to add new coupon')
      }
    })
  } else {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon/${tempCoupon.id}`
    isLoading.value = true
    axios
      .put(url, { data: tempCoupon })
      .then((response) => {
        if (response.data.success) {
          ShowNotification('success', 'Updated coupon successfully')
          getCoupons()
          couponModal.value.hideModal()
        } else {
          ShowNotification('error', 'Failed to update coupon')
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
}
function delCoupon() {
  const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon/${tempCoupon.value.id}`
  isLoading.value = true
  axios
    .delete(url)
    .then((response) => {
      if (response.data.success) {
        ShowNotification('success', 'Deleted coupon successfully')
        const delComponent = delModal.value
        delComponent.hideModal()
        getCoupons()
      } else {
        ShowNotification('error', 'Failed to delete coupon')
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
  getCoupons()
})
</script>
