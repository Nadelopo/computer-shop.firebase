import { defineStore } from 'pinia'
import { getCategory } from '@/firebase'
import { ref } from 'vue'

export const categoriesStore = defineStore('categories', {
  state: () => {
    const categories = ref()
    getCategory('names').then((e) => (categories.value = e))

    return { categories }
  },
  actions: {
    async updateCategoriesArray() {
      getCategory('names').then((e) => (this.categories = e))
    },
  },
})
