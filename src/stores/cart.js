import {defineStore} from 'pinia';
import {getCart, applyCoupon} from '../api/index.js';
import {computed} from "vue";

const mock = {
  id: "d6af07614a8140c5be213da45bdc20ad",
  subtotal: 150,
  shipping: 10,
  tax: 16,
  total: 176,
  discount: 0,
  paymentMethod: null,
  shippingAddress: null,
  paymentInfo: null,
  items: [{
    "id": "8de5aa714b014606b53b289a94a4336b", "product": {
      "name": "T-Shirt",
      "sku": "TSHIRT001",
      "sizeColor": "M/Red",
      "imageUrl": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "price": 20,
      "discountedPrice": 18
    }, "quantity": 1
  }, {
    "id": "b7c3bfe35d4a4efda9dcd96a9be26520", "product": {
      "name": "Jeans",
      "sku": "JEANS001",
      "sizeColor": "32/Blue",
      "imageUrl": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      "price": 50,
      "discountedPrice": 45
    }, "quantity": 1
  }, {
    "id": "c8b66c5c00bc42d4b062fe39163cfa38", "product": {
      "name": "Shoes",
      "sku": "SHOES001",
      "sizeColor": "42/Black",
      "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "price": 80,
      "discountedPrice": 72
    }, "quantity": 1
  }],
  appliedCouponCode: null
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: mock,
  }),

  getters: {
    getTotal: (state) => {
      const tax = (state.cart.tax / 100)
      state.cart.total = (state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0) + state.cart.shipping) * (1 + tax);
      return state.cart.total
    },
    getSubTotal: (state) => {
      state.cart.subtotal = state.cart.items.reduce((total, item) => total + item.product.discountedPrice * item.quantity, 0);
      return state.cart.subtotal
    },
  },

  actions: {
    async fetchCart() {
      const response = await getCart();
      this.cart = response.data;
    },
    async applyCouponCode(couponCode) {
      await applyCoupon(couponCode);
      await this.fetchCart(); // Refresh cart
    },
  },
});
