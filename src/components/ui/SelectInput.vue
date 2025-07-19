<template>
  <div class="max-w-sm">
    <select
      :id="id"
      :name="name"
      :value="selected ?? modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :disabled="disabled"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  selected?: string
  options: Option[]
  modelValue?: string
  label?: string
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>
