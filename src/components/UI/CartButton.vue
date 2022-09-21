<script setup>
import CartButtonSVG from '@/icons/cartInButton.svg'
import { storeToRefs } from 'pinia'
import { cartStore } from '@/stores/cartStore'
import { computed } from 'vue'

const { cartProducts } = storeToRefs(cartStore())

const props = defineProps({
  productId: {
    typeof: String,
    required: true,
  },
})

const addProductInCart = () => {
  // const existenceProduct = cartProducts.value.find(
  //   (product) => product.id == props.productId
  // )

  // if (existenceProduct) {
  //   cartProducts.value = cartProducts.value.map((p) =>
  //     p.id == props.productId ? { ...p, count: p.count + 1 } : p
  //   )
  // } else cartProducts.value.push({ id: props.productId, count: 1 })
  cartProducts.value.push({ id: props.productId, count: 1 })
}

const checkProductInCart = computed(() => {
  return cartProducts?.value.filter((e) => e.id == props.productId).length
})
</script>

<template>
  <div>
    <button v-if="checkProductInCart" class="btn">
      <router-link :to="{ name: 'Cart' }">в ворзину</router-link>
    </button>
    <button v-else class="btn" @click="addProductInCart">
      <CartButtonSVG width="16" fill="#fff" class="mr-2" />купить
    </button>
  </div>
</template>
