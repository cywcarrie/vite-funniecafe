<template>
  <div class="home relative flex flex-col justify-center items-center">
    <div class="text-center text-white/50 px-4"
>
      <h2 class="mb-3 md:mb-4 whitespace-nowrap uppercase leading-[1.6]"
      >
        <span class="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide md:tracking-wider">
          Funnie Cafe
        </span>
      </h2>
    </div>
    <div class="text-white mt-6 md:mt-12">
      <RouterLink
        to="/products"
        class="font-bold px-5 py-2 border bg-gray-600/60 border-white text-base md:text-lg lg:text-xl inline-block rounded text-white transition-colors duration-300 hover:bg-gray-700/70"
      >
        Shop Now
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
</script>

