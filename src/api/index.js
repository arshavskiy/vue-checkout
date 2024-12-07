import axios from 'axios';

const authToken = import.meta.env.VITE_AUTH_TOKEN;
const API_URL = import.meta.env.VITE_API_PATH

const API_CART_BASE = `${API_URL}/api/Cart`;
const API_ADDRESS_BASE = `${API_URL}/api/Address`;
const API_ORDER_BASE = `${API_URL}/api/Order`;
const API_PAYMENT_BASE = `${API_URL}/api/Payment`;


export const sendApi = {
  async get(path) {
    return axios.get(`${path}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
  },
  async post(path, userData) {
    debugger
    return axios.post(`${path}`, userData, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
  },
  async put(path, userData) {
    debugger
    return axios.put(`${path}`, userData, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
  }
}

export const getCart = () => sendApi.get(`${API_CART_BASE}`);
export const applyCoupon = (couponCode) => sendApi.post(`${API_CART_BASE}/coupon`, couponCode);

//
export const getAddresses = () => sendApi.get(API_ADDRESS_BASE);
export const addAddress = (data) => sendApi.post(API_ADDRESS_BASE);
export const selectAddress = (data) => sendApi.put(`${API_ADDRESS_BASE}/select`, data);
export const getCountries = () => sendApi.get(`${API_ADDRESS_BASE}/countries`);
export const getStates = (country) => sendApi.get(`${API_ADDRESS_BASE}/states/${country}`);

//
export const getPlaceOrder = (orderData) => sendApi.post(API_ORDER_BASE, orderData);

//
export const getPaymentOptions = () => sendApi.get(`${API_PAYMENT_BASE}/options`);
export const getCreditCards = () => sendApi.get(`${API_PAYMENT_BASE}/creditcards`);
export const addCreditCard = (data) => sendApi.post(`${API_PAYMENT_BASE}/creditcards`, data);
export const selectCreditCard = (cardNumber) => sendApi.put(`${API_PAYMENT_BASE}/creditcards/${cardNumber}`);
export const selectPurchaseOrder = (orderNumber) => sendApi.put(`${API_PAYMENT_BASE}/purchase-order/${orderNumber}`);
