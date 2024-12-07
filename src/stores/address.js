import { defineStore } from 'pinia';
import { getAddresses, selectAddress } from '../api';

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: [],
    selectedAddress: null,
  }),
  actions: {
    async fetchAddresses() {
      const response = await getAddresses();
      this.addresses = response.data;
    },
    async selectAddress(address) {
      const selected = this.addresses.find((addr) => addr.id === address.id);
      await selectAddress({ ...selected});
      this.selectedAddress = selected;
    },
  },
});
