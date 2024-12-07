<template>
  <div id="address-selector" class="flex justify-between mt-2 mb-2">
    <div>
      <p>Shipping Address</p>
    </div>

    <div>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-button>{{ props.selectedAddress.addressLine1 }}</n-button>
      </n-dropdown>
    </div>

    <!--      <div-->
    <!--        v-for="address in addresses"-->
    <!--        :key="address.id"-->
    <!--        :class="{ selected: address.id === selectedAddress?.id }"-->
    <!--      >-->
    <!--        <label>-->
    <!--          <input-->
    <!--            type="radio"-->
    <!--            :value="address.id"-->
    <!--            v-model="selectedAddressId"-->
    <!--            @change="$emit('select-address', address)"-->
    <!--          />-->
    <!--          {{ address.addressLine1 }}-->
    <!--        </label>-->

    <!--        &lt;!&ndash;        <input&ndash;&gt;-->
    <!--        &lt;!&ndash;          :placeholder="address.addressLine1"&ndash;&gt;-->
    <!--        &lt;!&ndash;          :value="address.addressLine1"&ndash;&gt;-->
    <!--        &lt;!&ndash;          v-model="selectedAddressId"&ndash;&gt;-->
    <!--        &lt;!&ndash;        />&ndash;&gt;-->
    <!--        &lt;!&ndash;        <input&ndash;&gt;-->
    <!--        &lt;!&ndash;          :placeholder="address.addressLine2"&ndash;&gt;-->
    <!--        &lt;!&ndash;          :value="address.addressLine2"&ndash;&gt;-->
    <!--        &lt;!&ndash;          v-model="selectedAddressId"&ndash;&gt;-->
    <!--        &lt;!&ndash;        />&ndash;&gt;-->
    <!--      </div>-->
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import { useMessage, NDropdown, NButton } from 'naive-ui'

import { useAddressStore } from '@/stores/address.js'

const addressStore = useAddressStore()

const props = defineProps({
  addresses: {
    type: Array,
    required: true,
  },
  selectedAddress: {
    type: Object,
    required: false,
  },
})

// const selectedAddressId = ref(props.selectedAddress?.id || null)
const message = useMessage()

const options = props.addresses.map((item) => {
  return {
    label: item.addressLine1,
    key: item.addressLine1,
  }
})

const emit = defineEmits(['select-address'])

const handleSelect = (address) => {
  message.info(String(address))
  emit('select-address', address)
}
</script>
