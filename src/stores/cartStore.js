import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const cartStore = defineStore('cart', {
  state: () => {
    const cartProducts = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

    watch(
      cartProducts,
      () => {
        localStorage.setItem('cart', JSON.stringify(cartProducts.value))
      },
      {
        deep: true,
      }
    )

    return { cartProducts }
  },
})
