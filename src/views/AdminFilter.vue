<script setup>
import { storeToRefs } from 'pinia'
import AdminWrapper from '../components/Admin/AdminWrapper.vue'
import { categoriesStore } from '../stores/categoriesStore'
import { addFilter } from '@/firebase'
import { ref, computed, watch } from 'vue'
import DoubleButtons from '@/components/UI/DoubleButtons.vue'

const { categories } = storeToRefs(categoriesStore())
const currentCategoryIndex = ref(0)

const defineFilterFileds = () => {
  if (typeFilter.value) {
    filter.value = {
      params: {
        max: 0,
        min: 0,
        step: 0,
      },
      enTitle: '',
      title: '',
      type: true,
    }
  } else {
    filter.value = {
      0: {
        id: 0,
        title: '',
      },
      title: '',
      enTitle: '',
      type: false,
    }
  }
}

const typeFilter = ref(true)
const filter = ref({})

defineFilterFileds()
watch(typeFilter, () => defineFilterFileds())

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

const createFilter = () => {
  addFilter(
    categories.value.arr[currentCategoryIndex.value].enName,
    filter.value
  )
  typeFilter.value = true
  filter.value = {
    params: {
      max: 0,
      min: 0,
      step: 0,
    },
    enTitle: '',
    title: '',
    type: true,
  }
}
</script>

<template>
  <AdminWrapper>
    <div>
      <div v-if="categories" class="mb-8">
        <div class="flex gap-x-4">
          <button
            v-for="(category, index) in categories.arr"
            :key="index"
            :class="currentCategoryIndex == index ? 'btn' : 'btn__noactive'"
            @click="currentCategoryIndex = index"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
      <div class="my-8">
        <div>
          <div class="flex gap-x-4">
            <DoubleButtons
              v-model="typeFilter"
              text-first="????????????????"
              text-second="??????????????"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="mb-6">
          <label>???????????????????????? ???? ????????????????????</label>
          <input
            v-model.trim="filter.enTitle"
            type="text"
            class="minput"
            required
          />
        </div>
        <div class="mb-6">
          <label>???????????????????????? ???? ??????????????</label>
          <input
            v-model.trim="filter.title"
            type="text"
            class="minput"
            required
          />
        </div>
      </div>
      <template v-if="typeFilter">
        <div>
          <div class="mb-6">
            <label>?????????????????????? ????????????????</label>
            <input
              v-model.trim="filter.params.min"
              type="number"
              class="minput"
              required
            />
          </div>
          <div class="mb-6">
            <label>???????????????????????? ????????????????</label>
            <input
              v-model.trim="filter.params.max"
              type="number"
              class="minput"
              required
            />
          </div>
          <div class="mb-6">
            <label> ???????????????? ???????????????? </label>
            <input
              v-model.trim="filter.params.step"
              type="number"
              class="minput"
              required
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="(field, index) in filter" :key="index">
          <div>
            <div v-if="Object.keys(field).includes('id')" class="mb-6">
              <label>???????????????? ??????????????</label>
              <input
                v-model.trim="field.title"
                type="text"
                class="minput"
                required
              />
            </div>
          </div>
        </div>
        <div class="flex gap-x-8">
          <button class="btn" @click="addFieldInFilter">
            ???????????????? ????????????????
          </button>
          <button class="btn" @click="delFieldFromFilter">??????????????</button>
        </div>
      </template>
      <div>
        <button class="btn my-6" @click="createFilter">??????????????????</button>
      </div>
    </div>
  </AdminWrapper>
</template>
