<template>
  <div
    class="flex flex-col group bg-white dark:bg-gray-700 dark:border-gray-500 w-full h-full rounded border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-sm hover:scale-105"
  >
    <RouterLink :to="`/product/${item.id}`" class="flex flex-col grow">
      <div class="relative overflow-hidden cursor-pointer" @click="emitGetProduct">
        <img
          :src="item.imageUrl"
          class="w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          alt="productImages"
        />
      </div>

      <div class="p-3 flex flex-col grow">
        <div class="flex items-center text-primary dark:text-gray-200 font-bold mb-2">
          <HomeModernIcon class="w-5 h-5 text-primary dark:text-gray-200 mr-1" />
          {{ item.category }}
        </div>

        <h5 class="text-espresso font-extrabold mb-3 text-lg dark:text-white">
          {{ item.title }}
        </h5>

        <div class="flex justify-between items-center mb-3">
          <div class="text-base text-gray-500 dark:text-gray-300 line-through" v-if="item.price">
            NT${{ $format.currency(item.origin_price) }}
          </div>
          <div class="font-bold text-lg text-espresso dark:text-gray-100" v-if="item.price">
            NT${{ $format.currency(item.price) }}
          </div>
          <div class="text-lg text-espresso dark:text-gray-100" v-else>
            NT${{ $format.currency(item.origin_price) }}
          </div>
        </div>
      </div>
    </RouterLink>

    <div class="pt-0 pb-3 bg-transparent flex flex-col p-3 text-center">
      <button
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 btn-primary font-bold rounded"
        :disabled="isDone === item.id"
        @click="emitAddCart"
      >
        <ShoppingCartIcon class="w-5 h-5 text-white mr-1" />
        Add To Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { HomeModernIcon, ShoppingCartIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  item: { type: Object, required: true },
  isDone: { type: [String, Number], default: null }
})

const emit = defineEmits(['get-product', 'add-cart'])

function emitGetProduct() {
  emit('get-product', props.item.id)
}

function emitAddCart() {
  emit('add-cart', props.item.id)
}
</script>
