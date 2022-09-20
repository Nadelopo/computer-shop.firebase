import { defineStore } from 'pinia'
import { ref } from 'vue'

export const cartStore = defineStore('cart', {
  state: () => {
    const cartProducts = ref([])
    return { cartProducts }
  },
})
