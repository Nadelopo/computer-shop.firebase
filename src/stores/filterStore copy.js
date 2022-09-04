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

    return { categoryProducts, search, minP, maxP, filterFields, copyFilter }
  },
  getters: {
    filterProducts: (state) =>
      state.categoryProducts.filter((e) => {
        const route = useRoute()
        const query = route.query

        let s = []
        let man = []

        // ПОФИКСИТЬ-------------------------------------------------------
        e.fields.forEach((f) => {
          if (Object.keys(query).length) {
            for (let key in query) {
              if (key == f.enFieldTitle) {
                if (!query[key]) s.push(true)
                else s.push(query[key].includes(String(f.title)))
              }
            }
          } else s.push(true)
        })
        // ----------------------------------------------------------------

        const filter =
          (e.name.toLowerCase().includes(state.search.toLowerCase()) ||
            !state.search) &&
          e.price <= state.maxP &&
          e.price >= state.minP

        if (Array.isArray(query.manufacturer)) {
          query.manufacturer.forEach((m) => {
            man.push(
              m.toLocaleLowerCase() == e.manufacturer.toLocaleLowerCase()
            )
          })
        } else man.push(true)

        return filter && s.includes(true) && man.includes(true)
      }),
  },
  actions: {
    async updateFilters(category) {
      const dataDb = await getFilter(category)
      if (dataDb) {
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
