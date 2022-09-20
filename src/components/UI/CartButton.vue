<script setup>
import CartButtonSVG from '@/icons/cartInButton.svg'
import { storeToRefs } from 'pinia'
import { cartStore } from '@/stores/cartStore'
import { watch } from 'vue'

const { cartProducts } = storeToRefs(cartStore())

const props = defineProps({
  productId: {
    typeof: String,
    required: true,
  },
})

const addProductInCart = () => {
  const existenceProduct = cartProducts.value.find(
    (product) => product.id == props.productId
  )

  if (existenceProduct) {
    cartProducts.value = cartProducts.value.map((p) =>
      p.id == props.productId ? { ...p, count: p.count + 1 } : p
    )
  } else cartProducts.value.push({ id: props.productId, count: 1 })
}

watch(
  cartProducts,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartProducts.value))
  },
  {
    deep: true,
  }
)
</script>

<template>
  <div>
    <button class="btn" @click="addProductInCart">
      <CartButtonSVG width="16" fill="#fff" class="mr-2" />купить
    </button>
  </div>
</template>
