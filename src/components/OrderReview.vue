<template>
  <div class="order-review">
    <h2>Order Review</h2>
    <div>
      <h3>Shipping Address</h3>
      <p v-if="address">
        {{ address.addressLine1 }}
      </p>
      <p v-else>No address selected</p>
    </div>

    <div>
      <h3>Payment Method</h3>
      <p v-if="paymentMethod === 'CreditCard' && creditCard">
        Credit Card ending in {{ creditCard.cardNumber.slice(-4) }}
      </p>
      <p v-else-if="paymentMethod === 'PurchaseOrder'">Purchase Order</p>
      <p v-else>No payment method selected</p>
    </div>

    <div>
      <h3>Total</h3>
      <p>${{ cart.total }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
      required: true,
    },
    address: {
      type: Object,
      required: false,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    creditCard: {
      type: Object,
      required: false,
    },
  },
}
</script>

<style>
.order-review {
  margin-bottom: 20px;
}
</style>
