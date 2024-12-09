<template>
  <n-card id="table">
    <div class="mb-6">
      <div class="w-full min-w-480px">
        <n-data-table
          :columns="columns"
          :data="filteredData"
          :pagination="pagination"
          :size="smaller ? 'small' : 'large'"
          :scroll-x="700"
          bordered
        />
      </div>
    </div>

    <!--    <n-button type="primary" class="w-full" @click="placeOrder">-->
    <!--      Place Order-->
    <!--    </n-button>-->
  </n-card>
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
  useMessage
} from 'naive-ui'


import {computed, h, defineEmits} from 'vue'
import {storeToRefs} from 'pinia'
import {useCartStore} from '@/stores/cart.js'

const message = useMessage()

const cartStore = useCartStore()
const {cart, getSubTotal, getTotal} = storeToRefs(cartStore)

const columns = [
  {
    title: 'Product',
    render(row) {
      return h('div', {class: 'flex items-center'}, [
        h(NImage, {
          width: smaller ? 100 : 200,
          height: smaller ? 100 / 1.5 : 200 / 1.5,
          objectFit: 'cover',
          src: row.product.imageUrl,
          style: {marginRight: '40px'},
        }),
        h('div', {class: 'flex flex-col'}, [
          h('div', {class: 'font-bold text-xl p-2'}, [row.product.name]),
          h('div', {class: 'p-2'}, ['Color: ' + row.product.sizeColor]),
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
    // sorter: (a, b) => a.product.price.localeCompare(b.product.price),
  },
  {
    title: 'Quantity',
    key: 'quantity',
    render(row) {
      return h('div', {class: 'flex items-center items-center'}, [
        h(
          NButton,
          {
            size: 'small',
            onClick: async () => {
              const res = await cartStore.subToProduct(row)
              if (res.status > 300) {
                message.error(res.data || res.statusText)
              } else {

              }
            }
          },
          {default: () => ' - '},
        ),
        h('div', {class: 'flex items-center p-2'}, row.quantity),
        h(
          NButton,
          {
            size: 'small',
            onClick: async () => {
              const res = await cartStore.addToProduct(row)
              if (res.status > 300) {
                message.error(res.data || res.statusText)
              } else {

              }
            }
          },
          {default: () => ' + '},
        ),
      ])
    },
    // sortable: true,
    // sorter: (a, b) => a.quantity.localeCompare(b.quantity),
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

const smaller = window.innerWidth < 750

const filteredData = computed(() => {
  return cart.value.items
})

const emit = defineEmits(['place-order'])

const placeOrder = async () => {
  emit('place-order')
}
</script>
