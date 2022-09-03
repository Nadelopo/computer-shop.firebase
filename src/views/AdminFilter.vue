<script setup>
import { storeToRefs } from 'pinia'
import AdminWrapper from '../components/Admin/AdminWrapper.vue'
import { categoriesStore } from '../stores/categoriesStore'
import { addFilter } from '@/firebase'
import { ref, computed } from 'vue'

const { categories } = storeToRefs(categoriesStore())
const currentCategoryIndex = ref(0)

const filter = ref({
  0: {
    id: 0,
    title: '',
  },
  title: 'test',
  enTItle: 'test',
})

const countObjects = computed(() => {
  let count = 0
  for (let key in filter.value) {
    if (typeof filter.value[key] == 'object') count++
  }
  return count
})

const addFieldInFilter = () => {
  filter.value[countObjects.value] = {
    id: countObjects.value,
    title: '',
  }
}
const delFieldFromFilter = () => delete filter.value[countObjects.value - 1]

addFilter('processors', filter.value)
</script>

<template>
  <AdminWrapper>
    <div>
      {{ countObjects }}
      <div v-if="categories" class="mb-8">
        <div class="flex gap-x-4">
          <button
            v-for="(category, index) in categories.arr"
            :key="index"
            :class="currentCategoryIndex == index ? 'btn' : 'btn__notactive'"
            @click="currentCategoryIndex = index"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
      <div>
        <div class="mb-6">
          <label>наименование на английском</label>
          <input
            type="text"
            class="minput"
            v-model.trim="filter.enTItle"
            required
          />
        </div>
        <div class="mb-6">
          <label>наименование на русском</label>
          <input
            type="text"
            class="minput"
            v-model.trim="filter.title"
            required
          />
        </div>
        <div v-for="(field, index) in filter" :key="index">
          <div>
            <div class="mb-6" v-if="Object.keys(field).includes('id')">
              <label>значение фильтра</label>
              <input
                type="text"
                class="minput"
                v-model.trim="field.title"
                required
              />
            </div>
          </div>
        </div>
        <div class="flex gap-x-8">
          <button class="btn" @click="addFieldInFilter">добавить</button>
          <button class="btn" @click="delFieldFromFilter">удалить</button>
        </div>
      </div>
    </div>
  </AdminWrapper>
</template>
