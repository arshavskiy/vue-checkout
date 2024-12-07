<template>
  <div id="checkout-form" class="flex">


    <!-- Cart Summary -->
    <div class="p-6">
      <h1>Checkout</h1>
      <CartSummary v-if="cart?.items"/>
    </div>
    <div class="p-6">
      <!-- Payment Options -->

      <div>

        <h3>cart totals</h3>

        <div class="flex flex-col">
          <div class="flex justify-between pt-2">
            <div>Subtotal:</div>
            <div class="font-bold">${{ getSubTotal }}</div>
          </div>
          <hr>
          <div class="flex justify-between pt-2">
            <div>Shipping:</div>
            <div class="font-bold">${{  cart.shipping }}</div>
          </div>
          <hr>
          <div class="flex justify-between pt-2">
            <div>Tax:</div>
            <div class="font-bold">${{ cart.tax }}</div>
          </div>
          <hr>
          <div class="flex justify-between pt-2">
            <div>Total:</div>
            <div class="font-bold">${{ getTotal }}</div>
          </div>

        </div>
      </div>
      <PaymentOptions
        :payment-options="paymentStore.paymentOptions"
        :selected-method="paymentStore.selectedPaymentMethod"
        @update-method="paymentStore.selectPaymentMethod"
      />

      <!-- Address Selector -->
      <AddressSelector
        :addresses="addressStore.addresses"
        :selected-address="addressStore.selectedAddress"
        @select-address="addressStore.selectAddress"
      />

      <!-- Coupon Code -->
      <CouponCode @apply-coupon="applyCoupon"/>

      <!-- Order Review -->
<!--      <OrderReview-->
<!--        v-if="cart?.items" :cart="cart.items"-->
<!--        :address="addressStore.selectedAddress"-->
<!--        :payment-method="paymentStore.selectedPaymentMethod"-->
<!--        :credit-card="paymentStore.selectedCreditCard"-->
<!--      />-->

      <!-- Place Order Button -->
      <button class="btn-placeOrder" @click="placeOrder">Place Order</button>
    </div>


  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {storeToRefs} from 'pinia'

import {useCartStore} from '../stores/cart.js';
import {usePaymentStore} from '../stores/payment.js';
import {useAddressStore} from '../stores/address.js';

import {getPlaceOrder} from '../api/index.js';

import CartSummary from '../components/CartSummary.vue';
import PaymentOptions from '../components/PaymentOptions.vue';
import AddressSelector from '../components/AddressSelector.vue';
import CouponCode from '../components/CouponCode.vue';
import OrderReview from '../components/OrderReview.vue';

const cartStore = useCartStore();
const paymentStore = usePaymentStore();
const addressStore = useAddressStore();


const {cart, getSubTotal, getTotal} = storeToRefs(cartStore)

const loadInitialData = async () => {
  await Promise.all([
    cartStore.fetchCart(),
    paymentStore.fetchPaymentOptions(),
    paymentStore.fetchCreditCards(),
    addressStore.fetchAddresses(),
  ]).then(data => {
    console.log(cart);
  });
};

const applyCoupon = async (couponCode) => {
  await cartStore.applyCouponCode({ "couponCode": couponCode});
};

const placeOrder = async () => {
  const orderData = {
    cartId: cartStore.cart.orderId,
    addressId: addressStore.selectedAddress.id,
    paymentMethod: paymentStore.selectedPaymentMethod,
    paymentInfoId: paymentStore.selectedPaymentMethod === 'CreditCard' ? paymentStore.selectedCreditCard.id : null,
    termsAndConditionsAccepted: true,
  };

  await getPlaceOrder(orderData);
  alert('Order placed successfully!');
};

onMounted(loadInitialData);

</script>
