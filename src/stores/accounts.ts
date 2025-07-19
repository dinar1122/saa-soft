import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type AccountType = 'ldap' | 'local'

interface Account {
  id: string
  login: string
  password: string | null
  type: AccountType
  label?: Array<{ text: string }> | string
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([
    {
      id: '1',
      label: [{ text: 'метка1' }, { text: 'метка2' }],
      login: 'test',
      password: 'asdsad',
      type: 'ldap'
    },
  ])

  const isLoading = ref(false)
  const error = ref<string | null>(null)


  const accountsCount = computed(() => accounts.value.length)


  const addAccount = (account?: Partial<Omit<Account, 'id'>>) => {
    const newAccount: Account = {
      id: generateId(),
      label: [],
      login: '',
      password: null,
      type: 'ldap',
      ...account
    }
    accounts.value.push(newAccount)
  }

  const normalizeLabels = (labels?: Array<{ text: string }> | string) => {
    if (!labels) return [{ text: '' }]
    if (typeof labels === 'string') {
      return labels.split(';').map(text => ({ text: text.trim() }))
    }
    return labels
  }

  const updateAccount = (id: string, updates: Partial<Account>) => {
    console.log(updates)
    const index = accounts.value.findIndex(a => a.id === id)
    if (index !== -1) {
      accounts.value[index] = {
        ...accounts.value[index],
        ...updates,
        password: updates.type === 'ldap' ? null : updates.password ?? accounts.value[index].password,
        label: updates.label ? normalizeLabels(updates.label) : accounts.value[index].label
      }
    }
  }

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter(account => account.id !== id)
  }

  const getAccountById = (id: string) => 
    computed(() => accounts.value.find(account => account.id === id))

  const generateId = () => Math.random().toString(36).substring(2, 11)

  return {
    accounts,
    accountsCount,
    isLoading,
    error,
    addAccount,
    updateAccount,
    removeAccount,
    getAccountById,
  }
})