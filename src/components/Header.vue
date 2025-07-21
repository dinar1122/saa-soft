<script setup lang="ts">
const props = defineProps({
  createAcc: {
    type: Function,
    default: () => {},
  },
})
</script>

<template>
  <header class="flex items-center mb-2">
    <span class="font-semibold text-2xl max-h-fit">Учетные записи</span>
    <button
      @click="createAcc()"
      type="button"
      class="border-2 border-gray-300 hover:border-blue-500 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 p-1 px-2 mx-2 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-100 active:scale-95 flex items-center justify-center min-w-10"
    >
      <span class="text-lg font-medium">+</span>
      <span class="sr-only">Добавить</span>
    </button>
  </header>
</template>
