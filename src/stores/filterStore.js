import { defineStore, storeToRefs } from 'pinia'
import { productsStore } from './productsStore'
import { ref } from 'vue'
import { getFilter } from '@/firebase'
// import { filterProds } from '@/utils/filterProducts'
import { getNumberDataFromQuery } from '@/utils/getNumberDataFromQuery'
const { log } = console
log
export const filtersStore = defineStore('filters', {
  state: () => {
    const { categoryProducts } = storeToRefs(productsStore())

    const filterFields = ref([])
    const copyFilter = ref([])
    const filterProducts = ref([])

    // filter variables
    const search = ''
    const [minP, maxP] = getNumberDataFromQuery('price')

    return {
      categoryProducts,
      search,
      minP,
      maxP,
      filterFields,
      copyFilter,
      filterProducts,
    }
  },
  getters: {
    // filterProducts: (state) => filterProds(state),
  },
  actions: {
    async updateFilters(category) {
      const dataDb = await getFilter(category)
      if (dataDb) {
        dataDb.q.sort((a, b) => a.type - b.type).reverse()
        this.filterFields = dataDb.q
        this.copyFilter = JSON.parse(JSON.stringify(this.filterFields))
        this.copyFilter = this.copyFilter.map((e) => {
          for (let key in e) {
            if (e[key].title) {
              e[key].title = null
            }
          }
          return e
        })
      } else {
        this.copyFilter = []
      }
    },
    updateFilterProducts(route) {
      this.categoryProducts.filter((product) => {
        // const resultInputs = []
        for (let key in product.fields) {
          this.copyFilter.forEach((f) => {
            if (f.type && !product.fields[key].type) {
              const [min, max] = getNumberDataFromQuery(f.enTitle, route)
              log(min, max)
            }
          })
        }
        return true
      })
    },
  },
})
