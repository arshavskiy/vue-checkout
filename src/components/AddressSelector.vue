<template>
  <div id="address-selector">
    <div class="flex justify-between mt-2 mb-2">
      <div>
        <p>Shipping Address</p>
      </div>
      <div>
        <n-dropdown trigger="click" :options="options" @select="handleSelect">
          <n-button>{{ props.selectedAddress.addressLine1 }}</n-button>
        </n-dropdown>
      </div>
    </div>

    <div class="flex flex-row-reverse mt-2 mb-2">
      <n-button @click="showModal = true" quaternary type="primary">Edit Address</n-button>
    </div>

    <n-modal
      v-model:show="showModal"
      transform-origin="center"
      :closable="true"
      :mask-closable="true"
      :size="'small'"
    >
      <n-card
        style="max-width: 500px"
        title="Add new address"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div>
          <n-form>
            <n-form-item label="Address line 1" path="addressLine1">
              <n-input
                v-model:value="newAddress.addressLine1"
                :placeholder="selectedAddress.addressLine1"
              />
            </n-form-item>

            <n-form-item label="Address line 2" path="addressLine2">
              <n-input
                v-model:value="newAddress.addressLine2"
                :placeholder="selectedAddress.addressLine2"
              />
            </n-form-item>

            <n-form-item label="Address city" path="city">
              <n-input v-model:value="newAddress.city" :placeholder="selectedAddress.city" />
            </n-form-item>

            <n-form-item v-if="newAddress.state" label="Address state" path="state">
              <n-input v-model:value="newAddress.state" :placeholder="selectedAddress.state" />
            </n-form-item>

            <n-form-item label="Address zipcode" path="zipCode">
              <n-input v-model:value="newAddress.zipCode" :placeholder="selectedAddress.zipCode" />
            </n-form-item>

            <n-form-item label="Address country" path="country">
              <n-input v-model:value="newAddress.country" :placeholder="selectedAddress.country" />
            </n-form-item>

            <div class="flex flex-row-reverse mt-4">
              <n-button type="primary" @click="saveAddress"> Submit </n-button>
              <n-button type="error" class="mr-2" @click="showModal = false"> Cancel </n-button>
            </div>
          </n-form>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import {
  useMessage,
  NDropdown,
  NButton,
  NModal,
  NCard,
  NForm,
  NSpace,
  NFormItem,
  NInput,
} from 'naive-ui'

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

const showModal = ref(false)
const newAddress = ref({
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
})

const options = props.addresses.map((item) => {
  return {
    label: item.addressLine1,
    key: item.addressLine1,
  }
})

const emit = defineEmits(['select-address'])

const handleSelect = (address) => {
  emit('select-address', address)
}
const saveAddress = () => {
  for (const val in newAddress.value) {
    if (!newAddress.value[val]) {
      newAddress.value[val] = props.selectedAddress[val]
    }
  }

  newAddress.value.id = props.selectedAddress.id
  if (newAddress) emit('edit-address', newAddress.value)
  showModal.value = false
}
</script>
