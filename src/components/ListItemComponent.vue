<script setup lang="ts">
import { computed, ref } from 'vue'
import CustomInput from './CustomInput.vue'
import SelectInput from './ui/SelectInput.vue'

const props = defineProps({
  deleteMethod: {
    type: Function,
    default: () => {},
  },
  updateAccountMethod: {
    type: Function,
    required: true,
  },
  account: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      label: '',
      login: '',
      password: '',
      type: 'local',
    }),
  },
})

const loginError = ref('')
const passwordError = ref('')

const accountLabel = ref(
  
    props.account.label
      .reduce((acc: string, item: { text: string }) => acc + (item.text + ';'), '')
      .slice(0, -1),
)

const accountType = ref(props.account.type)
const accountLogin = ref(props.account.login)
const accountPassword = ref(props.account.password)

const validateLogin = (value: string) => {
  if (!value.trim()) {
    return 'Логин обязателен для заполнения'
  }
  if (value.length > 100) {
    return 'Логин не должен превышать 100 символов'
  }
  return ''
}

const validatePassword = (value: string) => {
  if (accountType.value === 'local' && !value.trim()) {
    return 'Пароль обязателен для заполнения'
  }
  if (value.length > 50) {
    return 'Пароль не должен превышать 100 символов'
  }
  
  return ''
}

const handleFieldUpdate = (field: string, value: string) => {
  if (field === 'login') {
    loginError.value = validateLogin(value)
    if (loginError.value) return
  }
  
  if (field === 'password') {
    passwordError.value = validatePassword(value)
    if (passwordError.value) return
  }
  
  props.updateAccountMethod(props.account.id, { [field]: value })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2 items-center">
      <CustomInput
        class="w-100"
        v-model="accountLabel"
        placeholder="Метка"
        field-name="label"
        :account-id="account.id"
        :update-method="handleFieldUpdate"
      />

      <SelectInput
        v-model="accountType"
        :options="[
          { value: 'ldap', label: 'LDAP' },
          { value: 'local', label: 'Локальная' },
        ]"
        @update:modelValue="(val) => handleFieldUpdate('type', val)"
      />

      <div class="flex flex-col">
        <CustomInput
          v-model="accountLogin"
          placeholder="Логин*"
          field-name="login"
          :account-id="account.id"
          :update-method="handleFieldUpdate"
          :class="{ 'border-red-500': loginError }"
          @blur="loginError = validateLogin(accountLogin)"
        />
        <span v-if="loginError" class="text-red-500 text-xs mt-1">{{ loginError }}</span>
      </div>

      <div class="flex flex-col" v-if="accountType !== 'ldap'">
        <CustomInput
          v-model="accountPassword"
          placeholder="Пароль*"
          field-name="password"
          :accountType="accountType"
          :account-id="account.id"
          :update-method="handleFieldUpdate"
          :class="{ 'border-red-500': passwordError }"
          @blur="passwordError = validatePassword(accountPassword)"
        />
        <span v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</span>
      </div>

      <button
        type="button"
        @click="deleteMethod(account.id)"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Удалить
      </button>
    </div>
  </div>
</template>