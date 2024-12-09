import { defineStore } from 'pinia'
import {getCart, applyCoupon, getPlaceOrder, getPlaceOrderEntry} from '../api/index.js'
import { computed, ref } from 'vue'

const mock = {
  id: 'd6af07614a8140c5be213da45bdc20ad',
  subtotal: 0,
  shipping: 0,
  tax: 16,
  total: 0,
  discount: 0,
  paymentMethod: null,
  shippingAddress: null,
  paymentInfo: null,
  items: [
    {
      id: '8de5aa714b014606b53b289a94a4336b',
      product: {
        name: 'T-Shirt',
        sku: 'TSHIRT001',
        sizeColor: 'M/Red',
        imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
        price: 20,
        discountedPrice: 18,
      },
      quantity: 1,
    },
    {
      id: 'b7c3bfe35d4a4efda9dcd96a9be26520',
      product: {
        name: 'Jeans',
        sku: 'JEANS001',
        sizeColor: '32/Blue',
        imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
        price: 50,
        discountedPrice: 45,
      },
      quantity: 1,
    },
    {
      id: 'c8b66c5c00bc42d4b062fe39163cfa38',
      product: {
        name: 'Shoes',
        sku: 'SHOES001',
        sizeColor: '42/Black',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        price: 80,
        discountedPrice: 72,
      },
      quantity: 1,
    },
  ],
  appliedCouponCode: null,
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {},
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
        if (response.status === 200) this.cart = response.data;
        return response
      }
    },
    async addToProduct(row) {
      this.cart.items.filter((item) => item.id === row.id)[0].quantity = row.quantity + 1
      const response = await getPlaceOrderEntry(this.cart)
      if (response.status === 200) this.cart = response.data;
      return response
    },
    async fetchCart() {
      const response = await getCart()
      this.cart = response.data
      console.info(response.data.discount)
    },
    async applyCouponCode(couponCode) {
      const response = await applyCoupon(couponCode)
      if (response.status > 400) {
        return response
      } else {
        console.info(response.data.discount)
        this.cart = response.data
        console.info(this.cart.discount)
        return response
      }
    }
  },
})
