import { defineStore } from 'pinia'
import { getAddresses, selectAddress, addAddress } from '../api'

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: [],
    selectedAddress: null,
  }),
  actions: {
    async fetchAddresses() {
      const response = await getAddresses()
      this.addresses = response.data
      this.selectedAddress = this.addresses[0]
      return response
    },
    async selectAddress(addressLine1) {
      const selected = this.addresses.find((addr) => addr.addressLine1 === addressLine1)
      const response = await selectAddress(selected.id)
      this.selectedAddress = response.data
      return response
    },
    async addAddress(addresses) {
      const response = await addAddress(addresses)
      this.selectedAddress = response.data
      return response
    },
  },
})
