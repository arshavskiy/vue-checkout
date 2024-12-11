<template>
  <n-space>
    <div class="coupon-code b-r-black border-1 b-solid p-4 mb-6">
      <h4>Apply Coupon</h4>
      <input
        v-model="couponCode"
        placeholder="Enter coupon code"
        @keyup.enter="applyCoupon"
        class="mr-4"
      />
      <n-button strong secondary type="primary" @click="applyCoupon" :disabled="couponCode === ''">
        Apply
      </n-button>
    </div>
  </n-space>
</template>

<script setup>
const cartStore = useCartStore()
const { couponCode } = storeToRefs(cartStore)

import { NSpace, NButton } from 'naive-ui'
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'
const emit = defineEmits(['apply-coupon'])

const applyCoupon = () => {
  if (couponCode.value) {
    emit('apply-coupon', couponCode.value)
  }
}
</script>
