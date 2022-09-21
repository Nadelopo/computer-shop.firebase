import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { usersStore } from '@/stores/userStore'
import { productInCart } from '@/firebase'

export const cartStore = defineStore('cart', {
  state: () => {
    const loadCartProducts = async () => {
      const { getCurrentUserData } = usersStore()
      const user = await getCurrentUserData()
      if (user) {
        cartProducts.value = user.cart
      } else {
        cartProducts.value = JSON.parse(localStorage.getItem('cart') || '[]')
      }
    }

    const { userId } = storeToRefs(usersStore())
    const cartProducts = ref([])

    loadCartProducts()
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

    watch(userId, () => loadCartProducts())

    return { cartProducts }
  },
})
