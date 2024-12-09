import axios from 'axios'

const authToken = import.meta.env.VITE_AUTH_TOKEN
const API_URL = import.meta.env.VITE_API_PATH

const API_CART_BASE = `${API_URL}/Cart`
const API_ADDRESS_BASE = `${API_URL}/Address`
const API_PAYMENT_BASE = `${API_URL}/Payment`

export const sendApi = {
  err: (error) => {
    return error.response
  },
  async get(path) {
    return axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch(this.err)
  },
  async post(path, userData) {
    return axios
      .post(`${path}`, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch(this.err)
  },
  async patch(path, userData) {
    delete userData.id
    return axios
      .post(`${path}`, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch(this.err)
  },
  async put(path, userData) {
    return axios
      .put(`${path}`, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch(this.err)
  },
}

export const getCart = async () => sendApi.get(`${API_CART_BASE}`)
export const applyCoupon = async (couponCode) =>
  sendApi.post(`${API_CART_BASE}/coupon?couponCode=${couponCode}`)

//
export const getAddresses = async () => sendApi.get(API_ADDRESS_BASE)
export const addAddress = async (address) =>
  sendApi.patch(`${API_ADDRESS_BASE}/${address.id}`, address)
export const selectAddress = async (id) => sendApi.put(`${API_ADDRESS_BASE}/select/${id}`)
export const getCountries = async () => sendApi.get(`${API_ADDRESS_BASE}/countries`)
export const getStates = async (country) => sendApi.get(`${API_ADDRESS_BASE}/states/${country}`)

//
export const getPlaceOrder = (orderData) => sendApi.post(`${API_URL}/Order`, orderData)
export const getPlaceOrderEntry = (orderData) => sendApi.post(`${API_URL}/OrderEntry`, orderData)

//
export const getPaymentOptions = async () => sendApi.get(`${API_PAYMENT_BASE}/options`)
export const getCreditCards = async () => sendApi.get(`${API_PAYMENT_BASE}/creditcards`)
export const addCreditCard = async (data) => sendApi.post(`${API_PAYMENT_BASE}/creditcards`, data)
export const selectCreditCard = async (cardId) =>
  sendApi.put(`${API_PAYMENT_BASE}/creditcards/${cardId}`)
export const selectPurchaseOrder = async (orderNumber) =>
  sendApi.put(`${API_PAYMENT_BASE}/purchase-order/${orderNumber}`)
