export const validators = {
  cardNumber: (value) => /^\d{16}$/.test(value) || 'Card number must be 16 digits.',
  expiryMonth: (value) =>
    /^(0[1-9]|1[0-2])$/.test(value) || 'Expiry month must be between 01 and 12.',
  expiryYear: (value) => /^\d{2}$/.test(value) || 'Expiry year must be 2 digits.',
  cvv: (value) => /^\d{3,4}$/.test(value) || 'CVV must be 3 or 4 digits.',
  cardHolderName: (value) =>
    /^[a-zA-Z\s]+$/.test(value) || 'Cardholder name must contain only letters and spaces.',
  addressLine1: (value) => value.trim() !== '' || 'Address Line 1 is required.',
  country: (value) => value.trim() !== '' || 'Country is required.',
  state: (value) => value.trim() !== '' || 'State is required.',
  postalCode: (value) => /^\d{5}$/.test(value) || 'Postal code must be 5 digits.',
  couponCode: (value) => /^MyCoupon\d{2}$/.test(value) || 'Invalid coupon code format.',
}


