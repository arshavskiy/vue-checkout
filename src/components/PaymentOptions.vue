<template>
  <div id="payment-options" class="flex mt-2 mb-2 flex-col">
    <div class="flex justify-between">
      <div>
        <h4>Payment Options</h4>
      </div>
      <div>
        <n-dropdown trigger="click" :options="options" @select="handleSelect">
          <n-button>{{ props.selectedMethod }}</n-button>
        </n-dropdown>
      </div>
    </div>

    <div class="flex justify-between">
      <div>
        <h4>Select Credit</h4>
      </div>
      <div>
        <n-dropdown trigger="click" :options="options2" @select="handleSelect2">
          <n-button>{{ selectedCreditCard?.cardHolderName }}</n-button>
        </n-dropdown>
      </div>
    </div>

    <div class="flex flex-col mt-4">
      <div class="flex justify-between">
        <small>Name On Card</small>
        <n-code>
          {{ selectedCreditCard.cardHolderName }}
        </n-code>
      </div>
      <div class="flex justify-between">
        <small>Card Number</small>
        <n-code>
          {{ selectedCreditCard.cardNumber }}
        </n-code>
      </div>
      <div class="flex justify-between">
        <small>Expiration Date</small>
        <n-code> {{ selectedCreditCard.expiryMonth }}/{{ selectedCreditCard.expiryYear }} </n-code>
      </div>
      <div class="flex justify-between">
        <small>CVV</small>
        <n-code>
          {{ selectedCreditCard.cvv }}
        </n-code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { NButton, NDropdown, useMessage, NCode } from 'naive-ui'
import { usePaymentStore } from '@/stores/payment.js'
import { storeToRefs } from 'pinia'

const paymentStore = usePaymentStore()
const { selectedCreditCard } = storeToRefs(paymentStore)

const props = defineProps({
  paymentOptions: {
    type: Array,
    required: true,
  },
  creditCards: {
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

const options2 = props.creditCards.map((item) => {
  return {
    label: item.cardHolderName,
    key: item.cardHolderName,
  }
})

const selectedCard = computed(() => {
  return props.creditCards[0]
})

const emit = defineEmits(['update-method', 'select-credit'])

const cardSelected = ref(false)

const handleSelect = (selectedMethod) => {
  message.info(selectedMethod)
  props.selectedMethod = selectedMethod
  emit('update-method', selectedMethod)
}

const handleSelect2 = (selectedCredit) => {
  paymentStore.selectCreditCard(selectedCredit)
  cardSelected.value = true
  emit('select-credit')
}
</script>

<style>
.payment-options {
  margin-bottom: 20px;
}
</style>
