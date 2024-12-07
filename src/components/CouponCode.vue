<template>
  <n-space>
    <div class="coupon-code b-r-black border-1 b-solid p-4">
      <h4>Apply Coupon</h4>
      <input v-model="couponCode" placeholder="Enter coupon code" @keyup.enter="applyCoupon" />
      <n-button
        strong
        secondary
        round
        type="primary"
        @click="applyCoupon"
        :disabled="couponCode === ''"
      >
        Apply
      </n-button>
    </div>
  </n-space>
</template>

<script setup>
import { ref } from 'vue'

const couponCode = ref('')
import { NSpace, NButton } from 'naive-ui'
const emit = defineEmits(['apply-coupon'])

const applyCoupon = () => {
  if (couponCode.value) {
    emit('apply-coupon', couponCode.value)
    couponCode.value = ''
  }
}
</script>

<style>
.coupon-code {
  margin-bottom: 20px;
}
</style>
