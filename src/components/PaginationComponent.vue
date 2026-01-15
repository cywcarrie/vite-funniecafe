<template>
  <nav aria-label="Page navigation" class="mt-6">
    <ul class="flex justify-center items-center space-x-2">
      <li>
        <button
          class="px-3 py-1 flex items-center justify-center rounded text-gray-700 transition-colors duration-300 ease-in-out disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
          :disabled="!pages.has_pre"
          @click.prevent="updatePage(pages.current_page - 1)"
          aria-label="Previous"
        >
          <ChevronLeftIcon
            class="w-5 h-5"
            :class="pages.has_pre ? 'text-gray-700 hover:text-[#7a5c48]' : 'text-gray-400'"
          />
        </button>
      </li>
      <li v-for="page in pages.total_pages" :key="page">
        <button
          class="px-3 py-1 flex items-center justify-center rounded transition-colors duration-300 ease-in-out cursor-pointer"
          :class="{
            'bg-secondary text-white border-secondary cursor-default': page === pages.current_page,
            'hover:bg-[#e6d5c8] hover:text-espresso cursor-pointer text-gray-700':
              page !== pages.current_page
          }"
          :disabled="page === pages.current_page"
          @click.prevent="page !== pages.current_page && updatePage(page)"
        >
          {{ page }}
        </button>
      </li>
      <li>
        <button
          class="px-3 py-1 flex items-center justify-center rounded text-gray-700 transition-colors duration-300 ease-in-out disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
          :disabled="!pages.has_next"
          @click.prevent="updatePage(pages.current_page + 1)"
          aria-label="Next"
        >
          <ChevronRightIcon
            class="w-5 h-5"
            :class="pages.has_next ? 'text-gray-700 hover:text-[#7a5c48]' : 'text-gray-400'"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid'

defineProps(['pages'])
const emit = defineEmits(['emit-pages'])

function updatePage(page) {
  emit('emit-pages', page)
}
</script>
