import {defineStore} from 'pinia'
import {getAddresses, selectAddress, addAddress, updateAddress, getCountries, getStates} from '../api'

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: [],
    selectedAddress: null,
    countries: [],
    states: []
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
    async editAddress(addresses) {
      const response = await updateAddress(addresses)
      this.selectedAddress = response.data
      return response;
    },
    async addAddress(addresses) {
      delete addresses.id;
      const response = await addAddress(addresses)
      this.selectedAddress = response.data
      if (response.data.saved){
        this.addresses.push(response.data)
      }
      return response;
    },
    async getCountries() {
      const response = await getCountries();
      this.countries = response.data;
    },
    async getStates(country) {
      const response = await getStates(country);
      this.states = response.data;
    }
  },
})
