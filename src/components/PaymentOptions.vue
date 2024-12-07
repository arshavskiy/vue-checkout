<template>
  <div id="payment-options" class="flex justify-between mt-2 mb-2">
    <div>
      <h4>Payment Options</h4>
    </div>

    <div>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-button>{{ props.selectedMethod }}</n-button>
      </n-dropdown>
    </div>
    <!--    <div v-for="option in paymentOptions" :key="option">-->
    <!--      <label>-->
    <!--        <input-->
    <!--          type="radio"-->
    <!--          :value="option"-->
    <!--          v-model="getSelectedMethod"-->
    <!--          @change="$emit('update-method', option)"-->
    <!--        />-->
    <!--        {{ option }}-->
    <!--      </label>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NButton, NDropdown, useMessage } from 'naive-ui'

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

const message = useMessage()

const options = props.paymentOptions.map((item) => {
  return {
    label: item,
    key: item,
  }
})

const emit = defineEmits(['update-method'])

const handleSelect = (selectedMethod) => {
  message.info(String(selectedMethod))
  props.selectedMethod = selectedMethod
  emit('update-method', selectedMethod)
}

const getSelectedMethod = computed(() => {
  return props.selectedMethod
})
</script>

<style>
.payment-options {
  margin-bottom: 20px;
}
</style>
