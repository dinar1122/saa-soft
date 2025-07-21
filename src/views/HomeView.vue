<script setup lang="ts">
import AlertComponent from '@/components/ui/AlertComponent.vue'
import ListItemComponent from '@/components/ListItemComponent.vue'
import { useAccountsStore } from '@/stores/accounts'
import Header from '@/components/Header.vue'

const store = useAccountsStore()
</script>

<template>
  <Header :create-acc="store.addAccount" />
  <AlertComponent
    :displayedData="`Для указания нескольких меток одной пары используйте разделитель ;`"
  />
  <main>
    <div class="flex flex-col gap-2 w-full">
      <ListItemComponent
        v-for="account in store.accounts"
        :key="account.id"
        :account="account"
        :delete-method="store.removeAccount"
        :update-account-method="store.updateAccount"
      />
    </div>
  </main>
</template>
