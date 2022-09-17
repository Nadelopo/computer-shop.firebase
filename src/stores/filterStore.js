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
    filterProducts: (state) =>
      state.categoryProducts.filter((e) => {
        const resultCheckbox = []
        const resultInputs = []

        e.fields.forEach((f) => {
          const field = []

          state.copyFilter.forEach((c) => {
            if (c.enTitle == f.enFieldTitle) {
              for (let key in c) {
                if (key != 'enTitle' && key != 'title' && key != 'type') {
                  if (c.type) {
                    const [min, max] = state.getNumberDataFromQuery(c.enTitle)
                    if (f.title <= max && f.title >= min) {
                      resultInputs.push(true)
                    }
                  } else if (c[key].title) field.push(c[key].title)
                  else resultInputs.push(true)
                }
              }
              resultCheckbox.push(field.includes(f.title))
              if (field.length == 0) resultCheckbox.push(true)
            }
          })
        })

        // фильтрация по производителю
        const man = []
        const manufactur = state.copyFilter.filter(
          (m) => m.enTitle == 'manufacturer'
        )[0]
        for (let key in manufactur) {
          if (key != 'enTitle' && key != 'title')
            if (manufactur[key].title)
              man.push(manufactur[key].title.toLocaleLowerCase())
        }
        //-----------------------------

        const filter =
          e.price >= state.minP &&
          e.price <= state.maxP &&
          (man.includes(e.manufacturer.toLocaleLowerCase()) ||
            man.length == 0) &&
          e.name.toLocaleLowerCase().includes(state.search.toLocaleLowerCase())

        return (
          filter &&
          resultCheckbox.includes(true) &&
          manufactur &&
          resultInputs.includes(true)
        )
      }),
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
