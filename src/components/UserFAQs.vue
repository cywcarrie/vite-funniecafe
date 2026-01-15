<template>
  <div class="flex justify-center">
    <div class="w-11/12 md:w-8/12">
      <div>
        <article v-for="(item, index) in faqItems" :key="`faq-${index}`">
          <p class="font-bold text-sm md:text-base text-black dark:text-gray-100 mb-1">
            Q : {{ item.question }}
          </p>
          <p class="text-black dark:text-gray-300 mb-3 text-sm md:text-base">
            A : {{ item.answer }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqItems = [
  {
    question: 'How do I cancel/refund my order ?',
    answer: 'Please call our store contact number 123-456-789 for assistance.'
  },
  {
    question: 'What happens if I am having trouble ordering through the website?',
    answer: 'Please call our store contact number 123-456-789 for assistance.'
  },
  {
    question: 'What delivery options are available ?',
    answer: 'Currently, we only provide delivery to limited area ( Tainan City ).'
  },
  {
    question:
      "What happens if my food & drinks arrives damaged/incorrect or didn't arrive at all ?",
    answer: 'Please call our store contact number 123-456-789 for assistance.'
  },
  {
    question: 'What is a coupon code ?',
    answer:
      'A coupon or promotional code discounts the price on a single item or an entire purchase. You add the code during check-out before you pay.'
  },
  {
    question: 'How to use coupon code ?',
    answer:
      "When you check out on the store's website, type the code, or paste it into the coupon code box, and then click the button to apply it."
  }
]
</script>
