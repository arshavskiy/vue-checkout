import { defineStore } from 'pinia'
import { getCart, applyCoupon } from '../api/index.js'
import { computed } from 'vue'

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
    cart: mock,
  }),
  getters: {},
  actions: {
    // getTotal() {
    //   const tax = (this.cart.tax / 100)
    //   return (this.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0) + this.cart.shipping) * (1 + tax);
    // },
    // getSubTotal(){
    //   return this.cart.subtotal = this.cart.items.reduce((total, item) => total + item.product.discountedPrice * item.quantity, 0)
    // },
    async fetchCart() {
      const response = await getCart()
      this.cart = response.data
    },
    async applyCouponCode(couponCode) {
      const response = await applyCoupon(couponCode)
      debugger
      if (response.status > 300) {
        return {
          status: response.status,
          statusText: response.statusText,
        }
      }
      this.cart = response.data
      return { status: response.status }
      // await this.fetchCart(); // Refresh cart
    },
  },
})
