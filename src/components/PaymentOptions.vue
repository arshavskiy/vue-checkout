<template>
  <div class="payment-options">
    <h2>Payment Options</h2>
    <div v-for="option in paymentOptions" :key="option">
      <label>
        <input
          type="radio"
          :value="option"
          v-model="getSelectedMethod"
          @change="$emit('update-method', option)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script setup>

import {computed} from 'vue'

const props = defineProps({
  paymentOptions: {
    type: Array,
    required: true,
  },
  selectedMethod: {
    type: String,
    required: true,
  },
})

const getSelectedMethod = computed(()=>{
  return props.selectedMethod
})


</script>

<style>
.payment-options {
  margin-bottom: 20px;
}
</style>
