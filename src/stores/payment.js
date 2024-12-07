import { defineStore } from 'pinia';
import { getPaymentOptions, getCreditCards } from '../api';

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    paymentOptions: [],
    creditCards: [],
    selectedPaymentMethod: 'CreditCard',
    selectedCreditCard: null,
  }),
  actions: {
    async fetchPaymentOptions() {
      const response = await getPaymentOptions();
      this.paymentOptions = response.data;
    },
    async fetchCreditCards() {
      const response = await getCreditCards();
      this.creditCards = response.data;
      if (this.creditCards.length > 0) {
        this.selectedCreditCard = this.creditCards[0];
      }
    },
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
    },
    selectCreditCard(cardId) {
      this.selectedCreditCard = this.creditCards.find((card) => card.id === cardId);
    },
  },
});
