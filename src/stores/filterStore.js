import { defineStore, storeToRefs } from 'pinia'
import { productsStore } from './productsStore'
import { ref } from 'vue'

export const filtersStore = defineStore('filters', {
  state: () => {
    const { categoryProducts } = storeToRefs(productsStore())
    const search = ref('')
    const minP = ref(0)
    const maxP = ref(300000)
    // const translate = [
    //   ['я', 'z'],
    //   ['ч', 'x'],
    //   ['с', 'c'],
    //   ['м', 'v'],
    //   ['и', 'b'],
    //   ['т', 'n'],
    //   ['ь', 'm'],
    //   ['ф', 'a'],
    //   ['ы', 's'],
    //   ['в', 'd'],
    //   ['а', 'f'],
    //   ['п', 'g'],
    //   ['р', 'h'],
    //   ['о', 'j'],
    //   ['л', 'k'],
    //   ['д', 'l'],
    //   ['й', 'q'],
    //   ['ц', 'w'],
    //   ['у', 'e'],
    //   ['к', 'r'],
    //   ['е', 't'],
    //   ['н', 'y'],
    //   ['г', 'u'],
    //   ['ш', 'i'],
    //   ['щ', 'o'],
    //   ['з', 'p'],
    // ]

    return { categoryProducts, search, minP, maxP }
  },
  getters: {
    filterProducts: (state) =>
      state.categoryProducts.filter(
        (e) =>
          (e.name.toLowerCase().includes(state.search.toLowerCase()) ||
            !state.search) &&
          e.price <= state.maxP &&
          e.price >= state.minP
      ),
  },
})
