<template>
  <NavBar />
  <RouterView />
  <button
    type="button"
    class="btn-secondary top rounded-full px-2 py-2 md:px-3 md:py-3"
    v-show="scY > 500"
    @click="goTop"
  >
    <ChevronDoubleUpIcon class="w-5 h-5 md:w-6 md:h-6" />
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/UserNavbar.vue'
import { ChevronDoubleUpIcon } from '@heroicons/vue/24/solid'

const scTimer = ref(0)
const scY = ref(0)

function handleScroll() {
  if (scTimer.value) return
  scTimer.value = setTimeout(() => {
    scY.value = window.scrollY
    clearTimeout(scTimer.value)
    scTimer.value = 0
  }, 100)
}
function goTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
