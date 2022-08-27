import { defineStore, storeToRefs } from 'pinia'
import { productsStore } from './productsStore'
import { ref } from 'vue'
import { getFilter } from '@/firebase'
// import { useRoute } from 'vue-router'

export const filtersStore = defineStore('filters', {
  state: () => {
    const { categoryProducts } = storeToRefs(productsStore())
    const search = ref('')
    const minP = ref(0)
    const maxP = ref(300000)

    const filterFilters = ref()
    const copyFilter = ref()

    return { categoryProducts, search, minP, maxP, filterFilters, copyFilter }
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
  actions: {
    async updateFilters(category) {
      const dataDb = await getFilter(category)
      if (dataDb) {
        this.filterFilters = dataDb.q
        this.copyFilter = JSON.parse(JSON.stringify(this.filterFilters))
        this.copyFilter = this.copyFilter.map((e) => {
          for (let key in e) {
            if (e[key].title) {
              e[key].title = null
            }
          }
          return e
        })
      }
    },
  },
})

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
