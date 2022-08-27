import { defineStore } from 'pinia'
import { useLoadProducts } from '@/firebase'
import { useRoute } from 'vue-router'
import { computed, watch, ref } from 'vue'

export const productsStore = defineStore('products', {
  state: () => {
    const route = useRoute()
    const products = ref()
    products.value = useLoadProducts(route.params.category)
    watch(
      () => route.params.category,
      (cur) => (products.value = useLoadProducts(cur))
    )
    const categoryProducts = computed(() => products.value.value)
    return { categoryProducts }
  },
})
