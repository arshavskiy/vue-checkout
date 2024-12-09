<template>
  <div id="checkout-form" class="flex" v-if="cart?.items">
    <div>
      <h1 class="ml-6">Checkout</h1>
      <ProductTable />
    </div>

    <div id="summary" class="p-8 max-w-500px b-1 b-solid">
      <CouponCode @apply-coupon="applyCoupon" />

      <div class="mb-4">
        <h3>cart totals</h3>
        <div class="flex flex-col">
          <div class="flex justify-between pt-2">
            <div>Subtotal:</div>
<!--            <div class="font-bold">${{ cartStore.newSubTotal }}</div>-->
            <div class="font-bold">${{ cart.subtotal }}</div>
          </div>
          <hr />
          <div class="flex justify-between pt-2">
            <div>Shipping:</div>
            <div class="font-bold">${{ cart.shipping }}</div>
          </div>
          <hr />
          <div class="flex justify-between pt-2">
            <div>Tax:</div>
            <div class="font-bold">${{ cart.tax }}</div>
          </div>
          <hr />
          <div class="flex justify-between pt-2">
            <div>Total:</div>
<!--            <div class="font-bold">${{ cartStore.newTotal }}</div>-->
            <div class="font-bold">${{ cart.total }}</div>
          </div>
        </div>
      </div>

      <AddressSelector
        v-if="addressStore.addresses.length"
        :addresses="addressStore.addresses"
        :selected-address="addressStore.selectedAddress"
        @select-address="selectAddress"
        @edit-address="editAddress"
      />

      <PaymentOptions
        v-if="paymentStore?.selectedCreditCard"
        :payment-options="paymentStore.paymentOptions"
        :credit-cards="paymentStore.creditCards"
        :selected-method="paymentStore.selectedPaymentMethod"
        @update-method="paymentStore.selectPaymentMethod"
        @select-credit="setPaymentCard"
      />

      <n-button type="success" class="w-full mt-4" @click="placeOrder">
        <div class="font-bold uppercase">Pay Order</div>
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useCartStore } from '../stores/cart.js'
import { usePaymentStore } from '../stores/payment.js'
import { useAddressStore } from '../stores/address.js'

import ProductTable from '../components/productTable.vue'
import PaymentOptions from '../components/PaymentOptions.vue'
import AddressSelector from '../components/AddressSelector.vue'
import CouponCode from '../components/CouponCode.vue'
import { useMessage, NButton } from 'naive-ui'

const cartStore = useCartStore()
const paymentStore = usePaymentStore()
const addressStore = useAddressStore()

const message = useMessage()
const { cart } = storeToRefs(cartStore)

const loadInitialData = async () => {
  await Promise.all([
    cartStore.fetchCart(),
    paymentStore.fetchPaymentOptions(),
    paymentStore.fetchCreditCards(),
    addressStore.fetchAddresses(),
  ]).then(() => {
    console.log(cart.value)
  })
}

const setResponseInfo = (res, cb) => {
  if (res.status > 300) {
    message.error(res.data || res.statusText)
  } else {
    if (cb) {
      cb(res)
    }
  }
}

const applyCoupon = async (couponCode) => {
  const res = await cartStore.applyCouponCode(couponCode)
  setResponseInfo(res)
}

const setPaymentCard = async () => {
  const res = await paymentStore.setPayment()
  setResponseInfo(res, () => {
    message.success(String(res.data.saved))
  })
}

const selectAddress = async (address) => {
  const res = await addressStore.selectAddress(address)
  setResponseInfo(res)
}
const editAddress = async (address) => {
  const res = await addressStore.addAddress(address)
  setResponseInfo(res)
}

const placeOrder = async () => {
  const res = await paymentStore.getOrder(cartStore.cart)
  setResponseInfo(res)
}

onMounted(loadInitialData)
</script>
