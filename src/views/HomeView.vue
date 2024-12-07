<template>
  <main>
    <n-message-provider>
      <CheckoutForm />
    </n-message-provider>
  </main>
</template>

<script setup>
import CheckoutForm from '@/pages/CheckoutForm.vue'
import { useMessage, NMessageProvider } from 'naive-ui'
</script>
