import { defineStore, storeToRefs } from 'pinia'
import { productsStore } from './productsStore'
import { ref } from 'vue'
import { getFilter } from '@/firebase'
import { useRoute } from 'vue-router'
import { filterProds } from './utils/filterProducts'
const { log } = console
log
export const filtersStore = defineStore('filters', {
  state: () => {
    const { categoryProducts } = storeToRefs(productsStore())

    const getNumberDataFromQuery = (where) => {
      const route = useRoute()
      const query = route.query
      let min
      let max
      if (query[where]) {
        min = Number(query[where].split('-')[0])
        max = Number(query[where].split('-')[1])
      } else {
        min = 0
        max = 300000
      }

      return [min, max]
    }

    const filterFields = ref([])
    const copyFilter = ref([])

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
      getNumberDataFromQuery,
    }
  },
  getters: {
    filterProducts: (state) => filterProds(state),
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
  },
})
