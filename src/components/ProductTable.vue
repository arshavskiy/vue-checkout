<template>
  <div id="table" class="xl:m-4">
    <div class="xl:mb-6">
      <div class="w-full" :class="[maxWidthComputed ? `min-w-${maxWidthComputed}px` :'']">
        <n-data-table
          :columns="filteredColumns"
          :data="filteredData"
          :size="smaller ? 'small' : 'medium'"
          :max-width="maxWidthComputed"
        />
      </div>
    </div>

    <!--    <n-button type="primary" class="w-full" @click="placeOrder">-->
    <!--      Place Order-->
    <!--    </n-button>-->
  </div>
</template>

<script setup>
import {
  NDataTable,
  NTag,
  NButton,
  NImage,
  useMessage
} from 'naive-ui'


import {computed, h, defineEmits} from 'vue'
import {storeToRefs} from 'pinia'
import {useCartStore} from '@/stores/cart.js'

const message = useMessage();

const cartStore = useCartStore();
const {cart} = storeToRefs(cartStore);

const smaller = window.innerWidth < 1199;
const mobile = window.innerWidth < 480;

let imageSize = 200;

const columns = [
  {
    title: 'Product',
    key: 'mobile',
    render(row) {
      return h('div', {class: 'flex items-center'}, [
        h('div', {class: 'flex flex-col'}, [
          h('div', {class: 'font-bold text-xl xl:p-2'}, [row.product.name]),
          h('div', {class: 'xl:p-2'}, ['Color: ' + row.product.sizeColor]),
          h(NTag, {}, ['Sku: ' + row.product.sku]),
        ]),
      ])
    },
  },
  {
    title: 'Product',
    key: 'desktop',
    render(row) {
      return h('div', {class: 'flex items-center'}, [
        h(NImage, {
          width: smaller ? imageSize / 2 : imageSize,
          height: smaller ? (imageSize / 1.5) / 1.5 : imageSize / 1.5,
          objectFit: 'cover',
          src: row.product.imageUrl,
          style: {marginRight: '40px'},
        }),
        h('div', {class: 'flex flex-col'}, [
          h('div', {class: 'font-bold text-xl xl:p-2'}, [row.product.name]),
          h('div', {class: 'xl:p-2'}, ['Color: ' + row.product.sizeColor]),
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
        h('div', {class: 'flex items-center xl:p-2'}, row.quantity),
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

const filteredColumns = computed(() => {
  return mobile
    ? columns.filter((col) => col.key !== "desktop")
    : columns.filter((col) => col.key !== "mobile");
})

console.log('filteredColumns', filteredColumns.value, mobile)

const maxWidthComputed = computed(() => {
  return mobile ? String(window.innerWidth - 20) : '1200'
})

const filteredData = computed(() => {
  return cart.value.items
})

</script>
