import { usersStore } from '@/stores/userStore'

export const loadCartProducts = async (cartProducts) => {
  const { getCurrentUserData } = usersStore()
  const user = await getCurrentUserData()
  if (user) {
    cartProducts.value = user.cart
  } else {
    cartProducts.value = JSON.parse(localStorage.getItem('cart') || '[]')
  }
}
