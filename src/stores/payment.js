import { defineStore } from 'pinia'
import { getPaymentOptions, getCreditCards, selectCreditCard, getPlaceOrder } from '../api'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    paymentOptions: [],
    creditCards: [],
    selectedPaymentMethod: 'CreditCard',
    selectedCreditCard: null,
  }),
  actions: {
    async fetchPaymentOptions() {
      const response = await getPaymentOptions()
      this.paymentOptions = response.data
    },
    async fetchCreditCards() {
      const response = await getCreditCards()
      this.creditCards = response.data.filter((item) => item.cardHolderName)
      if (this.creditCards.length > 0) {
        this.selectedCreditCard = this.creditCards[0]
      }
    },
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method
    },
    selectCreditCard(cardHolderName) {
      this.selectedCreditCard = this.creditCards.find(
        (card) => card.cardHolderName === cardHolderName,
      )
    },
    async setPayment() {
      return await selectCreditCard(this.selectedCreditCard.id)
    },
    async getOrder(orderData) {
      return await getPlaceOrder(orderData)
    },
  },
})
