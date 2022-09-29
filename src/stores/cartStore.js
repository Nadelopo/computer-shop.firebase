import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { usersStore } from '@/stores/userStore'
import { productInCart } from '@/firebase'
import { loadCartProducts } from '@/utils/loadCartProducts'

export const cartStore = defineStore('cart', {
  state: () => {
    const { userId } = storeToRefs(usersStore())
    const cartProducts = ref([])

    watch(
      cartProducts,
      () => {
        if (userId.value) {
          productInCart(userId.value, cartProducts.value)
        } else {
          localStorage.setItem('cart', JSON.stringify(cartProducts.value))
        }
      },
      {
        deep: true,
      }
    )

    loadCartProducts(cartProducts)
    watch(userId, () => loadCartProducts(cartProducts))

    return { cartProducts }
  },
})
