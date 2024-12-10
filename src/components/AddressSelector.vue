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
      <n-button @click="showModal = true" quaternary type="primary">Add Address</n-button>
    </div>
    <div v-if="showModal">

      <NForm :model="newAddress" ref="formRef" :rules="rules">
        <NFormItem label="Address Line 1" path="addressLine1">
          <NInput v-model:value="newAddress.addressLine1" clearable placeholder="Enter Address Line 1"/>
        </NFormItem>

        <NFormItem label="Address Line 2" path="addressLine2">
          <NInput v-model:value="newAddress.addressLine2" placeholder="Enter Address Line 2"/>
        </NFormItem>

        <NFormItem label="Country" path="country">
          <NAutoComplete
            v-model:value="newAddress.country"
            :options="countryOptions"
            placeholder="Enter Country"
            :on-select="getStates"
            :on-update-value="getStates"
          />
        </NFormItem>

        <NFormItem label="State" path="state">
          <NAutoComplete
            v-model:value="newAddress.state"
            :options="statesOptions"
            placeholder="Enter State"

          />
        </NFormItem>
        <NFormItem label="City" path="city">
          <NInput v-model:value="newAddress.city" placeholder="Enter city"/>
        </NFormItem>

        <NFormItem label="Zip Code" path="zipCode">
          <NInput v-model:value="newAddress.zipCode" placeholder="Enter Zip Code"/>
        </NFormItem>
        <div class="flex flex-row-reverse mb-4">
          <NButton type="primary" @click="saveAddress" :disabled="formDisabled"> Submit</NButton>
          <NButton type="error" class="mr-2" @click="showModal = false"> Cancel</NButton>
        </div>
      </NForm>

    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, watch} from 'vue';

import {
  NDropdown,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NAutoComplete
} from 'naive-ui'

import {useAddressStore} from '@/stores/address.js'
const addressStore = useAddressStore()

let statesOptions = [];
const countryOptions = addressStore.countries.map((c) => {
  return {
    label: c,
    key: c,
  }
})

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
const formDisabled = ref(false)
const formRef = ref(null)

const newAddress = ref({
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
})

const rules = {
  addressLine1: [
    {required: true, message: 'Address Line 1 is required', trigger: ['input', 'blur']},
  ],
  country: [
    {required: true, message: 'Country is required', trigger: ['input', 'blur']},
  ],
  state: [
    {required: true, message: 'State is required'},
  ],
  city: [
    {required: true, message: 'City is required', trigger: ['input', 'blur']},
  ],
  zipCode: [
    {required: true, message: 'Zip Code is required', trigger: ['input', 'blur']},
    {pattern: /^\d{7}$/, message: 'Zip Code must be a 7-digit number', trigger: ['input', 'blur']}
  ],

};


const options = props.addresses.map((item) => {
  return {
    label: item.addressLine1,
    key: item.addressLine1,
  }
})

const emit = defineEmits(['select-address', 'add-address'])

const handleSelect = (address) => {
  emit('select-address', address)
}
const saveAddress = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      console.log('Submitted data:', newAddress.value);
      if (newAddress) emit('add-address', newAddress.value)
      showModal.value = false
    } else {
      console.error('Validation failed:', errors);
    }
  });
}

const editAddress = () => {
  for (const val in newAddress.value) {
    if (!newAddress.value[val]) {
      newAddress.value[val] = props.selectedAddress[val]
    }
  }

  newAddress.value.id = props.selectedAddress.id
  if (newAddress) emit('edit-address', newAddress.value)
  showModal.value = false
}

const getStates = async (country) => {
  if (addressStore.countries.includes(country)) {
    await addressStore.getStates(country);
    statesOptions = addressStore.states.map((s) => {
      return {
        label: s,
        key: s,
      }
    })
  }
}

watch(newAddress.states, (newValue, oldValue) => {
  console.log(`Name changed from ${oldValue} to ${newValue}`);
  addressStore.getStates();
  debugger
  statesOptions = addressStore.states.map((s) => {
    return {
      label: s,
      key: s,
    }
  })
});

</script>
