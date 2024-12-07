<template>
  <div class="coupon-code">
    <h2>Apply Coupon</h2>
    <input
      v-model="couponCode"
      placeholder="Enter coupon code"
      @keyup.enter="applyCoupon"
    />
    <button @click="applyCoupon">Apply</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponCode: '',
    };
  },
  methods: {
    applyCoupon() {
      if (this.couponCode) {
        this.$emit('apply-coupon', this.couponCode);
        this.couponCode = ''; // Clear the input field
      }
    },
  },
};
</script>

<style>
.coupon-code {
  margin-bottom: 20px;
}
</style>
