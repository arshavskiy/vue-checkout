<template>
  <div class="cart-summary">
    <!--    <h2>Cart Summary</h2>-->
    <div class="w-full p-6 min-w-800px">
      <n-data-table
        :columns="columns"
        :data="filteredData"
        :pagination="pagination"
        :size="'large'"
      />
    </div>
  </div>
</template>

<script setup>
import {
  NDataTable,
  NTag,
  NCard,
  NSpace,
  NAvatar,
  NTooltip,
  NCheckbox,
  NCheckboxGroup,
  NButton,
  NImage,
  NConfigProvider,
} from 'naive-ui'

import { computed, h } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()
const { cart, getSubTotal, getTotal } = storeToRefs(cartStore)

const columns = [
  {
    title: 'Product',
    render(row) {
      return h('div', { class: 'flex items-center' }, [
        h(NImage, {
          width: 300,
          height: 200,
          objectFit: 'cover',
          src: row.product.imageUrl,
          style: { marginRight: '40px' },
        }),
        h('div', { class: 'flex flex-col' }, [
          h('div', { class: 'font-bold text-xl p-2' }, [row.product.name]),
          h('div', { class: 'p-2' }, ['Color: ' + row.product.sizeColor]),
          h(NTag, {}, ['Sku: ' + row.product.sku]),
        ]),
      ])
    },
  },
  {
    title: 'Price',
    key: 'product.price',
    render(row) {
      return row.product.price * row.quantity
    },
    // sortable: true,
    // sorter: (a, b) => a.product.price.localeCompare(b.product.price), // Sort by user.name
  },
  {
    title: 'Quantity',
    key: 'quantity',
    render(row) {
      return h('div', { class: 'flex items-center items-center' }, [
        h(
          NButton,
          {
            size: 'small',
            onClick: () => subToProduct(row),
          },
          { default: () => ' - ' },
        ),
        h('div', { class: 'flex items-center p-2' }, row.quantity),
        h(
          NButton,
          {
            size: 'small',
            onClick: () => addToProduct(row),
          },
          { default: () => ' + ' },
        ),
      ])
    },
    // sortable: true,
    // sorter: (a, b) => a.product.price.localeCompare(b.product.price), // Sort by user.name
  },
  {
    title: 'Subtotal',
    key: 'product.discountedPrice',
    render(row) {
      return row.product.discountedPrice * row.quantity
    },
    // sortable: true,
    // sorter: (a, b) => a.product.price.localeCompare(b.product.price), // Sort by user.name
  },
]

columns.forEach((item) => (item.fixed = 'center'))

const emit = defineEmits(['add-total', 'sub-total'])

// {{ item.product.quantity }}
//   {{ item.product.discountedPrice }}

const filteredData = computed(() => {
  return cart.value.items
})

const subToProduct = (row) => {
  if (row.quantity > 0)
    cart.value.items.filter((item) => item.id === row.id)[0].quantity = row.quantity - 1
  console.log(row)
  emit('sub-total', row)
}

const addToProduct = (row) => {
  cart.value.items.filter((item) => item.id === row.id)[0].quantity = row.quantity + 1
  console.log(row)
  emit('add-total', row)
}
</script>

<style>
.cart-summary {
  margin-bottom: 20px;
}
</style>
