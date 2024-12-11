import { defineStore } from 'pinia'
import { getCart, applyCoupon, getPlaceOrderEntry } from '../api/index.js'


export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {},
    couponCode: null,
  }),
  getters: {
    newTotal: (state) => {
      let tempTotal = state.cart.items?.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      )
      if (tempTotal > 0) {
        tempTotal += state.cart.shipping
      }
      return tempTotal
    },
    newSubTotal: (state) => {
      return state.cart.items?.reduce(
        (total, item) => total + item.product.discountedPrice * item.quantity,
        0,
      )
    },
  },
  actions: {
    async subToProduct(row) {
      if (row.quantity > 0) {
        this.cart.items.filter((item) => item.id === row.id)[0].quantity = row.quantity - 1
        const response = await getPlaceOrderEntry(this.cart)
        if (response.status === 200) this.cart = response.data
        return response
      }
    },
    async addToProduct(row) {
      this.cart.items.filter((item) => item.id === row.id)[0].quantity = row.quantity + 1
      const response = await getPlaceOrderEntry(this.cart)
      if (response.status === 200) this.cart = response.data
      return response
    },
    async fetchCart() {
      const response = await getCart()
      this.cart = response.data
      console.info(response.data.discount)
    },
    async applyCouponCode(couponCode) {
      const response = await applyCoupon(couponCode)
      this.couponCode = couponCode
      if (response.status > 400) {
        this.couponCode = null
        return response
      } else {
        console.info(response.data.discount)
        this.cart = response.data
        console.info(this.cart.discount)
        return response
      }
    },
    updateCart(newCart) {
      debugger
      this.cart = newCart
    },
  },
})
