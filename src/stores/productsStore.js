import { defineStore } from 'pinia'
import { useLoadProducts } from '@/firebase'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export const productsStore = defineStore('products', {
  state: () => {
    const route = useRoute()
    const products = computed(() => useLoadProducts(route.params.category))
    const categoryProducts = computed(() => products.value.value)

    return { categoryProducts }
  },
})
