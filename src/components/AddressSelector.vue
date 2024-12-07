<template>
  <div class="address-selector">
    <h2>Shipping Address</h2>
    <div>
      <div
        v-for="address in addresses"
        :key="address.id"
        :class="{ selected: address.id === selectedAddress?.id }"
      >
        <label>
          <input
            type="radio"
            :value="address.id"
            v-model="selectedAddressId"
            @change="$emit('select-address', address)"
          />
          {{ address.addressLine1 }}
        </label>

<!--        <input-->
<!--          :placeholder="address.addressLine1"-->
<!--          :value="address.addressLine1"-->
<!--          v-model="selectedAddressId"-->
<!--        />-->
<!--        <input-->
<!--          :placeholder="address.addressLine2"-->
<!--          :value="address.addressLine2"-->
<!--          v-model="selectedAddressId"-->
<!--        />-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addresses: {
      type: Array,
      required: true,
    },
    selectedAddress: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      selectedAddressId: this.selectedAddress?.id || null,
    };
  },
};
</script>

<style>
.address-selector {
  margin-bottom: 20px;
}
.selected {
  font-weight: bold;
}
</style>
