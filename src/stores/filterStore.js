import { defineStore, storeToRefs } from 'pinia'
import { productsStore } from './productsStore'
import { ref } from 'vue'
import { getFilter } from '@/firebase'
import { useRoute } from 'vue-router'
const { log } = console
log
export const filtersStore = defineStore('filters', {
  state: () => {
    const { categoryProducts } = storeToRefs(productsStore())

    const getNumberDataFromQuery = (where) => {
      const route = useRoute()
      let min
      let max
      if (route.query[where]) {
        min = Number(route.query[where].split('-')[0])
        max = Number(route.query[where].split('-')[1])
      } else {
        min = 0
        max = 300000
      }

      return [min, max]
    }

    const filterFilters = ref()
    const copyFilter = ref()

    // filter variables
    const search = ''
    const [minP, maxP] = getNumberDataFromQuery('price')

    return { categoryProducts, search, minP, maxP, filterFilters, copyFilter }
  },
  getters: {
    filterProducts: (state) =>
      state.categoryProducts.filter((e) => {
        const route = useRoute()
        let s = []
        if (s) {
          e.fields.forEach((e) => {
            for (let key in route.query) {
              if (key == e.enFieldTitle) {
                if (!route.query[key]) s.push(true)
                else s.push(route.query[key] == e.title)
              }
            }
          })
        }

        const filter =
          (e.name.toLowerCase().includes(state.search.toLowerCase()) ||
            !state.search) &&
          e.price <= state.maxP &&
          e.price >= state.minP
        return filter && s.includes(true)
      }),
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
