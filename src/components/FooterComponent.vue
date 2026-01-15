<template>
  <section>
    <div class="container mx-auto px-6 py-6">
      <footer
        class="bg-white border-t border-gray-20 text-primary text-sm dark:bg-gray-900 dark:text-gray-200"
      >
        <div
          class="max-w-7xl mx-auto py-6 flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-4"
        >
          <p class="mb-2 md:mb-0">&copy; 2025 Funnie Cafe - Only for Self Learning Purpose.</p>
          <button @click.prevent="goToLogin" title="Admin Login" class="cursor-pointer">
            <UserCircleIcon
              class="w-6 h-6 text-primary dark:text-gray-200 transition-colors duration-300"
            />
          </button>
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { UserCircleIcon } from '@heroicons/vue/24/solid'

const router = useRouter()

function goToLogin() {
  router.push('/login')
}
</script>
