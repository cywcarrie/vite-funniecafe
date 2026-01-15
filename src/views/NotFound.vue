<template>
  <section
    class="text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center"
  >
    <ExclamationCircleIcon class="w-16 h-16 sm:w-20 sm:h-20 text-espresso mb-4" />

    <p class="text-5xl sm:text-6xl font-black text-espresso mb-4">404</p>

    <p class="text-base sm:text-lg md:text-xl text-gray-800 mb-6">Oops! Page not found.</p>

    <RouterLink
      to="/"
      class="inline-block px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base btn-primary rounded"
    >
      Back to Home
    </RouterLink>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
</script>
