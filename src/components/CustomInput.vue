<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  accountType?: string
  fieldName: string
  accountId: string
  updateMethod?: (field: string, value: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  updateMethod: () => {}
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)


const handleBlur = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
  props.updateMethod(props.fieldName, value)
}

const toggleVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="relative">
    <input
      :type="props.accountType == 'local' && !showPassword ? 'password' : 'text'"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="handleBlur"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
      :placeholder="placeholder"
    />
    
    <button
      v-if="fieldName === 'password'"
      type="button"
      @click="toggleVisibility"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
    >
      {{ showPassword ? 'Скрыть' : 'Показать' }}
    </button>
  </div>
</template>